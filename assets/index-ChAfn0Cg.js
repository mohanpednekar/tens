var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=(e,t)=>{let n=()=>Array.from({length:e.length},(t,n)=>e.key(n)).filter(e=>e!=null&&e.startsWith(t));return{get length(){return n().length},key:e=>{let r=n()[e];return r==null?null:r.slice(t.length)},getItem:n=>e.getItem(t+n),setItem:(n,r)=>e.setItem(t+n,r),removeItem:n=>e.removeItem(t+n),clear:()=>n().forEach(t=>e.removeItem(t))}};((e=void 0)=>{if(!e)return!1;try{return Object.defineProperty(window,"localStorage",{configurable:!0,value:l(window.localStorage,e)}),!0}catch{return!1}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function D(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function O(e,t){return D(e.type,t,e.props)}function k(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function A(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var j=/\/+/g;function M(e,t){return typeof e==`object`&&e&&e.key!=null?A(``+e.key):t.toString(36)}function ee(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function N(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,N(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+M(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(j,`$&/`)+`/`),N(o,r,i,``,function(e){return e})):o!=null&&(k(o)&&(o=O(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(j,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+M(a,u),c+=N(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+M(a,u++),c+=N(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return N(ee(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function P(e,t,n){if(e==null)return e;var r=[],i=0;return N(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function te(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ne=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function re(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,ne)}catch(e){ne(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function F(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else re(F.bind(null,e))}var ie={map:P,forEach:function(e,t,n){P(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return P(e,function(){t++}),t},toArray:function(e){return P(e,function(e){return e})||[]},only:function(e){if(!k(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=ie,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=F,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!E.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return D(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)E.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return D(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=k,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:te}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=re,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.1`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&j(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&j(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function j(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,j(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=u(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=u(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),h=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}function m(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&m(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function w(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function T(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function E(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var D=Object.assign,O=Symbol.for(`react.element`),k=Symbol.for(`react.transitional.element`),A=Symbol.for(`react.portal`),j=Symbol.for(`react.fragment`),M=Symbol.for(`react.strict_mode`),ee=Symbol.for(`react.profiler`),N=Symbol.for(`react.consumer`),P=Symbol.for(`react.context`),te=Symbol.for(`react.forward_ref`),ne=Symbol.for(`react.suspense`),re=Symbol.for(`react.suspense_list`),F=Symbol.for(`react.memo`),ie=Symbol.for(`react.lazy`),ae=Symbol.for(`react.activity`),oe=Symbol.for(`react.legacy_hidden`),se=Symbol.for(`react.memo_cache_sentinel`),ce=Symbol.for(`react.view_transition`),I=Symbol.for(`react.recoverable`),le=Symbol.iterator;function ue(e){return typeof e!=`object`||!e?null:(e=le&&e[le]||e[`@@iterator`],typeof e==`function`?e:null)}var de=Symbol.for(`react.client.reference`);function fe(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===de?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case j:return`Fragment`;case ee:return`Profiler`;case M:return`StrictMode`;case ne:return`Suspense`;case re:return`SuspenseList`;case ae:return`Activity`;case ce:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case A:return`Portal`;case P:return e.displayName||`Context`;case N:return(e._context.displayName||`Context`)+`.Consumer`;case te:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case F:return t=e.displayName||null,t===null?fe(e.type)||`Memo`:t;case ie:t=e._payload,e=e._init;try{return fe(e(t))}catch{}}return null}var pe=Array.isArray,L=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,R=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,me={pending:!1,data:null,method:null,action:null},he=[],ge=-1;function _e(e){return{current:e}}function ve(e){0>ge||(e.current=he[ge],he[ge]=null,ge--)}function ye(e,t){ge++,he[ge]=e.current,e.current=t}var be=_e(null),xe=_e(null),Se=_e(null),Ce=_e(null);function we(e,t){switch(ye(Se,t),ye(xe,e),ye(be,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?mp(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=mp(t),e=hp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}ve(be),ye(be,e)}function Te(){ve(be),ve(xe),ve(Se)}function Ee(e){var t=e.memoizedState;t!==null&&(dh._currentValue=t.memoizedState,ye(Ce,e)),t=be.current;var n=hp(t,e.type);t!==n&&(ye(xe,e),ye(be,n))}function De(e){xe.current===e&&(ve(be),ve(xe)),Ce.current===e&&(ve(Ce),dh._currentValue=me)}var Oe,ke;function Ae(e){if(Oe===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Oe=t&&t[1]||``,ke=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Oe+e+ke}var je=!1;function Me(e,t){if(!e||je)return``;je=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{je=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Ae(n):``}function Ne(e,t){switch(e.tag){case 26:case 27:case 5:return Ae(e.type);case 16:return Ae(`Lazy`);case 13:return e.child!==t&&t!==null?Ae(`Suspense Fallback`):Ae(`Suspense`);case 19:return Ae(`SuspenseList`);case 0:case 15:return Me(e.type,!1);case 11:return Me(e.type.render,!1);case 1:return Me(e.type,!0);case 31:return Ae(`Activity`);case 30:return Ae(`ViewTransition`);default:return``}}function Pe(e){try{var t=``,n=null;do t+=Ne(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Fe=Object.prototype.hasOwnProperty,Ie=t.unstable_scheduleCallback,Le=t.unstable_cancelCallback,Re=t.unstable_shouldYield,ze=t.unstable_requestPaint,Be=t.unstable_now,Ve=t.unstable_getCurrentPriorityLevel,He=t.unstable_ImmediatePriority,Ue=t.unstable_UserBlockingPriority,We=t.unstable_NormalPriority,Ge=t.unstable_LowPriority,Ke=t.unstable_IdlePriority,qe=t.log,Je=t.unstable_setDisableYieldValue,Ye=null,Xe=null;function Ze(e){if(typeof qe==`function`&&Je(e),Xe&&typeof Xe.setStrictMode==`function`)try{Xe.setStrictMode(Ye,e)}catch{}}var Qe=Math.clz32?Math.clz32:tt,$e=Math.log,et=Math.LN2;function tt(e){return e>>>=0,e===0?32:31-($e(e)/et|0)|0}var nt=256,rt=262144,it=4194304;function at(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ot(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=at(n))):i=at(o):i=at(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=at(n))):i=at(o)):i=at(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function st(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function ct(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-Qe(n),i=1<<r;t|=e[r],n&=~i}return t}function lt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ut(){var e=it;return it<<=1,!(it&62914560)&&(it=4194304),e}function dt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ft(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function pt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Qe(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&mt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function mt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Qe(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ht(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Qe(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function gt(e,t){var n=t&-t;return n=n&42?1:_t(n),(n&(e.suspendedLanes|t))===0?n:0}function _t(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function vt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function yt(){var e=R.p;return e===0?(e=window.event,e===void 0?32:Th(e.type)):e}function bt(e,t){var n=R.p;try{return R.p=e,t()}finally{R.p=n}}var xt=Math.random().toString(36).slice(2),St=`__reactFiber$`+xt,z=`__reactProps$`+xt,Ct=`__reactContainer$`+xt,wt=`__reactEvents$`+xt,Tt=`__reactListeners$`+xt,Et=`__reactHandles$`+xt,Dt=`__reactResources$`+xt,Ot=`__reactMarker$`+xt,kt=`__reactLoad$`+xt;function At(e){delete e[St],delete e[z],delete e[Tt],delete e[Et]}function jt(e){var t;if(t=e[St])return t;for(var n=e.parentNode;n;){if(t=n[Ct]||n[St]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=gm(e);e!==null;){if(n=e[St])return n;e=gm(e)}return t}e=n,n=e.parentNode}return null}function Mt(e){if(e=e[St]||e[Ct]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Nt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Pt(e){var t=e[Dt];return t||=e[Dt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Ft(e){e[Ot]=!0}function B(e){e[kt]=void 0}var It=new Set,Lt={};function Rt(e,t){zt(e,t),zt(e+`Capture`,t)}function zt(e,t){for(Lt[e]=t,e=0;e<t.length;e++)It.add(t[e])}var Bt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Vt={},Ht={};function Ut(e){return Fe.call(Ht,e)?!0:Fe.call(Vt,e)?!1:Bt.test(e)?Ht[e]=!0:(Vt[e]=!0,!1)}var Wt=!1;function Gt(){var e=Wt;return Wt=!1,e}function Kt(e,t,n){if(Ut(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function qt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function Jt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function Yt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Xt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Zt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Qt(e){if(!e._valueTracker){var t=Xt(e)?`checked`:`value`;e._valueTracker=Zt(e,t,``+e[t])}}function $t(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Xt(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var en=/[\n"\\]/g;function tn(e){return e.replace(en,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function nn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Yt(t)):e.value!==``+Yt(t)&&(e.value=``+Yt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):an(e,Yt(n)):o===`number`&&e.value==t?an(e,Yt(e.value)):an(e,Yt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Yt(s):e.removeAttribute(`name`)}function rn(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Qt(e);return}n=n==null?``:``+Yt(n),t=t==null?n:``+Yt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Qt(e)}function an(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function on(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Yt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function sn(e,t,n){t!=null&&(t=``+Yt(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+Yt(n)}function cn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(pe(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Yt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Qt(e)}function ln(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var un=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function dn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||un.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function fn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,Wt=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(dn(e,a,r),Wt=!0)}else for(var o in t)t.hasOwnProperty(o)&&dn(e,o,t[o])}function pn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var mn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),hn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function gn(e){return hn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function _n(){}var vn=null;function yn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var bn=null,xn=null;function Sn(e){var t=Mt(e);if(t&&(e=t.stateNode)){var n=e[z]||null;a:switch(e=t.stateNode,t.type){case`input`:if(nn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+tn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[z]||null;if(!a)throw Error(i(90));nn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&$t(r)}break a;case`textarea`:sn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&on(e,!!n.multiple,t,!1)}}}var Cn=!1;function wn(e,t,n){if(Cn)return e(t,n);Cn=!0;try{return e(t)}finally{if(Cn=!1,(bn!==null||xn!==null)&&(Ud(),bn&&(t=bn,e=xn,xn=bn=null,Sn(t),e)))for(t=0;t<e.length;t++)Sn(e[t])}}function Tn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[z]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var En=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Dn=!1;if(En)try{var On={};Object.defineProperty(On,"passive",{get:function(){Dn=!0}}),window.addEventListener(`test`,On,On),window.removeEventListener(`test`,On,On)}catch{Dn=!1}var kn=null,An=null,jn=null;function Mn(){if(jn)return jn;var e,t=An,n=t.length,r,i=`value`in kn?kn.value:kn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return jn=i.slice(e,1<r?1-r:void 0)}function Nn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Pn(){return!0}function Fn(){return!1}function In(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Pn:Fn,this.isPropagationStopped=Fn,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Pn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Pn)},persist:function(){},isPersistent:Pn}),t}var Ln={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Rn=In(Ln),zn=D({},Ln,{view:0,detail:0}),Bn=In(zn),Vn,Hn,Un,Wn=D({},zn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:tr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Un&&(Un&&e.type===`mousemove`?(Vn=e.screenX-Un.screenX,Hn=e.screenY-Un.screenY):Hn=Vn=0,Un=e),Vn)},movementY:function(e){return`movementY`in e?e.movementY:Hn}}),Gn=In(Wn),Kn=In(D({},Wn,{dataTransfer:0})),qn=In(D({},zn,{relatedTarget:0})),Jn=In(D({},Ln,{animationName:0,elapsedTime:0,pseudoElement:0})),Yn=In(D({},Ln,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Xn=In(D({},Ln,{data:0})),Zn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Qn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},$n={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function er(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=$n[e])?!!t[e]:!1}function tr(){return er}var nr=In(D({},zn,{key:function(e){if(e.key){var t=Zn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Nn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Qn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:tr,charCode:function(e){return e.type===`keypress`?Nn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Nn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),rr=In(D({},Wn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),ir=In(D({},Ln,{submitter:0})),ar=In(D({},zn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:tr})),or=In(D({},Ln,{propertyName:0,elapsedTime:0,pseudoElement:0})),sr=In(D({},Wn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),cr=In(D({},Ln,{newState:0,oldState:0,source:0})),lr=[9,13,27,32],ur=En&&`CompositionEvent`in window,dr=null;En&&`documentMode`in document&&(dr=document.documentMode);var fr=En&&`TextEvent`in window&&!dr,pr=En&&(!ur||dr&&8<dr&&11>=dr),mr=` `,hr=!1;function gr(e,t){switch(e){case`keyup`:return lr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function _r(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var vr=!1;function yr(e,t){switch(e){case`compositionend`:return _r(t);case`keypress`:return t.which===32?(hr=!0,mr):null;case`textInput`:return e=t.data,e===mr&&hr?null:e;default:return null}}function br(e,t){if(vr)return e===`compositionend`||!ur&&gr(e,t)?(e=Mn(),jn=An=kn=null,vr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return pr&&t.locale!==`ko`?null:t.data;default:return null}}var xr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Sr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!xr[e.type]:t===`textarea`}function Cr(e,t,n,r){bn?xn?xn.push(r):xn=[r]:bn=r,t=Zf(t,`onChange`),0<t.length&&(n=new Rn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var wr=null,Tr=null;function Er(e){Wf(e,0)}function Dr(e){if($t(Nt(e)))return e}function Or(e,t){if(e===`change`)return t}var kr=!1;if(En){var Ar;if(En){var jr=`oninput`in document;if(!jr){var Mr=document.createElement(`div`);Mr.setAttribute(`oninput`,`return;`),jr=typeof Mr.oninput==`function`}Ar=jr}else Ar=!1;kr=Ar&&(!document.documentMode||9<document.documentMode)}function Nr(){wr&&(wr.detachEvent(`onpropertychange`,Pr),Tr=wr=null)}function Pr(e){if(e.propertyName===`value`&&Dr(Tr)){var t=[];Cr(t,Tr,e,yn(e)),wn(Er,t)}}function Fr(e,t,n){e===`focusin`?(Nr(),wr=t,Tr=n,wr.attachEvent(`onpropertychange`,Pr)):e===`focusout`&&Nr()}function Ir(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Dr(Tr)}function Lr(e,t){if(e===`click`)return Dr(t)}function Rr(e,t){if(e===`input`||e===`change`)return Dr(t)}function zr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Br=typeof Object.is==`function`?Object.is:zr;function Vr(e,t){if(Br(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Fe.call(t,i)||!Br(e[i],t[i]))return!1}return!0}function Hr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Ur(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Wr(e,t){var n=Ur(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Ur(n)}}function Gr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Gr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Kr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Hr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Hr(e.document)}return t}function qr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Jr=En&&`documentMode`in document&&11>=document.documentMode,Yr=null,Xr=null,Zr=null,Qr=!1;function $r(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Qr||Yr==null||Yr!==Hr(r)||(r=Yr,`selectionStart`in r&&qr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Zr&&Vr(Zr,r)||(Zr=r,r=Zf(Xr,`onSelect`),0<r.length&&(t=new Rn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Yr)))}function ei(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ti={animationend:ei(`Animation`,`AnimationEnd`),animationiteration:ei(`Animation`,`AnimationIteration`),animationstart:ei(`Animation`,`AnimationStart`),transitionrun:ei(`Transition`,`TransitionRun`),transitionstart:ei(`Transition`,`TransitionStart`),transitioncancel:ei(`Transition`,`TransitionCancel`),transitionend:ei(`Transition`,`TransitionEnd`)},ni={},ri={};En&&(ri=document.createElement(`div`).style,`AnimationEvent`in window||(delete ti.animationend.animation,delete ti.animationiteration.animation,delete ti.animationstart.animation),`TransitionEvent`in window||delete ti.transitionend.transition);function ii(e){if(ni[e])return ni[e];if(!ti[e])return e;var t=ti[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ri)return ni[e]=t[n];return e}var ai=ii(`animationend`),oi=ii(`animationiteration`),si=ii(`animationstart`),ci=ii(`transitionrun`),li=ii(`transitionstart`),ui=ii(`transitioncancel`),di=ii(`transitionend`),fi=new Map,pi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);pi.push(`scrollEnd`);function mi(e,t){fi.set(e,t),Rt(t,[e])}var hi=0;function gi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=wd.identifierPrefix;var n=hi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function _i(e){if(e==null||typeof e==`string`)return e;var t=null,n=Md;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function vi(e,t){return e=_i(e),t=_i(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var yi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},bi=[],xi=0,Si=0;function Ci(){for(var e=xi,t=Si=xi=0;t<e;){var n=bi[t];bi[t++]=null;var r=bi[t];bi[t++]=null;var i=bi[t];bi[t++]=null;var a=bi[t];if(bi[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Di(n,i,a)}}function wi(e,t,n,r){bi[xi++]=e,bi[xi++]=t,bi[xi++]=n,bi[xi++]=r,Si|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Ti(e,t,n,r){return wi(e,t,n,r),Oi(e)}function Ei(e,t){return wi(e,null,null,t),Oi(e)}function Di(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Qe(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Oi(e){if(50<Nd)throw Nd=0,Pd=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ki={};function Ai(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ji(e,t,n,r){return new Ai(e,t,n,r)}function Mi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ni(e,t){var n=e.alternate;return n===null?(n=ji(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Pi(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Fi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Mi(r)&&(s=1);else if(typeof r==`string`)s=Zm(e,n,be.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case ae:return e=ji(31,n,t,a),e.elementType=ae,e.lanes=o,e;case j:return Ii(n.children,a,o,t);case M:s=8,a|=24;break;case ee:return e=ji(12,n,t,a|2),e.elementType=ee,e.lanes=o,e;case ne:return e=ji(13,n,t,a),e.elementType=ne,e.lanes=o,e;case re:return e=ji(19,n,t,a),e.elementType=re,e.lanes=o,e;case oe:case ce:return e=a|32,e=ji(30,n,t,e),e.elementType=ce,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case P:s=10;break a;case N:s=9;break a;case te:s=11;break a;case F:s=14;break a;case ie:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ji(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Ii(e,t,n,r){return e=ji(7,e,r,t),e.lanes=n,e}function Li(e,t,n){return e=ji(6,e,null,t),e.lanes=n,e}function Ri(e){var t=ji(18,null,null,0);return t.stateNode=e,t}function zi(e,t,n){return t=ji(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Bi=new WeakMap;function Vi(e,t){if(typeof e==`object`&&e){var n=Bi.get(e);return n===void 0?(t={value:e,source:t,stack:Pe(t)},Bi.set(e,t),t):n}return{value:e,source:t,stack:Pe(t)}}var Hi=[],Ui=0,Wi=null,Gi=0,Ki=[],qi=0,Ji=null,Yi=1,Xi=``;function Zi(e,t){Hi[Ui++]=Gi,Hi[Ui++]=Wi,Wi=e,Gi=t}function Qi(e,t,n){Ki[qi++]=Yi,Ki[qi++]=Xi,Ki[qi++]=Ji,Ji=e;var r=Yi;e=Xi;var i=32-Qe(r)-1;r&=~(1<<i),n+=1;var a=32-Qe(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Yi=1<<32-Qe(t)+i|n<<i|r,Xi=a+e}else Yi=1<<a|n<<i|r,Xi=e}function $i(e){e.return!==null&&(Zi(e,1),Qi(e,1,0))}function ea(e){for(;e===Wi;)Wi=Hi[--Ui],Hi[Ui]=null,Gi=Hi[--Ui],Hi[Ui]=null;for(;e===Ji;)Ji=Ki[--qi],Ki[qi]=null,Xi=Ki[--qi],Ki[qi]=null,Yi=Ki[--qi],Ki[qi]=null}function ta(e,t){Ki[qi++]=Yi,Ki[qi++]=Xi,Ki[qi++]=Ji,Yi=t.id,Xi=t.overflow,Ji=e}var na=null,ra=null,V=!1,ia=null,aa=!1,oa=Error(i(519));function sa(e){throw pa(Vi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),oa}function ca(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[St]=e,t[z]=r,n){case`dialog`:Y(`cancel`,t),Y(`close`,t);break;case`iframe`:case`object`:case`embed`:Y(`load`,t);break;case`video`:case`audio`:for(n=0;n<Hf.length;n++)Y(Hf[n],t);break;case`source`:Y(`error`,t);break;case`img`:case`image`:case`link`:Y(`error`,t),Y(`load`,t);break;case`details`:Y(`toggle`,t);break;case`input`:Y(`invalid`,t),rn(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Y(`invalid`,t);break;case`textarea`:Y(`invalid`,t),cn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||rp(t.textContent,n)?(r.popover!=null&&(Y(`beforetoggle`,t),Y(`toggle`,t)),r.onScroll!=null&&Y(`scroll`,t),r.onScrollEnd!=null&&Y(`scrollend`,t),r.onClick!=null&&(t.onclick=_n),t=!0):t=!1,t||sa(e,!0)}function la(e){for(na=e.return;na;)switch(na.tag){case 5:case 31:case 13:aa=!1;return;case 27:case 3:aa=!0;return;default:na=na.return}}function ua(e){if(e!==na)return!1;if(!V)return la(e),V=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||_p(e.type,e.memoizedProps)),n=!n),n&&ra&&sa(e),la(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ra=hm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ra=hm(e)}else t===27?(t=ra,Ep(e.type)?(e=mm,mm=null,ra=e):ra=t):ra=na?pm(e.stateNode.nextSibling):null;return!0}function da(){ra=na=null,V=!1}function fa(){var e=ia;return e!==null&&(gd===null?gd=e:gd.push.apply(gd,e),ia=null),e}function pa(e){ia===null?ia=[e]:ia.push(e)}var ma=_e(null),ha=null,ga=null;function _a(e,t,n){ye(ma,t._currentValue),t._currentValue=n}function va(e){e._currentValue=ma.current,ve(ma)}function ya(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ba(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ya(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),ya(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),ya(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function xa(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Br(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Ce.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[dh]:e.push(dh))}a=a.return}return e!==null&&ba(t,e,n,r),t.flags|=262144,e!==null}function Sa(e){for(e=e.firstContext;e!==null;){if(!Br(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ca(e){ha=e,ga=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function wa(e){return Ea(ha,e)}function Ta(e,t){return ha===null&&Ca(e),Ea(e,t)}function Ea(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ga===null){if(e===null)throw Error(i(308));ga=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ga=ga.next=t;return n}var Da=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Oa=t.unstable_scheduleCallback,ka=t.unstable_NormalPriority,Aa={$$typeof:P,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ja(){return{controller:new Da,data:new Map,refCount:0}}function Ma(e){e.refCount--,e.refCount===0&&Oa(ka,function(){e.controller.abort()})}function Na(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Pa=null;function Fa(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Ia=null,La=0,Ra=0,za=null;function Ba(e,t){if(Ia===null){var n=Ia=[];La=0,Ra=Lf(),za={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return La++,t.then(Va,Va),t}function Va(){if(--La===0&&(Pa=null,Ia!==null)){za!==null&&(za.status=`fulfilled`);var e=Ia;Ia=null,Ra=0,za=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ha(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ua=L.S;L.S=function(e,t){if(yd=Be(),typeof t==`object`&&t&&typeof t.then==`function`&&Ba(e,t),Pa!==null)for(var n=wf;n!==null;)Na(n,Pa),n=n.next;if(n=e.types,n!==null){for(var r=wf;r!==null;)Na(r,n),r=r.next;if(Ra!==0){r=Pa,r===null&&(r=Pa=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Ua!==null&&Ua(e,t)};var Wa=_e(null);function Ga(){var e=Wa.current;return e===null?nd.pooledCache:e}function Ka(e,t){t===null?ye(Wa,Wa.current):ye(Wa,t.pool)}function qa(){var e=Ga();return e===null?null:{parent:Aa._currentValue,pool:e}}var Ja=Error(i(460)),Ya=Error(i(474)),Xa=Error(i(542)),Za={then:function(){}};function Qa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function $a(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(_n,_n),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ro(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(_n,_n);else{if(e=nd,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ro(e),e}throw to=t,Ja}}function eo(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(to=e,Ja):e}}var to=null;function no(){if(to===null)throw Error(i(459));var e=to;return to=null,e}function ro(e){if(e===Ja||e===Xa)throw Error(i(483))}var io=null,ao=0;function oo(e){var t=ao;return ao+=1,io===null&&(io=[]),$a(io,e,t)}function so(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function co(e,t){throw t.$$typeof===O?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function lo(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Ni(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Li(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===j?(e=d(e,t,n.props.children,r,n.key),so(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ie&&eo(i)===t.type)?(t=a(t,n.props),so(t,n),t.return=e,t):(t=Fi(n.type,n.key,n.props,null,e.mode,r),so(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=zi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Ii(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Li(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case k:return n=Fi(t.type,t.key,t.props,null,e.mode,n),so(n,t),n.return=e,n;case A:return t=zi(t,e.mode,n),t.return=e,t;case ie:return t=eo(t),f(e,t,n)}if(pe(t)||ue(t))return t=Ii(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,oo(t),n);if(t.$$typeof===P)return f(e,Ta(e,t),n);co(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case k:return n.key===i?l(e,t,n,r):null;case A:return n.key===i?u(e,t,n,r):null;case ie:return n=eo(n),p(e,t,n,r)}if(pe(n)||ue(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,oo(n),r);if(n.$$typeof===P)return p(e,t,Ta(e,n),r);co(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case k:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case A:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ie:return r=eo(r),m(e,t,n,r,i)}if(pe(r)||ue(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,oo(r),i);if(r.$$typeof===P)return m(e,t,n,Ta(t,r),i);co(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),V&&Zi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return V&&Zi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),V&&Zi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),V&&Zi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return V&&Zi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),V&&Zi(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===j&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case k:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===j){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),so(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ie&&eo(l)===r.type){n(e,r.sibling),c=a(r,o.props),so(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===j?(c=Ii(o.props.children,e.mode,c,o.key),so(c,o),c.return=e,e=c):(c=Fi(o.type,o.key,o.props,null,e.mode,c),so(c,o),c.return=e,e=c)}return s(e);case A:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=zi(o,e.mode,c),c.return=e,e=c}return s(e);case ie:return o=eo(o),_(e,r,o,c)}if(pe(o))return h(e,r,o,c);if(ue(o)){if(l=ue(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,oo(o),c);if(o.$$typeof===P)return _(e,r,Ta(e,o),c);co(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Li(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{ao=0;var i=_(e,t,n,r);return io=null,i}catch(t){if(t===Ja||t===Xa)throw t;var a=ji(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var uo=lo(!0),fo=lo(!1),po=!1;function mo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ho(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function go(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function _o(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,td&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Oi(e),Di(e,null,n),t}return wi(e,r,t,n),Oi(e)}function vo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ht(e,n)}}function yo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var bo=!1;function xo(){if(bo){var e=za;if(e!==null)throw e}}function So(e,t,n,r){bo=!1;var i=e.updateQueue;po=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(K&f)===f:(r&f)===f){f!==0&&f===Ra&&(bo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=D({},d,f);break a;case 2:po=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),ud|=o,e.lanes=o,e.memoizedState=d}}function Co(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function wo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Co(n[e],t)}var To=_e(null),Eo=_e(0);function Do(e,t){e=cd,ye(Eo,e),ye(To,t),cd=e|t.baseLanes}function Oo(){ye(Eo,cd),ye(To,To.current)}function ko(){cd=Eo.current,ve(To),ve(Eo)}var Ao=_e(null),jo=null;function Mo(e){var t=e.alternate;ye(Lo,Lo.current&1),ye(Ao,e),jo===null&&(t===null||To.current!==null||t.memoizedState!==null)&&(jo=e)}function No(e){ye(Lo,Lo.current),ye(Ao,e),jo===null&&(jo=e)}function Po(e){e.tag===22?(ye(Lo,Lo.current),ye(Ao,e),jo===null&&(jo=e)):Fo()}function Fo(){ye(Lo,Lo.current),ye(Ao,Ao.current)}function Io(e){ve(Ao),jo===e&&(jo=null),ve(Lo)}var Lo=_e(0);function Ro(e,t){ye(Ao,Ao.current),ye(Lo,t)}function zo(e){ve(Lo),ve(Ao),jo===e&&(jo=null)}function Bo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||um(n)||dm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Vo=0,H=null,Ho=null,Uo=null,Wo=!1,Go=!1,Ko=!1,qo=0,Jo=0,Yo=null,Xo=0;function Zo(){throw Error(i(321))}function Qo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Br(e[n],t[n]))return!1;return!0}function $o(e,t,n,r,i,a){return Vo=a,H=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,L.H=e===null||e.memoizedState===null?mc:hc,Ko=!1,a=n(r,i),Ko=!1,Go&&(a=ts(t,n,r,i)),es(e),a}function es(e){L.H=pc;var t=Ho!==null&&Ho.next!==null;if(Vo=0,Uo=Ho=H=null,Wo=!1,Jo=0,Yo=null,t)throw Error(i(300));e===null||Mc||(e=e.dependencies,e!==null&&Sa(e)&&(Mc=!0))}function ts(e,t,n,r){H=e;var a=0;do{if(Go&&(Yo=null),Jo=0,Go=!1,25<=a)throw Error(i(301));if(a+=1,Uo=Ho=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}L.H=gc,o=t(n,r)}while(Go);return o}function ns(){var e=L.H,t=e.useState()[0];return t=typeof t.then==`function`?ls(t):t,e=e.useState()[0],(Ho===null?null:Ho.memoizedState)!==e&&(H.flags|=1024),t}function rs(){var e=qo!==0;return qo=0,e}function is(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function as(e){if(Wo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Wo=!1}Vo=0,Uo=Ho=H=null,Go=!1,Jo=qo=0,Yo=null}function os(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Uo===null?H.memoizedState=Uo=e:Uo=Uo.next=e,Uo}function ss(){if(Ho===null){var e=H.alternate;e=e===null?null:e.memoizedState}else e=Ho.next;var t=Uo===null?H.memoizedState:Uo.next;if(t!==null)Uo=t,Ho=e;else{if(e===null)throw H.alternate===null?Error(i(467)):Error(i(310));Ho=e,e={memoizedState:Ho.memoizedState,baseState:Ho.baseState,baseQueue:Ho.baseQueue,queue:Ho.queue,next:null},Uo===null?H.memoizedState=Uo=e:Uo=Uo.next=e}return Uo}function cs(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ls(e){var t=Jo;return Jo+=1,Yo===null&&(Yo=[]),e=$a(Yo,e,t),t=H,(Uo===null?t.memoizedState:Uo.next)===null&&(t=t.alternate,L.H=t===null||t.memoizedState===null?mc:hc),e}function U(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return ls(e);if(e.$$typeof===I)return;if(e.$$typeof===P)return wa(e)}throw Error(i(438,String(e)))}function us(e){var t=null,n=H.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=H.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=cs(),H.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=se;return t.index++,n}function ds(e,t){return typeof t==`function`?t(e):t}function fs(e){return ps(ss(),Ho,e)}function ps(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Vo&f)===f:(K&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Ra&&(d=!0);else if((Vo&p)===p){u=u.next,p===Ra&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,H.lanes|=p,ud|=p;f=u.action,Ko&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,H.lanes|=f,ud|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Br(o,e.memoizedState)&&(Mc=!0,d&&(n=za,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function ms(e){var t=ss(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Br(o,t.memoizedState)||(Mc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function hs(e,t,n){var r=H,a=ss(),o=V;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Br((Ho||a).memoizedState,n);if(s&&(a.memoizedState=n,Mc=!0),a=a.queue,Bs(vs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Uo!==null&&!!(Uo.memoizedState.tag&1),Fs(e?9:8,{destroy:void 0},_s.bind(null,r,a,n,t),null),e){if(r.flags|=2048,nd===null)throw Error(i(349));o||Vo&127||gs(r,t,n)}return n}function gs(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=H.updateQueue,t===null?(t=cs(),H.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function _s(e,t,n,r){t.value=n,t.getSnapshot=r,ys(t)&&bs(e)}function vs(e,t,n){return n(function(){ys(t)&&bs(e)})}function ys(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Br(e,n)}catch{return!0}}function bs(e){var t=Ei(e,2);t!==null&&Rd(t,e,2)}function xs(e){var t=os();if(typeof e==`function`){var n=e;if(e=n(),Ko){Ze(!0);try{n()}finally{Ze(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ds,lastRenderedState:e},t}function Ss(e,t,n,r){return e.baseState=n,ps(e,Ho,typeof r==`function`?r:ds)}function Cs(e,t,n,r,a){if(dc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};L.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,ws(t,o)):(o.next=n.next,t.pending=n.next=o)}}function ws(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=L.T,o={};o.types=a===null?null:a.types,L.T=o;try{var s=n(i,r),c=L.S;c!==null&&c(o,s),Ts(e,t,s)}catch(n){Ds(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),L.T=a}}else try{a=n(i,r),Ts(e,t,a)}catch(n){Ds(e,t,n)}}function Ts(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Es(e,t,n)},function(n){return Ds(e,t,n)}):Es(e,t,n)}function Es(e,t,n){t.status=`fulfilled`,t.value=n,Os(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,ws(e,n)))}function Ds(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Os(t),t=t.next;while(t!==r)}e.action=null}function Os(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ks(e,t){return t}function As(e,t){if(V){var n=nd.formState;if(n!==null){a:{var r=H;if(V){if(ra){b:{for(var i=ra,a=aa;i.nodeType!==8;)if(!a||(i=pm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){ra=pm(i.nextSibling),r=i.data===`F!`;break a}}sa(r)}r=!1}r&&(t=n[0])}}return n=os(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ks,lastRenderedState:t},n.queue=r,n=cc.bind(null,H,r),r.dispatch=n,r=xs(!1),a=uc.bind(null,H,!1,r.queue),r=os(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Cs.bind(null,H,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function js(e){return Ms(ss(),Ho,e)}function Ms(e,t,n){if(t=ps(e,t,ks)[0],e=fs(ds)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=ls(t)}catch(e){throw e===Ja?Xa:e}else r=t;t=ss();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(H.flags|=2048,Fs(9,{destroy:void 0},Ns.bind(null,i,n),null)),[r,a,e]}function Ns(e,t){e.action=t}function Ps(e){var t=ss(),n=Ho;if(n!==null)return Ms(t,n,e);ss(),t=t.memoizedState,n=ss();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Fs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=H.updateQueue,t===null&&(t=cs(),H.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Is(){return ss().memoizedState}function Ls(e,t,n,r){var i=os();H.flags|=e,i.memoizedState=Fs(1|t,{destroy:void 0},n,r===void 0?null:r)}function Rs(e,t,n,r){var i=ss();r=r===void 0?null:r;var a=i.memoizedState.inst;Ho!==null&&r!==null&&Qo(r,Ho.memoizedState.deps)?i.memoizedState=Fs(t,a,n,r):(H.flags|=e,i.memoizedState=Fs(1|t,a,n,r))}function zs(e,t){Ls(8390656,8,e,t)}function Bs(e,t){Rs(2048,8,e,t)}function Vs(e){H.flags|=4;var t=H.updateQueue;if(t===null)t=cs(),H.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Hs(e){var t=ss().memoizedState;return Vs({ref:t,nextImpl:e}),function(){if(td&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Us(e,t){return Rs(4,2,e,t)}function Ws(e,t){return Rs(4,4,e,t)}function Gs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ks(e,t,n){n=n==null?null:n.concat([e]),Rs(4,4,Gs.bind(null,t,e),n)}function qs(){}function Js(e,t){var n=ss();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Qo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ys(e,t){var n=ss();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Qo(t,r[1]))return r[0];if(r=e(),Ko){Ze(!0);try{e()}finally{Ze(!1)}}return n.memoizedState=[r,t],r}function Xs(e,t,n){return n===void 0||Vo&1073741824&&!(K&261930)?e.memoizedState=t:(e.memoizedState=n,e=Id(),H.lanes|=e,ud|=e,n)}function Zs(e,t,n,r){return Br(n,t)?n:To.current===null?!(Vo&106)||Vo&1073741824&&!(K&261930)?(Mc=!0,e.memoizedState=n):(e=Id(),H.lanes|=e,ud|=e,t):(e=Xs(e,n,r),Br(e,t)||(Mc=!0),e)}function Qs(e,t,n,r,i){var a=R.p;R.p=a!==0&&8>a?a:8;var o=L.T,s={};s.types=o===null?null:o.types,L.T=s,uc(e,!1,t,n);try{var c=i(),l=L.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?lc(e,t,Ha(c,r),Fd(e)):lc(e,t,r,Fd(e))}catch(n){lc(e,t,{then:function(){},status:`rejected`,reason:n},Fd())}finally{R.p=a,o!==null&&s.types!==null&&(o.types=s.types),L.T=o}}function $s(){}function ec(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=tc(e).queue;Qs(e,a,t,me,n===null?$s:function(){return nc(e),n(r)})}function tc(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:me,baseState:me,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ds,lastRenderedState:me},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ds,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function nc(e){var t=tc(e);t.next===null&&(t=e.alternate.memoizedState),lc(e,t.next.queue,{},Fd())}function rc(){return wa(dh)}function ic(){return ss().memoizedState}function ac(){return ss().memoizedState}function oc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Fd();e=go(n);var r=_o(t,e,n);r!==null&&(Rd(r,t,n),vo(r,t,n)),t={cache:ja()},e.payload=t;return}t=t.return}}function sc(e,t,n){var r=Fd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},dc(e)?fc(t,n):(n=Ti(e,t,n,r),n!==null&&(Rd(n,e,r),W(n,t,r)))}function cc(e,t,n){lc(e,t,n,Fd())}function lc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(dc(e))fc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Br(s,o))return wi(e,t,i,0),nd===null&&Ci(),!1}catch{}if(n=Ti(e,t,i,r),n!==null)return Rd(n,e,r),W(n,t,r),!0}return!1}function uc(e,t,n,r){if(r={lane:2,revertLane:Lf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},dc(e)){if(t)throw Error(i(479))}else t=Ti(e,n,r,2),t!==null&&Rd(t,e,2)}function dc(e){var t=e.alternate;return e===H||t!==null&&t===H}function fc(e,t){Go=Wo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function W(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ht(e,n)}}var pc={readContext:wa,use:U,useCallback:Zo,useContext:Zo,useEffect:Zo,useImperativeHandle:Zo,useLayoutEffect:Zo,useInsertionEffect:Zo,useMemo:Zo,useReducer:Zo,useRef:Zo,useState:Zo,useDebugValue:Zo,useDeferredValue:Zo,useTransition:Zo,useSyncExternalStore:Zo,useId:Zo,useHostTransitionStatus:Zo,useFormState:Zo,useActionState:Zo,useOptimistic:Zo,useMemoCache:Zo,useCacheRefresh:Zo,useEffectEvent:Zo},mc={readContext:wa,use:U,useCallback:function(e,t){return os().memoizedState=[e,t===void 0?null:t],e},useContext:wa,useEffect:zs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Ls(4194308,4,Gs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ls(4194308,4,e,t)},useInsertionEffect:function(e,t){Ls(4,2,e,t)},useMemo:function(e,t){var n=os();t=t===void 0?null:t;var r=e();if(Ko){Ze(!0);try{e()}finally{Ze(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=os();if(n!==void 0){var i=n(t);if(Ko){Ze(!0);try{n(t)}finally{Ze(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=sc.bind(null,H,e),[r.memoizedState,e]},useRef:function(e){var t=os();return e={current:e},t.memoizedState=e},useState:function(e){e=xs(e);var t=e.queue,n=cc.bind(null,H,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:qs,useDeferredValue:function(e,t){return Xs(os(),e,t)},useTransition:function(){var e=xs(!1);return e=Qs.bind(null,H,e.queue,!0,!1),os().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=H,a=os();if(V){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),nd===null)throw Error(i(349));K&127||gs(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,zs(vs.bind(null,r,o,e),[e]),r.flags|=2048,Fs(9,{destroy:void 0},_s.bind(null,r,o,n,t),null),n},useId:function(){var e=os(),t=nd.identifierPrefix;if(V){var n=Xi,r=Yi;n=(r&~(1<<32-Qe(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=qo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Xo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:rc,useFormState:As,useActionState:As,useOptimistic:function(e){var t=os();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=uc.bind(null,H,!0,n),n.dispatch=t,[e,t]},useMemoCache:us,useCacheRefresh:function(){return os().memoizedState=oc.bind(null,H)},useEffectEvent:function(e){var t=os(),n={impl:e};return t.memoizedState=n,function(){if(td&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},hc={readContext:wa,use:U,useCallback:Js,useContext:wa,useEffect:Bs,useImperativeHandle:Ks,useInsertionEffect:Us,useLayoutEffect:Ws,useMemo:Ys,useReducer:fs,useRef:Is,useState:function(){return fs(ds)},useDebugValue:qs,useDeferredValue:function(e,t){return Zs(ss(),Ho.memoizedState,e,t)},useTransition:function(){var e=fs(ds)[0],t=ss().memoizedState;return[typeof e==`boolean`?e:ls(e),t]},useSyncExternalStore:hs,useId:ic,useHostTransitionStatus:rc,useFormState:js,useActionState:js,useOptimistic:function(e,t){return Ss(ss(),Ho,e,t)},useMemoCache:us,useCacheRefresh:ac,useEffectEvent:Hs},gc={readContext:wa,use:U,useCallback:Js,useContext:wa,useEffect:Bs,useImperativeHandle:Ks,useInsertionEffect:Us,useLayoutEffect:Ws,useMemo:Ys,useReducer:ms,useRef:Is,useState:function(){return ms(ds)},useDebugValue:qs,useDeferredValue:function(e,t){var n=ss();return Ho===null?Xs(n,e,t):Zs(n,Ho.memoizedState,e,t)},useTransition:function(){var e=ms(ds)[0],t=ss().memoizedState;return[typeof e==`boolean`?e:ls(e),t]},useSyncExternalStore:hs,useId:ic,useHostTransitionStatus:rc,useFormState:Ps,useActionState:Ps,useOptimistic:function(e,t){var n=ss();return Ho===null?(n.baseState=e,[e,n.queue.dispatch]):Ss(n,Ho,e,t)},useMemoCache:us,useCacheRefresh:ac,useEffectEvent:Hs};function _c(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var vc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Fd(),i=go(r);i.payload=t,n!=null&&(i.callback=n),t=_o(e,i,r),t!==null&&(Rd(t,e,r),vo(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Fd(),i=go(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=_o(e,i,r),t!==null&&(Rd(t,e,r),vo(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Fd(),r=go(n);r.tag=2,t!=null&&(r.callback=t),t=_o(e,r,n),t!==null&&(Rd(t,e,n),vo(t,e,n))}};function yc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Vr(n,r)||!Vr(i,a):!0}function bc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&vc.enqueueReplaceState(t,t.state,null)}function xc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=D({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Sc(e){yi(e)}function Cc(e){console.error(e)}function wc(e){yi(e)}function Tc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ec(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Dc(e,t,n){return n=go(n),n.tag=3,n.payload={element:null},n.callback=function(){Tc(e,t)},n}function Oc(e){return e=go(e),e.tag=3,e}function kc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ec(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ec(t,n,r),typeof i!=`function`&&(Sd===null?Sd=new Set([this]):Sd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Ac(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&xa(t,n,a,!0),n=Ao.current,n!==null){switch(n.tag){case 31:case 13:case 19:return jo===null?Xd():n.alternate===null&&ld===0&&(ld=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Za?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),vf(e,r,a)),!1;case 22:return n.flags|=65536,r===Za?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),vf(e,r,a)),!1}throw Error(i(435,n.tag))}return vf(e,r,a),Xd(),!1}if(V)return t=Ao.current,t===null?(r!==oa&&(t=Error(i(423),{cause:r}),pa(Vi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Vi(r,n),a=Dc(e.stateNode,r,a),yo(e,a),ld!==4&&(ld=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==oa&&(e=Error(i(422),{cause:r}),pa(Vi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Vi(o,n),hd===null?hd=[o]:hd.push(o),ld!==4&&(ld=2),t===null)return!0;r=Vi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Dc(n.stateNode,r,e),yo(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(Sd===null||!Sd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Oc(a),kc(a,e,n,r),yo(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var jc=Error(i(461)),Mc=!1;function Nc(e,t,n,r){t.child=e===null?fo(t,null,n,r):uo(t,e.child,n,r)}function Pc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Ca(t),r=$o(e,t,n,o,a,i),s=rs(),e!==null&&!Mc?(is(e,t,i),cl(e,t,i)):(V&&s&&$i(t),t.flags|=1,Nc(e,t,r,i),t.child)}function Fc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Mi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Ic(e,t,a,r,i)):(e=Fi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!ll(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Vr:n,n(o,r)&&e.ref===t.ref)return cl(e,t,i)}return t.flags|=1,e=Ni(a,r),e.ref=t.ref,e.return=t,t.child=e}function Ic(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Vr(a,r)&&e.ref===t.ref){if(Mc=!1,t.pendingProps=r=a,ll(e,i))e.flags&131072&&(Mc=!0);else return t.lanes=e.lanes,cl(e,t,i)}}return Wc(e,t,n,r,i)}function Lc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return zc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ka(t,a===null?null:a.cachePool),a===null?Oo():Do(t,a),Po(t);else return r=t.lanes=536870912,zc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ka(t,null),Oo(),Fo()):(Ka(t,a.cachePool),Do(t,a),Fo(),t.memoizedState=null);return Nc(e,t,i,n),t.child}function Rc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function zc(e,t,n,r,i){var a=Ga();return a=a===null?null:{parent:Aa._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ka(t,null),Oo(),Po(t),e!==null&&xa(e,t,r,!0),t.childLanes=i,null}function Bc(e,t){return t=$c({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Vc(e,t,n){return uo(t,e.child,null,n),e=Bc(t,t.pendingProps),e.flags|=2,Io(t),t.memoizedState=null,e}function Hc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(V){if(r.mode===`hidden`)return e=Bc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Rc(null,e);if(No(t),(e=ra)?(e=lm(e,aa),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ji===null?null:{id:Yi,overflow:Xi},retryLane:536870912,hydrationErrors:null},n=Ri(e),n.return=t,t.child=n,na=t,ra=null)):e=null,e===null)throw sa(t);return t.lanes=536870912,null}return Bc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(No(t),a){if(t.flags&256)t.flags&=-257,t=Vc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Mc||xa(e,t,n,!1),a=(n&e.childLanes)!==0,Mc||a){if(To.current===null){if(r=nd,r!==null&&(s=gt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Ei(e,s),Rd(r,e,s),jc;Xd()}t=Vc(e,t,n)}else e=o.treeContext,ra=pm(s.nextSibling),na=t,V=!0,ia=null,aa=!1,e!==null&&ta(t,e),t=Bc(t,r),t.flags|=134221824;return t}return e=Ni(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Uc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Wc(e,t,n,r,i){return Ca(t),n=$o(e,t,n,r,void 0,i),r=rs(),e!==null&&!Mc?(is(e,t,i),cl(e,t,i)):(V&&r&&$i(t),t.flags|=1,Nc(e,t,n,i),t.child)}function Gc(e,t,n,r,i,a){return Ca(t),t.updateQueue=null,n=ts(t,r,n,i),es(e),r=rs(),e!==null&&!Mc?(is(e,t,a),cl(e,t,a)):(V&&r&&$i(t),t.flags|=1,Nc(e,t,n,a),t.child)}function Kc(e,t,n,r,i){if(Ca(t),t.stateNode===null){var a=ki,o=n.contextType;typeof o==`object`&&o&&(a=wa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=vc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},mo(t),o=n.contextType,a.context=typeof o==`object`&&o?wa(o):ki,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(_c(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&vc.enqueueReplaceState(a,a.state,null),So(t,r,a,i),xo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=xc(n,s);a.props=c;var l=a.context,u=n.contextType;o=ki,typeof u==`object`&&u&&(o=wa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&bc(t,a,r,o),po=!1;var f=t.memoizedState;a.state=f,So(t,r,a,i),xo(),l=t.memoizedState,s||f!==l||po?(typeof d==`function`&&(_c(t,n,d,r),l=t.memoizedState),(c=po||yc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,ho(e,t),o=t.memoizedProps,u=xc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ki,typeof l==`object`&&l&&(c=wa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&bc(t,a,r,c),po=!1,f=t.memoizedState,a.state=f,So(t,r,a,i),xo();var p=t.memoizedState;o!==d||f!==p||po||e!==null&&e.dependencies!==null&&Sa(e.dependencies)?(typeof s==`function`&&(_c(t,n,s,r),p=t.memoizedState),(u=po||yc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Sa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Uc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=uo(t,e.child,null,i),t.child=uo(t,null,n,i)):Nc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=cl(e,t,i),e}function qc(e,t,n,r){return da(),t.flags|=256,Nc(e,t,n,r),t.child}var Jc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yc(e){return{baseLanes:e,cachePool:qa()}}function Xc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=pd),e}function Zc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Lo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(V){if(i?Mo(t):Fo(),(e=ra)?(e=lm(e,aa),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ji===null?null:{id:Yi,overflow:Xi},retryLane:536870912,hydrationErrors:null},n=Ri(e),n.return=t,t.child=n,na=t,ra=null)):e=null,e===null)throw sa(t);return t.lanes=dm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Fo(),i=t.mode,a=$c({mode:`hidden`,children:a},i),r=Ii(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Yc(n),r.childLanes=Xc(e,o,n),t.memoizedState=Jc,Rc(null,r)):(Mo(t),Qc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return tl(e,t,a,o,r,c,s,n)}return i?(Fo(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Ni(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Ii(i,a,n,null),i.flags|=2):i=Ni(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Rc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Yc(n):(a=i.cachePool,a===null?a=qa():(s=Aa._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Xc(e,o,n),t.memoizedState=Jc,Rc(e.child,r)):(Mo(t),n=e.child,e=n.sibling,n=Ni(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Qc(e,t){return t=$c({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function $c(e,t){return e=ji(22,e,null,t),e.lanes=0,e}function el(e,t,n){return uo(t,e.child,null,n),e=Qc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function tl(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(Mo(t),t.flags&=-257,el(e,t,c)):t.memoizedState===null?(Fo(),o=a.fallback,s=t.mode,a=$c({mode:`visible`,children:a.children},s),o=Ii(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,uo(t,e.child,null,c),a=t.child,a.memoizedState=Yc(c),a.childLanes=Xc(e,r,c),t.memoizedState=Jc,Rc(null,a)):(Fo(),t.child=e.child,t.flags|=128,null);if(Mo(t),dm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,pa({value:a,source:null,stack:null})),el(e,t,c)}if(Mc||xa(e,t,c,!1),r=(c&e.childLanes)!==0,Mc||r){if(To.current!==null)return el(e,t,c);if(r=nd,r!==null&&(a=gt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Ei(e,a),Rd(r,e,a),jc;return um(o)||Xd(),el(e,t,c)}return um(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,ra=pm(o.nextSibling),na=t,V=!0,ia=null,aa=!1,e!==null&&ta(t,e),t=Qc(t,a.children),t.flags|=134221824,t)}function nl(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ya(e.return,t,n)}function rl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Bo(n)===null&&(t=e),e=e.sibling}return t}function il(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function al(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function ol(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Lo.current;if(t.flags&128)return Ro(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Ro(t,o),i===`backwards`&&e!==null?(al(e),Nc(e,t,r,n),al(e)):Nc(e,t,r,n),r=V?Gi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&nl(e,n,t);else if(e.tag===19)nl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=rl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,al(t)),il(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Bo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}il(t,!0,n,null,a,r);break;case`together`:il(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=rl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),il(t,!1,i,n,a,r)}return t.child}function sl(e,t,n){var r=t.pendingProps;return _a(t,t.type,r.value),Nc(e,t,r.children,n),t.child}function cl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),ud|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(xa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Ni(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ni(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ll(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&Sa(e)))}function ul(e,t,n){switch(t.tag){case 3:we(t,t.stateNode.containerInfo),_a(t,Aa,e.memoizedState.cache),da();break;case 27:case 5:Ee(t);break;case 4:we(t,t.stateNode.containerInfo);break;case 10:_a(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,No(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return Mo(t),t.flags|=128,null;r=xa(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Zc(e,t,n):(Mo(t),e=cl(e,t,n),e===null?null:e.sibling)}Mo(t);break;case 19:if(t.flags&128)return ol(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(xa(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return ol(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Ro(t,Lo.current),r)break;return null;case 22:return t.lanes=0,Lc(e,t,n,t.pendingProps);case 24:_a(t,Aa,e.memoizedState.cache)}return cl(e,t,n)}function dl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Mc=!0;else{if(!ll(e,n)&&!(t.flags&128))return Mc=!1,ul(e,t,n);Mc=!!(e.flags&131072)}}else Mc=!1,V&&t.flags&1048576&&Qi(t,Gi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=eo(t.elementType),t.type=e,typeof e==`function`)Mi(e)?(r=xc(e,r),t.tag=1,t=Kc(null,t,e,r,n)):(t.tag=0,t=Wc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===te){t.tag=11,t=Pc(null,t,e,r,n);break a}if(a===F){t.tag=14,t=Fc(null,t,e,r,n);break a}if(a===P){t.tag=10,t.type=e,t=sl(null,t,n);break a}}throw t=fe(e)||e,Error(i(306,t,``))}}return t;case 0:return Wc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=xc(r,t.pendingProps),Kc(e,t,r,a,n);case 3:a:{if(we(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,ho(e,t),So(t,r,null,n);var s=t.memoizedState;if(r=s.cache,_a(t,Aa,r),r!==o.cache&&ba(t,[Aa],n,!0),xo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=qc(e,t,r,n);break a}if(r!==a){a=Vi(Error(i(424)),t),pa(a),t=qc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(ra=pm(e.firstChild),na=t,V=!0,ia=null,aa=!0,n=fo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(da(),r===a){t=cl(e,t,n);break a}Nc(e,t,r,n)}t=t.child}return t;case 26:return Uc(e,t),e===null?(n=Lm(t.type,null,t.pendingProps,null))?t.memoizedState=n:V||(t.stateNode=gp(t.type,t.pendingProps,Se.current,t)):t.memoizedState=Lm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Ee(t),e===null&&V&&(r=t.stateNode=ym(t.type,t.pendingProps,Se.current),na=t,aa=!0,a=ra,Ep(t.type)?(mm=a,ra=pm(r.firstChild)):ra=a),Nc(e,t,t.pendingProps.children,n),Uc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&V&&((a=r=ra)&&(r=sm(r,t.type,t.pendingProps,aa),r===null?a=!1:(t.stateNode=r,na=t,ra=pm(r.firstChild),aa=!1,a=!0)),a||sa(t)),Ee(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,_p(a,o)?r=null:s!==null&&_p(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=$o(e,t,ns,null,null,n),dh._currentValue=a),Uc(e,t),Nc(e,t,r,n),t.child;case 6:return e===null&&V&&((e=n=ra)&&(n=cm(n,t.pendingProps,aa),n===null?e=!1:(t.stateNode=n,na=t,ra=null,e=!0)),e||sa(t)),null;case 13:return Zc(e,t,n);case 4:return we(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=uo(t,null,r,n):Nc(e,t,r,n),t.child;case 11:return Pc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Uc(e,t),Nc(e,t,r,n),t.child;case 8:return Nc(e,t,t.pendingProps.children,n),t.child;case 12:return Nc(e,t,t.pendingProps.children,n),t.child;case 10:return sl(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,Ca(t),a=wa(a),r=r(a),t.flags|=1,Nc(e,t,r,n),t.child;case 14:return Fc(e,t,t.type,t.pendingProps,n);case 15:return Ic(e,t,t.type,t.pendingProps,n);case 19:return ol(e,t,n);case 31:return Hc(e,t,n);case 22:return Lc(e,t,n,t.pendingProps);case 24:return Ca(t),r=wa(Aa),e===null?(a=Ga(),a===null&&(a=nd,o=ja(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},mo(t),_a(t,Aa,a)):((e.lanes&n)!==0&&(ho(e,t),So(t,null,null,n),xo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,_a(t,Aa,r),r!==a.cache&&ba(t,[Aa],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),_a(t,Aa,r))),Nc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:V&&$i(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Uc(e,t),Nc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function fl(e){e.flags|=4}function pl(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Qm(t,r):Qm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(qd())e.flags|=8192;else throw to=Za,Ya}}else e.flags&=-16777217}function ml(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!$m(t)){if(qd())e.flags|=8192;else throw to=Za,Ya}}function hl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:ut(),e.lanes|=t,md|=t)}function gl(e,t){if(!V)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function _l(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function vl(e,t,n){var r=t.pendingProps;switch(ea(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return _l(t),null;case 1:return _l(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),va(Aa),Te(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(ua(t)?fl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,fa())),_l(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(fl(t),o===null?(_l(t),pl(t,a,null,r,n)):(_l(t),ml(t,o))):o?o===e.memoizedState?(_l(t),t.flags&=-16777217):(fl(t),_l(t),ml(t,o)):(e=e.memoizedProps,e!==r&&fl(t),_l(t),pl(t,a,e,r,n)),null;case 27:if(De(t),n=Se.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&fl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return _l(t),t.subtreeFlags&=-33554433,null}e=be.current,ua(t)?ca(t,e):(e=ym(a,r,n),t.stateNode=e,fl(t))}return _l(t),t.subtreeFlags&=-33554433,null;case 5:if(De(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&fl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return _l(t),t.subtreeFlags&=-33554433,null}if(o=be.current,ua(t))ca(t,o);else{var s=pp(Se.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[St]=t,o[z]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(op(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&fl(t)}}return _l(t),t.subtreeFlags&=-33554433,pl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&fl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=Se.current,ua(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=na,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[St]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||rp(e.nodeValue,n)),e||sa(t,!0)}else e=pp(e).createTextNode(r),e[St]=t,t.stateNode=e}return _l(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=ua(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[St]=t}else da(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;_l(t),e=!1}else n=fa(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Io(t),t):(Io(t),null);if(t.flags&128)throw Error(i(558))}return _l(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=ua(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[St]=t}else da(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;_l(t),a=!1}else a=fa(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Io(t),t):(Io(t),null)}return Io(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),hl(t,t.updateQueue),_l(t),null);case 4:return Te(),e===null&&qf(t.stateNode.containerInfo),t.flags|=67108864,_l(t),null;case 10:return va(t.type),_l(t),null;case 19:if(zo(t),r=t.memoizedState,r===null)return _l(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)gl(r,!1);else{if(ld!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Bo(e),o!==null){for(t.flags|=128,gl(r,!1),e=o.updateQueue,t.updateQueue=e,hl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Pi(n,e),n=n.sibling;return Ro(t,Lo.current&1|2),V&&Zi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Be()>bd&&(t.flags|=128,a=!0,gl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Bo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,hl(t,e),gl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!V)return _l(t),null}else 2*Be()-r.renderingStartTime>bd&&n!==536870912&&(t.flags|=128,a=!0,gl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Be(),e.sibling=null,o=Lo.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||V?Ro(t,o):(n=o,ye(Ao,t),ye(Lo,n),jo===null&&(jo=t)),V&&Zi(t,r.treeForkCount),e}return _l(t),null;case 22:case 23:return Io(t),ko(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(_l(t),t.subtreeFlags&6&&(t.flags|=8192)):_l(t),n=t.updateQueue,n!==null&&hl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&ve(Wa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),va(Aa),_l(t),null;case 25:return null;case 30:return t.flags|=33554432,_l(t),null}throw Error(i(156,t.tag))}function yl(e,t){switch(ea(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return va(Aa),Te(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return De(t),null;case 31:if(t.memoizedState!==null){if(Io(t),t.alternate===null)throw Error(i(340));da()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Io(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));da()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return zo(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Te(),null;case 10:return va(t.type),null;case 22:case 23:return Io(t),ko(),e!==null&&ve(Wa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return va(Aa),null;case 25:return null;default:return null}}function bl(e,t){switch(ea(t),t.tag){case 3:va(Aa),Te();break;case 26:case 27:case 5:De(t);break;case 4:Te();break;case 31:t.memoizedState!==null&&Io(t);break;case 13:Io(t);break;case 19:zo(t);break;case 10:va(t.type);break;case 22:case 23:Io(t),ko(),e!==null&&ve(Wa);break;case 24:va(Aa)}}function xl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){q(t,t.return,e)}}function Sl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){q(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){q(t,t.return,e)}}function Cl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{wo(t,n)}catch(t){q(e,e.return,t)}}}function wl(e,t,n){n.props=xc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){q(e,t,n)}}function Tl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=gi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Rp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new zp(e);m(e.child,!1,nm,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){q(e,t,n)}}function El(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){q(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){q(e,t,n)}else n.current=null}}function Dl(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)im(e.stateNode,t[n])}function Ol(e){for(var t=e.return;t!==null&&(jl(t)&&im(e.stateNode,t.stateNode),!Al(t));)t=t.return}function kl(e){for(var t=e.return;t!==null&&(jl(t)&&am(e.stateNode,t.stateNode),!Al(t));)t=t.return}function Al(e){return e.tag===5||e.tag===3||e.tag===27}function jl(e){return e&&e.tag===7&&e.stateNode!==null}function Ml(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){q(e,e.return,t)}}function Nl(e,t,n){try{var r=e.stateNode;cp(r,e.type,n,t),r[z]=t}catch(t){q(e,e.return,t)}}function Pl(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ep(e.type)||e.tag===4}function Fl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Pl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ep(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Il(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=_n)),Dl(e,r),Wt=!0;else if(i!==4&&(i===27&&(Dl(e,r),r=null,Ep(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Il(e,t,n,r),e=e.sibling;e!==null;)Il(e,t,n,r),e=e.sibling}function Ll(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Dl(e,r),Wt=!0;else if(i!==4&&(i===27&&(Dl(e,r),r=null,Ep(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Ll(e,t,n,r),e=e.sibling;e!==null;)Ll(e,t,n,r),e=e.sibling}function Rl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);op(t,r,n),t[St]=e,t[z]=n}catch(t){q(e,e.return,t)}}var zl=!1,Bl=null;function Vl(e){(e.tag===30||e.subtreeFlags&33554432)&&(zl=!0)}var Hl=null;function Ul(){var e=Hl;return Hl=null,e}var Wl=0;function Gl(e,t,n,r,i){return Wl=0,Kl(e.child,t,n,r,i)}function Kl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Mp(o);r.push(s),s.view&&(a=!0)}else a||Mp(o).view&&(a=!0);zl=!0,kp(o,Wl===0?t:t+`_`+Wl,n),Wl++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Kl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function ql(e,t){for(;e!==null;)e.tag===5?Ap(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||ql(e.child,t),e=e.sibling}function Jl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Jl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=vi(t.default,t.share),t!==`none`&&(Gl(e,n,t,null,!1)||ql(e.child,!1))}e=e.sibling}}function Yl(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=gi(r,n),a=vi(r.default,n.paired?r.share:r.enter);a===`none`?Jl(e):Gl(e,i,a,null,!1)?(Jl(e),n.paired||t||Ld(e,r.onEnter)):ql(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Yl(e,t),e=e.sibling;else Jl(e)}function Xl(e){if(Bl!==null&&Bl.size!==0){var t=Bl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=vi(n.default,n.share);if(a!==`none`&&(Gl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Ld(e,n.onShare)):ql(e.child,!1)),t.delete(r),t.size===0)break}}}Xl(e)}e=e.sibling}}}function Zl(e){if(e.tag===30){var t=e.memoizedProps,n=gi(t,e.stateNode),r=Bl===null?void 0:Bl.get(n),i=vi(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Gl(e,n,i,null,!1)?r===void 0?Ld(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Bl.delete(n),Ld(e,t.onShare)):ql(e.child,!1)),Bl!==null&&Xl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Zl(e),e=e.sibling;else Bl!==null&&Xl(e)}function Ql(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=gi(t,e.stateNode);t=vi(t.default,t.update),e.flags&=-5,t!==`none`&&Gl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Ql(e);e=e.sibling}}function $l(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,ql(e.child,!1))}$l(e)}e=e.sibling}}function eu(e){if(e.tag===30)e.stateNode.paired=null,ql(e.child,!1),$l(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)eu(e),e=e.sibling;else $l(e)}function tu(e){for(e=e.child;e!==null;)e.tag===30?ql(e.child,!1):e.subtreeFlags&33554432&&tu(e),e=e.sibling}function nu(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Wl<a.length){var l=a[Wl],u=Mp(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&kp(c,Wl===0?n:n+`_`+Wl,i),s&&e.flags&4||(Hl===null&&(Hl=[]),Hl.push(c,Wl===0?r:r+`_`+Wl,t.memoizedProps)),Wl++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:nu(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function ru(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=gi(n,r),a=vi(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(Np)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Wl=0,i=nu(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Ld(e,n.onUpdate))}else e.subtreeFlags&33554432&&ru(e,t);e=e.sibling}}var iu=!1,au=!1,ou=!1,su=!1,cu=typeof WeakSet==`function`?WeakSet:Set,lu=null,uu=!1,du=!1,fu=!1,pu=!1;function mu(e,t,n){if(e=e.containerInfo,dp=yh,e=Kr(e),qr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(fp={focusedElem:e,selectionRange:r},yh=!1,n=(n&335544064)===n,lu=t,t=n?9270:1024;lu!==null;){if(e=lu,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Zl(r[a]);if(e.alternate===null&&e.flags&2)n&&Vl(e),hu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Zl(r),hu(n);continue}if(r!==null&&r.memoizedState!==null){n&&Vl(e),hu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,lu=r):(n&&Ql(e),hu(n))}}Bl=null}function hu(e){for(;lu!==null;){var t=lu,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=xc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){q(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)om(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:om(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=gi(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=vi(a.default,a.update),a!==`none`&&Gl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,lu=r;break}lu=t.return}}function gu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Iu(e,n),r&4&&xl(5,n);break;case 1:if(Iu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){q(n,n.return,e)}else{var i=xc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){q(n,n.return,e)}}}r&64&&Cl(n),r&512&&Tl(n,n.return);break;case 3:if(Iu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{wo(e,t)}catch(e){q(n,n.return,e)}}break;case 27:t===null&&r&4&&Rl(n);case 26:case 5:Iu(e,n),t===null&&r&4&&Ml(n),r&512&&Tl(n,n.return);break;case 12:Iu(e,n);break;case 31:Iu(e,n),r&4&&Tu(e,n);break;case 13:Iu(e,n),r&4&&Eu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=xf.bind(null,n),fm(e,n))));break;case 22:if(r=n.memoizedState!==null||iu,!r){var a=t!==null&&t.memoizedState!==null||au;t=iu,i=au,iu=r,(au=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Ru(e,n,r)):Iu(e,n),iu=t,au=i}break;case 30:Iu(e,n),r&512&&Tl(n,n.return);break;case 7:r&512&&Tl(n,n.return);default:Iu(e,n)}}function _u(e,t){for(e=e.child;e!==null;)vu(e,t),e=e.sibling}function vu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){q(e,e.return,t)}yu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,Wt=!0}catch(t){q(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?Op(s,!0):Op(e.stateNode,!1)}catch(t){q(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&_u(e,t);break;default:_u(e,t)}}function yu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:vu(n,r);break a;case 22:n.memoizedState===null&&yu(n,r);break a;default:yu(n,r)}}e=e.sibling}}function bu(e){var t=e.alternate;t!==null&&(e.alternate=null,bu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&At(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var xu=null,Su=!1;function Cu(e,t,n){for(n=n.child;n!==null;)wu(e,t,n),n=n.sibling}function wu(e,t,n){if(Xe&&typeof Xe.onCommitFiberUnmount==`function`)try{Xe.onCommitFiberUnmount(Ye,n)}catch{}switch(n.tag){case 26:au||El(n,t),Cu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!au&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:au||El(n,t),kl(n);var r=xu,i=Su;Ep(n.type)&&(xu=n.stateNode,Su=!1),Cu(e,t,n),bm(n.stateNode,n.type,n.memoizedProps),xu=r,Su=i;break;case 5:au||El(n,t),kl(n);case 6:if(n.tag===6&&kl(n),r=xu,i=Su,xu=null,Cu(e,t,n),xu=r,Su=i,xu!==null){if(Su)try{(xu.nodeType===9?xu.body:xu.nodeName===`HTML`?xu.ownerDocument.body:xu).removeChild(n.stateNode),Wt=!0}catch(e){q(n,t,e)}else try{xu.removeChild(n.stateNode),Wt=!0}catch(e){q(n,t,e)}}break;case 18:xu!==null&&(Su?(e=xu,Dp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Wh(e)):Dp(xu,n.stateNode));break;case 4:r=xu,i=Su,xu=n.stateNode.containerInfo,Su=!0,Cu(e,t,n),xu=r,Su=i;break;case 0:case 11:case 14:case 15:Sl(2,n,t),au||Sl(4,n,t),Cu(e,t,n);break;case 1:au||(El(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&wl(n,t,r)),Cu(e,t,n);break;case 21:Cu(e,t,n);break;case 22:au=(r=au)||n.memoizedState!==null,Cu(e,t,n),au=r;break;case 30:El(n,t),Cu(e,t,n);break;case 7:au||El(n,t),Cu(e,t,n);break;default:Cu(e,t,n)}}function Tu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Wh(e)}catch(e){q(t,t.return,e)}}}function Eu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Wh(e)}catch(e){q(t,t.return,e)}}function Du(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new cu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new cu),t;default:throw Error(i(435,e.tag))}}function Ou(e,t){var n=Du(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Sf.bind(null,e,t);t.then(r,r)}})}function ku(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Ep(l.type)){xu=l.stateNode,Su=!1;break a}break;case 5:xu=l.stateNode,Su=!1;break a;case 3:case 4:xu=l.stateNode.containerInfo,Su=!0;break a}l=l.return}if(xu===null)throw Error(i(160));wu(s,c,o),xu=null,Su=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ju(t,e,n),t=t.sibling}var Au=null;function ju(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}ku(t,e,n),Mu(e),a&4&&(Sl(3,e,e.return),xl(3,e),Sl(5,e,e.return));break;case 1:ku(t,e,n),Mu(e),a&512&&(au||r===null||El(r,r.return)),a&64&&iu&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=Au,ku(t,e,n),Mu(e),a&512&&(au||r===null||El(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(iu)e.stateNode=gp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[Ot]||r[St]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),op(r,t,n),r[St]=e,Ft(r),t=r;break a;case`link`:if(o=Ym(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),op(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Ym(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),op(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[St]=e,Ft(r),t=r}e.stateNode=t}}else iu||Xm(o,e.type,e.stateNode)}else e.stateNode=Wm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Nl(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||au||t.parentNode.removeChild(t)):a.count--,n===null?iu||Xm(o,e.type,e.stateNode):Wm(o,n,e.memoizedProps))}break;case 27:ku(t,e,n),Mu(e),a&512&&(au||r===null||El(r,r.return)),r!==null&&a&4&&Nl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=ou,ou=!1,ku(t,e,n),ou=o,Mu(e),a&512&&(au||r===null||El(r,r.return)),e.flags&32){t=e.stateNode;try{ln(t,``),Wt=!0}catch(t){q(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Nl(e,t,r===null?t:r.memoizedProps)),a&1024&&(su=!0);break;case 6:if(ku(t,e,n),Mu(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,Wt=!0}catch(t){q(e,e.return,t)}}break;case 3:if(Wt=!1,Jm=null,o=Au,Au=wm(t.containerInfo),ku(t,e,n),Au=o,Mu(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Wh(t.containerInfo)}catch(t){q(e,e.return,t)}su&&(su=!1,Nu(e)),Wt=!1;break;case 4:a=ou,ou=iu,r=Gt(),o=Au,Au=wm(e.stateNode.containerInfo),ku(t,e,n),Mu(e),Au=o,Wt&&du&&(fu=!0),Wt=r,ou=a;break;case 12:ku(t,e,n),Mu(e);break;case 31:ku(t,e,n),Mu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Ou(e,t)));break;case 13:ku(t,e,n),Mu(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(vd=Be()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Ou(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=iu,l=au,u=ou;iu=c||o,ou=u||o,au=l||s,ku(t,e,n),au=l,ou=u,iu=c,Mu(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||iu||au||(t=s||au,n=iu,r=au,iu=o||iu,au=t,Lu(e,2),iu=n,au=r),!o&&ou||_u(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Ou(e,n))));break;case 19:ku(t,e,n),Mu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Ou(e,t)));break;case 30:a&512&&(au||r===null||El(r,r.return)),a=Gt(),o=du,s=(n&335544064)===n,c=e.memoizedProps,du=s&&vi(c.default,c.update)!==`none`,ku(t,e,n),Mu(e),s&&r!==null&&Wt&&(e.flags|=4),du=o,Wt=a;break;case 21:break;case 7:a&512&&(au||r===null||El(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:ku(t,e,n),Mu(e)}}function Mu(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Pl(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(jl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(Al(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Ll(e,Fl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(ln(l,``),n.flags&=-33),Ll(e,Fl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Il(e,Fl(e),u,s);break;default:throw Error(i(161))}}catch(t){q(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Nu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Nu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,yh=!0,t.reset(),yh=!1),e=e.sibling}}function Pu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Fu(t,e),t=t.sibling;else ru(t,!1)}function Fu(e,t){var n=e.alternate;if(n===null)Yl(e,!1);else switch(e.tag){case 3:if(pu=uu=!1,Ul(),Pu(t,e),!uu&&!fu){if(e=Hl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ap(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),pu=!0}Hl=null;break;case 5:Pu(t,e);break;case 4:r=uu,uu=!1,Pu(t,e),uu&&(fu=!0),uu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Pu(t,e):Yl(e,!1));break;case 30:r=uu,i=Ul(),uu=!1,Pu(t,e),uu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=gi(a,o),o=gi(n.memoizedProps,o);var s=vi(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Wl=0,t=nu(e,n,t,o,s,a,!0),Wl!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Ld(e,e.memoizedProps.onUpdate),Hl=i):i!==null&&(i.push.apply(i,Hl),Hl=i),uu=e.flags&32?!0:r;break;default:Pu(t,e)}}function Iu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)gu(e,t.alternate,t),t=t.sibling}function Lu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:Sl(4,n,n.return),Lu(n,r);break;case 1:El(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&wl(n,n.return,i),Lu(n,r);break;case 27:r&2&&bm(n.stateNode,n.type,n.memoizedProps);case 5:El(n,n.return),n.tag!==5&&n.tag!==27||kl(n),Lu(n,r);break;case 6:kl(n);break;case 26:El(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||au||i.parentNode.removeChild(i),Lu(n,r);break;case 22:n.memoizedState===null&&Lu(n,r);break;case 30:El(n,n.return),Lu(n,r);break;case 7:El(n,n.return);default:Lu(n,r)}e=e.sibling}}function Ru(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Ru(i,a,n),xl(4,a);break;case 1:if(Ru(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){q(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)Co(l[i],c)}catch(e){q(r,r.return,e)}}s&&o&64&&Cl(a),Tl(a,a.return);break;case 27:n&2&&Rl(a);case 5:a.tag!==5&&a.tag!==27||Ol(a),Ru(i,a,n),s&&r===null&&o&4&&Ml(a),Tl(a,a.return);break;case 6:Ol(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||iu||Xm(wm(c.ownerDocument),a.type,c),Ru(i,a,n),s&&r===null&&o&4&&Ml(a),Tl(a,a.return);break;case 12:Ru(i,a,n);break;case 31:Ru(i,a,n),s&&o&4&&Tu(i,a);break;case 13:Ru(i,a,n),s&&o&4&&Eu(i,a);break;case 22:a.memoizedState===null&&Ru(i,a,n),Tl(a,a.return);break;case 30:Ru(i,a,n),Tl(a,a.return);break;case 7:Tl(a,a.return);default:Ru(i,a,n)}t=t.sibling}}function zu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Ma(n))}function Bu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ma(e))}function Vu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Hu(e,t,n,r),t=t.sibling;else i&&tu(t)}function Hu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&eu(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Vu(e,t,n,r),a&2048&&xl(9,t);break;case 1:Vu(e,t,n,r);break;case 3:Vu(e,t,n,r),i&&pu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Ma(a)));break;case 12:if(a&2048){Vu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){q(t,t.return,e)}}else Vu(e,t,n,r);break;case 31:Vu(e,t,n,r);break;case 13:Vu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&eu(t),o._visibility&2?Vu(e,t,n,r):(o._visibility|=2,Uu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&eu(s),o._visibility&2?Vu(e,t,n,r):Wu(e,t)),a&2048&&zu(s,t);break;case 24:Vu(e,t,n,r),a&2048&&Bu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(ql(a.child,!0),ql(t.child,!0))),Vu(e,t,n,r);break;default:Vu(e,t,n,r)}}function Uu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Uu(a,o,s,c,i),xl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Uu(a,o,s,c,i)):u._visibility&2?Uu(a,o,s,c,i):Wu(a,o),i&&l&2048&&zu(o.alternate,o);break;case 24:Uu(a,o,s,c,i),i&&l&2048&&Bu(o.alternate,o);break;default:Uu(a,o,s,c,i)}t=t.sibling}}function Wu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Wu(n,r),i&2048&&zu(r.alternate,r);break;case 24:Wu(n,r),i&2048&&Bu(r.alternate,r);break;default:Wu(n,r)}t=t.sibling}}var Gu=8192;function Ku(e,t,n){if(e.subtreeFlags&Gu)for(e=e.child;e!==null;)qu(e,t,n),e=e.sibling}function qu(e,t,n){switch(e.tag){case 26:Ku(e,t,n),e.flags&Gu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&th(n,e)):nh(n,Au,e.memoizedState,e.memoizedProps));break;case 5:Ku(e,t,n),e.flags&Gu&&(e=e.stateNode,(t&335544128)===t&&th(n,e));break;case 3:case 4:var r=Au;Au=wm(e.stateNode.containerInfo),Ku(e,t,n),Au=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Gu,Gu=16777216,Ku(e,t,n),Gu=r):Ku(e,t,n));break;case 30:if((e.flags&Gu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Bl===null&&(Bl=new Map),Bl.set(r,i)}Ku(e,t,n);break;default:Ku(e,t,n)}}function Ju(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Yu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];lu=r,Qu(r,e)}Ju(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Xu(e),e=e.sibling}function Xu(e){switch(e.tag){case 0:case 11:case 15:Yu(e),e.flags&2048&&Sl(9,e,e.return);break;case 3:Yu(e);break;case 12:Yu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Zu(e)):Yu(e);break;default:Yu(e)}}function Zu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];lu=r,Qu(r,e)}Ju(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Sl(8,t,t.return),Zu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Zu(t));break;default:Zu(t)}e=e.sibling}}function Qu(e,t){for(;lu!==null;){var n=lu;switch(n.tag){case 0:case 11:case 15:Sl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Ma(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,lu=r;else a:for(n=e;lu!==null;){r=lu;var i=r.sibling,a=r.return;if(bu(r),r===n){lu=null;break a}if(i!==null){i.return=a,lu=i;break a}lu=a}}}var $u={getCacheForType:function(e){var t=wa(Aa),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return wa(Aa).controller.signal}},ed=typeof WeakMap==`function`?WeakMap:Map,td=0,nd=null,G=null,K=0,rd=0,id=null,ad=!1,od=!1,sd=!1,cd=0,ld=0,ud=0,dd=0,fd=0,pd=0,md=0,hd=null,gd=null,_d=!1,vd=0,yd=0,bd=1/0,xd=null,Sd=null,Cd=0,wd=null,Td=null,Ed=0,Dd=0,Od=null,kd=null,Ad=null,jd=null,Md=null,Nd=0,Pd=null;function Fd(){return td&2&&K!==0?K&-K:L.T===null?yt():Lf()}function Id(){if(pd===0){if(!(K&536870912)||V){var e=rt;rt<<=1,!(rt&3932160)&&(rt=262144),pd=e}else pd=536870912}return e=Ao.current,e!==null&&(e.flags|=32),pd}function Ld(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Rp(gi(e.memoizedProps,n))),jd===null&&(jd=[]),jd.push(t.bind(null,r))}}function Rd(e,t,n){(e===nd&&(rd===2||rd===9)||e.cancelPendingCommit!==null)&&(Gd(e,0),Hd(e,K,pd,!1)),ft(e,n),td&2&&e===nd||(e===nd&&(!(td&2)&&(dd|=n),ld===4&&Hd(e,K,pd,!1)),Af(e))}function zd(e,t,n){if(td&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||st(e,t),a=r?$d(e,t):Zd(e,t,!0),o=r;do{if(a===0){od&&!r&&Hd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Vd(n))a=Zd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=hd;var l=c.current.memoizedState.isDehydrated;if(l&&(Gd(c,s).flags|=256),s=Zd(c,s,!1),s!==2&&s!==6){if(sd&&!l){c.errorRecoveryDisabledLanes|=o,dd|=o,a=4;break a}o=gd,gd=a,o!==null&&(gd===null?gd=o:gd.push.apply(gd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Gd(e,0),Hd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Hd(r,t,pd,!ad);break a;case 2:gd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=vd+300-Be(),10<a)){if(Hd(r,t,pd,!ad),ot(r,0,!0)!==0)break a;Ed=t,r.timeoutHandle=bp(Bd.bind(null,r,n,gd,xd,_d,t,pd,dd,md,ad,o,`Throttled`,-0,0),a);break a}Bd(r,n,gd,xd,_d,t,pd,dd,md,ad,o,null,-0,0)}break}}while(1);Af(e)}function Bd(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:_n},Bl=null,qu(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=oh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?vd-Be():(a&4194048)===a?yd-Be():0,m=ih(d,m),m!==null)?(Ed=a,e.cancelPendingCommit=m(sf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Hd(e,a,o,!l)):sf(e,t,a,n,r,i,o,s,c,l,u,d)}function Vd(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Br(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Hd(e,t,n,r){t=ct(e,t),t&=~fd,t&=~dd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Qe(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&mt(e,n,t)}function Ud(){return td&6?!0:(jf(0,!1),!1)}function Wd(){if(G!==null){if(rd===0)var e=G.return;else e=G,ga=ha=null,as(e),io=null,ao=0,e=G;for(;e!==null;)bl(e.alternate,e),e=e.return;G=null}}function Gd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,xp(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Ed=0,Wd(),nd=e,G=n=Ni(e.current,null),K=t,rd=0,id=null,ad=!1,od=st(e,t),sd=!1,md=pd=fd=dd=ud=ld=0,gd=hd=null,_d=!1,cd=ct(e,t),Ci(),n}function Kd(e,t){H=null,L.H=pc,t===Ja||t===Xa?(t=no(),rd=3):t===Ya?(t=no(),rd=4):rd=t===jc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,id=t,G===null&&(ld=1,Tc(e,Vi(t,e.current)))}function qd(){var e=Ao.current;return e===null?!0:(K&4194048)===K?jo===null:(K&62914560)===K||K&536870912?e===jo:!1}function Jd(){var e=L.H;return L.H=pc,e===null?pc:e}function Yd(){var e=L.A;return L.A=$u,e}function Xd(){ld=4,ad||(K&4194048)!==K&&Ao.current!==null||(od=!0),!(ud&134217727)&&!(dd&134217727)||nd===null||Hd(nd,K,pd,!1)}function Zd(e,t,n){var r=td;td|=2;var i=Jd(),a=Yd();(nd!==e||K!==t)&&(xd=null,Gd(e,t)),t=!1;var o=ld;a:do try{if(rd!==0&&G!==null){var s=G,c=id;switch(rd){case 8:Wd(),o=6;break a;case 3:case 2:case 9:case 6:Ao.current===null&&(t=!0);var l=rd;if(rd=0,id=null,rf(e,s,c,l),n&&od){o=0;break a}break;default:l=rd,rd=0,id=null,rf(e,s,c,l)}}Qd(),o=ld;break}catch(t){Kd(e,t)}while(1);return t&&e.shellSuspendCounter++,ga=ha=null,td=r,L.H=i,L.A=a,G===null&&(nd=null,K=0,Ci()),o}function Qd(){for(;G!==null;)tf(G)}function $d(e,t){var n=td;td|=2;var r=Jd(),a=Yd();nd!==e||K!==t?(xd=null,bd=Be()+500,Gd(e,t)):od=st(e,t);a:do try{if(rd!==0&&G!==null){t=G;var o=id;b:switch(rd){case 1:rd=0,id=null,rf(e,t,o,1);break;case 2:case 9:if(Qa(o)){rd=0,id=null,nf(t);break}t=function(){rd!==2&&rd!==9||nd!==e||(rd=7),Af(e)},o.then(t,t);break a;case 3:rd=7;break a;case 4:rd=5;break a;case 7:Qa(o)?(rd=0,id=null,nf(t)):(rd=0,id=null,rf(e,t,o,7));break;case 5:var s=null;switch(G.tag){case 26:s=G.memoizedState;case 5:case 27:var c=G;if(s?$m(s):c.stateNode.complete){rd=0,id=null;var l=c.sibling;if(l!==null)G=l;else{var u=c.return;u===null?G=null:(G=u,af(u))}break b}}rd=0,id=null,rf(e,t,o,5);break;case 6:rd=0,id=null,rf(e,t,o,6);break;case 8:Wd(),ld=6;break a;default:throw Error(i(462))}}ef();break}catch(t){Kd(e,t)}while(1);return ga=ha=null,L.H=r,L.A=a,td=n,G===null?(nd=null,K=0,Ci(),ld):0}function ef(){for(;G!==null&&!Re();)tf(G)}function tf(e){var t=dl(e.alternate,e,cd);e.memoizedProps=e.pendingProps,t===null?af(e):G=t}function nf(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Gc(n,t,t.pendingProps,t.type,void 0,K);break;case 11:t=Gc(n,t,t.pendingProps,t.type.render,t.ref,K);break;case 5:as(t);var r=t;r===na&&(V?(la(r),r.tag===5&&r.stateNode!=null&&(ra=r.stateNode)):(la(r),V=!0));default:bl(n,t),t=G=Pi(t,cd),t=dl(n,t,cd)}e.memoizedProps=e.pendingProps,t===null?af(e):G=t}function rf(e,t,n,r){ga=ha=null,as(t),io=null,ao=0;var i=t.return;try{if(Ac(e,i,t,n,K)){ld=1,Tc(e,Vi(n,e.current)),G=null;return}}catch(t){if(i!==null)throw G=i,t;ld=1,Tc(e,Vi(n,e.current)),G=null;return}t.flags&32768?(V||r===1?e=!0:od||K&536870912?e=!1:(ad=e=!0,(r===2||r===9||r===3||r===6)&&(r=Ao.current,r!==null&&r.tag===13&&(r.flags|=16384))),of(t,e)):af(t)}function af(e){var t=e;do{if(t.flags&32768){of(t,ad);return}e=t.return;var n=vl(t.alternate,t,cd);if(n!==null){G=n;return}if(t=t.sibling,t!==null){G=t;return}G=t=e}while(t!==null);ld===0&&(ld=5)}function of(e,t){do{var n=yl(e.alternate,e);if(n!==null){n.flags&=32767,G=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){G=e;return}G=e=n}while(e!==null);ld=6,G=null}function sf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do hf();while(Cd!==0);if(td&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===nd&&(G=nd=null,K=0),Td=t,wd=e,Ed=n,Od=a,kd=r,cf(e,t,n,s,c,l,f)}}function cf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Dd=s,s|=Si,pt(e,n,s,r,i,a),jd=null,(n&335544064)===n?(Md=Fa(e),r=10262):(Md=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,Cf(We,function(){return gf(),null})):(e.callbackNode=null,e.callbackPriority=0),zl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=L.T,L.T=null,i=R.p,R.p=2,a=td,td|=4;try{mu(e,t,n)}finally{td=a,R.p=i,L.T=r}}Cd=1,zl?Ad=Ip(o,e.containerInfo,Md,df,ff,uf,pf,gf,lf,null,null):(df(),ff(),pf())}function lf(e){if(Cd!==0){var t=wd.onRecoverableError;t(e,{componentStack:null})}}function uf(){Cd===3&&(Cd=0,Fu(Td,wd),Cd=4)}function df(){if(Cd===1){Cd=0;var e=wd,t=Td,n=Ed,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=L.T,L.T=null;var i=R.p;R.p=2;var a=td;td|=4;try{du=fu=!1,ju(t,e,n),n=fp;var o=Kr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Gr(s.ownerDocument.documentElement,s)){if(c!==null&&qr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Wr(s,h),v=Wr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}yh=!!dp,fp=dp=null}finally{td=a,R.p=i,L.T=r}}e.current=t,Cd=2}}function ff(){if(Cd===2){Cd=0;var e=wd,t=Td,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=L.T,L.T=null;var r=R.p;R.p=2;var i=td;td|=4;try{gu(e,t.alternate,t)}finally{td=i,R.p=r,L.T=n}}Cd=3}}function pf(){if(Cd===4||Cd===3){Cd=0;var e=Ad;Ad=null,ze();var t=wd,n=Td,r=Ed,i=kd,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?Cd=5:(Cd=0,Td=wd=null,mf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(Sd=null),vt(r),n=n.stateNode,Xe&&typeof Xe.onCommitFiberRoot==`function`)try{Xe.onCommitFiberRoot(Ye,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=L.T,a=R.p,R.p=2,L.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{L.T=n,R.p=a}}if(i=jd,o=Md,Md=null,i!==null&&(jd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Ed&3&&hf(),Af(t),a=t.pendingLanes,r&261930&&a&42?t===Pd?Nd++:(Nd=0,Pd=t):(Nd=0,Pd=null),jf(0,!1)}}function mf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Ma(t)))}function hf(){return Ad!==null&&(Ad.skipTransition(),Ad=null),df(),ff(),pf(),gf()}function gf(){if(Cd!==5)return!1;var e=wd,t=Dd;Dd=0;var n=vt(Ed),r=L.T,a=R.p;try{R.p=32>n?32:n,L.T=null,n=Od,Od=null;var o=wd,s=Ed;if(Cd=0,Td=wd=null,Ed=0,td&6)throw Error(i(331));var c=td;if(td|=4,Xu(o.current),Hu(o,o.current,s,n),td=c,jf(0,!1),Xe&&typeof Xe.onPostCommitFiberRoot==`function`)try{Xe.onPostCommitFiberRoot(Ye,o)}catch{}return!0}finally{R.p=a,L.T=r,mf(e,t)}}function _f(e,t,n){t=Vi(n,t),t=Dc(e.stateNode,t,2),e=_o(e,t,2),e!==null&&(ft(e,2),Af(e))}function q(e,t,n){if(e.tag===3)_f(e,e,n);else for(;t!==null;){if(t.tag===3){_f(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(Sd===null||!Sd.has(r))){e=Vi(n,e),n=Oc(2),r=_o(t,n,2),r!==null&&(kc(n,r,t,e),ft(r,2),Af(r));break}}t=t.return}}function vf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new ed;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(sd=!0,i.add(n),e=yf.bind(null,e,t,n),t.then(e,e))}function yf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,nd===e&&(K&n)===n&&(ld===4||ld===3&&(K&62914560)===K&&300>Be()-vd?td&2?fd|=n:Gd(e,0):fd|=n,md===K&&(md=0)),Af(e)}function bf(e,t){t===0&&(t=ut()),e=Ei(e,t),e!==null&&(ft(e,t),Af(e))}function xf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),bf(e,n)}function Sf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),bf(e,n)}function Cf(e,t){return Ie(e,t)}var wf=null,Tf=null,Ef=!1,Df=!1,Of=!1,kf=0;function Af(e){e!==Tf&&e.next===null&&(Tf===null?wf=Tf=e:Tf=Tf.next=e),Df=!0,Ef||(Ef=!0,If())}function jf(e,t){if(!Of&&Df){Of=!0;do for(var n=!1,r=wf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Qe(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Ff(r,a))}else a=K,a=ot(r,r===nd?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||st(r,a)||(n=!0,Ff(r,a))}r=r.next}while(n);Of=!1}}function J(){Mf()}function Mf(){Df=Ef=!1;var e=0;kf!==0&&yp()&&(e=kf);for(var t=Be(),n=null,r=wf;r!==null;){var i=r.next,a=Nf(r,t);a===0?(r.next=null,n===null?wf=i:n.next=i,i===null&&(Tf=n)):(n=r,(e!==0||a&3)&&(Df=!0)),r=i}Cd!==0&&Cd!==5||jf(e,!1),kf!==0&&(kf=0)}function Nf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Qe(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=lt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=nd,n=K,n=ot(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(rd===2||rd===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Le(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||st(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Le(r),vt(n)){case 2:case 8:n=Ue;break;case 32:n=We;break;case 268435456:n=Ke;break;default:n=We}return r=Pf.bind(null,e),n=Ie(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Le(r),e.callbackPriority=2,e.callbackNode=null,2}function Pf(e,t){if(Cd!==0&&Cd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(hf()&&e.callbackNode!==n)return null;var r=K;return r=ot(e,e===nd?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(zd(e,r,t),Nf(e,Be()),e.callbackNode!=null&&e.callbackNode===n?Pf.bind(null,e):null)}function Ff(e,t){if(hf())return null;zd(e,t,!0)}function If(){wp(function(){td&6?Ie(He,J):Mf()})}function Lf(){if(kf===0){var e=Ra;e===0&&(e=nt,nt<<=1,!(nt&261888)&&(nt=256)),kf=e}return kf}function Rf(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:gn(e)}function zf(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Rf((i[z]||null).action),o=r.submitter;o&&(t=(t=o[z]||null)?Rf(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Rn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(kf!==0){var e=new FormData(i,o);ec(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),ec(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Bf=0;Bf<pi.length;Bf++){var Vf=pi[Bf];mi(Vf.toLowerCase(),`on`+(Vf[0].toUpperCase()+Vf.slice(1)))}mi(ai,`onAnimationEnd`),mi(oi,`onAnimationIteration`),mi(si,`onAnimationStart`),mi(`dblclick`,`onDoubleClick`),mi(`focusin`,`onFocus`),mi(`focusout`,`onBlur`),mi(ci,`onTransitionRun`),mi(li,`onTransitionStart`),mi(ui,`onTransitionCancel`),mi(di,`onTransitionEnd`),zt(`onMouseEnter`,[`mouseout`,`mouseover`]),zt(`onMouseLeave`,[`mouseout`,`mouseover`]),zt(`onPointerEnter`,[`pointerout`,`pointerover`]),zt(`onPointerLeave`,[`pointerout`,`pointerover`]),Rt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Rt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Rt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Rt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Rt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Rt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var Hf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Uf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(Hf));function Wf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){yi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){yi(e)}i.currentTarget=null,a=c}}}}function Y(e,t){var n=t[wt];n===void 0&&(n=t[wt]=new Set);var r=e+`__bubble`;n.has(r)||(Jf(t,e,2,!1),n.add(r))}function Gf(e,t,n){var r=0;t&&(r|=4),Jf(n,e,r,t)}var Kf=`_reactListening`+Math.random().toString(36).slice(2);function qf(e){if(!e[Kf]){e[Kf]=!0,It.forEach(function(t){t!==`selectionchange`&&(Uf.has(t)||Gf(t,!1,e),Gf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Kf]||(t[Kf]=!0,Gf(`selectionchange`,!1,t))}}function Jf(e,t,n,r){switch(Th(t)){case 2:var i=bh;break;case 8:i=xh;break;default:i=Sh}n=i.bind(null,t,n,e),i=void 0,!Dn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Yf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=jt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}wn(function(){var r=a,i=yn(n),s=[];a:{var c=fi.get(e);if(c!==void 0){var l=Rn,u=e;switch(e){case`keypress`:if(Nn(n)===0)break a;case`keydown`:case`keyup`:l=nr;break;case`focusin`:u=`focus`,l=qn;break;case`focusout`:u=`blur`,l=qn;break;case`beforeblur`:case`afterblur`:l=qn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Gn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Kn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=ar;break;case ai:case oi:case si:l=Jn;break;case di:l=or;break;case`scroll`:case`scrollend`:l=Bn;break;case`wheel`:l=sr;break;case`copy`:case`cut`:case`paste`:l=Yn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=rr;break;case`submit`:l=ir;break;case`toggle`:case`beforetoggle`:l=cr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=Tn(m,p),g!=null&&d.push(Xf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==vn&&(u=n.relatedTarget||n.fromElement)&&(jt(u)||u[Ct]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?jt(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Gn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=rr,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Nt(c),h=l==null?u:Nt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,jt(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?E(c,l,Qf):null,c!==null&&$f(s,u,c,d,!1),l!==null&&f!==null&&$f(s,f,l,d,!0)))}a:{if(c=r?Nt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Or;else if(Sr(c)){if(kr)_=Rr;else{_=Ir;var v=Fr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&pn(r.elementType)&&(_=Or):_=Lr;if(_&&=_(e,r)){Cr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Nt(r):window,e){case`focusin`:(Sr(v)||v.contentEditable===`true`)&&(Yr=v,Xr=r,Zr=null);break;case`focusout`:Zr=Xr=Yr=null;break;case`mousedown`:Qr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Qr=!1,$r(s,n,i);break;case`selectionchange`:if(Jr)break;case`keydown`:case`keyup`:$r(s,n,i)}var y;if(ur)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else vr?gr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(pr&&n.locale!==`ko`&&(vr||b!==`onCompositionStart`?b===`onCompositionEnd`&&vr&&(y=Mn()):(kn=i,An=`value`in kn?kn.value:kn.textContent,vr=!0)),v=Zf(r,b),0<v.length&&(b=new Xn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=_r(n),y!==null&&(b.data=y)))),(y=fr?yr(e,n):br(e,n))&&(b=Zf(r,`onBeforeInput`),0<b.length&&(v=new Xn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),zf(s,e,r,n,i)}Wf(s,t)})}function Xf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Zf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=Tn(e,n),i!=null&&r.unshift(Xf(e,i,a)),i=Tn(e,t),i!=null&&r.push(Xf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Qf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function $f(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=Tn(n,a),l!=null&&o.unshift(Xf(n,l,c))):i||(l=Tn(n,a),l!=null&&o.push(Xf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var ep=/\r\n?/g,tp=/\u0000|\uFFFD/g;function np(e){return(typeof e==`string`?e:``+e).replace(ep,`
`).replace(tp,``)}function rp(e,t){return t=np(t),np(e)===t}function ip(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||ln(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&ln(e,``+r);else return;break;case`className`:qt(e,`class`,r);break;case`tabIndex`:qt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:qt(e,n,r);break;case`style`:fn(e,r,o);return;case`data`:if(t!==`object`){qt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=gn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&ip(e,t,`name`,a.name,a,null),ip(e,t,`formEncType`,a.formEncType,a,null),ip(e,t,`formMethod`,a.formMethod,a,null),ip(e,t,`formTarget`,a.formTarget,a,null)):(ip(e,t,`encType`,a.encType,a,null),ip(e,t,`method`,a.method,a,null),ip(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=gn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=_n);return;case`onScroll`:r!=null&&Y(`scroll`,e);return;case`onScrollEnd`:r!=null&&Y(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=gn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Y(`beforetoggle`,e),Y(`toggle`,e),Kt(e,`popover`,r);break;case`xlinkActuate`:Jt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Jt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Jt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Jt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Jt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Jt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Kt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=mn.get(n)||n,Kt(e,n,r);else return}Wt=!0}function ap(e,t,n,r,a,o){switch(n){case`style`:fn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)ln(e,r);else if(typeof r==`number`||typeof r==`bigint`)ln(e,``+r);else return;break;case`onScroll`:r!=null&&Y(`scroll`,e);return;case`onScrollEnd`:r!=null&&Y(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=_n);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Lt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[z]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}Wt=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Kt(e,n,r)}return}Wt=!0}function op(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Y(`error`,e),Y(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ip(e,t,o,s,n,null)}}a&&ip(e,t,`srcSet`,n.srcSet,n,null),r&&ip(e,t,`src`,n.src,n,null);return;case`input`:Y(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:ip(e,t,r,d,n,null)}}rn(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Y(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:ip(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&on(e,!!r,n,!0):on(e,!!r,t,!1);return;case`textarea`:for(s in Y(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:ip(e,t,s,c,n,null)}cn(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:ip(e,t,l,r,n,null)}return;case`dialog`:Y(`beforetoggle`,e),Y(`toggle`,e),Y(`cancel`,e),Y(`close`,e);break;case`iframe`:case`object`:Y(`load`,e);break;case`video`:case`audio`:for(r=0;r<Hf.length;r++)Y(Hf[r],e);break;case`image`:Y(`error`,e),Y(`load`,e);break;case`details`:Y(`toggle`,e);break;case`embed`:case`source`:case`link`:Y(`error`,e),Y(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ip(e,t,u,r,n,null)}return;default:if(pn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&ap(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&ip(e,t,c,r,n,null))}var sp={};function cp(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||ip(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(Wt=!0),o=m;break;case`name`:m!==f&&(Wt=!0),a=m;break;case`checked`:m!==f&&(Wt=!0),u=m;break;case`defaultChecked`:m!==f&&(Wt=!0),d=m;break;case`value`:m!==f&&(Wt=!0),s=m;break;case`defaultValue`:m!==f&&(Wt=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&ip(e,t,p,m,r,f)}}nn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||ip(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(Wt=!0),p=o;break;case`defaultValue`:o!==l&&(Wt=!0),c=o;break;case`multiple`:o!==l&&(Wt=!0),s=o;default:o!==l&&ip(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?on(e,!!n,n?[]:``,!1):on(e,!!n,t,!0)):on(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:ip(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(Wt=!0),p=a;break;case`defaultValue`:a!==o&&(Wt=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&ip(e,t,s,a,r,o)}sn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:ip(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(Wt=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:ip(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&ip(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:ip(e,t,u,p,r,m)}return;default:if(pn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&ap(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||ap(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&ip(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||ip(e,t,f,p,r,m)}function lp(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function up(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&lp(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&lp(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var dp=null,fp=null;function pp(e){return e.nodeType===9?e:e.ownerDocument}function mp(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function hp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function gp(e,t,n,r){return n=pp(n).createElement(e),n[St]=r,n[z]=t,op(n,e,t),Ft(n),n}function _p(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var vp=null;function yp(){var e=window.event;return e&&e.type===`popstate`?e!==vp&&(vp=e,!0):(vp=null,!1)}var bp=typeof setTimeout==`function`?setTimeout:void 0,xp=typeof clearTimeout==`function`?clearTimeout:void 0,Sp=typeof Promise==`function`?Promise:void 0,Cp=typeof requestAnimationFrame==`function`?requestAnimationFrame:bp,wp=typeof queueMicrotask==`function`?queueMicrotask:Sp===void 0?bp:function(e){return Sp.resolve(null).then(e).catch(Tp)};function Tp(e){setTimeout(function(){throw e})}function Ep(e){return e===`head`}function Dp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Wh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)xm(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,xm(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Ot]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&xm(e.ownerDocument.body)}n=i}while(n);Wh(t)}function Op(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function kp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ap(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function jp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Mp(e){return jp(e.getBoundingClientRect(),getComputedStyle(e),e)}function Np(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return jp(t,n,e)}function Pp(e){return e.documentElement.clientHeight}function Fp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Ip(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Pp(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=eh(f),u>rh){s.length=o;break}f=new Promise(Fp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Lp(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Lp.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:D({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Lp.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Lp.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Rp(e){return{name:e,group:new Lp(`group`,e),imagePair:new Lp(`image-pair`,e),old:new Lp(`old`,e),new:new Lp(`new`,e)}}function zp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}zp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Wp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Hp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),m(this._fragmentFiber.child,!1,Bp,e,s,r)}this._eventListeners=a}};function Bp(e,t,n,r){return b(e).addEventListener(t,n,r),!1}zp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Wp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Hp(i.optionsOrUseCapture),m(this._fragmentFiber.child,!1,Vp,e,n,i),r.splice(t,1),a!==null&&a()}};function Vp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Hp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function Up(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Wp(e,t,n,r){if(e.length===0)return-1;r=Up(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&Up(a.optionsOrUseCapture)===r)return i}return-1}zp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Hp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Hp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},zp.prototype.focus=function(e){m(this._fragmentFiber.child,!0,Gp,e,void 0,void 0)};function Gp(e,t){return e.tag!==6&&(e=b(e),_m(e,t))}zp.prototype.focusLast=function(e){var t=[];m(this._fragmentFiber.child,!0,Kp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Gp(t[n],e);n--);};function Kp(e,t){return t.push(e),!1}zp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=pp(e).activeElement,e!==null&&m(this._fragmentFiber.child,!1,qp,e,void 0,void 0))};function qp(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}zp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),m(this._fragmentFiber.child,!1,Jp,e,void 0,void 0)};function Jp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}zp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),m(this._fragmentFiber.child,!1,Yp,e,void 0,void 0);for(var n=t=0;n<Xp.length;n++){var r=Xp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Xp[t++]=r}Xp.length=t}};function Yp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Xp=[],Zp=!1;function Qp(e,t,n){Xp.push({fragmentInstance:e,observer:t,instance:n}),Zp||(Zp=!0,vm(function(){Zp=!1;var e=Xp;Xp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}zp.prototype.getClientRects=function(){var e=[];return m(this._fragmentFiber.child,!1,$p,e,void 0,void 0),e};function $p(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}zp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},zp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];m(this._fragmentFiber.child,!1,Kp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||em(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function em(e,t,n,r,i){var a=jt(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=E(n,a,T),t===null?t=!1:(m(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=E(r,a,T),t===null?t=!1:(m(t,!0,w,a,r),a=x,S=x=null,t=a!==null)),t):!1}function tm(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}zp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];m(this._fragmentFiber.child,!1,Kp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),tm(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),tm(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function nm(e,t){return e=b(e),rm(e,t),!1}function rm(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function im(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Hp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Xp.length;i++){var a=Xp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Xp[r++]=a)}Xp.length=r,n.observe(e)}),rm(e,t))}function am(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Hp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Qp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function om(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:om(n),At(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function sm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Ot])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=pm(e.nextSibling),e===null)break}return null}function cm(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=pm(e.nextSibling),e===null))return null;return e}function lm(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=pm(e.nextSibling),e===null))return null;return e}function um(e){return e.data===`$?`||e.data===`$~`}function dm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function fm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function pm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var mm=null;function hm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return pm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function gm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function _m(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function vm(e){Cp(function(){Cp(function(t){return e(t)})})}function ym(e,t,n){switch(t=pp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function bm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&ip(e,t,r,null,sp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===_n&&(e.onclick=null),At(e)}function xm(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);At(e)}var Sm=new Map,Cm=new Set;function wm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Tm=R.d;R.d={f:Em,r:Dm,D:Am,C:jm,L:Mm,m:Nm,X:Fm,S:Pm,M:Im};function Em(){var e=Tm.f(),t=Ud();return e||t}function Dm(e){var t=Mt(e);t!==null&&t.tag===5&&t.type===`form`?nc(t):Tm.r(e)}var Om=typeof document>`u`?null:document;function km(e,t,n){var r=Om;if(r&&typeof t==`string`&&t){var i=tn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),Cm.has(i)||(Cm.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),op(t,`link`,e),Ft(t),r.head.appendChild(t)))}}function Am(e){Tm.D(e),km(`dns-prefetch`,e,null)}function jm(e,t){Tm.C(e,t),km(`preconnect`,e,t)}function Mm(e,t,n){Tm.L(e,t,n);var r=Om;if(r&&e&&t){var i=`link[rel="preload"][as="`+tn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+tn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+tn(n.imageSizes)+`"]`)):i+=`[href="`+tn(e)+`"]`;var a=i;switch(t){case`style`:a=Rm(e);break;case`script`:a=Hm(e)}if(!(Sm.has(a)||(e=D({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),Sm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(zm(a))||t===`script`&&r.querySelector(Um(a))))){var o=r.createElement(`link`);op(o,`link`,e),t===`style`&&(o[kt]=!0,o.onload=o.onerror=function(){B(o)}),Ft(o),r.head.appendChild(o)}}}function Nm(e,t){Tm.m(e,t);var n=Om;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+tn(r)+`"][href="`+tn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Hm(e)}if(!Sm.has(a)&&(e=D({rel:`modulepreload`,href:e},t),Sm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Um(a)))return}r=n.createElement(`link`),op(r,`link`,e),Ft(r),n.head.appendChild(r)}}}function Pm(e,t,n){Tm.S(e,t,n);var r=Om;if(r&&e){var i=Pt(r).hoistableStyles,a=Rm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(zm(a)))s.loading=5;else{e=D({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=Sm.get(a))&&Km(e,n);var c=o=r.createElement(`link`);Ft(c),op(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Gm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Fm(e,t){Tm.X(e,t);var n=Om;if(n&&e){var r=Pt(n).hoistableScripts,i=Hm(e),a=r.get(i);a||(a=n.querySelector(Um(i)),a||(e=D({src:e,async:!0},t),(t=Sm.get(i))&&qm(e,t),a=n.createElement(`script`),Ft(a),op(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Im(e,t){Tm.M(e,t);var n=Om;if(n&&e){var r=Pt(n).hoistableScripts,i=Hm(e),a=r.get(i);a||(a=n.querySelector(Um(i)),a||(e=D({src:e,async:!0,type:`module`},t),(t=Sm.get(i))&&qm(e,t),a=n.createElement(`script`),Ft(a),op(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Lm(e,t,n,r){var a=(a=Se.current)?wm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Rm(n.href),t=Pt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Rm(n.href);var o=Pt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(zm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=Sm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Sm.set(e,o)),Vm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Hm(n),t=Pt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Rm(e){return`href="`+tn(e)+`"`}function zm(e){return`link[rel="stylesheet"][`+e+`]`}function Bm(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function Vm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[kt]){r.loading=1;return}}else t=e.createElement(`link`),t[kt]=!0,t.onload=t.onerror=B.bind(null,t),op(t,`link`,n),Ft(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Hm(e){return`[src="`+tn(e)+`"]`}function Um(e){return`script[async]`+e}function Wm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+tn(n.href)+`"]`);if(r)return t.instance=r,Ft(r),r;var a=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Ft(r),op(r,`style`,a),Gm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Rm(n.href);var o=e.querySelector(zm(a));if(o)return t.state.loading|=4,t.instance=o,Ft(o),o;r=Bm(n),(a=Sm.get(a))&&Km(r,a),o=(e.ownerDocument||e).createElement(`link`),Ft(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),op(o,`link`,r),t.state.loading|=4,Gm(o,n.precedence,e),t.instance=o;case`script`:return o=Hm(n.src),(a=e.querySelector(Um(o)))?(t.instance=a,Ft(a),a):(r=n,(a=Sm.get(o))&&(r=D({},n),qm(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Ft(a),op(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Gm(r,n.precedence,e));return t.instance}function Gm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Km(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function qm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Jm=null;function Ym(e,t,n){if(Jm===null){var r=new Map,i=Jm=new Map;i.set(n,r)}else i=Jm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Ot]||a[St]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Xm(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Zm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Qm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function $m(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function eh(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function th(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=eh(t),e.suspenseyImages.push(t)),e=sh.bind(e),t.decode().then(e,e))}function nh(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Rm(r.href),a=t.querySelector(zm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=oh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Ft(a);return}a=t.ownerDocument||t,r=Bm(r),(i=Sm.get(i))&&Km(r,i),a=a.createElement(`link`),Ft(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),op(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=oh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var rh=0;function ih(e,t){return e.stylesheets&&e.count===0&&lh(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&lh(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&rh===0&&(rh=62500*up());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&lh(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>rh?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function ah(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)lh(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function oh(){this.count--,ah(this)}function sh(){this.imgCount--,ah(this)}var ch=null;function lh(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ch=new Map,t.forEach(uh,e),ch=null,oh.call(e))}function uh(e,t){if(!(t.state.loading&4)){var n=ch.get(e);if(n)var r=n.get(null);else{n=new Map,ch.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=oh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var dh={$$typeof:P,Provider:null,Consumer:null,_currentValue:me,_currentValue2:me,_threadCount:0};function fh(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=dt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=dt(0),this.hiddenUpdates=dt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function ph(e,t,n,r,i,a,o,s,c,l,u,d){return e=new fh(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ji(3,null,null,t),e.current=a,a.stateNode=e,t=ja(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},mo(a),e}function mh(e){return e?(e=ki,e):ki}function hh(e,t,n,r,i,a){i=mh(i),r.context===null?r.context=i:r.pendingContext=i,r=go(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=_o(e,r,t),n!==null&&(Rd(n,e,t),vo(n,e,t))}function gh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function _h(e,t){gh(e,t),(e=e.alternate)&&gh(e,t)}function vh(e){if(e.tag===13||e.tag===31){var t=Ei(e,67108864);t!==null&&Rd(t,e,67108864),_h(e,67108864)}}function X(e){if(e.tag===13||e.tag===31){var t=Fd();t=_t(t);var n=Ei(e,t);n!==null&&Rd(n,e,t),_h(e,t)}}var yh=!0;function bh(e,t,n,r){var i=L.T;L.T=null;var a=R.p;try{R.p=2,Sh(e,t,n,r)}finally{R.p=a,L.T=i}}function xh(e,t,n,r){var i=L.T;L.T=null;var a=R.p;try{R.p=8,Sh(e,t,n,r)}finally{R.p=a,L.T=i}}function Sh(e,t,n,r){if(yh){var i=Ch(r);if(i===null)Yf(e,t,r,wh,n),Ph(e,r);else if(Ih(i,e,t,n,r))r.stopPropagation();else if(Ph(e,r),t&4&&-1<Nh.indexOf(e)){for(;i!==null;){var a=Mt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=at(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Qe(o);s.entanglements[1]|=c,o&=~c}Af(a),!(td&6)&&(bd=Be()+500,jf(0,!1))}}break;case 31:case 13:s=Ei(a,2),s!==null&&Rd(s,a,2),Ud(),_h(a,2)}if(a=Ch(r),a===null&&Yf(e,t,r,wh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Yf(e,t,r,null,n)}}function Ch(e){return e=yn(e),Z(e)}var wh=null;function Z(e){if(wh=null,e=jt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return wh=e,null}function Th(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ve()){case He:return 2;case Ue:return 8;case We:case Ge:return 32;case Ke:return 268435456;default:return 32}default:return 32}}var Eh=!1,Dh=null,Oh=null,kh=null,Ah=new Map,jh=new Map,Mh=[],Nh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Ph(e,t){switch(e){case`focusin`:case`focusout`:Dh=null;break;case`dragenter`:case`dragleave`:Oh=null;break;case`mouseover`:case`mouseout`:kh=null;break;case`pointerover`:case`pointerout`:Ah.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:jh.delete(t.pointerId)}}function Fh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Mt(t),t!==null&&vh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ih(e,t,n,r,i){switch(t){case`focusin`:return Dh=Fh(Dh,e,t,n,r,i),!0;case`dragenter`:return Oh=Fh(Oh,e,t,n,r,i),!0;case`mouseover`:return kh=Fh(kh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Ah.set(a,Fh(Ah.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,jh.set(a,Fh(jh.get(a)||null,e,t,n,r,i)),!0}return!1}function Lh(e){var t=jt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,bt(e.priority,function(){X(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,bt(e.priority,function(){X(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Rh(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ch(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);vn=r,n.target.dispatchEvent(r),vn=null}else return t=Mt(n),t!==null&&vh(t),e.blockedOn=n,!1;t.shift()}return!0}function zh(e,t,n){Rh(e)&&n.delete(t)}function Bh(){Eh=!1,Dh!==null&&Rh(Dh)&&(Dh=null),Oh!==null&&Rh(Oh)&&(Oh=null),kh!==null&&Rh(kh)&&(kh=null),Ah.forEach(zh),jh.forEach(zh)}function Vh(e,n){e.blockedOn===n&&(e.blockedOn=null,Eh||(Eh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Bh)))}var Hh=null;function Uh(e){Hh!==e&&(Hh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Hh===e&&(Hh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Z(r||n)===null)continue;break}var a=Mt(n);a!==null&&(e.splice(t,3),t-=3,ec(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Wh(e){function t(t){return Vh(t,e)}Dh!==null&&Vh(Dh,e),Oh!==null&&Vh(Oh,e),kh!==null&&Vh(kh,e),Ah.forEach(t),jh.forEach(t);for(var n=0;n<Mh.length;n++){var r=Mh[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Mh.length&&(n=Mh[0],n.blockedOn===null);)Lh(n),n.blockedOn===null&&Mh.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[z]||null;if(typeof a==`function`)o||Uh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[z]||null)s=o.formAction;else if(Z(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Uh(n)}}}function Gh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Kh(e){this._internalRoot=e}qh.prototype.render=Kh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;hh(n,Fd(),e,t,null,null)},qh.prototype.unmount=Kh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;hh(e.current,2,null,e,null,null),Ud(),t[Ct]=null}};function qh(e){this._internalRoot=e}qh.prototype.unstable_scheduleHydration=function(e){if(e){var t=yt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Mh.length&&t!==0&&t<Mh[n].priority;n++);Mh.splice(n,0,e),n===0&&Lh(e)}};var Jh=n.version;if(Jh!==`19.3.1`)throw Error(i(527,Jh,`19.3.1`));R.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Yh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:L,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Xh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xh.isDisabled&&Xh.supportsFiber)try{Ye=Xh.inject(Yh),Xe=Xh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Sc,s=Cc,c=wc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ph(e,1,!1,null,null,n,r,null,o,s,c,Gh),e[Ct]=t.current,qf(e),new Kh(t)}})),_=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=c(d()),y=_(),b=[{id:`tier01`,name:`Kilobytes`,symbol:`KB`,baseCost:1e3,costResourceId:`base`,producesResourceId:`bytes`,baseTickSpeedSeconds:1},{id:`tier02`,name:`Megabytes`,symbol:`MB`,baseCost:1e6,costResourceId:`base`,producesResourceId:`tier01`,baseTickSpeedSeconds:2},{id:`tier03`,name:`Gigabytes`,symbol:`GB`,baseCost:1e9,costResourceId:`base`,producesResourceId:`tier02`,baseTickSpeedSeconds:3},{id:`tier04`,name:`Terabytes`,symbol:`TB`,baseCost:0xe8d4a51000,costResourceId:`base`,producesResourceId:`tier03`,baseTickSpeedSeconds:4},{id:`tier05`,name:`Petabytes`,symbol:`PB`,baseCost:0x38d7ea4c68000,costResourceId:`base`,producesResourceId:`tier04`,baseTickSpeedSeconds:5},{id:`tier06`,name:`Exabytes`,symbol:`EB`,baseCost:0xde0b6b3a7640000,costResourceId:`base`,producesResourceId:`tier05`,baseTickSpeedSeconds:6},{id:`tier07`,name:`Zettabytes`,symbol:`ZB`,baseCost:1e21,costResourceId:`base`,producesResourceId:`tier06`,baseTickSpeedSeconds:7},{id:`tier08`,name:`Yottabytes`,symbol:`YB`,baseCost:1e24,costResourceId:`base`,producesResourceId:`tier07`,baseTickSpeedSeconds:8},{id:`tier09`,name:`Ronnabytes`,symbol:`RB`,baseCost:1e27,costResourceId:`base`,producesResourceId:`tier08`,baseTickSpeedSeconds:9},{id:`tier10`,name:`Quettabytes`,symbol:`QB`,baseCost:1e30,costResourceId:`base`,producesResourceId:`tier09`,baseTickSpeedSeconds:10}],x=Object.assign(Object.create(null),Object.fromEntries(b.map(e=>[e.id,e]))),S=Object.assign(Object.create(null),Object.fromEntries(b.map((e,t)=>[e.id,t]))),C=Object.fromEntries(b.map(e=>[e.id,e.symbol])),w=Object.fromEntries(b.map(e=>[e.id,e.baseTickSpeedSeconds])),T=`bytes`,E=e=>e===`bytes`?`B`:C[e]||`b`,D=e=>w[e]??1,O=`base`,k=1e100,A=k*8,j=10**120*8,M=(e,t,n,r,i,a,o={})=>({id:t,layer:`F`,target:`${n===`tierTickspeed`?`⚙ `:``}${b[e].name}`,codename:r,automation:{kind:n,key:b[e].id},effect:i,rule:a,goal:A,levers:o}),ee=[M(0,`F1`,`tierAutobuyer`,`Half Duplex`,`halfDuplex`,`Kilobytes produce at half speed.`,{clockSpeedPower:.85}),M(1,`F2`,`tierAutobuyer`,`Write Lock`,`writeLock`,`Buying Megabytes pauses production briefly.`,{scaleUpPower:.9}),M(2,`F3`,`tierAutobuyer`,`Cascade Delete`,`cascadeDelete`,`Buying Gigabytes resets lower tiers' owned counts.`,{costMultiplier:6}),M(3,`F4`,`tierAutobuyer`,`Premium Tier`,`premiumTier`,`Terabytes cost ×1000.`,{clockSpeedPower:.85}),M(4,`F5`,`tierAutobuyer`,`Hard Refresh`,`hardRefresh`,`Petabytes owned resets every 5 min.`),M(5,`F6`,`tierAutobuyer`,`Address Space`,`addressSpace`,`Exabytes is the top tier.`,{scaleUpPower:3,clockSpeedPower:2}),M(6,`F7`,`tierAutobuyer`,`Single Instance`,`singleInstance`,`Scale Up never doubles Zettabytes.`,{costMultiplier:5}),M(7,`F8`,`tierAutobuyer`,`Memory Leak`,`memoryLeak`,`Yottabytes lose 1% owned per second.`),M(8,`F9`,`tierAutobuyer`,`Bit Rot`,`bitRot`,`Corruption grows exponentially; if it passes your Bits, the cycle restarts.`,{scaleUpPower:.85}),M(9,`F10`,`tierAutobuyer`,`Flat Rate`,`flatRate`,`Quettabytes get no level multiplier.`),M(0,`F11`,`tierTickspeed`,`Clock Gated`,`clockGated`,`Kilobytes tickspeed disabled.`,{clockSpeedPower:.4}),M(1,`F12`,`tierTickspeed`,`Half Step`,`halfStep`,`Megabytes tickspeed gives 5% per level, not 10%.`,{scaleUpPower:.75}),M(2,`F13`,`tierTickspeed`,`Clock Skew`,`clockSkew`,`Gigabytes delivery period ×2.`,{costMultiplier:10}),M(3,`F14`,`tierTickspeed`,`Rate Limit`,`rateLimit`,`Terabytes tickspeed capped at +3 levels.`,{scaleUpPower:.65,costMultiplier:3}),M(4,`F15`,`tierTickspeed`,`Clock Drift`,`clockDrift`,`Petabytes tickspeed loses a level every 10 min.`,{clockSpeedPower:.75,costMultiplier:10}),M(5,`F16`,`tierTickspeed`,`Egress Fees`,`egressFees`,`Exabytes tickspeed levels cost one level more.`,{costMultiplier:30}),M(6,`F17`,`tierTickspeed`,`Noisy Neighbour`,`noisyNeighbour`,`Each Zettabytes tickspeed level slows other tiers 2%.`,{production:.5,clockSpeedPower:.75}),M(7,`F18`,`tierTickspeed`,`Daisy Chain`,`daisyChain`,`Yottabytes tickspeed capped at Zettabytes' level.`,{scaleUpPower:.6}),M(8,`F19`,`tierTickspeed`,`Duty Cycle`,`dutyCycle`,`Ronnabytes tickspeed alternates 30 s on, 30 s off.`,{clockSpeedPower:.25}),M(9,`F20`,`tierTickspeed`,`Burn Rate`,`burnRate`,`Quettabytes tickspeed spends its full requirement.`,{production:.5,scaleUpPower:.75,costMultiplier:3}),{id:`F21`,layer:`F`,target:`Accelerate`,codename:`Base Clock`,automation:{kind:`global`,key:`speedUp`},effect:`clockSpeedDisabled`,rule:`Accelerate is disabled.`,goal:A},{id:`F22`,layer:`F`,target:`Scale Up`,codename:`Scale Out`,automation:{kind:`global`,key:`scaleUp`},effect:`scaleUpNoDoubling`,rule:`Scale Up doubles nothing.`,goal:A},{id:`F23`,layer:`F`,target:`Restage`,codename:`Code Freeze`,automation:{kind:`global`,key:`restage`},effect:`restageDisabled`,rule:`Restage disabled.`,goal:A,levers:{costMultiplier:250}},{id:`F24`,layer:`F`,target:`Overclock`,codename:`Stock Cooling`,automation:{kind:`global`,key:`overclock`},effect:`overclockDisabled`,rule:`Overclock is disabled.`,goal:A,levers:{scaleUpPower:.5,clockSpeedPower:.5}},{id:`F25`,layer:`F`,target:`Purge`,codename:`Scope Creep`,automation:{kind:`global`,key:`purge`},effect:`raisedGoal`,rule:`Higher Purge goal; no freeze at 1 Googol.`,goal:j,levers:{clockSpeedPower:.5}}],N=({production:e,clockSpeedPower:t,scaleUpPower:n,costMultiplier:r}={})=>[e!=null&&`Production ×${e}.`,t!=null&&`Accelerate ^${t}.`,n!=null&&`Scale Up ^${n}.`,r!=null&&`Costs ×${r}.`].filter(Boolean).join(` `),P=ee.map(e=>({...e,rule:[e.rule,N(e.levers)].filter(Boolean).join(` `)})),te=.5,ne=1e3,re=.01,F=1e3,ie=1e6,ae=.05,oe=.02,se=Object.fromEntries(P.map(e=>[e.id,e])),ce=new Set(P.map(e=>e.id)),I={enabled:!0},le={enabled:!0},ue=.05,de=e=>Math.max(5,e),fe=[1,2,3,4,5,6,7,8,9,10],pe=[{id:`firstSession`,name:`First session`,boostArea:`foundry`},{id:`foundry`,name:`Foundry`,boostArea:`foundry`},{id:`power`,name:`Power`,boostArea:`power`},{id:`tierLadder`,name:`Tier ladder`,boostArea:`factory`},{id:`earlyFactory`,name:`Early Factory`,boostArea:`factory`},{id:`levelPower`,name:`Level power`,boostArea:`factory`},{id:`overclockStep`,name:`Overclock step`,boostArea:`factory`},{id:`firstPurge`,name:`First Purge and after`,boostArea:`purgePoints`},{id:`latePurge`,name:`Late Purge layer`,boostArea:`purgePoints`},{id:`reboot`,name:`Reboot`,boostArea:`kernels`}],L=[`Kilo-what?`,`Mega bite`,`Giga-what now`,`Tera-fying`,`Peta-fied`,`Exa-ggerated`,`Zetta slow`,`Yotta be kidding me`,`Ronna-way process`,`Quetta while`],R=[1,3,6,8,b.length],me=[{arrayStepGain:.02},{arrayStepGain:.03},{lakeSpeed:.05},{lakeSpeed:.05},{syncedBitrate:!0}],he=e=>`${Math.round(e*1e3)/10}%`,ge=({arrayStepGain:e,lakeSpeed:t,syncedBitrate:n})=>{let r=[],i=[];return e&&(r.push(`Disk step ${he(e)}`),i.push(`Disk-size steps without a Flush Pool upgrade close ${he(e)} of the gap to 1.0 (was 1%)`)),t&&(r.push(`Lake speed +${he(t)}`),i.push(`Every Data Lake fills at +${he(t)} more of its pool's Bandwidth`)),n&&(r.push(`One Upgrade does both`),i.push(`Bitrate always matches Capacity: there is no separate Upgrade Bitrate, and every Upgrade raises both`)),{shortBonus:r.join(`, `),bonus:i.join(`. `)}},_e=[{id:`helloWorld`,name:`Hello, World`,group:`firstSession`,trigger:`Ping for the first time`,short:`Ping`,condition:{kind:`counter`,key:`pings`,min:1}},{id:`itCompiles`,name:`It compiles, ship it`,group:`firstSession`,trigger:`Compile for the first time`,short:`Compile`,condition:{kind:`byteCreated`}},{id:`pingOfDeath`,name:`Ping of Death`,group:`firstSession`,trigger:`Ping 256 times`,short:`Ping ×256`,condition:{kind:`counter`,key:`pings`,min:256}},{id:`kibiNotKilo`,name:`Kibi, not Kilo`,group:`firstSession`,trigger:`Reach 1 KiB Capacity`,short:`1 KiB Capacity`,condition:{kind:`storageUnlocked`}},...R.map((e,t)=>({id:`reclaim${t+1}`,name:`Reclamation ${[`I`,`II`,`III`,`IV`,`V`][t]}`,group:`foundry`,trigger:e===1?`Flush a Storage pool for the first time`:t===R.length-1?`Flush every Storage pool at least once`:`Flush ${e} different Storage pools`,short:e===1?`Flush a pool`:t===R.length-1?`Flush every pool`:`Flush ${e} pools`,...ge(me[t]),condition:{kind:`poolsCompacted`,min:e}})),...b.map((e,t)=>({id:`tier${String(t+1).padStart(2,`0`)}Bought`,name:L[t],group:`tierLadder`,trigger:`Buy your first ${e.name}`,short:`Buy ${e.symbol}`,condition:{kind:`tierPurchased`,tierId:e.id}})),{id:`quettaSpent`,name:`Spent QB`,group:`tierLadder`,trigger:`Restage while holding 0 Quettabytes`,short:`Restage at 0 QB`,shortBonus:`QB credited without balance`,bonus:`Quettabytes are credited regardless of balance: 1 every 10 s at 1 completed level, every 5 s at 10, every 3.33 s at 100`,condition:{kind:`counter`,key:`emptyRestages`,min:1}},{id:`tickTock`,name:`Tick tock`,group:`earlyFactory`,trigger:`Buy your first Accelerate level`,short:`Accelerate 1`,condition:{kind:`clockSpeedLevel`,min:1}},{id:`megahertzMyth`,name:`Megahertz myth`,group:`earlyFactory`,trigger:`Reach Accelerate level 10`,short:`Accelerate 10`,condition:{kind:`clockSpeedLevel`,min:10}},{id:`warrantyVoid`,name:`Warranty void`,group:`earlyFactory`,trigger:`Overclock for the first time`,short:`Overclock`,condition:{kind:`overclocked`}},...fe.map((e,t)=>({id:`levelPower${t+1}`,name:`${b[e-1].symbol} Level ${de(e)}`,group:`levelPower`,trigger:`Complete ${de(e)} levels on ${b[e-1].name}`,short:`${b[e-1].symbol} level ${de(e)}`,shortBonus:`+${ue} per-level multiplier`,bonus:`The per-level production multiplier rises by ${ue} (×1.0 → ×1.5 with all ten)`,condition:{kind:`tierLevel`,tierId:b[e-1].id,min:de(e)+1}})),{id:`overclockStep1`,name:`Patient Overclock`,group:`overclockStep`,short:`First Overclock at 6+`,shortBonus:`Overclock step −1`,trigger:`Claim the first Overclock of a Purge at 6+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level than the one before (+4 → +3)`,condition:{kind:`counter`,key:`maxFirstOverclock`,min:6}},{id:`overclockStep2`,name:`Overclock fast`,group:`overclockStep`,short:`2 Overclocks/Purge, no Accelerate`,shortBonus:`Overclock step −1`,trigger:`After Patient Overclock, claim two Overclocks in one Purge without buying any Accelerate`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+3 → +2)`,condition:{kind:`counter`,key:`acceleratelessOverclocks`,min:1}},{id:`overclockStep3`,name:`Beyond Googol`,group:`overclockStep`,short:`DeGoogol, Overclock at 12+`,shortBonus:`Overclock step −1`,trigger:`After Overclock fast and DeGoogol, claim an Overclock at 12+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+2 → +1)`,condition:{kind:`counter`,key:`overflowDeepOverclock`,min:1}},{id:`powerUser`,name:`Power user`,group:`power`,trigger:`Unlock the Power page`,short:`Unlock Power`,condition:{kind:`powerPageUnlocked`}},{id:`batteriesIncluded`,name:`Batteries included`,group:`power`,trigger:`Build your first Battery`,short:`First Battery`,condition:{kind:`computeEntityBuilt`,fromIndex:1}},{id:`turboButton`,name:`Turbo button`,group:`power`,trigger:`Activate your first Turbo Boost`,short:`First Turbo`,condition:{kind:`counter`,key:`turboBoosts`,min:1}},{id:`stackOverflow`,name:`Stack Overflow`,group:`power`,trigger:`Stack a Boost to its maximum`,short:`Max Boost stack`,condition:{kind:`counter`,key:`maxBoostStack`,min:1}},{id:`coldFusion`,name:`Cold fusion`,group:`power`,trigger:`Build your first Fusion`,short:`First Fusion`,condition:{kind:`computeEntityBuilt`,fromIndex:9}},{id:`justGoogolIt`,name:`Just Googol it`,group:`firstPurge`,trigger:`Reach 1 Googol Bytes`,short:`1 Googol Bytes`,condition:{kind:`googolReached`}},{id:`remindMeLater`,name:`Remind me later`,group:`firstPurge`,trigger:`Leave a Purge available but unclaimed for 60 seconds (pause Auto-Purge if you own it)`,short:`Purge pending 1 min`,condition:{kind:`counter`,key:`purgeWaitSeconds`,min:60}},{id:`startAllOver`,name:`Wait, do I start all over?`,group:`firstPurge`,trigger:`Purge for the first time`,short:`Purge`,condition:{kind:`lifetimePurges`,min:1}},{id:`tenTypes`,name:`There are 10 types of people`,group:`firstPurge`,trigger:`Purge at least 2 times`,short:`Purge ×2`,condition:{kind:`lifetimePurges`,min:2}},{id:`scriptKiddie`,name:`Script kiddie`,group:`firstPurge`,trigger:`Unlock your first autobuyer`,short:`First autobuyer`,condition:{kind:`autobuyers`,mode:`any`}},{id:`hex10`,name:`0x10`,group:`firstPurge`,trigger:`Purge at least 16 times`,short:`Purge ×16`,condition:{kind:`lifetimePurges`,min:16}},{id:`cronJob`,name:`Cron job`,group:`firstPurge`,trigger:`Unlock every tier autobuyer`,short:`All autobuyers`,condition:{kind:`autobuyers`,mode:`all`}},{id:`noHands`,name:`Look ma, no hands`,group:`firstPurge`,trigger:`Purge in a cycle with no manual tier purchase`,short:`Hands-free Purge`,condition:{kind:`counter`,key:`handsFreePurges`,min:1}},{id:`stillClicker`,name:`Oh, it's still a clicker game!`,group:`firstPurge`,trigger:`Ping while every tier autobuyer is unlocked`,short:`Ping, all automated`,condition:{kind:`counter`,key:`automatedPings`,min:1}},{id:`lossless`,name:`Lossless`,group:`latePurge`,trigger:`Buy your first Compression level`,short:`Compression 1`,condition:{kind:`doublePpLevel`,min:1}},{id:`middleOut`,name:`Middle-out`,group:`latePurge`,trigger:`Reach Compression level 5`,short:`Compression 5`,condition:{kind:`doublePpLevel`,min:5}},{id:`zipBomb`,name:`Zip bomb`,group:`latePurge`,trigger:`Compress until 1 power earns 1 PP`,short:`1 power per PP`,condition:{kind:`onePowerPerPp`}},{id:`whileTrue`,name:`while (true)`,group:`latePurge`,trigger:`Run Auto-Purge at a 1 second interval`,short:`Auto-Purge 1 s`,condition:{kind:`fastAutoPurge`}},{id:`notABug`,name:`It's not a bug, it's a feature`,group:`latePurge`,trigger:`Pass 1 Googol Bytes in Overflow mode`,short:`Googol in Overflow`,condition:{kind:`overflowPastGoogol`}},{id:`bit64`,name:`64-bit upgrade`,group:`latePurge`,trigger:`Purge at least 64 times`,short:`Purge ×64`,condition:{kind:`lifetimePurges`,min:64}},{id:`someoneElsesComputer`,name:`The cloud is just someone else's computer`,group:`latePurge`,trigger:`Buy your first Supercloud`,short:`First Supercloud`,condition:{kind:`superCloudOwned`}},{id:`offAndOn`,name:`Have you tried turning it off and on again?`,group:`reboot`,trigger:`Reboot for the first time`,short:`Reboot`,condition:{kind:`eraCount`,min:1}},{id:`rmRf`,name:`rm -rf`,group:`reboot`,trigger:`Reformat the Byte Foundry`,short:`Reformat Foundry`,condition:{kind:`counter`,key:`reformats`,min:1}},{id:`kernelPanic`,name:`Kernel panic`,group:`reboot`,trigger:`Reboot twice within an hour of play`,short:`Reboot ×2 in 1 h`,condition:{kind:`counter`,key:`quickReboots`,min:1}},{id:`popcorn`,name:`Popcorn`,group:`reboot`,trigger:`Earn 100 Kernels in total`,short:`100 Kernels`,condition:{kind:`kernelsEarned`,min:100}}].map(e=>({secret:!1,platformDependent:!1,bonus:null,short:null,shortBonus:null,...e})),ve=[{id:`ping`,name:`Ping`,members:[`helloWorld`,`pingOfDeath`]},{id:`poolReset`,name:`Reclamation`,members:R.map((e,t)=>`reclaim${t+1}`)},{id:`tierBought`,name:`First purchase`,members:b.map((e,t)=>`tier${String(t+1).padStart(2,`0`)}Bought`)},{id:`accelerate`,name:`Accelerate`,members:[`tickTock`,`megahertzMyth`]},{id:`levelPower`,name:`Level power`,members:fe.map((e,t)=>`levelPower${t+1}`)},{id:`overclockStep`,name:`Overclock step`,members:[`overclockStep1`,`overclockStep2`,`overclockStep3`]}],ye=Object.fromEntries(ve.flatMap(e=>e.members.map((t,n)=>[t,{...e,level:n+1}]))),be=Object.fromEntries(_e.map(e=>[e.id,e])),xe=1024,Se=1e3,Ce=8*Se**2/10,we=(e=1)=>({startBits:8,endBits:8/10*Se**(Math.max(1,Math.floor(Number(e)||1))+1)}),Te=.5,Ee=.9,De=8e3,Oe=1e3,ke=8*xe,Ae=8e3,je=Ce/2,Me=[{inputField:`computeCores`,outputField:`computeNodes`,autoFlagField:`autoMergeCoresIntoNode`,timerField:`computeCoresMergeRemainingSeconds`,label:`Cells→Batteries`},{inputField:`computeNodes`,outputField:`computeClusters`,autoFlagField:`autoMergeNodesIntoCluster`,timerField:`computeNodesMergeRemainingSeconds`,label:`Batteries→Packs`},{inputField:`computeClusters`,outputField:`computeNetworks`,autoFlagField:`autoMergeClustersIntoNetwork`,timerField:`computeClustersMergeRemainingSeconds`,label:`Packs→Banks`},{inputField:`computeNetworks`,outputField:`computeGrids`,autoFlagField:`autoMergeNetworksIntoGrid`,timerField:`computeNetworksMergeRemainingSeconds`,label:`Banks→Generators`},{inputField:`computeGrids`,outputField:`computeFabrics`,autoFlagField:`autoMergeGridsIntoFabric`,timerField:`computeGridsMergeRemainingSeconds`,label:`Generators→Turbines`},{inputField:`computeFabrics`,outputField:`computeClouds`,autoFlagField:`autoMergeFabricsIntoCloud`,timerField:`computeFabricsMergeRemainingSeconds`,label:`Turbines→Plants`},{inputField:`computeClouds`,outputField:`computeDatacenters`,autoFlagField:`autoMergeCloudsIntoDatacenter`,timerField:`computeCloudsMergeRemainingSeconds`,label:`Plants→Grids`},{inputField:`computeDatacenters`,outputField:`computeSupercomputers`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,timerField:`computeDatacentersMergeRemainingSeconds`,label:`Grids→Reactors`},{inputField:`computeSupercomputers`,outputField:`computeMegacomputers`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,timerField:`computeSupercomputersMergeRemainingSeconds`,label:`Reactors→Fusions`}],Ne={burst:{multiplier:20,durationSeconds:600,poolBonusPercent:200},standard:{multiplier:5,durationSeconds:3600,poolBonusPercent:50},sustain:{multiplier:2,durationSeconds:36e3,poolBonusPercent:10}},Pe=[`Cells`,`Batteries`,`Packs`,`Banks`,`Generators`,`Turbines`,`Plants`,`Grids`,`Reactors`,`Fusions`],Fe=[`computeCores`,`computeNodes`,`computeClusters`,`computeNetworks`,`computeGrids`,`computeFabrics`,`computeClouds`,`computeDatacenters`,`computeSupercomputers`,`computeMegacomputers`],Ie=[1,10,100],Le=[9,9,9],Re=1e3,ze=[1,10,100,Re],Be=[`KB`,`MB`,`GB`,`TB`,`PB`,`EB`,`ZB`,`YB`,`RB`,`QB`],Ve=10*Ie.length,He=[1,10,100,1e3],Ue=.5,We=86400,Ge=14400,Ke=14400,qe=[4,40,400,4e3,4e4],Je=2e3,Ye=1024,Xe=1.1,Ze=.01,Qe=.1,$e=Math.floor(Math.log2(Ye)),et=.9,tt=.01,nt={speedUp:8,scaleUp:16,restage:32,overclock:64,purge:128},rt={speedUp:{baseCost:8,baseSeconds:1},scaleUp:{baseCost:16,baseSeconds:64},restage:{baseCost:32,baseSeconds:128},overclock:{baseCost:32,baseSeconds:256},purge:{baseCost:64,baseSeconds:1024}},it={baseCost:100,baseSeconds:16},at=.01,ot=.1,st=.01,ct=.01,lt=.1,ut=1e3,dt=1e30,ft=1e-4,pt=[{id:`flop01`,name:`Cores`,outputLabel:`KFlops`,symbol:`KF`,baseCostPP:1e3,boostsTierId:`tier01`},{id:`flop02`,name:`Chips`,outputLabel:`MFlops`,symbol:`MF`,baseCostPP:1e6,boostsTierId:`tier02`},{id:`flop03`,name:`Servers`,outputLabel:`GFlops`,symbol:`GF`,baseCostPP:1e9,boostsTierId:`tier03`},{id:`flop04`,name:`Racks`,outputLabel:`TFlops`,symbol:`TF`,baseCostPP:0xe8d4a51000,boostsTierId:`tier04`},{id:`flop05`,name:`Pods`,outputLabel:`PFlops`,symbol:`PF`,baseCostPP:0x38d7ea4c68000,boostsTierId:`tier05`},{id:`flop06`,name:`Clusters`,outputLabel:`EFlops`,symbol:`EF`,baseCostPP:0xde0b6b3a7640000,boostsTierId:`tier06`},{id:`flop07`,name:`Datacenters`,outputLabel:`ZFlops`,symbol:`ZF`,baseCostPP:1e21,boostsTierId:`tier07`},{id:`flop08`,name:`Regions`,outputLabel:`YFlops`,symbol:`YF`,baseCostPP:1e24,boostsTierId:`tier08`},{id:`flop09`,name:`Clouds`,outputLabel:`RFlops`,symbol:`RF`,baseCostPP:1e27,boostsTierId:`tier09`},{id:`flop10`,name:`Superclouds`,outputLabel:`QFlops`,symbol:`QF`,baseCostPP:1e30,boostsTierId:`tier10`}],mt=Object.assign(Object.create(null),Object.fromEntries(pt.map(e=>[e.id,e]))),ht=Object.assign(Object.create(null),Object.fromEntries(pt.map((e,t)=>[e.id,t]))),gt=k,_t=[0,10,60,600,3600,21600,86400],vt=[0,1.5,2,5,10,100],yt=1e-5,bt=[{id:`hyperscalerEfficiency`,levelField:`hyperscalerEfficiencyLevel`,costBase:1,costGrowth:10,maxLevel:10},{id:`eonAmplifier`,levelField:`eonAmplifierLevel`,costBase:10,costGrowth:10,maxLevel:9}],xt=Object.assign(Object.create(null),Object.fromEntries(bt.map(e=>[e.id,e]))),St=()=>b[b.length-1].id,z=e=>Math.max(0,Number.isFinite(e)?e:0),Ct=()=>({cycleSeconds:0,refreshes:0,haltSeconds:0,leakRemainder:0}),wt=1e-9,Tt=1e-9,Et=()=>{let e=new Set([O]);return b.forEach(t=>{e.add(t.costResourceId),t.producesResourceId!==`bytes`&&e.add(t.producesResourceId)}),[...e]},Dt=()=>({depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,purchased:0,boostersUnlocked:!1,autoConvertActive:!1,capacityLevel:0,boosterAuto:!1,resetCount:0,rebuilding:!1,bandwidthSteps:0}),Ot=()=>{let e={};for(let t=1;t<=10;t+=1)e[t]=Dt();return e},kt=()=>({resources:Et().reduce((e,t)=>({...e,[t]:+(t===`base`)}),{}),owned:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchased:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchaseLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),purchaseLevelProgress:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyers:b.reduce((e,t)=>({...e,[t.id]:null}),{}),autobuyersEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tickspeedLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),autobuyerAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyerIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationIntervalLevels:{speedUp:0,scaleUp:0,restage:0,overclock:0,purge:0},tierTickspeedIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationAttemptBudgets:{speedUp:0,scaleUp:0,restage:0,overclock:0},tierTickspeedAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autoOverclock:!1,autoOverclockEnabled:!0,computeAutoChargeEnabled:!0,tierTickspeedAutobuyer:b.reduce((e,t)=>({...e,[t.id]:!1}),{}),tierTickspeedAutobuyerEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tierProductionAccumulators:b.reduce((e,t)=>({...e,[t.id]:0}),{}),lastTierLevelCreditTimer:0,accelerateBoughtThisCycle:!1,manualPurchaseThisCycle:!1,autoPurge:null,autoPurgeEnabled:!0,autoPurgeSettings:{targetPpExponent:0,minSeconds:0,bestMultiplier:0},globalTickspeedMultiplier:null,autoPurgeAttemptBudget:0,challenges:{active:null,activeSeconds:0,completed:{},bestSeconds:{},enteredCount:0,exitedCount:0,bitRotLosses:0,run:Ct()},achievements:{earned:{},counters:{pings:0}},daily:{runs:{},results:{}},prestigeDoublePpLevel:0,playtimeBonusUnlocked:!1,buyMaxUnlocked:!1,sleepModeCapLevel:0,cacheWarmUnlocked:!1,prestigeSpeedBonusUnlocked:!1,speedBonusGrandfathered:!0,activePlaySeconds:0,scaleUpCount:0,scaleUpTierCounts:Object.fromEntries(b.map(e=>[e.id,0])),scaleUpTargetTierIndex:0,overclockLastClaimCompletedLevels:null,autoScaleUp:!1,autoXpTickspeed:!1,autoXpTickspeedEnabled:!0,computeAutoBoostUnlocked:!1,autoScaleUpEnabled:!0,autoGlobalTickspeed:!1,autoGlobalTickspeedEnabled:!0,lastTierXpConsumed:0,everUnlockedTierIds:b.reduce((e,t,n)=>({...e,[t.id]:n===0}),{}),purge:{xp:0,points:0,count:0,highestMilestone:yi(1),cycleSeconds:0,highestAward:0,unboundedUnlocked:!1},era:{count:0},eons:{balance:0},hyperscalerCount:0,eonsUpgrades:{autoHyperscalerUnlocked:!1,autoHyperscalerEnabled:!0,eonAmplifierLevel:0,hyperscalerEfficiencyLevel:0},computeFlopsAutobuyers:pt.reduce((e,t)=>({...e,[t.id]:null}),{}),computeFlopsAutobuyersEnabled:pt.reduce((e,t)=>({...e,[t.id]:!0}),{}),computeFlopsAutobuyerAttemptBudgets:pt.reduce((e,t)=>({...e,[t.id]:0}),{}),prestigeMuseum:{history:[],pinnedIds:[]},computeFlops:{pageUnlocked:!1,owned:pt.reduce((e,t)=>({...e,[t.id]:0}),{}),cumulativeBoost:b.reduce((e,t)=>({...e,[t.id]:0}),{})},intro:{bits:0,capacity:8,byteCreated:!1,foundryResetCaps:null,lowerRebuild:null,mainGameUnlocked:!1,capacityUpgradeQueued:!1,capacityUpgradeProgress:0,speedUpgradeQueued:!1,speedUpgradeProgress:0,unlockedDiskSteps:1,poolExponentBonuses:{},disks:{},disksBuiltTotal:{},diskCache:{},diskReadCacheFlush:{},diskWriteCache:{},diskBuild:null,diskProvisionPasses:{},diskBuildQueued:!1,diskBuildQueuedByReplay:!1,poolBuffers:{},dataLakes:Ot(),poolResetRebuildingCount:0,poolResetCount:0,computeCores:0,computeCoresEverEarned:0,computeNodes:0,computeClusters:0,computeNetworks:0,computeGrids:0,computeFabrics:0,computeClouds:0,computeDatacenters:0,computeSupercomputers:0,computeMegacomputers:0,computeMergePageUnlocked:!1,chargerUnlockProgress:{},autoMergeCoresIntoNode:!1,autoMergeNodesIntoCluster:!1,autoMergeClustersIntoNetwork:!1,autoMergeNetworksIntoGrid:!1,autoMergeGridsIntoFabric:!1,autoMergeFabricsIntoCloud:!1,autoMergeCloudsIntoDatacenter:!1,autoMergeDatacentersIntoSupercomputer:!1,autoMergeSupercomputersIntoMegacomputer:!1,computeCoresMergeRemainingSeconds:0,computeNodesMergeRemainingSeconds:0,computeClustersMergeRemainingSeconds:0,computeNetworksMergeRemainingSeconds:0,computeGridsMergeRemainingSeconds:0,computeFabricsMergeRemainingSeconds:0,computeCloudsMergeRemainingSeconds:0,computeDatacentersMergeRemainingSeconds:0,computeSupercomputersMergeRemainingSeconds:0,computeChargeSeconds:{},computeAutoBoostType:`standard`,computeAutoBoostEnabled:!0,computeBoosts:{},dataStreamTapBonusPercent:0,poolTapBonusPercents:{}}}),At=new Intl.NumberFormat(`en-US`),jt=new Intl.NumberFormat(`en-US`,{maximumFractionDigits:0}),Mt=1e4,Nt=1e3,Pt=1+1e-12,Ft=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t*Pt;n>=10&&(n/=10,t+=1),n<1&&(n*=10,--t);let r=Math.floor(n*Nt)/Nt;return`${Number(r.toFixed(3))}e${t}`},B=e=>{let t=z(e);return t<Mt?At.format(t):Ft(t)},It=1e-9,Lt=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t;return Math.abs(n-8)>It?null:`${Ft(10**t)} ${E(T)}`},Rt=e=>{let t=Math.floor(z(e)),n=E(O);return t<Mt?`${jt.format(t)} ${n}`:Lt(t)??`${Ft(t)} ${n}`},zt=e=>{let t=Math.floor(z(e)),n=E(T);return t<Mt?`${jt.format(t)} ${n}`:`${Ft(t)} ${n}`},Bt=8e3,Vt=e=>{let t=Math.floor(z(e));if(t<Bt)return Rt(t);let n=Math.floor(t/8);return n<Mt?`${jt.format(n)} B`:`${Ft(n)} B`},Ht=e=>{let t=z(e);return t===0?1:2+(t-1)*t/2},Ut=e=>{let t=e.purchaseLevels?.[St()]??1,n=Math.max(0,t-1);return 8+1*Math.floor(n/100)},Wt=(e,t)=>{let n=S[e?.id];if(n===void 0)return Ht(t);let r=z(t);if(r<=2)return r+1;let i=r-2,a=Math.floor(i/10),o=i-a*10,s=10*(a*(a-1))/2+a*o;return 3+(n+1)*i+s},Gt=(e,t)=>{let n=Math.max(0,t-1);return e.baseCost*10**(Wt(e,n)-1)},Kt=(e,t,n)=>{let r=Math.max(0,z(e)-z(t));return Math.max(0,Math.min(z(n),r))},qt=(e,t,n,r,i)=>Gt(e,t)*Kt(n,r,i),Jt=(e,t,n,r,i,a)=>{let o=Kt(n,r,a),s=Gt(e,t);return s<=0?o:Math.min(o,Math.floor(z(i)/s))},Yt=e=>10**(10-Math.min(b.length-1,Math.max(0,e))),Xt=(e,t)=>Yt(Math.max(0,S[e]??-1))**Math.max(0,z(t)-1),Zt=(e,t)=>Xt(e,t),Qt=e=>1+Math.max(0,S[e]??-1)*1,$t=e=>11+Math.max(0,S[e]??-1)*1,en=e=>{let t=z(e.purge?.count??0),n=!1,r={...e.autobuyers},i={...e.tierTickspeedAutobuyer};b.forEach(e=>{(r[e.id]??null)===null&&t>=Qt(e.id)&&(r[e.id]=1,n=!0),!i[e.id]&&t>=$t(e.id)&&(i[e.id]=!0,n=!0)});let a={};return!e.autoGlobalTickspeed&&t>=nt.speedUp&&(a.autoGlobalTickspeed=!0),!e.autoXpTickspeed&&t>=nt.restage&&(a.autoXpTickspeed=!0),!e.autoScaleUp&&t>=nt.scaleUp&&(a.autoScaleUp=!0),!e.autoOverclock&&t>=nt.overclock&&(a.autoOverclock=!0),(e.autoPurge??null)===null&&t>=nt.purge&&(a.autoPurge=1),!n&&Object.keys(a).length===0?e:{...e,...a,autobuyers:r,tierTickspeedAutobuyer:i}},tn=(e,t=Qe)=>(1+t)**z((e??1)-1),nn=e=>10**(z(e)+1),rn=e=>nn(e)*8,an=e=>(e.resources?.base??0)>=rn(e.globalTickspeedMultiplier??0),on=e=>(e.purchaseLevels?.[b[0].id]??1)>=2||(e.globalTickspeedMultiplier??null)!==null,sn=(e,t=0)=>{let n=z(e??0);return(1+at*Lr(t))**n},cn=e=>(e.scaleUpTierCounts?.[ei(e).id]??0)>=1,ln=e=>(1+ct)**z(e),un=e=>Math.max(1,Math.ceil(lt*z(e))),dn=(e,t=!0)=>{let n=z(e);return!t||n<1?1:n<2?Xe:1+Math.log10(n)},fn=e=>!!e.prestigeSpeedBonusUnlocked,pn=e=>{if(e.prestigeSpeedBonusUnlocked||z(e.purge.points)<1)return e;let t=Dn(e);return{...t,purge:{...t.purge,points:t.purge.points-1},prestigeSpeedBonusUnlocked:!0}},mn=e=>e.playtimeBonusUnlocked?1+Ze*(z(e.activePlaySeconds??0)/3600):1,hn=e=>{if(e.playtimeBonusUnlocked||z(e.purge.points)<100)return e;let t=Dn(e);return{...t,purge:{...t.purge,points:t.purge.points-100},playtimeBonusUnlocked:!0}},gn=e=>{if(e.buyMaxUnlocked||z(e.purge.points)<2)return e;let t=Dn(e);return{...t,purge:{...t.purge,points:t.purge.points-2},buyMaxUnlocked:!0}},_n=e=>{if(e.cacheWarmUnlocked||z(e.purge.points)<20)return e;let t=Dn(e);return yn({...t,purge:{...t.purge,points:t.purge.points-20},cacheWarmUnlocked:!0})},vn=e=>b[Math.min(b.length,Math.max(1,Ia(e)))-1],yn=e=>{if(!e.cacheWarmUnlocked||Gr(e))return e;let t=vn(e).id;if((e.purchaseLevels?.[t]??1)>1)return e;let n=Math.max(0,Ut(e)-(e.purchaseLevelProgress?.[t]??0));return{...e,resources:{...e.resources,[t]:(e.resources[t]??0)+n},owned:{...e.owned,[t]:(e.owned[t]??0)+n},purchased:{...e.purchased,[t]:Ki(e,t)+n},purchaseLevels:{...e.purchaseLevels,[t]:2},purchaseLevelProgress:{...e.purchaseLevelProgress,[t]:0}}},bn=qe.length,xn=e=>Math.min(bn,Math.floor(z(e?.sleepModeCapLevel??0))),Sn=e=>Math.min(We,Ge+Ke*xn(e)),Cn=e=>qe[e]??null,wn=e=>{let t=xn(e),n=Cn(t);if(n===null||z(e.purge.points)<n)return e;let r=Dn(e);return{...r,purge:{...r.purge,points:r.purge.points-n},sleepModeCapLevel:t+1}},Tn=e=>t=>({...t,activePlaySeconds:z(t.activePlaySeconds??0)+z(e)}),En=e=>!!e.computeFlops?.pageUnlocked||z(e.purge?.points??0)>=100,Dn=e=>e.computeFlops?.pageUnlocked||z(e.purge?.points??0)<100?e:{...e,computeFlops:{...e.computeFlops,pageUnlocked:!0}},On=(e,t,n)=>{let r=mt[t];if(!r)return{affordable:0,totalCost:0};let i=z(e.computeFlops?.owned?.[t]??0),a=z(e.purge?.points??0);if(a===1/0)return{affordable:n,totalCost:0};let o=0,s=0,c=i;for(;o<n;){let e=An(r,c);if(a<e)break;a-=e,s+=e,o++,c++}return{affordable:o,totalCost:s}},kn=(e,t,n)=>r=>{if(t<=0)return r;let i=Dn(r),a=z(i.computeFlops?.owned?.[e]??0);return{...i,purge:{...i.purge,points:(i.purge?.points??0)-n},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:a+t}}}},An=(e,t=0)=>{let n=t+1;return Gt({baseCost:e.baseCostPP},n)},jn=(e,t)=>{let n=mt[t];if(!n)return!1;let r=An(n,z(e.computeFlops?.owned?.[t]??0));return z(e.purge?.points??0)>=r},Mn=(e,t,n,r)=>{if(n===1/0)return{affordable:r,totalCost:0};let i=0,a=n,o=t;for(;i<r;){let t=An(e,o);if(a>=t)a-=t,i++,o++;else break}return{affordable:i,totalCost:n-a}},Nn=(e,t=1)=>n=>{let r=mt[e];if(!r)return n;let i=Dn(n),a=z(i.computeFlops?.owned?.[e]??0),{affordable:o,totalCost:s}=Mn(r,a,z(i.purge?.points??0),t);return o===0?n:{...i,purge:{...i.purge,points:i.purge.points-s},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:z(a+o)}}}},Pn=e=>10**z(e),Fn=e=>pt.reduce((t,n,r)=>t+z(e.computeFlops?.cumulativeBoost?.[n.boostsTierId]??0)*Pn(r),0),In=e=>{let t=z(e.hyperscalerCount??0);return t<=0?0:t*(ft+z(e.eonsUpgrades?.hyperscalerEfficiencyLevel??0)*yt)},Ln=(e,t)=>1+z(e.computeFlops?.cumulativeBoost?.[t]??0),Rn=e=>{let t=z(e);return t===0?`0 Flops`:`${B(t)} Flops`},zn=e=>t=>{if(e<=0)return Dn(t);let n=Dn(t),r=n.computeFlops?.owned??{},i=!1,a={...n.computeFlops.cumulativeBoost},o=In(n)*e;return pt.forEach(t=>{let n=z(r[t.id]??0)*ft*e+o;if(n<=0)return;let s=t.boostsTierId;a[s]=z((a[s]??0)+n),i=!0}),i?{...n,computeFlops:{...n.computeFlops,cumulativeBoost:a}}:n},Bn=e=>z(e.purge?.points??0)>=gt,Vn=e=>10**z(e.eonsUpgrades?.eonAmplifierLevel??0),Hn=e=>1*10**z(e),Un=e=>z(e.eons?.balance??0)>=Hn(e.hyperscalerCount??0),Wn=e=>{if(!Un(e))return e;let t=Hn(e.hyperscalerCount??0);return{...e,eons:{...e.eons,balance:z(e.eons.balance)-t},hyperscalerCount:z(e.hyperscalerCount??0)+1}},Gn=(e,t)=>{let n=xt[t];return n?z(e.eonsUpgrades?.[n.levelField]??0):0},Kn=(e,t)=>{let n=xt[e];return n?n.costBase*n.costGrowth**z(t):1/0},qn=(e,t)=>{let n=xt[t];return!n||n.maxLevel!=null&&Gn(e,t)>=n.maxLevel},Jn=(e,t)=>!qn(e,t)&&z(e.eons?.balance??0)>=Kn(t,Gn(e,t)),Yn=e=>t=>{if(!Jn(t,e))return t;let n=xt[e],r=Gn(t,e);return{...t,eons:{...t.eons,balance:z(t.eons.balance)-Kn(e,r)},eonsUpgrades:{...t.eonsUpgrades,[n.levelField]:r+1}}},Xn=e=>!e.eonsUpgrades?.autoHyperscalerUnlocked&&z(e.eons?.balance??0)>=100,Zn=e=>Xn(e)?{...e,eons:{...e.eons,balance:z(e.eons.balance)-100},eonsUpgrades:{...e.eonsUpgrades,autoHyperscalerUnlocked:!0}}:e,Qn=e=>t=>{let n=!!e;return(t.eonsUpgrades?.autoHyperscalerEnabled??!0)===n?t:{...t,eonsUpgrades:{...t.eonsUpgrades,autoHyperscalerEnabled:n}}},$n=e=>{if(!e.eonsUpgrades?.autoHyperscalerUnlocked||!(e.eonsUpgrades.autoHyperscalerEnabled??!0))return e;let t=e;for(;Un(t);)t=Wn(t);return t},er=e=>1+Math.max(0,ht[e]??-1)*1,tr=e=>{let t=z(e.era?.count??0),n=!1,r={...e.computeFlopsAutobuyers};return pt.forEach(e=>{(r[e.id]??null)===null&&t>=er(e.id)&&(r[e.id]=1,n=!0)}),n?{...e,computeFlopsAutobuyers:r}:e},nr=(e,t)=>n=>!pt.some(t=>t.id===e)||(n.computeFlopsAutobuyers?.[e]??null)===null?n:{...n,computeFlopsAutobuyersEnabled:{...n.computeFlopsAutobuyersEnabled,[e]:t}},rr=e=>t=>{if(e<=0)return t;let n=t;return pt.forEach(t=>{if((n.computeFlopsAutobuyers?.[t.id]??null)===null||!(n.computeFlopsAutobuyersEnabled?.[t.id]??!0))return;let r=(n.computeFlopsAutobuyerAttemptBudgets?.[t.id]??0)+e,i=Math.floor(r+wt);if(i>=1){let{affordable:e,totalCost:a}=On(n,t.id,i);e>0&&(n=kn(t.id,e,a)(n),r-=e)}n={...n,computeFlopsAutobuyerAttemptBudgets:{...n.computeFlopsAutobuyerAttemptBudgets,[t.id]:r}}}),n},ir=(e,t)=>{let n=!!e.intro?.byteCreated;return{...t.intro,byteCreated:n,bits:0,mainGameUnlocked:e.intro?.mainGameUnlocked??t.intro.mainGameUnlocked,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},foundryResetCaps:{},chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??t.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??t.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??t.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??t.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??t.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??t.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??t.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??t.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??t.intro.autoMergeSupercomputersIntoMegacomputer,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??t.intro.computeMergePageUnlocked,computeAutoBoostType:e.intro?.computeAutoBoostType??t.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??t.intro.computeAutoBoostEnabled}},ar=[`computeCores`,`computeNodes`,`computeClusters`,`computeNetworks`,`computeGrids`,`computeFabrics`,`computeClouds`,`computeDatacenters`,`computeSupercomputers`,`computeMegacomputers`],or=e=>Math.max(e.achievements?.counters?.purges??0,e.purge?.count??0),sr=(e,t,n=1,r=`add`)=>{if(!I.enabled)return e;let i=e.achievements??kt().achievements,a=i.counters?.[t]??0,o=r===`max`?Math.max(a,n):r===`set`?n:a+n;return o===a&&i.counters?.[t]!==void 0?e:br({...e,achievements:{...i,counters:{...i.counters,[t]:o}}})},cr=e=>b.every(t=>(e.autobuyers?.[t.id]??null)!==null),lr=e=>ur(e.intro),ur=e=>{let t=0;for(let n=1;n<=10;n+=1)Number(e?.poolExponentBonuses?.[n])>=1&&(t+=1);return t},dr=e=>{let t=ur(e);return R.filter(e=>t>=e).length},fr=(e,t)=>{let n=me.slice(0,dr(e)).filter(e=>e.arrayStepGain);return n.length?n.at(-1).arrayStepGain:t},pr=(e,t)=>{switch(t.kind){case`counter`:return(e.achievements?.counters?.[t.key]??0)>=t.min;case`byteCreated`:return!!e.intro?.byteCreated;case`storageUnlocked`:return!!e.intro?.mainGameUnlocked||Do(e);case`tierPurchased`:return(e.purchased?.[t.tierId]??0)>0||(e.purchaseLevels?.[t.tierId]??1)>1;case`clockSpeedLevel`:return(e.globalTickspeedMultiplier??0)>=t.min;case`overclocked`:return e.overclockLastClaimCompletedLevels!=null;case`tierLevel`:return(e.purchaseLevels?.[t.tierId]??1)>=t.min;case`poolsCompacted`:return lr(e)>=t.min;case`lifetimePurges`:return or(e)>=t.min;case`kernelsEarned`:return Math.max(e.achievements?.counters?.kernelsEarned??0,e.eons?.balance??0)>=t.min;case`eraCount`:return(e.era?.count??0)>=t.min;case`doublePpLevel`:return(e.prestigeDoublePpLevel??0)>=t.min;case`onePowerPerPp`:return Oi(e.prestigeDoublePpLevel??0)<=1;case`googolReached`:return(e.resources?.base??0)>=8e100||or(e)>0||(e.era?.count??0)>0;case`fastAutoPurge`:return(e.autoPurge??null)!==null&&Ed(e,`purge`)<=1;case`overflowPastGoogol`:return(e.achievements?.counters?.overflowPurges??0)>=1||Ur(e)&&(e.resources?.base??0)>=8e100;case`superCloudOwned`:return(e.computeFlops?.owned?.flop10??0)>=1;case`powerPageUnlocked`:return Ml(e)||!!e.intro?.computeMergePageUnlocked||(e.intro?.computeCoresEverEarned??0)>0||ar.some(t=>(e.intro?.[t]??0)>0);case`computeEntityBuilt`:return ar.slice(t.fromIndex).some(t=>(e.intro?.[t]??0)>0);case`autobuyers`:{let n=b.map(t=>(e.autobuyers?.[t.id]??null)!==null);return t.mode===`all`?n.every(Boolean):n.some(Boolean)}default:return!1}},mr=(e,t)=>{if(t.min<=1)return null;switch(t.kind){case`counter`:return t.key===`maxFirstOverclock`?null:{current:e.achievements?.counters?.[t.key]??0,target:t.min};case`kernelsEarned`:return{current:Math.max(e.achievements?.counters?.kernelsEarned??0,e.eons?.balance??0),target:t.min};case`lifetimePurges`:return{current:or(e),target:t.min};case`clockSpeedLevel`:return{current:e.globalTickspeedMultiplier??0,target:t.min};case`tierLevel`:return{current:Math.max(0,(e.purchaseLevels?.[t.tierId]??1)-1),target:t.min-1};case`poolsCompacted`:return{current:lr(e),target:t.min};case`storageUnlocked`:{let t=e=>Math.log2(Math.max(e,8)/8);return{current:Math.floor(t(e.intro?.capacity??0)),target:t(ke)}}default:return null}},hr=e=>e.bonus??null,gr=e=>e.short??e.trigger,_r=e=>e.shortBonus??e.bonus??null,vr=e=>e>=1?Math.max(st,10/(1+Math.log10(e))):1/0,yr=(e,t)=>!!e.achievements?.earned?.[t],br=e=>{if(!I.enabled)return e;let t=_e.filter(t=>!yr(e,t.id)&&pr(e,t.condition));if(t.length===0)return e;let n={...e.achievements?.earned};for(let e of t)n[e.id]=!0;return{...e,achievements:{counters:{pings:0},...e.achievements,earned:n}}},xr=e=>pe.filter(t=>{let n=_e.filter(e=>e.group===t.id);return n.length>0&&n.every(t=>yr(e,t.id))}).map(e=>e.id),Sr=.1,Cr=(e,t)=>{let n=_e.filter(e=>e.group===t&&!e.platformDependent),r=n.filter(t=>yr(e,t.id)).length,i=n.length>0&&r===n.length,a=Math.ceil(n.length*Sr);return{earned:r,bonus:i?a:0,total:n.length+a,complete:i}},wr=e=>pe.reduce((t,n)=>{let{earned:r,bonus:i}=Cr(e,n.id);return t+r+i},0),Tr=e=>{if(!Bn(e))return e;let t=kt(),n=Vn(e),r=z(e.era?.count??0)+1,i=Ur(e);return yn(tr({...t,prestigeMuseum:e.prestigeMuseum??t.prestigeMuseum,intro:ir(e,t),autobuyers:e.autobuyers??t.autobuyers,autobuyersEnabled:e.autobuyersEnabled??t.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??t.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??t.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??t.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??t.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??t.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??t.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??t.autoPurgeEnabled,autoPurgeSettings:e.autoPurgeSettings??t.autoPurgeSettings,autoScaleUp:e.autoScaleUp??t.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??t.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??t.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??t.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??t.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??t.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??t.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??t.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??t.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??t.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??t.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??t.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??t.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??t.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??t.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??t.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??t.autoGlobalTickspeedEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:t.computeFlops.owned,cumulativeBoost:t.computeFlops.cumulativeBoost},computeFlopsAutobuyers:e.computeFlopsAutobuyers??t.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??t.computeFlopsAutobuyersEnabled,computeFlopsAutobuyerAttemptBudgets:t.computeFlopsAutobuyerAttemptBudgets,challenges:{...t.challenges,...e.challenges,active:null,activeSeconds:0,run:Ct()},achievements:e.achievements??t.achievements,daily:e.daily??t.daily,era:{count:r},eons:{balance:z(e.eons?.balance??0)+n},hyperscalerCount:z(e.hyperscalerCount??0),eonsUpgrades:e.eonsUpgrades??t.eonsUpgrades,purge:{...t.purge,unboundedUnlocked:i,points:0,count:0},prestigeDoublePpLevel:t.prestigeDoublePpLevel}))},Er=e=>{let t=e.prestigeDoublePpLevel??0,n=Ai(t);if(z(e.purge.points)<n)return e;let r=Dn(e);return{...r,purge:{...r.purge,points:r.purge.points-n},prestigeDoublePpLevel:t+1}},Dr=e=>{let t=_e.filter(t=>t.group===`levelPower`&&yr(e,t.id)).length;return Math.round((1+ue*t)*1e6)/1e6},Or=(e,t=1)=>{let n=Math.max(0,z(e)-1),r=Math.floor(n/10);return t**(n-r)*10**r},kr=e=>2**z(e),Ar=(e,t)=>qr(e,`scaleUpNoDoubling`)||Jr(e,`singleInstance`)===t?1:kr(e.scaleUpTierCounts?.[t]??e.scaleUpCount??0)**Xr(e,`scaleUpPower`,1),jr=e=>Math.min(z(e.scaleUpTargetTierIndex??0),$r(e)-1),Mr=e=>b[jr(e)],Nr=e=>3*(Math.max(0,z(e.scaleUpCount??0)-($r(e)-1))+1),Pr=e=>{let t=Ir(e);return t===null?5:t+Fr(e)},Fr=e=>{let t=_e.filter(t=>t.group===`overclockStep`&&yr(e,t.id)).length;return Math.max(1,4-t)},Ir=e=>{let t=e.overclockLastClaimCompletedLevels??(z(e.overclockCount??0)>0?e.overclockCount:null);return t==null?null:z(t)},Lr=e=>(1+ot)**z(e),Rr=e=>nt[e],zr=e=>({...kt().autoPurgeSettings,...e.autoPurgeSettings??{}}),Br=e=>{let t=zr(e);if(t.minSeconds>0&&z(e.purge?.cycleSeconds??0)<t.minSeconds-wt)return!1;if(!Ur(e))return!0;let n=ji(e.resources[O],e.prestigeDoublePpLevel??0,!0);if(t.targetPpExponent>0&&n<10**t.targetPpExponent)return!1;let r=z(e.purge?.highestAward??0);return!(t.bestMultiplier>0&&r>0&&n<t.bestMultiplier*r)},Vr=(e,t)=>n=>{if(!(e===`targetPpExponent`?Number.isInteger(t)&&t>=0&&t<=100:e===`minSeconds`?_t.includes(t):e===`bestMultiplier`&&vt.includes(t)))return n;let r=zr(n);return r[e]===t?n:{...n,autoPurgeSettings:{...r,[e]:t}}},Hr=e=>1/Ed(e,`purge`),Ur=e=>!!e.purge?.unboundedUnlocked||(e.autoPurge??null)!==null&&Ed(e,`purge`)<=1,Wr=e=>!!se[e]&&ce.has(e),Gr=e=>{let t=e.challenges?.active;return t&&Wr(t)?se[t]:null},Kr=(e,t)=>!!e.challenges?.completed?.[t],qr=(e,t)=>Gr(e)?.effect===t,Jr=(e,t)=>{let n=Gr(e);return n?.effect===t?n.automation.key:null},Yr=(e,t)=>({balance:Math.max(e.balance??0,z(t.resources?.[O])),clock:Math.max(e.clock??0,t.globalTickspeedMultiplier??0),owned:Object.fromEntries(b.map(n=>[n.id,Math.max(e.owned?.[n.id]??0,t.owned?.[n.id]??0)])),purchaseLevels:Object.fromEntries(b.map(n=>[n.id,Math.max(e.purchaseLevels?.[n.id]??1,t.purchaseLevels?.[n.id]??1)]))}),Xr=(e,t,n)=>Gr(e)?.levers?.[t]??e.runLevers?.[t]??n,Zr=(e,t)=>(Jr(e,`halfDuplex`)===t?te:1)*Xr(e,`production`,1),Qr=(e,t)=>{let n=x[t];if(!n)return n;let r=(Jr(e,`premiumTier`)===t?ne:1)*Xr(e,`costMultiplier`,1);return r===1?n:{...n,baseCost:n.baseCost*r}},$r=e=>qr(e,`addressSpace`)?6:b.length,ei=e=>b[$r(e)-1],ti=e=>Math.floor(z(e.challenges?.activeSeconds)/30+1e-9)%2==0,ni=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(!Gr(e))return n;if(Jr(e,`clockGated`)===t||Jr(e,`dutyCycle`)===t&&!ti(e))return 1;if(Jr(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];return Math.min(n,e.tickspeedLevels?.[r.id]??1)}return n},ri=e=>{if(!qr(e,`bitRot`))return 0;let t=z(e.challenges?.run?.cycleSeconds)-120;return t<=0?0:Math.min(ie,F*2**(t/30))/10**(aa(e.intro)-1)},ii=e=>Gr(e)?.goal??8e100,ai=(e,{kind:t,key:n})=>t===`tierAutobuyer`?e.autobuyerIntervalLevels?.[n]??0:t===`tierTickspeed`?e.tierTickspeedIntervalLevels?.[n]??0:e.automationIntervalLevels?.[n]??0,oi=e=>{let{kind:t,key:n}=e.automation;return 5*(t===`tierAutobuyer`?Qt(n):t===`tierTickspeed`?$t(n):Rr(n))},si=(e,t)=>{let n=se[t];if(!n)return!1;if(e.challenges?.completed?.[t]||e.challenges?.active===t)return!0;let{kind:r,key:i}=n.automation;return(r===`tierAutobuyer`?e.autobuyers?.[i]!=null:r===`tierTickspeed`?!!e.tierTickspeedAutobuyer?.[i]:Od(e,i))&&z(e.purge?.count??0)>=oi(n)},ci=(e,t)=>P.find(n=>n.automation.kind===e&&n.automation.key===t&&Wr(n.id))??null,li=(e,t,n)=>{let r=ci(t,n);return!!r&&!Kr(e,r.id)},ui=e=>{let t=e.challenges?.completed??{},n=P.filter(n=>Wr(n.id)&&!t[n.id]&&ai(e,n.automation)>0).map(e=>e.id);return n.length===0?e:{...e,challenges:{...kt().challenges,...e.challenges,completed:{...t,...Object.fromEntries(n.map(e=>[e,!0]))}}}},di=e=>t=>{if(!Gr(t))return t;let n=t.challenges.run??Ct();return{...t,challenges:{...t.challenges,activeSeconds:z(t.challenges.activeSeconds)+e,run:{...n,cycleSeconds:z(n.cycleSeconds)+e}}}},fi=(e,t)=>({...e,challenges:{...e.challenges,run:{...e.challenges.run??Ct(),...t}}}),pi=(e,t,n)=>{if(n===t)return n;let r=n;if(Jr(n,`cascadeDelete`)===e){let t=S[e],n={...r.owned},i={...r.resources};b.slice(0,t).forEach(e=>{n[e.id]=0,i[e.id]=0}),r={...r,owned:n,resources:i}}return Jr(n,`writeLock`)===e&&(r=fi(r,{haltSeconds:10})),r},mi={hardRefresh:{interval:300,apply:(e,t)=>fi({...e,owned:{...e.owned,[t]:0},resources:{...e.resources,[t]:0}},{refreshes:(e.challenges.run?.refreshes??0)+1})},clockDrift:{interval:600,apply:(e,t)=>({...e,tickspeedLevels:{...e.tickspeedLevels,[t]:Math.max(1,(e.tickspeedLevels?.[t]??1)-1)}})},dutyCycle:{interval:30,apply:e=>e}},hi=(e,t)=>{let n=t,r=Jr(n,`memoryLeak`);if(r){let t=n.owned[r]??0,i=t*(1-(1-re)**e)+(n.challenges.run?.leakRemainder??0),a=Math.min(t,Math.floor(i));n=fi({...n,owned:{...n.owned,[r]:t-a},resources:{...n.resources,[r]:Math.max(0,(n.resources[r]??0)-a)}},{leakRemainder:i-Math.floor(i)})}if(qr(n,`bitRot`)&&ri(n)>z(n.resources.base)){let e=Yd(n,!1);n={...e,challenges:{...e.challenges,run:{...Ct(),refreshes:0},bitRotLosses:(e.challenges.bitRotLosses??0)+1}}}return n},gi=(e,t,n)=>{let r=n,i=e;for(let e=0;i>1e-12&&e<2e4;e++){let e=Gr(r);if(!e)return Li(i,t,0)(r);let n=mi[e.effect],a=z(r.challenges.activeSeconds),o=e.effect===`bitRot`?Math.min(i,1):i,s=!1;if(n){let e=(Math.floor(a/n.interval+1e-9)+1)*n.interval-a;e<=o+1e-9&&(o=Math.max(e,1e-9),s=!0)}let c=z(r.challenges.run?.haltSeconds),l=c>0?fi(r,{haltSeconds:Math.max(0,c-o)}):r,u=(e=>Gr(e)?di(o)(e):e)(Li(o,t,c)(l)),d=!Gr(u)&&u.challenges.completed?.[e.id]?{...u,challenges:{...u.challenges,bestSeconds:{...u.challenges.bestSeconds,[e.id]:Math.min(r.challenges.bestSeconds?.[e.id]??1/0,a+o)}}}:u;r=Gr(d)?hi(o,d):d,s&&Gr(r)&&(r=n.apply(r,e.automation.key)),i-=o}return r},_i=e=>!Ur(e)&&z(e.resources.base)>=ii(e),vi=e=>t=>{let n=S[t.id]??-1;if(n>=$r(e))return!1;if(n===0||(e.owned[t.id]??0)>0||(e.purchaseLevels?.[t.id]??1)>1)return!0;if(!e.everUnlockedTierIds?.[t.id])return!1;let r=b[n-1];return(e.purchaseLevels?.[r.id]??1)>=3},yi=e=>bi(z(e)/8),bi=e=>{let t=z(e);return t<1?0:Math.floor(Math.log10(t))},xi=(e,t=A)=>{let n=t===8e100?Math.floor(Math.log10(k)):Math.round(Math.log10(t/8)),r=bi(e)/n*100;return Math.min(100,Math.max(0,Math.round(r)))},Si=e=>{let t=z(e);if(t<=0)return 0;let n=t/8,r=10**(Math.floor(Math.log10(n))+1);return!Number.isFinite(r)||r<=0?0:Math.min(1,n/r)},Ci=e=>qr(e,`clockSpeedDisabled`)?1:sn(e.globalTickspeedMultiplier??null,Ir(e)??0)**Xr(e,`clockSpeedPower`,1),wi=e=>qr(e,`clockSpeedDisabled`)?0:(1+at*Lr(Ir(e)??0))**Xr(e,`clockSpeedPower`,1)-1,Ti=e=>qr(e,`scaleUpNoDoubling`)?1:2**Xr(e,`scaleUpPower`,1),Ei=(e,t)=>{let n=tn(ni(e,t),Jr(e,`halfStep`)===t?ae:Qe)*(t===ei(e).id?ln(e.lastTierXpConsumed??0):1),r=Ci(e),i=Jr(e,`noisyNeighbour`),a=(Jr(e,`clockSkew`)===t?2:1)*(i&&i!==t?(1+oe)**Math.max(0,(e.tickspeedLevels?.[i]??1)-1):1),o=D(t)*a/(n*r);return Number.isFinite(o)&&o>0?o:Tt},Di=()=>Math.log2(64),Oi=(e=0)=>{let t=z(e);return 64/2**Math.min(t,Di())},ki=(e=0)=>{let t=z(e),n=Di();return t>n?2**(t-n):1},Ai=(e=0)=>10**(z(e)+1),ji=(e,t=0,n=!1)=>{let r=z(e);if(r<8e100)return 0;let i=Math.floor(Math.log10(k)),a=n?Math.max(i,bi(r/8)):i,o=Oi(t),s=ki(t);return Math.floor(a/o)*s},Mi=(e,t)=>{let n=yi(z(e[O]));return n<=0||n<=t.highestMilestone?t:{...t,xp:t.xp+(n-t.highestMilestone),highestMilestone:n}},Ni=200,Pi=(e,t,n,r,i)=>{let a=e,o=r+t/n,s=0;for(;o>=.999999999&&s<Ni;){let e=i(a);if(e===a){o=Math.min(o,1);break}a=e,--o,s+=1}return s>=Ni&&(o=Math.min(o,1)),{state:a,budget:o}},Fi=(e,t,n,r)=>{let{state:i,budget:a}=Pi(e,t,Ed(e,n),e.automationAttemptBudgets?.[n]??0,r);return{...i,automationAttemptBudgets:{...i.automationAttemptBudgets,[n]:a}}},Ii=`unit`,Li=(e,t=1,n=0)=>r=>{let i=Yo(r),a=to(e)(i),o=co(Es(e)(yo(e)(So(e)(Xo(e)(a))))),s=$s(e)(o),c=qs(e)(s),l=Wd($s(0)(c)),u=Fu.reduce((t,n)=>n(e)(t),l),d=el(e)(u),f=Zo(rd(e)(d)),p=hl(El(e,f)(no(e)(f))),m=Sl(e)(p),h=$n(rr(e)(zn(e)(m))),g=(h.autoPurge??null)!==null&&(h.autoPurgeEnabled??!0),_=t=>{let n=cc(oc(t)),r=xs(e)(ws(e)(n));return r===t?t:$s(0)(r)};if(_i(h)){if(!g)return _(h);let t=(h.autoPurgeAttemptBudget??0)+Hr(h)*e;return t>=.999999999&&Br(h)?_(ff(h)):_({...h,autoPurgeAttemptBudget:t})}let v=dn(h.purge.count,!!h.prestigeSpeedBonusUnlocked)*mn(h),y=[...b].sort((e,t)=>Number((h.owned?.[e.id]??0)>0)-Number((h.owned?.[t.id]??0)>0)).reduce((n,r)=>{if((n.autobuyers[r.id]??null)===null||!vi(n)(r)||!(n.autobuyersEnabled?.[r.id]??!0))return n;let i=n,a=(n.autobuyerAttemptBudgets[r.id]??0)+e/gd(n,r.id);for(;a>=.999999999&&!(Math.floor(a+wt)<=0);){let e=i.purchaseLevelProgress?.[r.id]??0;if(t===`unit`){let e=Ji(r.id,1)(i);if(e===i)break;i=e,--a;continue}let n=vd(i,r.id);if(n>1&&e===0){let e=ra(r.id,n)(i);if(e!==i){i=e,--a;continue}}if(!Qi(i,r))break;let o=Ji(r.id,2**53-1)(i);if(o===i)break;i=o,--a}return{...i,autobuyerAttemptBudgets:{...i.autobuyerAttemptBudgets,[r.id]:a}}},h),C={...y.resources},w={...y.owned},T={...y.tierProductionAccumulators},E=Math.max(n,z(y.challenges?.run?.haltSeconds)),D=Math.max(0,e-E),k=E>0&&D<=0;b.forEach(e=>{if(!vi(y)(e)||k)return;let t=Ei(y,e.id),n=(T[e.id]??0)+D,r=Math.floor((n+wt)/t);if(T[e.id]=n-r*t,r<=0)return;let i=Jr(y,`flatRate`)===e.id?1:Or(y.purchaseLevels?.[e.id]??1,Dr(y)),a=Zr(y,e.id),o=Gu(y.intro,S[e.id]+1),s=Ln(y,e.id),c=Ar(y,e.id),l=Math.floor((y.owned[e.id]??0)*r*v*c*i*a*o*s);e.producesResourceId===`bytes`?l>0&&(C[O]=z((C.base??0)+l*8)):C[e.producesResourceId]=z((C[e.producesResourceId]??0)+l),b.some(t=>t.id===e.producesResourceId)&&(w[e.producesResourceId]=z((w[e.producesResourceId]??0)+l))});let A=y.lastTierLevelCreditTimer??0,j=x[St()],M=Math.max(0,(y.purchaseLevels?.[j.id]??1)-1);if(M>0&&yr(y,`quettaSpent`)&&vi(y)(j)&&!k){let e=vr(M);A+=D;let t=Math.floor(A/e+wt);t>0&&(A=Math.max(0,A-t*e),C[j.id]=z((C[j.id]??0)+t),w[j.id]=z((w[j.id]??0)+t))}let ee={...y,lastTierLevelCreditTimer:A,resources:C,owned:w,tierProductionAccumulators:T,purge:Mi(C,y.purge),...g?{autoPurgeAttemptBudget:(y.autoPurgeAttemptBudget??0)+Hr(y)*e}:{}},N=ee.runPeaks?Yr(ee.runPeaks,ee):null,P=Ur(ee)&&z(ee.resources.base)>=8e100?sr(ee,`overflowPurges`,1,`max`):ee;Ur(P)&&g&&z(P.resources.base)>=ii(P)&&(P.autoPurgeAttemptBudget??0)>=.999999999&&Br(P)&&(P=ff(P));let te=P.autoOverclock&&(P.autoOverclockEnabled??!0)?Fi(P,e,`overclock`,tf):P,ne=te.autoScaleUp&&(te.autoScaleUpEnabled??!0)?Fi(te,e,`scaleUp`,ef):te,re=ne.autoXpTickspeed&&(ne.autoXpTickspeedEnabled??!0)?Fi(ne,e,`restage`,e=>lf(e.purge.xp)(e)):ne,F=N?{...re,runPeaks:N}:re,ie=b.reduce((t,n)=>{if(!t.tierTickspeedAutobuyer?.[n.id]||!(t.tierTickspeedAutobuyerEnabled?.[n.id]??!0))return t;let{state:r,budget:i}=Pi(t,e,Md(t,n.id),t.tierTickspeedAttemptBudgets?.[n.id]??0,e=>fd(n.id)(e));return{...r,tierTickspeedAttemptBudgets:{...r.tierTickspeedAttemptBudgets,[n.id]:i}}},F);return _(ie.autoGlobalTickspeed&&(ie.autoGlobalTickspeedEnabled??!0)?Fi(ie,e,`speedUp`,zd):ie)},Ri=(e,t)=>{if(!I.enabled||e<=0||yr(t,`remindMeLater`))return t;let n=!Gr(t)&&z(t.resources?.base)>=8e100,r=t.achievements?.counters?.purgeWaitSeconds??0;return n?sr(t,`purgeWaitSeconds`,Math.min(60,r+e),`set`):r===0?t:sr(t,`purgeWaitSeconds`,0,`set`)},zi=(e,t=1)=>n=>{let r=br(Ri(e,Gr(n)&&e>0?gi(e,t,n):Li(e,t,0)(n)));return r===n||e<=0||r.purge?.count!==n.purge?.count?r:{...r,purge:{...r.purge,cycleSeconds:z(r.purge.cycleSeconds??0)+e}}},Bi=(e,t=We)=>{let n=Math.min(z(e),t,We);return Math.floor(n*(n>600?Ue:1))},Vi=(e,t=1)=>n=>{let r=Bi(e,Sn(n)),i=n;for(let e=0;e<r;e++)i=zi(1,t)(i);return i},Hi=(e,t=We)=>Math.floor(Math.min(z(e),t,We))-Bi(e,t),Ui=(e,t=1,n)=>r=>{let i=Hi(e,n??Sn(r)),a=r;for(let e=0;e<i;e++)a=zi(1,t)(a);return a},Wi=e=>{let t=Math.max(0,Math.floor(z(e))),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},Gi=(e,t)=>e.resources[t.costResourceId]??0,Ki=(e,t)=>e.purchased?.[t]??0,qi=(e,t)=>n=>{if(_i(n))return n;let r=Qr(n,e);if(!r||!vi(n)(r))return n;let i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=Ut(n),s=Jt(r,i,o,a,Gi(n,r),t);if(s<=0)return n;let c=Gt(r,i)*s,l=Ki(n,e)+s,u=a+s,d=u>=o;return{...n,resources:{...n.resources,[r.costResourceId]:z((n.resources[r.costResourceId]??0)-c),[e]:(n.resources[e]??0)+s},owned:{...n.owned,[e]:(n.owned[e]??0)+s},purchased:{...n.purchased,[e]:l},purchaseLevels:{...n.purchaseLevels,[e]:d?i+1:i},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:d?0:u}}},Ji=(e,t)=>n=>pi(e,n,qi(e,t)(n)),Yi=e=>!!e.buyMaxUnlocked,Xi=e=>z(e.purge?.count??0)>=1||z(e.era?.count??0)>=1||Me.some(t=>!!e.intro?.[t.autoFlagField]),Zi=e=>t=>{let n=t;for(let t=0;t<Ye;t++){let t=e(n);if(t===n)break;n=t}return n},Qi=(e,t)=>{let n=Qr(e,t.id)??t,r=e.purchaseLevels?.[n.id]??1,i=Ut(e),a=e.purchaseLevelProgress?.[n.id]??0;return Jt(n,r,i,a,Gi(e,n),i)>=i-a},$i=(e,t)=>{let n=Qr(e,t.id)??t;if((e.purchaseLevelProgress?.[n.id]??0)>0)return!1;let r=e.purchaseLevels?.[n.id]??1,i=Ut(e);return Jt(n,r,i,0,Gi(e,n),i)>=i},ea=e=>t=>{if(_i(t))return t;let n=Qr(t,e);if(!n||!vi(t)(n))return t;if(!$i(t,n))return Ji(e,2**53-1)(t);let r=t;for(let t=0;t<1024&&$i(r,n);t++){let t=Ji(e,2**53-1)(r);if(t===r)break;r=t}return r},ta=e=>t=>pi(e,t,ea(e)(t)),na=(e,t)=>n=>{if(_i(n))return n;let r=Qr(n,e);if(!r||!vi(n)(r))return n;let i=n;for(let n=0;n<Math.min(t,Ye)&&$i(i,r);n++){let t=Ji(e,2**53-1)(i);if(t===i)break;i=t}return i},ra=(e,t)=>n=>pi(e,n,na(e,t)(n)),V=(e,t)=>{let n=Qr(e,t);if(_i(e)||!n||!vi(e)(n)||!$i(e,n))return{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0};let r=e,i=e;for(let e=0;e<1024&&$i(r,n);e++){let e=Ji(t,2**53-1)(r);if(e===r)break;i=r,r=e}let a=Ut(r),o=r.purchaseLevels?.[t]??1,s=Math.min(a-1,Jt(n,o,a,0,Gi(r,n),a));return{levels:(r.purchaseLevels?.[t]??1)-(e.purchaseLevels?.[t]??1),cost:Gi(e,n)-Gi(r,n),lastLevelCost:Gi(i,n)-Gi(r,n),partialQuantity:s,partialCost:s>0?qt(n,o,a,0,s):0}},ia=(e,t)=>n=>{if(!x[e]||t<=0)return n;let r=Ut(n),i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=Ki(n,e),s=a+t,c=Math.floor(s/r),l=s%r,u=i+c,d=o+t;return{...n,resources:{...n.resources,[e]:(n.resources[e]??0)+t},owned:{...n.owned,[e]:(n.owned[e]??0)+t},purchased:{...n.purchased,[e]:d},purchaseLevels:{...n.purchaseLevels,[e]:u},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:l}}},aa=e=>{let t=Math.floor(Number(e?.unlockedDiskSteps));return Math.min(10*Ie.length,Number.isFinite(t)&&t>=1?t:1)},oa=e=>{let t=aa(e),n=Math.floor((t-1)/Ie.length),r=t-1-n,i=0;for(let n=1;n<=10;n+=1){let r=Math.min(Ie.length-1,Math.max(0,t-1-(n-1)*Ie.length)),a=Number(e?.poolExponentBonuses?.[n]);i+=Math.min(r,Number.isFinite(a)?Math.min(2,Math.max(0,Math.floor(a))):0)}let a=Ee,o=1-fr(e,(1-a)**2);return 1-(1-Te)*a**(n+i)*o**(r-i)},sa=(e,t=Te)=>{let n=e/8;return!Number.isFinite(n)||n<=0?0:n**t},ca=e=>me.slice(0,dr(e)).some(e=>e.syncedBitrate),la=e=>ca(e)?e.capacity??0:e.speedCapacity??e.capacity??0,ua=e=>sa(la(e),oa(e))*8,da=e=>{let t=Math.min(1,Math.max(0,e)),n=Math.log10(Oe);return 10**(n-t*(n-Math.log10(10)))},fa=Math.log(Oe/100),pa=Math.log(Oe/10),ma=(e,t,n,r)=>{if(!(n>0)||!(r>0))return null;let i=Math.max(0,e),a=Math.min(n,t);if(a<=i)return null;let o=i/n,s=a/n;return n/r*Math.exp(-fa)*(Math.exp(pa*s)-Math.exp(pa*o))/pa},ha=(e,t,n,r)=>{if(!(t>0)||!(n>0)||!(r>0))return 0;let i=Math.max(0,e);if(i>=t)return 0;let a=i/t,o=Math.exp(pa*a)+pa*n/t*Math.exp(fa)*r,s=t/pa*Math.log(o);return Math.min(t,s)-i},ga=e=>e.capacity>0?Math.min(1,e.bits/e.capacity):0,_a=e=>da(ga(e)),va=e=>_a(e),ya=e=>1+(e?.dataStreamTapBonusPercent??0)/100,ba=e=>va(e)/100,xa=e=>ua(e)*Wu(e)*ba(e),Sa=100,Ca=e=>{let t=!!e?.speedUpgradeQueued;if(!t&&!e?.capacityUpgradeQueued)return null;let n=t?ho(e):e.capacity,r=t?e.speedUpgradeProgress:e.capacityUpgradeProgress,i=Number.isFinite(r)&&r>0?r:0,a=ya(e),o=Sa*a,s=ua(e)*a;return{kind:t?`speed`:`capacity`,cost:n,progress:i,multiplierPercent:o,rate:s}},wa=e=>{if(Do(e)){let t=e.intro.dataStreamTapBonusPercent??0;return t>=100?e:{...e,intro:{...e.intro,dataStreamTapBonusPercent:Math.min(100,t+5)}}}if(e.intro.bits>=e.intro.capacity)return e;let t=Math.max(1,Math.floor(ua(e.intro)));return{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+t)}}},Ta=e=>{let t=wa(e);if(!I.enabled||t===e)return t;let n=t.achievements??kt().achievements,r=br({...t,achievements:{...n,counters:{...n.counters,pings:(n.counters?.pings??0)+1}}});return cr(r)?sr(r,`automatedPings`,1,`max`):r},Ea=e=>e.intro.byteCreated||e.intro.bits<8?e:{...e,intro:{...e.intro,bits:e.intro.bits-8,byteCreated:!0,capacityUpgradeQueued:!1}},Da=()=>10,Oa=e=>{let t=lc(e);return t?Math.ceil(t/Ie.length):null},ka=(e,t)=>{if(!Number.isInteger(t)||t<1||t>Da())return!1;let n=(t-1)*Ie.length+1;return Ie.every((t,r)=>{let i=Qo(n+r);return(e.intro?.disksBuiltTotal?.[i]??0)>=9})},Aa=e=>{let t=(e-1)*Ie.length+1;return Ie.map((e,n)=>Qo(t+n))},ja=(e,t)=>Object.keys(e.intro?.dataLakes??{}).some(n=>{let r=Number(n);return r<t&&!!W(e,r)?.rebuilding}),Ma=(e,t)=>!!W(e,t)?.rebuilding,Na=(e,t)=>!Number.isInteger(t)||t<1||t>Da()?!1:t===1||ka(e,t-1),Pa=e=>{let t=0;for(let n=1;n<=Da()&&Na(e,n);n+=1)t=n;return t},Fa=e=>8*xe**e,Ia=e=>{let t=1;for(let n=2;n<=Da()&&!((e.intro?.capacity??0)<Fa(n));n+=1)t=n;return t},La=[1,2,4,8,16,32,64,125,250,500],Ra=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return La[t%10]*1e3**Math.floor(t/10)*8},za=Math.log10(2),Ba=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return 10**Math.floor(t*za)*8},Va=(e,t)=>{if(!Number.isInteger(t)||t<1||t>Ia(e))return 0;let n=(Wa(e,t)/8)**oa(e.intro),r=ua(e.intro??{})/8,i=Ra(Math.min(r,n)*8),a=Math.max(0,W(e,t)?.bandwidthSteps??0);if(a===0)return i;let o=i;for(let e=0;e<a;e+=1)o=Ra(o*Math.SQRT2);if(t>=Da())return o;let s=Va(e,t+1);return Math.max(i,Math.min(o,s/2))},Ha=(e,t)=>{let n=Va(e,t);if(n>0)return n;let r=Math.max(e.intro?.capacity??0,Fa(t)),i=Math.max(e.intro?.speedCapacity??e.intro?.capacity??0,r/2),a=Va({...e,intro:{...e.intro,capacity:r,speedCapacity:i}},t);return a>0?a:Ra(ua(e.intro??{}))},Ua=(e,t)=>{let n=Ba(e??0),r=t===1?we(1).startBits:we(t-1).endBits,i=we(t).endBits;return Math.min(Math.max(n,r),i)},Wa=(e,t)=>!Number.isInteger(t)||t<1||t>Ia(e)?0:Ua(e.intro?.capacity??0,t),Ga=(e,t)=>Wa(e,t),Ka=(e,t)=>t<=Ia(e)?Ga(e,t):Ua(Fa(t),t),qa=(e,t)=>e.intro?.poolBuffers?.[t]??0,Ja=(e,t)=>{let n=Ga(e,t);return n>0?Math.min(1,qa(e,t)/n):0},Ya=(e,t)=>da(Ja(e,t)),Xa=(e,t)=>e.intro?.poolTapBonusPercents?.[t]??0,Za=(e,t)=>Ya(e,t),Qa=(e,t)=>1+Xa(e,t)/100,$a=(e,t)=>{let n=ua(e.intro??{});for(let r=1;r<t;r+=1)n=Math.max(0,n-Va(e,r));return Math.min(Va(e,t),n)},eo=e=>t=>{if(!Number.isInteger(e)||e<1||e>Ia(t))return t;let n=Xa(t,e);return n>=100?t:{...t,intro:{...t.intro,poolTapBonusPercents:{...t.intro.poolTapBonusPercents??{},[e]:Math.min(100,n+5)}}}},to=e=>t=>{let n=1*e,r=t.intro.dataStreamTapBonusPercent??0,i=n>0?Math.max(0,r-n):r,a=Math.min(i,100),o=t.intro.poolTapBonusPercents??{},s=!1,c={};return Object.keys(o).forEach(e=>{let t=o[e],r=n>0?Math.max(0,t-n):t,i=Math.min(r,100);i!==t&&(s=!0),c[e]=i}),a===r&&!s?t:{...t,intro:{...t.intro,dataStreamTapBonusPercent:a,poolTapBonusPercents:c}}},no=e=>t=>{if(!Do(t))return t;let n=Ia(t);if(n<1)return t;let r=t.intro.bits,i={...t.intro.poolBuffers??{}},a={...t.intro.dataLakes},o=!1;for(let s=1;s<=n;s+=1){let n=$a(t,s);if(n<=0||r<=0)continue;let c=i[s]??0,l=Ga(t,s),u=Math.max(0,l-c),d=n*qu(t.intro,s),f=e;if(u>0){let t=ha(c,l,d,e),n=Math.min(t,u,r);if(n>0&&(r-=n,i[s]=c+n,o=!0),n<u||r<=0)continue;let a=ma(c,l,l,d)??e;f=Math.max(0,e-a)}if(f<=0||!Vc(t,s)||!ka(t,s)||Tl(t,s))continue;let{lake:p,remainingBits:m,changed:h}=bl(t,s,n*Bc(t,s),f,r);h&&(a[s]=p,r=m,o=!0)}return o?{...t,intro:{...t.intro,bits:r,poolBuffers:i,dataLakes:a}}:t},ro=e=>{if(!e?.intro)return e;let t=!!e.intro.capacityUpgradeQueued&&(!e.intro.byteCreated||uo(e)),n=!!e.intro.speedUpgradeQueued&&(!e.intro.byteCreated||e.intro.capacityUpgradeQueued),r=t||n,i={...e.intro};t&&Object.assign(i,{capacityUpgradeQueued:!1,capacityUpgradeProgress:0}),n&&Object.assign(i,{speedUpgradeQueued:!1,speedUpgradeProgress:0});let a=Math.max(0,i.capacity??8);a!==i.capacity&&(r=!0,i.capacity=a);let o=1;for(let[e,t]of Object.entries(i.disksBuiltTotal??{}))t>0&&(o=Math.max(o,lc(Number(e))??1));for(let[e,t]of Object.entries(i.diskProvisionPasses??{}))t>0&&(o=Math.max(o,lc(Number(e))??1));i.diskBuild?.size>0&&(o=Math.max(o,lc(i.diskBuild.size)??1)),o>aa(i)&&(r=!0,i.unlockedDiskSteps=o);let s={...i.poolExponentBonuses??{}};for(let t=1;t<=10;t+=1){let n=Number(i.dataLakes?.[t]?.resetCount),a=e.achievements?.earned??{},o=`pool${String(t).padStart(2,`0`)}Reset`,c=a[`${o}II`]?2:+!!a[`${o}I`],l=Number(s[t]),u=Number.isFinite(l)?Math.min(2,Math.max(0,Math.floor(l))):0,d=Math.max(u,Number.isFinite(n)?Math.min(2,Math.max(0,Math.floor(n))):0,c);d>u&&(s[t]=d,r=!0)}r&&(i.poolExponentBonuses=s);let c={...e,intro:i};if(i.poolBuffers){let e={...i.poolBuffers},t=!1;for(let n of Object.keys(e)){let r=Number(n);if(!Number.isInteger(r)||r<1||r>Da())continue;let i=e[r]??0,a=Ka(c,r),o=Math.min(Math.max(i,0),a);o!==i&&(e[r]=o,t=!0)}t&&(r=!0,i.poolBuffers=e)}if(i.diskProvisionPasses){let t=i.disksBuiltTotal??{},n={...i.diskProvisionPasses},a={...i.poolBuffers??{}},o=!1,s=!1;for(let r of Object.keys(n)){let c=Number(r),l=n[r]??0;if(!(l>0)||(t[c]??0)<9)continue;let u=Oa(c);if(u){let t=Ka({...e,intro:{...i,poolBuffers:a}},u),n=a[u]??0,r=Math.min(t,n+l*c);r!==n&&(a[u]=r,s=!0)}delete n[r],o=!0}o&&(r=!0,i.diskProvisionPasses=n),s&&(r=!0,i.poolBuffers=a)}if(i.dataLakes){let e={...i.dataLakes},t=!1;for(let n of Object.keys(e)){let r=e[n];if(!r)continue;let i=r.capacityLevel??0,a=Math.min(Math.max(Math.trunc(i)||0,0),3),o=Number(n);if(!(o>=1&&o<=10))continue;let s=vl(o),c=Math.max(_c(gc(a,r.resetCount??0)),Math.min(Math.max(Math.trunc(Number(r.depositedUnits))||0,0),He[a]+1e3*Math.max(0,Math.trunc(Number(r.resetCount))||0)-1)),l=Math.max(Math.trunc(Number(r.depositedUnits))||0,0),u=Math.max(Number(r.fillBits)||0,0);if(l>c&&(u+=(l-c)*s,l=c),u>s){let e=Math.min(Math.floor(u/s+1e-9),c-l);l+=e,u=Math.min(s,u-e*s)}let d=r.lakeTransfer??null;if(d){let e=Number(d.target),t=Number(d.movedBits);d=ze.includes(e)&&Number.isFinite(t)?{target:e,movedBits:Math.min(Math.max(t,0),e*s)}:null}let f=JSON.stringify(d)===JSON.stringify(r.lakeTransfer??null);a===i&&l===(r.depositedUnits??0)&&u===(r.fillBits??0)&&f||(e[n]={...r,capacityLevel:a,depositedUnits:l,fillBits:u,lakeTransfer:d},t=!0)}t&&(r=!0,i.dataLakes=e)}if(!i.diskBuild&&!i.diskBuildQueued){let t={...e,intro:i},n=os(t),a=ls(t,n),o=ss(t,n),s=Ud(t,n);a>0&&a<o&&s>0&&(r=!0,i.diskBuildQueued=!0,i.diskBuildQueuedByReplay=Number.isFinite(s))}let l=Math.min(Math.max(i.dataStreamTapBonusPercent??0,0),100);if(l!==i.dataStreamTapBonusPercent&&(r=!0,i.dataStreamTapBonusPercent=l),i.poolTapBonusPercents){let e={...i.poolTapBonusPercents},t=!1;for(let n of Object.keys(e)){let r=e[n],i=Math.min(Math.max(r??0,0),100);i!==r&&(e[n]=i,t=!0)}t&&(r=!0,i.poolTapBonusPercents=e)}return r?{...e,intro:i}:e},io=(e,t)=>{if((e.intro?.disks?.[t]??0)<=0||e.intro?.diskBuild?.size===t)return!1;let n=tc(e,t);return!n||S[n.id]>=$r(e)?!1:(e.purchaseLevelProgress?.[n.id]??0)===0},ao=e=>Object.keys(e.intro?.disks??{}).map(Number).some(t=>io(e,t)),oo=(e,t)=>{if(!t||t>Ia(e))return 0;let n=vl(t),r=e.intro?.diskCache?.[n]??0;return Math.max(0,n-r)},so=e=>{if(e.intro.diskBuild||ns(e)||as(e))return!1;let t=os(e);if(ls(e,t)>=ss(e,t))return!0;let n=Oa(t);return Ma(e,n)||ja(e,n)?!1:Va(e,n)>0&&Ga(e,n)>=t},co=e=>{if(!(e.intro?.poolResetRebuildingCount>0))return e;let t=e;for(let e=1;e<=Da();e+=1){let n=W(t,e);if(!n?.rebuilding)continue;let r=Aa(e).find(e=>(t.intro.disksBuiltTotal?.[e]??0)<9);if(!r){t=cl(e,!1)({...t,intro:{...t.intro,poolResetRebuildingCount:Math.max(0,(t.intro.poolResetRebuildingCount??1)-1),dataLakes:{...t.intro.dataLakes,[e]:{...n,rebuilding:!1}}}});continue}if(Ga(t,e)<r)continue;let i=t.intro.disksBuiltTotal?.[r]??0,a=t.intro.disks?.[r]??0;i>0&&a<i||(t={...t,intro:{...t.intro,disksBuiltTotal:{...t.intro.disksBuiltTotal,[r]:i+1}}})}return t},lo=e=>e.intro.bits<e.intro.capacity||!e.intro.byteCreated&&e.intro.bits>=8?!1:!uo(e),uo=e=>{let t=Da(),{endBits:n}=we(t);return Wa(e,t)>=n},fo=e=>lo(e),po=e=>{let t=Ml(e)?To(e):e,n=t.intro.capacity*2,r=ca(t.intro)?n:t.intro.speedCapacity??t.intro.capacity;return Yo({...t,intro:{...t.intro,speedCapacity:r,capacity:n,capacityUpgradeQueued:!1,capacityUpgradeProgress:0}})},mo=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated?!1:!uo(e)},ho=e=>la(e),go=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated||ca(t)?!1:ho(t)*2<=t.capacity},_o=e=>go(e)?{...e,intro:{...e.intro,speedUpgradeQueued:!0,speedUpgradeProgress:0}}:e,vo=e=>{if(!e.intro?.speedUpgradeQueued||!ca(e.intro))return e;let t=Math.max(0,Number(e.intro.speedUpgradeProgress)||0);return{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+t),speedUpgradeQueued:!1,speedUpgradeProgress:0}}},yo=e=>t=>{if(!t.intro?.speedUpgradeQueued)return t;if(ca(t.intro))return vo(t);let n=t.intro.speedUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=ho(t.intro),a=Math.min(t.intro.bits,ua(t.intro)*ya(t.intro)*e,i-r),o={...t.intro,bits:t.intro.bits-a,speedUpgradeProgress:r+a};return o.speedUpgradeProgress>=i?{...t,intro:{...o,speedCapacity:(t.intro.speedCapacity??t.intro.capacity)*2,speedUpgradeQueued:!1,speedUpgradeProgress:0}}:{...t,intro:o}},bo=e=>xo(e),xo=e=>mo(e)?{...e,intro:{...e.intro,capacityUpgradeQueued:!0,capacityUpgradeProgress:0}}:e,So=e=>t=>{if(!t.intro?.capacityUpgradeQueued)return t;if(uo(t))return Co(t);let n=t.intro.capacityUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=Math.min(t.intro.bits,ua(t.intro)*ya(t.intro)*e,t.intro.capacity-r),a={...t,intro:{...t.intro,bits:t.intro.bits-i,capacityUpgradeProgress:r+i}};return a.intro.capacityUpgradeProgress>=a.intro.capacity?po(a):a},Co=e=>e.intro?.capacityUpgradeQueued??!1?{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+(e.intro.capacityUpgradeProgress??0)),capacityUpgradeQueued:!1,capacityUpgradeProgress:0}}:e,wo=[`computeCoresMergeRemainingSeconds`,`computeNodesMergeRemainingSeconds`,`computeClustersMergeRemainingSeconds`,`computeNetworksMergeRemainingSeconds`,`computeGridsMergeRemainingSeconds`,`computeFabricsMergeRemainingSeconds`,`computeCloudsMergeRemainingSeconds`,`computeDatacentersMergeRemainingSeconds`,`computeSupercomputersMergeRemainingSeconds`],To=e=>{let t=e.intro??{},n=!1,r={...t};for(let e of Fe)(r[e]??0)!==0&&(r[e]=0,n=!0);for(let e of wo)(r[e]??0)!==0&&(r[e]=0,n=!0);Object.keys(r.computeChargeSeconds??{}).length>0&&(r.computeChargeSeconds={},n=!0);let i=(r.computeBoostType??null)!==null||(r.computeBoostStacks??0)!==0||(r.computeBoostRemainingSeconds??0)!==0||r.computeBoostTierIndex!=null;return(Object.keys(r.computeBoosts??{}).length>0||i)&&(r.computeBoosts={},delete r.computeBoostType,delete r.computeBoostTierIndex,delete r.computeBoostStacks,delete r.computeBoostRemainingSeconds,n=!0),n?{...e,intro:r}:e},Eo=e=>(e.intro?.capacity??0)>=De,Do=e=>(e.intro?.capacity??0)>=ke,Oo=[`B`,...b.map(e=>e.symbol)],ko=1e3,Ao=[`b`,...Oo.slice(1).map(e=>e.replace(/B$/,`b`))],jo=e=>{let t=1,n=0;for(;e/t>=ko&&n<Ao.length-1;)t*=ko,n+=1;return{symbol:Ao[n],divisor:t}},Mo=e=>{let t=8,n=0;for(;e/t>=ko&&n<Oo.length-1;)t*=ko,n+=1;return{symbol:Oo[n],divisor:t}},No=[`B`,...b.map(e=>e.symbol.replace(/B$/,`iB`))],Po=(e,t)=>{if(!t)return null;let n=8,r=0;for(;e/n>=1024&&r<No.length-1;)n*=xe,r+=1;return{symbol:No[r],divisor:n}},Fo=(e,t)=>Math.floor(e*10**t)/10**t,Io=e=>{let t=Math.floor(e);return`${B(t)} bit${t===1?``:`s`}`},Lo=3,Ro=5,zo=e=>e>=4?Ro:4,Bo=e=>{let t=e>=1?Math.floor(Math.log10(e))+1:1;return Math.min(Lo,Math.max(0,zo(t)-t))},Vo=(e,t)=>{if(t){let n=e/t.divisor,r=Fo(n,Bo(n));return r>0&&r<1?Io(e):`${B(r)} ${t.symbol}`}return Io(e)},H=Array.from({length:4},(e,t)=>new Intl.NumberFormat(`en-US`,{minimumFractionDigits:t,maximumFractionDigits:t})),Ho=(e,t)=>{if(!t)return Io(e);let n=e/t.divisor,r=Bo(n),i=Fo(n,r);return i>0&&i<1?Io(e):i===0?`${B(i)} ${t.symbol}`:`${H[r].format(i)} ${t.symbol}`},Uo=e=>{if(!(e>0))return`0`;let t=Math.min(1,10**(Math.floor(Math.log10(e))-2));return Number((Math.floor(e/t+1e-9)*t).toPrecision(12)).toLocaleString(`en-US`,{maximumFractionDigits:2})},Wo=e=>e.replace(/^[\d,]*\.?\d+/,e=>Uo(Number(e.replace(/,/g,``)))),Go=e=>Vo(e,Po(e,!0)),Ko=e=>Vo(e,Mo(e)),qo=e=>Gt(b[0],e.purchaseLevels?.[b[0].id]??1)*8,Jo=e=>{let t=qo(e);if(e.intro.bits<t)return e;let n=b[0].id;return ia(n,1)({...e,intro:{...e.intro,bits:e.intro.bits-t}})},Yo=e=>e.intro?.mainGameUnlocked||!Do(e)?e:{...e,intro:{...e.intro,mainGameUnlocked:!0}},Xo=e=>t=>{if(!t.intro.byteCreated)return t;let n=ua(t.intro)*Wu(t.intro),r=ha(t.intro.bits,t.intro.capacity,n,e);return r<=0?t:{...t,intro:{...t.intro,bits:Math.min(t.intro.capacity,t.intro.bits+r)}}},Zo=e=>{let t=b[0].id,n=e.purchaseLevelProgress?.[t]??0,r=Kt(Ut(e),n,2**53-1),i=qo(e),a=i>0?Math.floor(e.intro.bits/i):r,o=Math.min(r,a);if(o>0){let n=o*i;return ia(t,o)({...e,intro:{...e.intro,bits:e.intro.bits-n}})}return e},Qo=e=>Ae*10**(Math.max(1,Number.isFinite(e)?Math.floor(e):1)-1),$o=e=>Pa(e)*Ie.length,es=e=>Math.min($o(e),aa(e.intro)),ts=e=>Qo(aa(e.intro)),ns=e=>{let t=os(e);return t<ts(e)&&!Ma(e,Oa(t))},rs=e=>e.intro?.diskBuild||!as(e)?!1:aa(e.intro)<$o(e),is=e=>{if(!rs(e))return e;let t=aa(e.intro)+1,n=mf(e);return{...n,intro:{...n.intro,unlockedDiskSteps:t}}},as=e=>((e.intro?.disksBuiltTotal??{})[Qo(es(e))]??0)>=9,os=e=>{let t=e.intro?.disksBuiltTotal??{},n=es(e),r=1,i=Qo(r);for(;r<n&&(t[i]??0)>=9;)r+=1,i=Qo(r);return i},ss=(e,t)=>Math.min(10,(e.intro?.disksBuiltTotal?.[t]??0)+1),cs=(e,t)=>t*ss(e,t),ls=(e,t)=>e.intro?.diskProvisionPasses?.[t]??0,U=Ko,us=e=>({symbol:Oo[e]??Oo[Oo.length-1],divisor:8*ko**e}),ds=(e,t)=>Vo(e,us(t)),fs=(e,t)=>{let n=us(t);return e>0&&e<n.divisor?Mo(e):n},ps=(e,t)=>Vo(e,fs(e,t)),ms=(e,t)=>Ho(e,fs(e,t)),hs=e=>Vo(e,jo(e)),gs=e=>{let t=e.intro?.disksBuiltTotal??{},n=e.intro?.disks??{},r=os(e),i=[];for(let t=1;t<=Ia(e);t+=1)i.push(vl(t));return[...new Set([...Object.keys(t).map(Number),...Object.keys(n).map(Number),r,...i])].filter(e=>(t[e]??0)>0||(n[e]??0)>0||e===r||i.includes(e)).sort((e,t)=>e-t)},_s=e=>so(e)&&!ao(e),vs=e=>!_s(e)||e.intro.diskBuildQueued?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},ys=e=>e.intro?.diskBuildQueued||ns(e)||e.intro.diskBuild||as(e)?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},bs=e=>e.intro?.diskBuildQueued??!1?{...e,intro:{...e.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}:e,xs=(e=0)=>t=>{if(!(t.intro?.diskBuildQueued??!1)||!_s(t))return t;let n=os(t),r=Oa(n),i=ls(t,n),a=ss(t,n),o=!!t.intro?.diskBuildQueuedByReplay,s=o?Ud(t,n):1/0;if(s<=0)return{...t,intro:{...t.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}};let c=i>=a,l=qa(t,r),u=Math.max(0,l-oo(t,r)),d=Va(t,r)*Qa(t,r),f=Math.max(0,Math.min(a-i,s)),p=c?0:Math.min(Math.max(0,e)*d,u,f*n);if(!c&&!(p>0))return t;let m=i+p/n,h={...t.intro.poolBuffers,[r]:l-p};if(c||m>=a-wt){let{[n]:e,...r}=t.intro.diskProvisionPasses??{};return{...t,intro:{...t.intro,poolBuffers:c?t.intro.poolBuffers:h,diskProvisionPasses:r,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n]:(t.intro.disksBuiltTotal?.[n]??0)+1},diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}}let g=o&&Number.isFinite(s)&&m-i>=s-wt;return{...t,intro:{...t.intro,poolBuffers:h,diskProvisionPasses:{...t.intro.diskProvisionPasses,[n]:m},...g?{diskBuildQueued:!1,diskBuildQueuedByReplay:!1}:null}}},Ss=200,Cs=(e,t)=>{let n=Oa(t);return t/Math.max(Ha(e,n)*Qa(e,n),Number.MIN_VALUE)},ws=(e=0)=>t=>{if(!t.intro?.byteCreated)return t;if(!ns(t))return t.intro.lowerRebuild?{...t,intro:{...t.intro,lowerRebuild:null}}:t;let n=t.intro,r=Math.max(0,e),i=!1;for(let e=0;e<Ss;e+=1){let e={...t,intro:n};if(!ns(e))break;let a=os(e),o=Oa(a);if(Ma(e,o)||ja(e,o)||Ga(e,o)<a||n.diskBuild)break;let s=n.disksBuiltTotal?.[a]??0,c=n.disks?.[a]??0;if(s>=9&&c>=s)break;let l=Va(e,o)*Qa(e,o);if(!(l>0)||!Number.isFinite(l))break;let u=n.lowerRebuild?.size===a?n.lowerRebuild.progress:0,d=n.poolBuffers?.[o]??0,f=Math.max(0,d-oo(e,o)),p=Math.min(r*l,f,Math.max(0,1-u)*a);if(!(p>0))break;let m=u+p/a,h={...n.poolBuffers,[o]:d-p};if(r=Math.max(0,r-p/l),m<.999999999){n={...n,poolBuffers:h,lowerRebuild:{size:a,progress:m}},i=!0;break}n={...n,poolBuffers:h,disks:{...n.disks,[a]:c+1},disksBuiltTotal:{...n.disksBuiltTotal,[a]:Math.max(s,c+1)},lowerRebuild:null},i=!0}return i?{...t,intro:n}:t},Ts=e=>{let t={seconds:0,disksDone:0,disksTotal:0,projected:!1};if(!ns(e))return t;let n=aa(e.intro);for(let r=1;r<n;r+=1){let n=Qo(r),i=e.intro.disksBuiltTotal?.[n]??0,a=Math.min(9,e.intro.disks?.[n]??0);if(t.disksTotal+=9,i>=9){t.disksDone+=9;continue}let o=e.intro.lowerRebuild?.size===n?e.intro.lowerRebuild.progress:0;t.disksDone+=a+o,Va(e,Oa(n))<=0&&(t.projected=!0);let s=Cs(e,n);t.seconds+=(9-a-o)*s}return t},Es=e=>t=>{let n=t.intro.diskBuild;if(!n)return t;let r=n.remainingSeconds-e;return r>wt?{...t,intro:{...t.intro,diskBuild:{...n,remainingSeconds:r}}}:{...t,intro:{...t.intro,diskBuild:null,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n.size]:(t.intro.disksBuiltTotal?.[n.size]??0)+1}}}},Ds=e=>{let t=lc(e);return t?Qo(t+1):e*10},Os=e=>{let t=Oa(e);return!!t&&Oa(Ds(e))===t},ks=(e,t)=>e.intro?.diskWriteCache?.[t]??null,As=e=>e?Number.isFinite(e.collectedBits)?Math.max(0,e.collectedBits):Math.max(0,e.segmentsCollected??0)*(e.sourceSize??0):0,js=e=>e?Array.isArray(e.transfers)?e.transfers:e.transferSize?[{size:e.transferSize,remainingSeconds:e.segmentRemainingSeconds??0,totalSeconds:e.segmentTotalSeconds??0}]:[]:[],Ms=e=>e.totalSeconds>0?e.size*(1-e.remainingSeconds/e.totalSeconds):0,Ns=e=>{if(!e||e.segmentsCollected>=10)return 0;let t=e.sourceSize??0;if(!(t>0))return 0;let n=Math.max(0,As(e)-(e.segmentsCollected??0)*t),r=js(e).reduce((e,t)=>e+Ms(t),0);return Math.min(1,Math.max(0,(n+r)/t))},Ps=e=>!e||e.segmentsCollected<10||e.flushTotalSeconds<=0?0:1-e.flushRemainingSeconds/e.flushTotalSeconds,Fs=(e,t)=>{let n=ks(e,t);if(!n||n.segmentsCollected>=10)return!1;let r=js(n);return r.length>0&&r.every(t=>nc(e,t.size))},Is=e=>{let t=lc(e);if(!t||t<=1)return null;let n=Qo(t-1),r=Oa(e);return r&&Oa(n)===r?n:null},Ls=(e,t)=>!Is(t)||e.intro.diskBuild?.size===t||e.intro.diskWriteCache?.[t]?!1:(e.intro.disksBuiltTotal?.[t]??0)>(e.intro.disks?.[t]??0),Rs=(e,t,n=!1)=>({sourceSize:Is(t),segmentsCollected:0,collectedBits:0,transfers:[],flushRemainingSeconds:0,flushTotalSeconds:0,expedite:n}),zs=(e,t)=>{if(!Is(t)||e.intro?.diskBuild?.size===t||(e.intro?.disksBuiltTotal?.[t]??0)<=(e.intro?.disks?.[t]??0))return!1;let n=ks(e,t);return!n||!n.expedite&&n.segmentsCollected<10},Bs=(e,t)=>!!ks(e,t)?.expedite,Vs=e=>t=>{if(!zs(t,e))return t;let n=ks(t,e);return{...t,intro:{...t.intro,diskWriteCache:{...t.intro.diskWriteCache??{},[e]:n?{...n,expedite:!0}:Rs(t,e,!0)}}}},Hs=(e,t)=>{let n=e[t]??0;if(n<=1){let{[t]:n,...r}=e;return r}return{...e,[t]:n-1}},Us=(e,t)=>{let n=Va(e,Oa(t))*5;return t/Math.max(n,Number.MIN_VALUE)},Ws=(e,t,n,r)=>{let i=Oa(t),a={};for(let[n,r]of Object.entries(e.intro.diskWriteCache??{}))if(Number(n)!==t)for(let e of js(r))a[e.size]=(a[e.size]??0)+1;for(let e of r)a[e.size]=(a[e.size]??0)+1;let o=[],s=n,c=Aa(i).filter(e=>e<t).sort((e,t)=>t-e);for(let t of c){if(e.intro.diskBuild?.size===t||nc(e,t))continue;let n=(e.intro.disks?.[t]??0)-(a[t]??0);for(;n>0&&t<=s*1.000000001;)o.push(t),s-=t,--n}return o},Gs=1-1e-9,Ks=(e,t)=>e.length===t.length&&e.every((e,n)=>e.size===t[n].size&&e.remainingSeconds===t[n].remainingSeconds),qs=e=>t=>{let n=t.intro,r=n.disks??{},i={...n.diskWriteCache??{}},a=!1,o=null;for(let e of Object.keys(i).map(Number)){let s=i[e];if(!s)continue;let c=Oa(s.sourceSize);if(c===Oa(e)||(s.segmentsCollected??0)>=10)continue;let l=Math.max(0,s.segmentsCollected??0),u=r[s.sourceSize]??0,d=Math.max(0,(n.disksBuiltTotal?.[s.sourceSize]??0)-u),f=Math.min(d,l);f>0&&(r={...r,[s.sourceSize]:u+f});let p=(l-f)*s.sourceSize;p>0&&c&&(o??={...n.poolBuffers??{}},o[c]=Math.min((o[c]??0)+p,Ka(t,c)));let{[e]:m,...h}=i;i=h,a=!0}let s={...t,intro:{...n}};Object.defineProperties(s.intro,{disks:{get:()=>r,enumerable:!0},diskWriteCache:{get:()=>i,enumerable:!0},poolBuffers:{get:()=>o??n.poolBuffers,enumerable:!0}});let c=Object.keys(n.disksBuiltTotal??{}).map(Number).sort((e,t)=>e-t);for(let e of c){let t=s;Ls(t,e)&&(i[e]=Rs(t,e),a=!0)}let l=Object.keys(i).map(Number).sort((e,t)=>+!!i[t]?.expedite-!!i[e]?.expedite||e-t);for(let c of l){let l=i[c];if(!l)continue;let u=Oa(c),d=Qa(t,u),f=(n.disksBuiltTotal?.[c]??0)>(r[c]??0);if((l.segmentsCollected??0)>=10){if(!f)continue;let t=l.flushRemainingSeconds-e*d;if(t>wt){t!==l.flushRemainingSeconds&&(i[c]={...l,flushRemainingSeconds:t},a=!0);continue}r={...r,[c]:(r[c]??0)+1};let{[c]:n,...o}=i;i=o,a=!0;continue}if(!f)continue;let p=l.sourceSize??Is(c);if(!(p>0))continue;let m=js(l),h=As(l),g=[];for(let t of m){if(nc(s,t.size)){g.push(t);continue}let n=t.remainingSeconds-e*d;n>wt?g.push({...t,remainingSeconds:n}):(r[t.size]??0)>0&&(r=Hs(r,t.size),h+=t.size)}if(u){let e=(o??n.poolBuffers??{})[u]??0,t=Math.max(0,e-oo(s,u)),r=Math.max(0,c-h);g.length>0&&t>=r&&(g=[]);let i=g.reduce((e,t)=>e+t.size,0),a=Math.min(t,Math.max(0,r-i));a>0&&(o??={...n.poolBuffers??{}},o[u]=e-a,h+=a)}if(l.expedite&&h<c*Gs){let e=g.reduce((e,t)=>e+t.size,0);for(let n of Ws(s,c,c-h-e,g)){let e=Us(t,n);g.push({size:n,remainingSeconds:e,totalSeconds:e})}}let{transferSize:_,segmentRemainingSeconds:v,segmentTotalSeconds:y,...b}=l,x={...b,sourceSize:p,transfers:g};if(h>=c*Gs){r={...r,[c]:(r[c]??0)+1};let{[c]:e,...t}=i;i=t,a=!0}else x.collectedBits=h,x.segmentsCollected=Math.min(9,Math.floor(h/p+1e-9)),x.collectedBits===l.collectedBits&&x.segmentsCollected===l.segmentsCollected&&Array.isArray(l.transfers)&&Ks(x.transfers,l.transfers)&&x.flushRemainingSeconds===l.flushRemainingSeconds&&x.sourceSize===l.sourceSize||(i[c]=x,a=!0)}return a?{...t,intro:{...n,disks:r,diskWriteCache:i,...o?{poolBuffers:o}:null}}:t},Js=(e,t)=>e.intro?.diskReadCacheFlush?.[t]??null,Ys=(e,t)=>{let n=t/8,r=Va(e,Oa(t))*2;return n/Math.max(r,Number.MIN_VALUE)},Xs=e=>!e||e.totalSeconds<=0?0:1-e.remainingSeconds/e.totalSeconds,Zs=(e,t)=>Js(e,t)?nc(e,t):!1,Qs=e=>dc(e)===Ie[0],$s=(e=0)=>t=>{let n=t.intro?.disksBuiltTotal??{},r=t.intro.diskBuild?.size,i={...t.intro.poolBuffers??{}},a=e=>i[e]??0,o={...t.intro.disks??{}},s={...t.intro.diskCache??{}},c={...t.intro.diskReadCacheFlush??{}},l=!1,u=Ia(t),d=e=>{if(!Qs(e))return!1;let t=Oa(e);return!!t&&t<=u};for(let e in s){let n=Number(e);if(d(n))continue;let r=Oa(n);r&&(i[r]=Math.min(a(r)+s[n],Ka(t,r))),delete s[n],l=!0}for(let e in c){let t=Number(e);d(t)||(delete c[t],l=!0)}let f=[];for(let e=1;e<=u;e+=1)f.push(vl(e));let p=f.filter(e=>e!==r).sort((e,t)=>e-t);for(let e in c){let t=Number(e);(t===r||(n[t]??0)<=(o[t]??0))&&(delete c[t],l=!0)}for(let n of p){if(c[n])continue;let r=Oa(n),o=s[n]??0,u=a(r);if(o<n&&u>0&&e>0){let a=e*Va(t,r)*5*Qa(t,r),c=Math.min(n-o,u,a);if(c>0){i[r]=u-c;let e=o+c;s[n]=n-e<=n*wt?n:e,l=!0}}}for(let e of p){if(c[e]||ks(t,e))continue;let r=(n[e]??0)>(o[e]??0),i=s[e]??0;if(!r||i<e||nc(t,e))continue;let a=Ys(t,e);c[e]={remainingSeconds:a,totalSeconds:a},l=!0}let m=[];for(let e in c)m.push(Number(e));m.sort((e,t)=>e-t);let h={...t,intro:{...t.intro}};Object.defineProperties(h.intro,{poolBuffers:{get:()=>i,enumerable:!0},disks:{get:()=>o,enumerable:!0},diskCache:{get:()=>s,enumerable:!0},diskReadCacheFlush:{get:()=>c,enumerable:!0}});for(let r of m){let i=c[r];if(!i||nc(h,r))continue;let a=i.remainingSeconds-e*Qa(t,Oa(r));if(a>wt){a!==i.remainingSeconds&&(c[r]={...i,remainingSeconds:a},l=!0);continue}let u=(n[r]??0)>(o[r]??0),d=s[r]??0;u&&d>=r&&(s[r]=d-r,o[r]=(o[r]??0)+1),delete c[r],l=!0}return l?{...t,intro:{...t.intro,poolBuffers:i,disks:o,diskCache:s,diskReadCacheFlush:c}}:t},ec=e=>{let t=dc(e);return t?Ie.indexOf(t)+1:null},tc=(e,t)=>{let n=uc(t),r=ec(t);if(!n||!r)return;let i=b[n-1];if(i)return(e.purchaseLevels?.[i.id]??1)===r?i:void 0},nc=(e,t)=>tc(e,t)!==void 0,rc=(e,t)=>{let n=uc(t),r=ec(t);if(!n||!r)return!1;let i=b[n-1];return i?(e.purchaseLevels?.[i.id]??1)>r:!1},ic=(e,t)=>tc(e,t)?.name??null,ac=e=>t=>{if(!io(t,e))return t;let n=tc(t,e),r=t.intro.disks[e],{[e]:i,...a}=t.intro.disks,o=r>1?{...t.intro.disks,[e]:r-1}:a;return ia(n.id,Ut(t))({...t,intro:{...t.intro,disks:o}})},oc=e=>{let t=Object.keys(e.intro.disks??{}).map(Number).filter(t=>io(e,t)).sort((e,t)=>e-t)[0];return t===void 0?e:ac(t)(e)},sc=(e,t)=>{if(e<1||e>10)return null;let n=Ie[t-1];return n===void 0?null:Qo(_l(e,n))},cc=e=>{let t=e,n=!1;for(let e of b){if(S[e.id]>=$r(t))continue;let r=t.purchaseLevels?.[e.id]??1;if(r!==1)continue;let i=sc(S[e.id]+1,1);if(i===null||io(t,i)||t.intro.diskBuild?.size===i)continue;let a=t.intro.diskCache?.[i]??0,o=Gt(e,r);if(!(o>0)||a<o)continue;let s=t.purchaseLevelProgress?.[e.id]??0,c=Ut(t)-s,l=Math.min(c,Math.floor(a/o));if(l<=0)continue;let u=l*o,{[i]:d,...f}=t.intro.diskReadCacheFlush??{};t=ia(e.id,l)({...t,intro:{...t.intro,diskCache:{...t.intro.diskCache,[i]:a-u},diskReadCacheFlush:f}}),n=!0}return n?t:e},lc=e=>{if(!(e>0)||!Number.isFinite(e))return null;let t=e/Ae;if(t<1)return null;let n=Math.round(Math.log10(t))+1;return n<1||Qo(n)!==e?null:n},uc=e=>{let t=lc(e);return!t||t>Ve?null:Math.floor((t-1)/Ie.length)+1},dc=e=>{let t=lc(e);return!t||t>Ve?null:Ie[(t-1)%Ie.length]},fc=e=>Be[e-1]??null,W=(e,t)=>t<1||t>10?null:e.intro?.dataLakes?.[t]??Dt(),pc=(e,t)=>W(e,t)?.capacityLevel??0,mc=(e,t)=>pc(e,t)>=3,hc=(e,t)=>He[Math.min(pc(e,t),3)]+Math.max(0,W(e,t)?.resetCount??0)*1e3,gc=(e,t)=>{let n={};return Ie.forEach((t,r)=>{n[t]=r<e?Le[r]:0}),n[Re]=e>=3?Math.max(0,Math.trunc(Number(t))||0):0,n},_c=e=>ze.reduce((t,n)=>t+n*(e[n]??0),0),vc=e=>{let t=Math.max(0,Math.trunc(e)||0);return{disks:{1:t%10,10:Math.floor(t/10)%10,100:Math.floor(t/100)%10,1e3:Math.floor(t/1e3)}}},yc=(e,t)=>gc(pc(e,t),W(e,t)?.resetCount??0),bc=(e,t)=>_c(yc(e,t)),xc=(e,t)=>Math.min(hc(e,t),bc(e,t)+1),Sc=(e,t)=>vc(W(e,t)?.depositedUnits??0).disks,Cc=(e,t)=>W(e,t)?.fillBits??0,wc=(e,t)=>{let n=vl(t);return n>0&&Cc(e,t)>=n},Tc=(e,t)=>{let n=vl(t);return n>0?Math.min(1,Math.max(0,Cc(e,t)/n)):0},Ec=(e,t)=>W(e,t)?.lakeTransfer??null,Dc=(e,t)=>{let n=Ec(e,t);if(!n)return 0;let r=n.target*vl(t);return r>0?Math.min(1,Math.max(0,n.movedBits/r)):0},Oc=(e,t)=>(W(e,t)?.depositedUnits??0)+ +!!wc(e,t),kc=(e,t)=>{let n=W(e,t),r=vl(t);return!n||!(r>0)?0:(n.depositedUnits??0)+(n.fillBits??0)/r+(n.lakeTransfer?.target??0)},Ac=(e,t)=>{let n=Uc(t)(e);if(!(n>0)||!Number.isFinite(n))return 100;let r=kc(e,t);return r>=n*(1-1e-9)&&tl(e,t,n)!==null?100:Math.max(0,Math.min(99,Math.floor(r/n*100)))},jc=(e,t)=>Uc(t)(e)<=xc(e,t),Mc=(e,t)=>!wc(e,t),Nc=(e,t)=>{let n=W(e,t);if(!n||n.lakeTransfer||!wc(e,t))return null;let r=yc(e,t),i=n.depositedUnits??0,a=vc(i).disks;for(let e=ze.length-1;e>=0;--e){let t=ze[e];if(!((r[t]??0)<=(a[t]??0))&&i%t===t-1)return t}return null},Pc=(e,t,n)=>Va(e,t)*Qa(e,t)*(n===1?2:5),Fc=(e,t)=>{let n=Cc(e,t);return n>0&&n<vl(t)},Ic=(e,t)=>{let n=Ga(e,t);return n>0&&qa(e,t)>=n},Lc=(e,t)=>!!W(e,t)?.acquiring,Rc=(e,t)=>Fc(e,t)?!0:Lc(e,t)?Cl(e,t)&&!wl(e,t,!0)&&qa(e,t)>oo(e,t):Ic(e,t),zc=e=>me.slice(0,dr(e.intro)).reduce((e,t)=>e+(t.lakeSpeed??0),0),Bc=(e,t)=>Math.round((.1+.1*Math.max(0,W(e,t)?.resetCount??0)+zc(e))*1e6)/1e6,Vc=(e,t)=>(e.intro?.disksBuiltTotal?.[vl(t)]??0)>0,Hc=(e,t)=>(W(e,t)?.boostersUnlocked??!1)||Vc(e,t),Uc=e=>t=>{let n=W(t,e);return n?(n.purchased??0)+1:0},Wc=(e,t)=>{let n=Me[t-1];return!!n&&(e.intro?.[n.autoFlagField]??!1)},Gc=(e,t)=>Wc(e,t)?18:10,Kc=(e,t)=>Gc(e,Fe.indexOf(t)+1),qc=(e,t)=>{let n=Fe[t-1];return n?Math.max(0,Gc(e,t)-(e.intro?.[n]??0)):0},Jc=(e,t)=>{if(!Wc(e,t))return 0;let n=Me[t-1];if((e.intro?.[n.timerField]??0)>0)return 8;let r=Fe[t-1],i=e.intro?.[r]??0;return Math.min(8,Math.max(0,i-10)+Zc(e,t-1))},Yc=(e,t)=>{let n=e.intro?.computeChargeSeconds?.[t];return Number.isFinite(n)&&n>=0?n:null},Xc=(e,t)=>Yc(e,t)!==null,Zc=(e,t)=>{let n=Yc(e,t);return n===null?0:Math.floor(n/1+wt)},Qc=(e,t)=>{let n=Me[t];if(!n)return!1;let r=e.intro??{};return!!r[n.autoFlagField]&&!((r[n.timerField]??0)>0)&&!Xc(e,t)&&(r[n.inputField]??0)>=8&&(r[n.outputField]??0)<Kc(e,n.outputField)},$c=e=>t=>Qc(t,e)?{...t,intro:{...t.intro,computeChargeSeconds:{...t.intro?.computeChargeSeconds??{},[e]:0}}}:t,el=e=>t=>{let n=t.intro?.computeChargeSeconds,r=n?Object.keys(n):[];if(r.length===0)return t;let i={...n},a={...t.intro};for(let n of r){let r=Number(n),o=Me[r],s=Yc(t,r),c=o?a[o.inputField]??0:0;if(!o||s===null||c<8||(a[o.outputField]??0)>=Kc({...t,intro:a},o.outputField)){delete i[n];continue}let l=s+e;if(Math.max(0,c-10)+Math.floor(l/1+wt)<8){i[n]=l;continue}delete i[n];let u=a[o.outputField]??0,d=Kc({...t,intro:a},o.outputField);u>=d||(a={...a,[o.inputField]:c-8,[o.outputField]:Math.max(u,Math.min(u+1,d))})}return{...t,intro:{...a,computeChargeSeconds:i}}},tl=(e,t,n)=>{if(!W(e,t)||!(n>0))return null;let r=Sc(e,t),i=[(r[1]??0)+ +!!wc(e,t),r[10]??0,r[100]??0,r[1e3]??0],a=(e,t)=>{if(t===0)return!0;if(e===i.length-1)return t<=i[e];for(let n=t%10;n<=Math.min(i[e],t);n+=10)if(a(e+1,(t-n)/10))return!0;return!1};for(let e=n%10;e<=Math.min(i[0],n);e+=10)if(a(1,(n-e)/10))return e;return null},nl=(e,t)=>Hc(e,t)&&qc(e,t)>0&&tl(e,t,Uc(t)(e))!==null,rl=(e,t)=>qc(e,t)<=0,il=(e,t=1)=>n=>{let r=W(n,e);if(!r||!Hc(n,e))return n;let i=Fe[e-1];if(!i)return n;let a=qc(n,e);if(a<=0)return n;let o=r,s=0,c=n,l=Math.min(t,a);for(;s<l;){let t=(o.purchased??0)+1,n=tl(c,e,t);if(n===null)break;let r=o.depositedUnits??0,i=Sc(c,e)[1]??0,a=Math.max(0,n-i);o={...o,depositedUnits:r-(t-a),fillBits:a>0?0:o.fillBits??0,acquiring:!1,purchased:(o.purchased??0)+1},c={...c,intro:{...c.intro,dataLakes:{...c.intro.dataLakes,[e]:o}}},s+=1}if(s<=0)return n;let u=gl(n.intro,e,i,s),d=o;return{...n,intro:{...n.intro,...u,dataLakes:{...n.intro.dataLakes,[e]:d}}}},al=(e,t)=>{let n=Uc(t)(e);if(tl(e,t,n)!==null)return 0;let r=vl(t);return Math.max(r,(n-kc(e,t))*r)},ol=(e,t)=>{if(ka(e,t)||!Vc(e,t))return!1;let n=vl(t);return al(e,t)<=n*1e-9||Uc(t)(e)>xc(e,t)||!Mc(e,t)?!1:qa(e,t)>0&&Rc(e,t)},sl=e=>t=>{if(!ol(t,e))return t;let n=al(t,e),r=qa(t,e),i=vl(e)-Cc(t,e),a=Lc(t,e)&&!Fc(t,e)?Math.max(0,r-oo(t,e)):r,o=Math.min(n,a,i);if(!(o>0))return t;let{unconsumedBits:s,...c}=yl(t,t.intro.dataLakes,e,o),l=o-s;return{...t,intro:{...t.intro,poolBuffers:{...t.intro.poolBuffers,[e]:r-l},dataLakes:{...t.intro.dataLakes,[e]:c}}}},cl=(e,t)=>n=>{let r=W(n,e);return r?{...n,intro:{...n.intro,dataLakes:{...n.intro.dataLakes,[e]:{...r,autoConvertActive:t}}}}:n},ll=(e,t)=>W(e,t)?.autoConvertActive??!1,ul=(e,t)=>!!W(e,t)?.boosterAuto||ka(e,t),dl=(e,t)=>{let n=W(e,t);return!n||(n.autoConvertActive??!1)||n.boosterAuto||!Hc(e,t)||!Vc(e,t)?!1:qc(e,t)>0},fl=(e,t)=>{let n=W(e,t);return!n||n.rebuilding||!ka(e,t)?!1:!n.lakeTransfer&&Oc(e,t)>=hc(e,t)&&Uc(t)(e)>hc(e,t)},pl=e=>t=>{if(!fl(t,e))return t;let n=W(t,e),r=Aa(e),i=e=>Object.fromEntries(Object.entries(e??{}).filter(([e])=>!r.includes(Number(e)))),a=(n.resetCount??0)+1,o=Math.min(2,Math.max(0,Number(t.intro.poolExponentBonuses?.[e])||0)),s=Math.min(2,Math.max(o+1,a)),c=Oa(t.intro.diskBuild?.size)===e,l=Object.fromEntries(Object.entries(t.intro.diskWriteCache??{}).filter(([e,t])=>!r.includes(Number(e))&&!r.includes(Number(t?.sourceSize))));return br({...t,intro:{...t.intro,poolExponentBonuses:{...t.intro.poolExponentBonuses,[e]:s},disks:i(t.intro.disks),disksBuiltTotal:i(t.intro.disksBuiltTotal),diskCache:i(t.intro.diskCache),diskReadCacheFlush:i(t.intro.diskReadCacheFlush),diskWriteCache:l,diskProvisionPasses:i(t.intro.diskProvisionPasses),diskBuild:c?null:t.intro.diskBuild,diskBuildQueued:!c&&t.intro.diskBuildQueued,diskBuildQueuedByReplay:!c&&t.intro.diskBuildQueuedByReplay,poolBuffers:{...t.intro.poolBuffers,[e]:0},dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,autoConvertActive:!1,resetCount:a,rebuilding:!0}},poolResetRebuildingCount:(t.intro.poolResetRebuildingCount??0)+1,poolResetCount:(t.intro.poolResetCount??0)+1}})},ml=e=>t=>{let n=W(t,e);return n&&!n.autoConvertActive&&!n.boosterAuto&&nl(t,e)?il(e,1)(t):dl(t,e)?cl(e,!0)(t):t},hl=e=>{let t=e;for(let e=1;e<=10;e+=1){if(ka(t,e)&&!W(t,e)?.boosterAuto){let n=W(t,e);t={...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,boosterAuto:!0}}}}}W(t,e)?.boosterAuto&&Uc(e)(t)<=hc(t,e)&&nl(t,e)&&(t=il(e,1)(t)),ll(t,e)&&(qc(t,e)<=0?t=cl(e,!1)(t):Vc(t,e)?nl(t,e)?(t=il(e,1)(t),t=cl(e,!1)(t)):t=sl(e)(t):t=cl(e,!1)(t))}return t},gl=(e,t,n,r=1)=>{let i=(e[n]??0)+r,a={[n]:i};return t===1&&(a.computeCoresEverEarned=(e.computeCoresEverEarned??0)+r,a.computeMergePageUnlocked=(e.computeMergePageUnlocked??!1)||a.computeCoresEverEarned>=8),a},_l=(e,t)=>(e-1)*Ie.length+Ie.indexOf(t)+1,vl=e=>Qo(_l(e,Ie[0])),yl=(e,t,n,r)=>{let i=t[n]??W(e,n),a=vl(n),o=Math.min(a,Math.max(0,i.fillBits??0)),s=Math.max(0,a-o),c=Math.min(s,Math.max(0,r)),l=o+c,u=l>=a*(1-1e-12)?a:l;return{...i,fillBits:u,boostersUnlocked:(i.boostersUnlocked??!1)||u>=a,acquiring:(i.acquiring??!1)||c>0,unconsumedBits:Math.max(0,r-c)}},bl=(e,t,n,r,i)=>{let a=W(e,t),o=Math.max(0,vl(t)-(a.fillBits??0)),s=Math.min(i,Math.max(0,n*r),o);if(!(s>0))return{lake:a,remainingBits:i,changed:!1};let{unconsumedBits:c,...l}=yl(e,{[t]:a},t,s);return{lake:l,remainingBits:i-(s-c),changed:!0}},xl=(e,t,n)=>{let r=W(e,t);if(!r||!Vc(e,t))return r;let i=vl(t),a=r,o=Math.max(0,n);for(let n=0;n<8;n+=1){let n={...e,intro:{...e.intro,dataLakes:{...e.intro.dataLakes,[t]:a}}};if(!a.lakeTransfer){let e=Nc(n,t);if(e===null)break;a={...a,depositedUnits:(a.depositedUnits??0)-(e-1),fillBits:0,lakeTransfer:{target:e,movedBits:0}};continue}let{target:r,movedBits:s}=a.lakeTransfer,c=Pc(n,t,r);if(!(c>0))break;let l=Math.max(0,r*i-s)/c;if(l<=o*1.000000001)o=Math.max(0,o-l),a={...a,depositedUnits:(a.depositedUnits??0)+r,lakeTransfer:null,boostersUnlocked:!0};else{a={...a,lakeTransfer:{target:r,movedBits:s+c*o}};break}}return a},Sl=e=>t=>{let n=null;for(let r=1;r<=10;r+=1){let i=W(t,r),a=xl(t,r,e);a!==i&&t.intro?.dataLakes?.[r]&&(n??={...t.intro.dataLakes},n[r]=a)}return n?{...t,intro:{...t.intro,dataLakes:n}}:t},Cl=(e,t)=>Aa(t).every(t=>(e.intro?.disks?.[t]??0)>=(e.intro?.disksBuiltTotal?.[t]??0)),wl=(e,t,n=!1)=>{let r=e.intro??{};if(Ma(e,t))return!0;if(ns(e)){let n=os(e);if(Oa(n)===t&&Ga(e,t)>=n)return!0}if(r.diskBuild&&Oa(r.diskBuild.size)===t)return!0;let i=Aa(t);return!n&&i.some(t=>ls(e,t)>0)?!0:!!r.diskBuildQueued&&i.includes(os(e))},Tl=(e,t)=>!Vc(e,t)||!Mc(e,t)?!1:Fc(e,t)?qa(e,t)>0:(Lc(e,t)||Ic(e,t))&&Cl(e,t)&&!wl(e,t,Lc(e,t))&&qa(e,t)>oo(e,t),El=(e,t=null)=>n=>{if(!(e>0))return n;let r=Ia(n),i=null,a=null;for(let o=1;o<=r;o+=1){if(t&&t.intro?.dataLakes?.[o]!==n.intro?.dataLakes?.[o]||!Tl(n,o))continue;let r=qa(n,o),s=Fc(n,o)?r:Math.max(0,r-oo(n,o));if(s<=0)continue;let c=Va(n,o)*Qa(n,o)*Bc(n,o),{lake:l,remainingBits:u,changed:d}=bl(n,o,c,e,s);d&&(i??={...n.intro.poolBuffers??{}},a??={...n.intro.dataLakes},i[o]=r-(s-u),a[o]=l)}return i?{...n,intro:{...n.intro,poolBuffers:i,dataLakes:a}}:n},Dl=(e,t)=>kc(e,t)*vl(t),Ol=(e,t)=>Qo(_l(e,Ie[t])),kl=(e,t)=>{if(t<1||t>10||mc(e,t))return!1;let n=Ol(t,pc(e,t));return(e.intro?.disksBuiltTotal?.[n]??0)>=9},Al=(e,t)=>kl(e,t),jl=e=>t=>{if(!Al(t,e))return t;let n=W(t,e);return{...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,capacityLevel:pc(t,e)+1}}}}},Ml=e=>(e.intro?.capacity??0)>=je,Nl=(e,t)=>{let n=Number(e.intro?.chargerUnlockProgress?.[t]??0);return Number.isFinite(n)?Math.max(0,Math.min(10,Math.floor(n))):0},Pl=(e,t,n)=>r=>{if(r.intro?.[n])return r;let i=r.intro?.[e]??0,a=Nl(r,n),o=Math.min(10-a,Math.floor(i/8));if(o>0){let t=a+o;return{...r,intro:{...r.intro,[e]:i-o*8,chargerUnlockProgress:{...r.intro?.chargerUnlockProgress??{},[n]:t},...t>=10?{[n]:!0}:{}}}}let s=r.intro?.[t]??0,c=Math.max(0,Kc(r,t)-s),l=Math.min(c,Math.floor(i/8));return l<=0?r:{...r,intro:{...r.intro,[e]:i-l*8,[t]:s+l}}},Fl=Pl(`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`),Il=Pl(`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`),Ll=Pl(`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`),Rl=Pl(`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`),zl=Pl(`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`),Bl=Pl(`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`),Vl=Pl(`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),Hl=Pl(`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),Ul=Pl(`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),Wl=(e,t,n,r,i,a)=>o=>!(o.intro?.[n]??!1)||(o.intro?.[r]??0)>0||(o.intro?.[e]??0)<a||(o.intro?.[t]??0)>=Kc(o,t)||!(i>0)?o:{...o,intro:{...o.intro,[e]:(o.intro?.[e]??0)-8,[r]:i}},Gl=(e,t,n)=>r=>{let i=r.intro?.[t]??0;if(i<=0)return r;let a=i-e;return a>0?{...r,intro:{...r.intro,[t]:a}}:{...r,intro:{...r.intro,[t]:0,[n]:Math.max(r.intro?.[n]??0,Math.min(Kc(r,n),(r.intro?.[n]??0)+1))}}},Kl=(e,t,n,r,i,a)=>o=>{let s=o.intro?.[i]??0,c=!!o.intro?.[r]&&(o.computeAutoChargeEnabled??!0)&&!Xc(o,a)&&(o.intro?.[t]??0)>=18;if(!(s>0)&&!c)return o;let l=ql(o,a),u=l>0&&s>l?{...o,intro:{...o.intro,[i]:l}}:o,d=c?Wl(t,n,r,i,l,18)(u):u,f=!(s>0)&&(d.intro?.[i]??0)>0?od(d,a+1):d;return Gl(e,i,n)(f)},ql=(e,t)=>{if(!Number.isInteger(t)||t<0||t>=Me.length)return 0;let n=t+1,r=Va(e,n);return!(r>0)||!Number.isFinite(r)?0:8*Ys(e,Qo((n-1)*Ie.length+1))},Jl=(e,t,n)=>!(e.intro?.[n]??!1)&&(e.intro?.[t]??0)>=10,Yl=(e,t)=>n=>Jl(n,e,t)?{...n,intro:{...n.intro,[e]:(n.intro?.[e]??0)-10,[t]:!0}}:n,Xl=(e,t,n,r,i)=>(e.intro?.[r]??!1)&&(e.intro?.[t]??0)>=8&&(e.intro?.[n]??0)+ +((e.intro?.[i]??0)>0)<Kc(e,n),Zl=(e,t)=>{let n=Me[t];return n?Xl(e,n.inputField,n.outputField,n.autoFlagField,n.timerField):!1},Ql=e=>t=>{let{inputField:n,outputField:r,autoFlagField:i,timerField:a}=Me[e];return Xl(t,n,r,i,a)?{...t,intro:{...t.intro,[n]:t.intro[n]-8,[r]:(t.intro?.[r]??0)+1}}:t},$l=e=>Kl(e,`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`,`computeCoresMergeRemainingSeconds`,0),eu=Yl(`computeNodes`,`autoMergeCoresIntoNode`),tu=e=>Jl(e,`computeNodes`,`autoMergeCoresIntoNode`),nu=Ql(0),ru=e=>Kl(e,`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`,`computeNodesMergeRemainingSeconds`,1),iu=Yl(`computeClusters`,`autoMergeNodesIntoCluster`),au=e=>Jl(e,`computeClusters`,`autoMergeNodesIntoCluster`),ou=Ql(1),su=e=>Kl(e,`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`,`computeClustersMergeRemainingSeconds`,2),cu=Yl(`computeNetworks`,`autoMergeClustersIntoNetwork`),lu=e=>Jl(e,`computeNetworks`,`autoMergeClustersIntoNetwork`),uu=Ql(2),du=e=>Kl(e,`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`,`computeNetworksMergeRemainingSeconds`,3),fu=Yl(`computeGrids`,`autoMergeNetworksIntoGrid`),pu=e=>Jl(e,`computeGrids`,`autoMergeNetworksIntoGrid`),mu=Ql(3),hu=e=>Kl(e,`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`,`computeGridsMergeRemainingSeconds`,4),gu=Yl(`computeFabrics`,`autoMergeGridsIntoFabric`),_u=e=>Jl(e,`computeFabrics`,`autoMergeGridsIntoFabric`),vu=Ql(4),yu=e=>Kl(e,`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`,`computeFabricsMergeRemainingSeconds`,5),bu=Yl(`computeClouds`,`autoMergeFabricsIntoCloud`),xu=e=>Jl(e,`computeClouds`,`autoMergeFabricsIntoCloud`),Su=Ql(5),Cu=e=>Kl(e,`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`,`computeCloudsMergeRemainingSeconds`,6),wu=Yl(`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),Tu=e=>Jl(e,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),Eu=Ql(6),Du=e=>Kl(e,`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`,`computeDatacentersMergeRemainingSeconds`,7),Ou=Yl(`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),ku=e=>Jl(e,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),Au=Ql(7),ju=e=>Kl(e,`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`,`computeSupercomputersMergeRemainingSeconds`,8),Mu=Yl(`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),Nu=e=>Jl(e,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),Pu=Ql(8),Fu=[$l,ru,su,du,hu,yu,Cu,Du,ju],Iu=e=>Number.isInteger(e)&&e>=1&&e<=Fe.length,Lu=e=>Iu(e)?Fe[e-1]:null,Ru=(e,t)=>{let n=Ne[e];return!n||!Iu(t)?0:n.multiplier},zu=(e,t)=>{let n=Ne[e];return!n||!Iu(t)?0:n.durationSeconds},Bu=e=>{let t=e?.computeBoostType??null;if(!t||!Ne[t])return null;let n=e.computeBoostTierIndex??1,r=Iu(n)?n:1,i=Ne[t].durationSeconds,a=e.computeBoostRemainingSeconds??0,o=Math.max(1,Math.min(e.computeBoostStacks??1,Math.ceil(a/i)));return{type:t,queue:Array(o).fill(r),remainingSeconds:a-(o-1)*i}},Vu=e=>{let t=e?.computeBoosts??{},n=Bu(e),r=[];for(let e of Object.keys(Ne)){let i=t[e];Array.isArray(i?.queue)&&i.queue.length>0?r.push({type:e,queue:i.queue,remainingSeconds:i.remainingSeconds??0}):n?.type===e&&r.push(n)}return r},Hu=(e,t)=>Vu(e).find(e=>e.type===t)??null,Uu=(e,t)=>{let n={};for(let e of t)e.queue.length>0&&(n[e.type]={queue:e.queue,remainingSeconds:e.remainingSeconds});let{computeBoostType:r,computeBoostTierIndex:i,computeBoostStacks:a,computeBoostRemainingSeconds:o,...s}=e.intro;return{...e,intro:{...s,computeBoosts:n}}},Wu=e=>Vu(e).reduce((e,t)=>e+Ne[t.type].multiplier,0)||1,Gu=(e,t)=>Vu(e).reduce((e,n)=>e+(n.queue[0]>=t?Ne[n.type].multiplier:0),0)||1,Ku=e=>Vu(e).reduce((e,t)=>Math.max(e,t.queue[0]),0),qu=(e,t)=>1+Vu(e).reduce((e,n)=>e+(n.queue[0]>=t?Ne[n.type].poolBonusPercent??0:0),0)/100,Ju=(e,t,n)=>{if(!Ne[t])return!1;let r=Lu(n);return!r||(Hu(e.intro,t)?.queue.length??0)>=10?!1:(e.intro[r]??0)>=1},Yu=(e,t,n)=>Ju(e,t,n),Xu=(e,t)=>{let n=Hu(e.intro,t);return!!n&&Ju(e,t,n.queue[0])},Zu=(e,t)=>Xu(e,t),Qu=(e,t)=>Math.max(0,(Hu(e.intro,t)?.queue.length??0)-1),$u=(e,t)=>Qu(e,t)>0,ed=e=>t=>{if(!$u(t,e))return t;let n=Vu(t.intro),r=n.find(t=>t.type===e),i=r.queue[r.queue.length-1],a=Lu(i),o=Uu(t,n.map(e=>e===r?{...e,queue:e.queue.slice(0,-1)}:e));return{...o,intro:{...o.intro,[a]:(t.intro[a]??0)+1}}},td=(e,t)=>{let n=Hu(e.intro,t);return!!n&&n.queue.length===1},nd=e=>t=>td(t,e)?Uu(t,Vu(t.intro).filter(t=>t.type!==e)):t,G=(e,t)=>n=>{if(!Yu(n,e,t))return n;let r=Lu(t),i=Vu(n.intro),a=i.find(t=>t.type===e),o;if(a){let e=a.queue.slice(),n=e.length;for(;n>1&&e[n-1]<t;)--n;e.splice(n,0,t),o={...a,queue:e}}else o={type:e,queue:[t],remainingSeconds:zu(e,t)};let s=Uu(n,[...i.filter(e=>e!==a),o]);return{...s,intro:{...s.intro,[r]:(n.intro[r]??0)-1}}},K=e=>t=>Zu(t,e)?hf(e,Hu(t.intro,e).queue[0])(t):t,rd=e=>t=>{let n=Vu(t.intro);if(n.length===0)return t;let r=[];for(let t of n){let n=t.queue,i=t.remainingSeconds-e;for(;i<=0&&n.length>0&&(n=n.slice(1),n.length!==0);)i+=zu(t.type,n[0]);n.length>0&&r.push({type:t.type,queue:n,remainingSeconds:i})}return Uu(t,r)},id=e=>t=>(t.intro?.computeAutoBoostEnabled??!0)===!!e?t:{...t,intro:{...t.intro,computeAutoBoostEnabled:!!e}},ad=e=>t=>!Ne[e]||(t.intro?.computeAutoBoostType??`standard`)===e?t:{...t,intro:{...t.intro,computeAutoBoostType:e}},od=(e,t)=>{if(!(e.intro?.computeAutoBoostEnabled??!0))return e;let n=Ne[e.intro?.computeAutoBoostType]?e.intro.computeAutoBoostType:`standard`;return Yu(e,n,t)?hf(n,t)(e):e},sd=(e,t)=>n=>(n.autobuyers[e]??null)===null?n:{...n,autobuyersEnabled:{...n.autobuyersEnabled,[e]:!!t}},cd=(e,t,n)=>n+ +(Jr(e,`egressFees`)===t),ld=(e,t,n)=>{let r=cd(e,t,n);return Jr(e,`burnRate`)===t?Xt(t,r):Zt(t,r)},ud=(e,t,n)=>Math.max(Xt(t,cd(e,t,n)),ld(e,t,n)+(t===St()?0:1)),dd=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(Jr(e,`clockGated`)===t||Jr(e,`rateLimit`)===t&&n+1>4)return!0;if(Jr(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];if(n+1>(e.tickspeedLevels?.[r.id]??1))return!0}return!1},fd=e=>t=>{if(_i(t))return t;let n=x[e];if(!n||!vi(t)(n))return t;let r=t.tickspeedLevels?.[e]??1;if(dd(t,e))return t;let i=ld(t,e,r+1),a=t.resources[n.id]??0;return a<ud(t,e,r+1)?t:br({...t,resources:{...t.resources,[n.id]:z(a-i)},owned:{...t.owned,[n.id]:z(a-i)},tickspeedLevels:{...t.tickspeedLevels,[e]:r+1}})},pd=e=>1*((S[e]??0)+1),md=e=>Math.max(0,Math.ceil(Math.log(tt/pd(e))/Math.log(et))),hd=(e,t)=>Math.max(tt,pd(e)*et**t),gd=(e,t)=>hd(t,e.autobuyerIntervalLevels?.[t]??0),_d=(e,t)=>Math.min($e,Math.max(0,(e.autobuyerIntervalLevels?.[t]??0)-md(t))),vd=(e,t)=>2**_d(e,t),yd=e=>md(e)+$e,bd=e=>La[e%10]*1e3**Math.floor(e/10),xd=(e,t)=>{let n=1,r=La.indexOf(e);for(;r===-1&&n<e;)n*=10,r=La.indexOf(e/n);if(r===-1)throw Error(`siCleanSeriesCost: base ${e} is not a series rung × 10^k`);return n*bd(r+t)},Sd=(e,t=b[0].id)=>((S[t]??0)+1)*xd(10,e),Cd=e=>t=>{if(_i(t)||li(t,`tierAutobuyer`,e)||!x[e]||t.autobuyers[e]==null)return t;let n=t.autobuyerIntervalLevels?.[e]??0;if(n>=yd(e))return t;let r=Sd(n,e);if(z(t.purge.points)<r)return t;let i=Dn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},autobuyerIntervalLevels:{...i.autobuyerIntervalLevels,[e]:n+1}}},wd=e=>Math.max(0,Math.ceil(Math.log(tt/e)/Math.log(et))),Td=e=>wd(rt[e].baseSeconds),Ed=(e,t)=>Math.max(tt,rt[t].baseSeconds*et**(e.automationIntervalLevels?.[t]??0)),Dd=(e,t)=>xd(rt[e].baseCost,t),Od=(e,t)=>t===`speedUp`?!!e.autoGlobalTickspeed:t===`scaleUp`?!!e.autoScaleUp:t===`restage`?!!e.autoXpTickspeed:t===`overclock`?!!e.autoOverclock:t===`purge`&&(e.autoPurge??null)!==null,kd=Od,Ad=e=>t=>{if(!rt[e]||_i(t)||li(t,`global`,e)||!Od(t,e))return t;let n=t.automationIntervalLevels?.[e]??0;if(n>=Td(e))return t;let r=Dd(e,n);if(z(t.purge.points)<r)return t;let i=Dn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},automationIntervalLevels:{...i.automationIntervalLevels,[e]:n+1}}},jd=()=>wd(it.baseSeconds),Md=(e,t)=>Math.max(tt,it.baseSeconds*et**(e.tierTickspeedIntervalLevels?.[t]??0)),Nd=(e,t=b[0].id)=>((S[t]??0)+1)*xd(it.baseCost,e),Pd=e=>t=>{if(_i(t)||li(t,`tierTickspeed`,e)||!x[e]||!t.tierTickspeedAutobuyer?.[e])return t;let n=t.tierTickspeedIntervalLevels?.[e]??0;if(n>=jd())return t;let r=Nd(n,e);if(z(t.purge.points)<r)return t;let i=Dn(t);return{...i,purge:{...i.purge,points:i.purge.points-r},tierTickspeedIntervalLevels:{...i.tierTickspeedIntervalLevels,[e]:n+1}}},Fd=e=>t=>({...t,computeAutoChargeEnabled:!!e}),Id=e=>t=>t.autoOverclock?{...t,autoOverclockEnabled:!!e}:t,Ld=(e,t)=>n=>n.tierTickspeedAutobuyer?.[e]?{...n,tierTickspeedAutobuyerEnabled:{...n.tierTickspeedAutobuyerEnabled,[e]:!!t}}:n,Rd=e=>t=>(t.autoPurge??null)===null?t:{...t,autoPurgeEnabled:!!e},zd=e=>{if(_i(e)||qr(e,`clockSpeedDisabled`)||!on(e))return e;let t=e.globalTickspeedMultiplier??null,n=rn(t??0),r=e.resources.base??0;return r<n?e:{...e,resources:{...e.resources,[O]:r-n},globalTickspeedMultiplier:(t??0)+1,accelerateBoughtThisCycle:!0}},Bd=e=>{let t=e?.disksBuiltTotal??{},n={};for(let[e,r]of Object.entries(t)){let t=Math.max(0,Math.floor(z(r)));t>0&&(n[e]=t)}let r=e?.diskBuild?.size;if(r!=null){let e=String(r);n[e]=(n[e]??0)+1}let i=e?.diskProvisionPasses??{},a={};for(let[e,t]of Object.entries(i)){let n=Math.max(0,Math.floor(z(t)));n>0&&(a[e]=n)}let o={};for(let[t,n]of Object.entries(e?.dataLakes??{})){let e=Math.max(0,Math.floor(z(n?.capacityLevel??0))),r=Math.max(0,Math.floor(z(n?.purchased??0)));(e>0||r>0)&&(o[t]={capacityLevel:e,purchased:r})}return{lakes:o,byteCreated:e?.byteCreated===!0,disksBuiltTotal:n,diskProvisionPasses:a,capacity:Math.max(8,z(e?.capacity??8)),speedCapacity:Math.max(8,z(e?.speedCapacity??e?.capacity??8))}},Vd=(e,t)=>{let n=e??Bd(null),r=t??Bd(null),i={},a={},o=new Set([...Object.keys(n.disksBuiltTotal??{}),...Object.keys(r.disksBuiltTotal??{}),...Object.keys(n.diskProvisionPasses??{}),...Object.keys(r.diskProvisionPasses??{})]);for(let e of o){let t=n.disksBuiltTotal?.[e]??0,o=r.disksBuiltTotal?.[e]??0,s=n.diskProvisionPasses?.[e]??0,c=r.diskProvisionPasses?.[e]??0,l=t>o||t===o&&s>=c,u=l?t:o,d=l?s:c;u>0&&(i[e]=u),d>0&&(a[e]=d)}let s={};for(let e of new Set([...Object.keys(n.lakes??{}),...Object.keys(r.lakes??{})]))s[e]={capacityLevel:Math.max(n.lakes?.[e]?.capacityLevel??0,r.lakes?.[e]?.capacityLevel??0),purchased:Math.max(n.lakes?.[e]?.purchased??0,r.lakes?.[e]?.purchased??0)};return{lakes:s,byteCreated:n.byteCreated||r.byteCreated,disksBuiltTotal:i,diskProvisionPasses:a,capacity:Math.max(n.capacity??8,r.capacity??8),speedCapacity:Math.max(n.speedCapacity??8,r.speedCapacity??8)}},Hd=(e,t)=>{let n=os(e),r=e.intro?.disksBuiltTotal?.[n]??0,i=t.disksBuiltTotal?.[String(n)]??t.disksBuiltTotal?.[n]??0;return r<i?!0:r>i?!1:ls(e,n)<(t.diskProvisionPasses?.[String(n)]??t.diskProvisionPasses?.[n]??0)},Ud=(e,t)=>{let n=e.intro?.foundryResetCaps;if(!n||(e.intro?.disksBuiltTotal?.[t]??0)!==(n.disksBuiltTotal?.[String(t)]??n.disksBuiltTotal?.[t]??0))return 1/0;let r=ls(e,t),i=n.diskProvisionPasses?.[String(t)]??n.diskProvisionPasses?.[t]??0;return Math.max(0,i-r)},Wd=e=>{let t=e.intro?.foundryResetCaps;if(!t)return e;let n=e,r=!1;if(t.byteCreated&&!n.intro.byteCreated){let e=Ea(n);e!==n&&(n=e,r=!0)}if(!ns(n)&&Hd(n,t)){let e=vs(n);e!==n&&(n=e.intro?.diskBuildQueued?{...e,intro:{...e.intro,diskBuildQueuedByReplay:!0}}:e,r=!0)}if(!n.intro?.capacityUpgradeQueued&&!n.intro?.speedUpgradeQueued){let e=!ca(n.intro)&&(t.speedCapacity??t.capacity??0)>(n.intro?.speedCapacity??n.intro?.capacity??0),i=(t.capacity??0)>(n.intro?.capacity??0),a=n;e&&(a=_o(n)),a===n&&i&&(a=xo(n)),a!==n&&(n=a,r=!0)}for(let[e,i]of Object.entries(t.lakes??{})){let t=Number(e);if((W(n,t)?.purchased??0)<(i.purchased??0)&&nl(n,t)){let e=il(t,(i.purchased??0)-(W(n,t)?.purchased??0))(n);e!==n&&(n=e,r=!0)}if(((W(n,t)?.purchased??0)>=(i.purchased??0)||rl(n,t)||Uc(t)(n)>hc(n,t))&&pc(n,t)<(i.capacityLevel??0)){let e=jl(t)(n);e!==n&&(n=e,r=!0)}}return r?n:e},Gd=e=>{let t=kt().intro,n=e.intro??{},r=n.mainGameUnlocked===!0,i=Vd(n.foundryResetCaps,Bd(n)),a={...t.dataLakes};for(let[e,t]of Object.entries(n.dataLakes??{}))t?.boosterAuto&&a[e]&&(a[e]={...a[e],boosterAuto:!0});return{...e,intro:{...t,dataLakes:a,mainGameUnlocked:r,foundryResetCaps:i,unlockedDiskSteps:aa(n),poolExponentBonuses:{...n.poolExponentBonuses??{}}}}},Kd=e=>{if(z(e.resources.base)<ii(e))return e;let t=Gr(e);if(!t)return yn(Yd(e,!0));let n=Kr(e,t.id),r=z(e.challenges.activeSeconds),i=e.challenges.bestSeconds?.[t.id];return yn({...Yd(e,!n),challenges:{...e.challenges,active:null,activeSeconds:0,run:Ct(),completed:{...e.challenges.completed,[t.id]:!0},bestSeconds:{...e.challenges.bestSeconds,[t.id]:i===void 0?r:Math.min(i,r)}}})},qd=e=>t=>{if(!Wr(e)||Gr(t)||!si(t,e))return t;let n={...kt().challenges,...t.challenges};return{...Yd(t,!1),challenges:{...n,active:e,activeSeconds:0,enteredCount:n.enteredCount+1,run:Ct()}}},Jd=e=>Gr(e)?yn({...Yd(e,!1),challenges:{...e.challenges,active:null,activeSeconds:0,exitedCount:e.challenges.exitedCount+1,run:Ct()}}):e,Yd=(e,t)=>{let n=e.prestigeDoublePpLevel??0,r=Ur(e),i=t?ji(e.resources[O],n,r):0,a=kt(),o=e.purge.count+ +!!t,s={id:`p${o}-${Date.now()}`,at:Date.now(),purgeNumber:o,pointsAwarded:i,moneyBits:z(e.resources[O])},c=e.prestigeMuseum??a.prestigeMuseum,l=(t?[s,...c.history??[]]:c.history??[]).slice(0,20),u=new Set(l.map(e=>e.id)),d=(c.pinnedIds??[]).filter(e=>u.has(e));return en({...a,challenges:e.challenges??a.challenges,achievements:e.achievements??a.achievements,daily:e.daily??a.daily,prestigeMuseum:{history:l,pinnedIds:d},intro:{...a.intro,mainGameUnlocked:e.intro?.mainGameUnlocked??a.intro.mainGameUnlocked,capacity:e.intro?.capacity??a.intro.capacity,byteCreated:e.intro?.byteCreated??a.intro.byteCreated,bits:e.intro?.bits??a.intro.bits,foundryResetCaps:e.intro?.foundryResetCaps??a.intro.foundryResetCaps,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},disks:e.intro?.disks??a.intro.disks,disksBuiltTotal:e.intro?.disksBuiltTotal??a.intro.disksBuiltTotal,diskCache:e.intro?.diskCache??a.intro.diskCache,diskBuild:e.intro?.diskBuild??a.intro.diskBuild,diskProvisionPasses:e.intro?.diskProvisionPasses??a.intro.diskProvisionPasses,diskBuildQueued:e.intro?.diskBuildQueued??a.intro.diskBuildQueued,diskBuildQueuedByReplay:e.intro?.diskBuildQueuedByReplay??a.intro.diskBuildQueuedByReplay,capacityUpgradeQueued:e.intro?.capacityUpgradeQueued??a.intro.capacityUpgradeQueued,capacityUpgradeProgress:e.intro?.capacityUpgradeProgress??a.intro.capacityUpgradeProgress,speedCapacity:e.intro?.speedCapacity,unlockedDiskSteps:aa(e.intro),speedUpgradeQueued:e.intro?.speedUpgradeQueued??a.intro.speedUpgradeQueued,speedUpgradeProgress:e.intro?.speedUpgradeProgress??a.intro.speedUpgradeProgress,poolBuffers:e.intro?.poolBuffers??a.intro.poolBuffers,diskReadCacheFlush:e.intro?.diskReadCacheFlush??a.intro.diskReadCacheFlush,diskWriteCache:e.intro?.diskWriteCache??a.intro.diskWriteCache,dataLakes:e.intro?.dataLakes??a.intro.dataLakes,poolResetCount:e.intro?.poolResetCount??a.intro.poolResetCount,poolResetRebuildingCount:e.intro?.poolResetRebuildingCount??a.intro.poolResetRebuildingCount,computeCores:e.intro?.computeCores??a.intro.computeCores,computeCoresEverEarned:e.intro?.computeCoresEverEarned??a.intro.computeCoresEverEarned,computeNodes:e.intro?.computeNodes??a.intro.computeNodes,computeClusters:e.intro?.computeClusters??a.intro.computeClusters,computeNetworks:e.intro?.computeNetworks??a.intro.computeNetworks,computeGrids:e.intro?.computeGrids??a.intro.computeGrids,computeFabrics:e.intro?.computeFabrics??a.intro.computeFabrics,computeClouds:e.intro?.computeClouds??a.intro.computeClouds,computeDatacenters:e.intro?.computeDatacenters??a.intro.computeDatacenters,computeSupercomputers:e.intro?.computeSupercomputers??a.intro.computeSupercomputers,computeMegacomputers:e.intro?.computeMegacomputers??a.intro.computeMegacomputers,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??a.intro.computeMergePageUnlocked,chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??a.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??a.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??a.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??a.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??a.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??a.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??a.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??a.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??a.intro.autoMergeSupercomputersIntoMegacomputer,computeAutoBoostType:e.intro?.computeAutoBoostType??a.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??a.intro.computeAutoBoostEnabled,computeCoresMergeRemainingSeconds:e.intro?.computeCoresMergeRemainingSeconds??a.intro.computeCoresMergeRemainingSeconds,computeNodesMergeRemainingSeconds:e.intro?.computeNodesMergeRemainingSeconds??a.intro.computeNodesMergeRemainingSeconds,computeClustersMergeRemainingSeconds:e.intro?.computeClustersMergeRemainingSeconds??a.intro.computeClustersMergeRemainingSeconds,computeNetworksMergeRemainingSeconds:e.intro?.computeNetworksMergeRemainingSeconds??a.intro.computeNetworksMergeRemainingSeconds,computeGridsMergeRemainingSeconds:e.intro?.computeGridsMergeRemainingSeconds??a.intro.computeGridsMergeRemainingSeconds,computeFabricsMergeRemainingSeconds:e.intro?.computeFabricsMergeRemainingSeconds??a.intro.computeFabricsMergeRemainingSeconds,computeCloudsMergeRemainingSeconds:e.intro?.computeCloudsMergeRemainingSeconds??a.intro.computeCloudsMergeRemainingSeconds,computeDatacentersMergeRemainingSeconds:e.intro?.computeDatacentersMergeRemainingSeconds??a.intro.computeDatacentersMergeRemainingSeconds,computeSupercomputersMergeRemainingSeconds:e.intro?.computeSupercomputersMergeRemainingSeconds??a.intro.computeSupercomputersMergeRemainingSeconds},autobuyers:e.autobuyers??a.autobuyers,autobuyersEnabled:e.autobuyersEnabled??a.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??a.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??a.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??a.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??a.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??a.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??a.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??a.autoPurgeEnabled,autoPurgeSettings:e.autoPurgeSettings??a.autoPurgeSettings,prestigeDoublePpLevel:e.prestigeDoublePpLevel??a.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??a.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??a.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??a.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??a.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??a.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??a.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??a.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??a.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??a.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??a.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??a.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??a.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??a.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??a.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??a.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??a.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??a.autoGlobalTickspeedEnabled,era:e.era??a.era,eons:e.eons??a.eons,hyperscalerCount:e.hyperscalerCount??a.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??a.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??a.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??a.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked||z(e.purge.points)+i>=100,owned:e.computeFlops?.owned??a.computeFlops.owned,cumulativeBoost:a.computeFlops.cumulativeBoost},purge:{...a.purge,points:z(e.purge.points)+i,count:o,unboundedUnlocked:r,highestAward:Math.max(z(e.purge.highestAward??0),i)}})},Xd=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return!(n.history??[]).some(t=>t.id===e)||(n.pinnedIds??[]).includes(e)||(n.pinnedIds??[]).length>=10?t:{...t,prestigeMuseum:{history:n.history??[],pinnedIds:[...n.pinnedIds??[],e]}}},Zd=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return(n.pinnedIds??[]).includes(e)?{...t,prestigeMuseum:{history:n.history??[],pinnedIds:(n.pinnedIds??[]).filter(t=>t!==e)}}:t},Qd=(e,t)=>t!==e&&qr(t,`bitRot`)?fi(t,{cycleSeconds:0}):t,$d=(e,t)=>t===e?t:yn(t),ef=e=>Qd(e,$d(e,nf(e))),tf=e=>{let t=af(e);return t===e?Qd(e,$d(e,t)):br(rf(e,Qd(e,$d(e,t))))},nf=e=>{if(_i(e))return e;let t=Mr(e);if(Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)<Nr(e))return e;let n=kt(),r=jr(e),i=Object.fromEntries(b.map((t,n)=>[t.id,(e.scaleUpTierCounts?.[t.id]??0)+ +(n<=r)])),a={...e.everUnlockedTierIds??n.everUnlockedTierIds,[t.id]:!0,...b[r+1]&&r+1<$r(e)?{[b[r+1].id]:!0}:{}};return{...n,intro:e.intro??n.intro,autobuyers:e.autobuyers??n.autobuyers,autobuyersEnabled:e.autobuyersEnabled??n.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??n.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??n.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??n.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??n.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??n.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??n.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??n.autoPurgeEnabled,autoPurgeSettings:e.autoPurgeSettings??n.autoPurgeSettings,prestigeDoublePpLevel:e.prestigeDoublePpLevel??n.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??n.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??n.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??n.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??n.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??n.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??n.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??n.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??n.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??n.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??n.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??n.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??n.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??n.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??n.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??n.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??n.autoGlobalTickspeedEnabled,everUnlockedTierIds:a,prestigeMuseum:e.prestigeMuseum??n.prestigeMuseum,era:e.era??n.era,eons:e.eons??n.eons,hyperscalerCount:e.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??n.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??n.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??n.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??n.computeFlops.owned,cumulativeBoost:n.computeFlops.cumulativeBoost},challenges:e.challenges??n.challenges,achievements:e.achievements??n.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,manualPurchaseThisCycle:!!e.manualPurchaseThisCycle,daily:e.daily??n.daily,purge:{...e.purge,xp:n.purge.xp,highestMilestone:n.purge.highestMilestone},scaleUpCount:(e.scaleUpCount??0)+1,scaleUpTierCounts:i,scaleUpTargetTierIndex:z(e.scaleUpTargetTierIndex??0)+1,overclockLastClaimCompletedLevels:Ir(e)??n.overclockLastClaimCompletedLevels}},rf=(e,t)=>{let n=Math.max(0,(e.purchaseLevels?.[ei(e).id]??1)-1),r={pings:0,...t.achievements?.counters},i=Ir(e)===null,a={...r};return i?a.maxFirstOverclock=Math.max(r.maxFirstOverclock??0,n):!e.accelerateBoughtThisCycle&&yr(e,`overclockStep1`)&&(a.acceleratelessOverclocks=1),Ur(e)&&n>=12&&yr(e,`overclockStep2`)&&(a.overflowDeepOverclock=1),{...t,achievements:{earned:{},...t.achievements,counters:a}}},af=e=>{if(_i(e)||qr(e,`overclockDisabled`))return e;let t=ei(e),n=Math.max(0,(e.purchaseLevels?.[t.id]??1)-1);if(n<Pr(e))return e;let r=kt();return{...r,intro:e.intro??r.intro,autobuyers:e.autobuyers??r.autobuyers,autobuyersEnabled:e.autobuyersEnabled??r.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??r.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??r.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??r.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??r.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??r.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??r.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??r.autoPurgeEnabled,autoPurgeSettings:e.autoPurgeSettings??r.autoPurgeSettings,prestigeDoublePpLevel:e.prestigeDoublePpLevel??r.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??r.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??r.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??r.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??r.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??r.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??r.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??r.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??r.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??r.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??r.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??r.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??r.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??r.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??r.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??r.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??r.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??r.autoGlobalTickspeedEnabled,prestigeMuseum:e.prestigeMuseum??r.prestigeMuseum,era:e.era??r.era,eons:e.eons??r.eons,hyperscalerCount:e.hyperscalerCount??r.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??r.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??r.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??r.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??r.computeFlops.owned,cumulativeBoost:r.computeFlops.cumulativeBoost},challenges:e.challenges??r.challenges,achievements:e.achievements??r.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,manualPurchaseThisCycle:!!e.manualPurchaseThisCycle,daily:e.daily??r.daily,purge:{...e.purge,xp:r.purge.xp,highestMilestone:r.purge.highestMilestone},scaleUpCount:r.scaleUpCount,overclockLastClaimCompletedLevels:n}},of=e=>t=>t.autoXpTickspeed?{...t,autoXpTickspeedEnabled:!!e}:t,sf=e=>t=>t.autoScaleUp?{...t,autoScaleUpEnabled:!!e}:t,cf=e=>t=>t.autoGlobalTickspeed?{...t,autoGlobalTickspeedEnabled:!!e}:t,lf=e=>t=>df(e,!1)(t),uf=e=>t=>{let n=z(t.owned?.[ei(t).id])<=0,r=df(e,!0)(t);if(!n||r===t||!I.enabled)return r;let i=r.achievements??kt().achievements;return br({...r,achievements:{...i,counters:{...i.counters,emptyRestages:(i.counters?.emptyRestages??0)+1}}})},df=(e,t)=>n=>{if(_i(n)||qr(n,`restageDisabled`)||!cn(n))return n;let r=ei(n).id;if(!t&&z(n.owned?.[r])<=0)return n;let i=Math.floor(z(e));if(i<=0)return n;let a=n.lastTierXpConsumed??0;if(i<un(a))return n;let o=z(n.purge.xp);if(i>o)return n;let s=b.filter(e=>e.id!==r).map(e=>e.id);return{...n,purge:{...n.purge,xp:o-i},lastTierXpConsumed:a+i,owned:{...n.owned,...s.reduce((e,t)=>({...e,[t]:0}),{})},resources:{...n.resources,[O]:0,...s.reduce((e,t)=>({...e,[t]:0}),{})}}},ff=e=>{let t=Kd(e);if(t===e||!I.enabled)return t;let n=Ur(e)&&z(e.resources?.base)>=8e100?sr(t,`overflowPurges`,1,`max`):t;if(t.purge.count<=e.purge.count)return n;let r=sr(n,`purges`,or(e)+1,`max`);return e.manualPurchaseThisCycle?r:sr(r,`handsFreePurges`,1,`max`)},pf=e=>{let t=Tr(e);if(t===e||!I.enabled)return t;let n=Vn(e),r=z(t.activePlaySeconds??0),i=t.achievements?.counters?.lastRebootPlaySeconds,a=sr(t,`purges`,or(e),`max`);return a=sr(a,`kernelsEarned`,Math.max(a.achievements.counters.kernelsEarned??0,z(e.eons?.balance??0))+n,`max`),i!=null&&r-i<=3600&&(a=sr(a,`quickReboots`,1,`max`)),sr(a,`lastRebootPlaySeconds`,r,`set`)},mf=e=>{let t=Gd(e);return t===e?t:sr(t,`reformats`,1)},hf=(e,t)=>n=>{let r=G(e,t)(n);if(r===n||!I.enabled)return r;let i=e===`burst`?sr(r,`turboBoosts`,1,`max`):r;return(Hu(i.intro,e)?.queue.length??0)>=10?sr(i,`maxBoostStack`,1,`max`):i},gf=e=>t=>{let n=e(t);return n===t||n.manualPurchaseThisCycle?n:{...n,manualPurchaseThisCycle:!0}},_f=`-ms-`,q=`-moz-`,vf=`-webkit-`,yf=`comm`,bf=`rule`,xf=`decl`,Sf=`@import`,Cf=`@namespace`,wf=`@keyframes`,Tf=`@layer`,Ef=Math.abs,Df=String.fromCharCode,Of=Object.assign;function kf(e,t){return Nf(e,0)^45?(((t<<2^Nf(e,0))<<2^Nf(e,1))<<2^Nf(e,2))<<2^Nf(e,3):0}function Af(e){return e.trim()}function jf(e,t){return(e=t.exec(e))?e[0]:e}function J(e,t,n){return e.replace(t,n)}function Mf(e,t,n){return e.indexOf(t,n)}function Nf(e,t){return e.charCodeAt(t)|0}function Pf(e,t,n){return e.slice(t,n)}function Ff(e){return e.length}function If(e){return e.length}function Lf(e,t){return t.push(e),e}function Rf(e,t){return e.map(t).join(``)}function zf(e,t){return e.filter(function(e){return!jf(e,t)})}var Bf=1,Vf=1,Hf=0,Uf=0,Wf=0,Y=``;function Gf(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:Bf,column:Vf,length:o,return:``,siblings:s}}function Kf(e,t){return Of(Gf(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function qf(e){for(;e.root;)e=Kf(e.root,{children:[e]});Lf(e,e.siblings)}function Jf(){return Wf}function Yf(){return Wf=Uf>0?Nf(Y,--Uf):0,Vf--,Wf===10&&(Vf=1,Bf--),Wf}function Xf(){return Wf=Uf<Hf?Nf(Y,Uf++):0,Vf++,Wf===10&&(Vf=1,Bf++),Wf}function Zf(){return Nf(Y,Uf)}function Qf(){return Uf}function $f(e,t){return Pf(Y,e,t)}function ep(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function tp(e){return Bf=Vf=1,Hf=Ff(Y=e),Uf=0,[]}function np(e){return Y=``,e}function rp(e){return Af($f(Uf-1,op(e===91?e+2:e===40?e+1:e)))}function ip(e){for(;(Wf=Zf())&&Wf<33;)Xf();return ep(e)>2||ep(Wf)>3?``:` `}function ap(e,t){for(;--t&&Xf()&&!(Wf<48||Wf>102||Wf>57&&Wf<65||Wf>70&&Wf<97););return $f(e,Qf()+(t<6&&Zf()==32&&Xf()==32))}function op(e){for(;Xf();)switch(Wf){case e:return Uf;case 34:case 39:e!==34&&e!==39&&op(Wf);break;case 40:e===41&&op(e);break;case 92:Xf()}return Uf}function sp(e,t){for(;Xf()&&e+Wf!==57&&(e+Wf!==84||Zf()!==47););return`/*`+$f(t,Uf-1)+`*`+Df(e===47?e:Xf())}function cp(e){for(;!ep(Zf());)Xf();return $f(e,Uf)}function lp(e){return np(up(``,null,null,null,[``],e=tp(e),0,[0],e))}function up(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=Xf()){case 40:if(m!=108&&Nf(C,d-1)==58){Mf(C+=J(rp(v),`&`,`&\f`),`&\f`,Ef(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=rp(v);break;case 9:case 10:case 13:case 32:C+=ip(m);break;case 92:C+=ap(Qf()-1,7);continue;case 47:switch(Zf()){case 42:case 47:Lf(fp(sp(Xf(),Qf()),t,n,c),c),(ep(m||1)==5||ep(Zf()||1)==5)&&Ff(C)&&Pf(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=Ff(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=J(C,/\f/g,``)),p>0&&(Ff(C)-d||h===0&&m===47)&&Lf(p>32?pp(C+`;`,r,n,d-1,c):pp(J(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(Lf(S=dp(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)up(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(Nf(C,3)===110)break;case 108:if(Nf(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?up(e,S,S,r&&Lf(dp(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):up(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+Ff(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&Yf()==125)continue}switch(C+=Df(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(Ff(C)-1)*_,_=1;break;case 64:Zf()===45&&(C+=rp(Xf())),f=Zf(),u=d=Ff(y=C+=cp(Qf())),v++;break;case 45:m===45&&Ff(C)==2&&(h=0)}}return a}function dp(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=If(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=Pf(e,f+1,f=Ef(g=o[h])),b=e;v<m;++v)(b=Af(g>0?p[v]+` `+y:J(y,/&\f/g,p[v])))&&(c[_++]=b);return Gf(e,t,n,i===0?bf:s,c,l,u,d)}function fp(e,t,n,r){return Gf(e,t,n,yf,Df(Jf()),Pf(e,2,-2),0,r)}function pp(e,t,n,r,i){return Gf(e,t,n,xf,Pf(e,0,r),Pf(e,r+1,-1),r,i)}function mp(e,t,n){switch(kf(e,t)){case 5103:return vf+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return vf+e+e;case 4855:return vf+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return q+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return vf+e+q+e+_f+e+e;case 5936:switch(Nf(e,t+11)){case 114:return vf+e+_f+J(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return vf+e+_f+J(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return vf+e+_f+J(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return vf+e+_f+e+e;case 6165:return vf+e+_f+`flex-`+e+e;case 5187:return vf+e+J(e,/(\w+).+(:[^]+)/,vf+`box-$1$2`+_f+`flex-$1$2`)+e;case 5443:return vf+e+_f+`flex-item-`+J(e,/flex-|-self/g,``)+(jf(e,/flex-|baseline/)?``:_f+`grid-row-`+J(e,/flex-|-self/g,``))+e;case 4675:return vf+e+_f+`flex-line-pack`+J(e,/align-content|flex-|-self/g,``)+e;case 5548:return vf+e+_f+J(e,`shrink`,`negative`)+e;case 5292:return vf+e+_f+J(e,`basis`,`preferred-size`)+e;case 6060:return vf+`box-`+J(e,`-grow`,``)+vf+e+_f+J(e,`grow`,`positive`)+e;case 4554:return vf+J(e,/([^-])(transform)/g,`$1`+vf+`$2`)+e;case 6187:return J(J(J(e,/(zoom-|grab)/,vf+`$1`),/(image-set)/,vf+`$1`),e,``)+e;case 5495:case 3959:return J(e,/(image-set\([^]*)/,vf+"$1$`$1");case 4968:return J(J(e,/(.+:)(flex-)?(.*)/,vf+`box-pack:$3`+_f+`flex-pack:$3`),/space-between/,`justify`)+vf+e+e;case 4200:if(!jf(e,/flex-|baseline/))return _f+`grid-column-align`+Pf(e,t)+e;break;case 2592:case 3360:return _f+J(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,jf(e.props,/grid-\w+-end/)})?~Mf(e+(n=n[t].value),`span`,0)?e:_f+J(e,`-start`,``)+e+_f+`grid-row-span:`+(~Mf(n,`span`,0)?jf(n,/\d+/):+jf(n,/\d+/)-jf(e,/\d+/))+`;`:_f+J(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return jf(e.props,/grid-\w+-start/)})?e:_f+J(J(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return J(e,/(.+)-inline(.+)/,vf+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Ff(e)-1-t>6)switch(Nf(e,t+1)){case 109:if(Nf(e,t+4)!==45)break;case 102:return J(e,/(.+:)(.+)-([^]+)/,`$1`+vf+`$2-$3$1`+q+(Nf(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~Mf(e,`stretch`,0)?mp(J(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return J(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return _f+n+`:`+r+s+(i?_f+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(Nf(e,t+6)===121)return J(e,`:`,`:`+vf)+e;break;case 6444:switch(Nf(e,Nf(e,14)===45?18:11)){case 120:return J(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+vf+(Nf(e,14)===45?`inline-`:``)+`box$3$1`+vf+`$2$3$1`+_f+`$2box$3`)+e;case 100:return J(e,`:`,`:`+_f)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return J(e,`scroll-`,`scroll-snap-`)+e}return e}function hp(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function gp(e,t,n,r){switch(e.type){case Tf:if(e.children.length)break;case Sf:case Cf:case xf:return e.return=e.return||e.value;case yf:return``;case wf:return e.return=e.value+`{`+hp(e.children,r)+`}`;case bf:if(!Ff(e.value=e.props.join(`,`)))return``}return Ff(n=hp(e.children,r))?e.return=e.value+`{`+n+`}`:``}function _p(e){var t=If(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function vp(e){return function(t){t.root||(t=t.return)&&e(t)}}function yp(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case xf:e.return=mp(e.value,e.length,n);return;case wf:return hp([Kf(e,{value:J(e.value,`@`,`@`+vf)})],r);case bf:if(e.length)return Rf(n=e.props,function(t){switch(jf(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:qf(Kf(e,{props:[J(t,/:(read-\w+)/,`:`+q+`$1`)]})),qf(Kf(e,{props:[t]})),Of(e,{props:zf(n,r)});break;case`::placeholder`:qf(Kf(e,{props:[J(t,/:(plac\w+)/,`:`+vf+`input-$1`)]})),qf(Kf(e,{props:[J(t,/:(plac\w+)/,`:`+q+`$1`)]})),qf(Kf(e,{props:[J(t,/:(plac\w+)/,_f+`input-$1`)]})),qf(Kf(e,{props:[t]})),Of(e,{props:zf(n,r)})}return``})}}function bp(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var xp=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,Sp=`active`,Cp=`data-styled-version`,wp=`6.6.0`,Tp=`/*!sc*/
`,Ep=typeof window<`u`&&typeof document<`u`;if(!v.createContext)throw bp(19);function Dp(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var Op=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:Dp(`REACT_APP_SC_DISABLE_SPEEDY`)??Dp(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),kp=`sc-keyframes-`,Ap={},jp=new Map,Mp=new Map,Np=1,Pp=e=>{if(jp.has(e))return jp.get(e);for(;Mp.has(Np);)Np++;let t=Np++;return jp.set(e,t),Mp.set(t,e),t},Fp=e=>Mp.get(e),Ip=(e,t)=>{Np=t+1,jp.set(e,t),Mp.set(t,e)},Lp=Object.freeze([]),Rp=Object.freeze({});function zp(e,t,n=Rp){return e.theme!==n.theme&&e.theme||t||n.theme}var Bp=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Vp=/(^-|-$)/g;function Hp(e){return e.replace(Bp,`-`).replace(Vp,``)}var Up=/(a)(d)/gi,Wp=e=>String.fromCharCode(e+(e>25?39:97));function Gp(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=Wp(t%52)+n;return(Wp(t%52)+n).replace(Up,`$1-$2`)}var Kp=5381,qp=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},Jp=e=>qp(Kp,e);function Yp(e){return Gp(Jp(e)>>>0)}function Xp(e){return e.displayName||e.name||`Component`}function Zp(e){return typeof e==`string`&&!0}function Qp(e){return Zp(e)?`styled.${e}`:`Styled(${Xp(e)})`}var $p=Symbol.for(`react.memo`),em=Symbol.for(`react.forward_ref`),tm={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},nm={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},rm={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},im={[em]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[$p]:rm};function am(e){return(`type`in(t=e)&&t.type.$$typeof)===$p?rm:`$$typeof`in e?im[e.$$typeof]:tm;var t}var om=Object.defineProperty,sm=Object.getOwnPropertyNames,cm=Object.getOwnPropertySymbols,lm=Object.getOwnPropertyDescriptor,um=Object.getPrototypeOf,dm=Object.prototype;function fm(e,t,n){if(typeof t!=`string`){let r=um(t);r&&r!==dm&&fm(e,r,n);let i=sm(t).concat(cm(t)),a=am(e),o=am(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in nm||n&&n[s]||o&&s in o||a&&s in a)){let n=lm(t,s);try{om(e,s,n)}catch{}}}}return e}function pm(e){return typeof e==`function`}var mm=Symbol.for(`react.forward_ref`);function hm(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===mm&&`styledComponentId`in e}function gm(e,t){return e&&t?e+` `+t:e||t||``}function _m(e,t){return e.join(t||``)}function vm(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function ym(e,t,n=!1){if(!n&&!vm(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=ym(e[n],t[n]);else if(vm(t))for(let n in t)e[n]=ym(e[n],t[n]);return e}function bm(e,t){Object.defineProperty(e,"toString",{value:t})}var xm=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw bp(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+Tp;return t}},Sm=`style[${xp}][${Cp}="${wp}"]`,Cm=RegExp(`^${xp}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),wm=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,Tm=e=>{if(!e)return document;if(wm(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(wm(t))return t}return document},Em=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},Dm=(e,t)=>{let n=(t.textContent??``).split(Tp),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(Cm);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(Ip(n,t),Em(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},Om=e=>{let t=Tm(e.options.target).querySelectorAll(Sm);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(xp)!==Sp&&(Dm(e,r),r.parentNode&&r.parentNode.removeChild(r))}},km=!1;function Am(){if(!1!==km)return km;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return km=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return km=t.getAttribute(`content`)||void 0}return km=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var jm=(e,t)=>{if(typeof document>`u`)throw bp(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${xp}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(xp,Sp),i.setAttribute(Cp,wp);let s=t||Am();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},Mm=class{constructor(e,t){this.element=jm(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw bp(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},Nm=class{constructor(e,t){this.element=jm(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},Pm=Ep,Fm={isServer:!Ep,useCSSOMInjection:!Op},Im=class e{static registerId(e){return Pp(e)}constructor(e=Rp,t={},n){this.options=Object.assign(Object.assign({},Fm),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Ep&&Pm&&(Pm=!1,Om(this)),bm(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=Fp(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=xp+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&Ep&&Om(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&Ep&&t.target!==this.options.target&&Tm(this.options.target)!==Tm(t.target)&&Om(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new Mm(t,n):new Nm(t,n))(this.options),new xm(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){Pp(e),e.startsWith(kp)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(Pp(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(Pp(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},Lm=new WeakSet,Rm={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function zm(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in Rm||e.startsWith(`--`)?String(t).trim():t+`px`}var Bm=47;function Vm(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var Hm=Symbol.for(`sc-keyframes`);function Um(e){return typeof e==`object`&&!!e&&Hm in e}function Wm(e){return pm(e)&&!(e.prototype&&e.prototype.isReactComponent)}var Gm=e=>e==null||!1===e||e===``,Km=Symbol.for(`react.client.reference`);function qm(e){return e.$$typeof===Km}function Jm(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!Gm(r)&&(Array.isArray(r)&&Lm.has(r)||pm(r)?t.push(Vm(n)+`:`,r,`;`):vm(r)?(t.push(n+` {`),Jm(r,t),t.push(`}`)):t.push(Vm(n)+`: `+zm(n,r)+`;`))}}function Ym(e,t,n,r,i=[]){if(Gm(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return qm(e)?i:Wm(e)&&t?Ym(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)Ym(e[a],t,n,r,i);return i}return hm(e)?(i.push(`.${e.styledComponentId}`),i):Um(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):qm(e)?i:vm(e)&&e.toString===Object.prototype.toString?(Jm(e,i),i):(i.push(e.toString()),i)}var Xm=Jp(wp),Zm=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=qp(Xm,t),this.baseStyle=n,Im.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(Wm(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=_m(Ym(r,e,t,n)))}else i+=_m(Ym(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=Gp(qp(qp(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=gm(r,a)}}return r}},Qm=/&/g;function $m(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function eh(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==Bm||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===Bm&&(o=!1,c++);else if(l!==34&&l!==39||$m(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function th(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&th(a.children,t)}return e}function nh({options:e=Rp,plugins:t=Lp}=Rp){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(Qm,r).replace(i,a))}),e.prefix&&o.push(yp),o.push(gp);let s=[],c=_p(o.concat(vp(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return eh(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||$m(e,o)){if(s===0){if(t===Bm&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==Bm);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===Bm)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===Bm&&o+1<r&&e.charCodeAt(o+1)===Bm){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:eh(i)):l===0?e:eh(e)}(t),d=lp(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=th(d,e.namespace)),s=[],hp(d,c),s},u=e,d=Kp;for(let e=0;e<t.length;e++)t[e].name||bp(15),d=qp(d,t[e].name);return u!=null&&u.namespace&&(d=qp(d,u.namespace)),u!=null&&u.prefix&&(d=qp(d,`p`)),l.hash=d===Kp?``:d.toString(),l}var rh=new Im,ih=nh(),ah=v.createContext({shouldForwardProp:void 0,styleSheet:rh,stylis:ih,stylisPlugins:void 0});ah.Consumer;function oh(){return v.useContext(ah)}var sh=v.createContext(void 0);sh.Consumer;function ch(){let e=v.useContext(sh);if(!e)throw bp(18);return e}function lh(e){let t=v.useContext(sh),n=v.useMemo(()=>function(e,t){if(!e)throw bp(14);if(pm(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw bp(8);return t?Object.assign(Object.assign({},t),e):e}(e.theme,t),[e.theme,t]);return e.children?v.createElement(sh.Provider,{value:n},e.children):null}var uh={};function dh(e,t){let n=typeof e==`string`?Hp(e):`sc`;uh[n]=(uh[n]||0)+1;let r=n+`-`+Yp(wp+n+uh[n]);return t?t+`-`+r:r}function fh(e,t,n){let r=hm(e),i=e,a=!Zp(e),{attrs:o=Lp,componentId:s=dh(t.displayName,t.parentComponentId),displayName:c=Qp(e)}=t,l=t.displayName&&t.componentId?Hp(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new Zm(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=v.useContext(sh),u=oh(),d=e.shouldForwardProp||u.shouldForwardProp,f=zp(t,l,a)||Rp,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=pm(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=gm(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=gm(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,_=Zp(g),y=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,_,m),b=gm(o,s);return h&&(b+=` `+h),p.className&&(b+=` `+p.className),y[_&&g.includes(`-`)?`class`:`className`]=b,n&&(y.ref=n),(0,v.createElement)(g,y)}(m,e,t)}p.displayName=c;let m=v.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?gm(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)ym(e,n,!0);return e}({},i.defaultProps,e):e}}),bm(m,()=>`.${m.styledComponentId}`),a&&fm(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var ph=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function mh(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var hh=e=>(Lm.add(e),e);function gh(e,...t){if(pm(e)||vm(e))return hh(Ym(mh(Lp,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?Ym(n):hh(Ym(mh(n,t)))}function _h(e,t,n=Rp){if(!t)throw bp(1,t);let r=(r,...i)=>e(t,n,gh(r,...i));return r.attrs=r=>_h(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>_h(e,t,Object.assign(Object.assign({},n),r)),r}var vh=e=>_h(fh,e),X=vh;ph.forEach(e=>{X[e]=vh(e)});var yh=class{constructor(e,t){this.instanceRules=new Map,this.rules=e,this.componentId=t,this.isStatic=function(e){for(let t=0;t<e.length;t+=1){let n=e[t];if(pm(n)&&!hm(n))return!1}return!0}(e),Im.registerId(this.componentId)}removeStyles(e,t){this.instanceRules.delete(e),this.rebuildGroup(t)}renderStyles(e,t,n,r){let i=this.componentId;if(this.isStatic){if(n.hasNameForId(i,i+e))this.instanceRules.has(e)||this.computeRules(e,t,n,r);else{let a=this.computeRules(e,t,n,r);n.insertRules(i,a.name,a.rules)}return}let a=this.instanceRules.get(e);if(this.computeRules(e,t,n,r),!n.server&&a){let t=a.rules,n=this.instanceRules.get(e).rules;if(t.length===n.length){let e=!0;for(let r=0;r<t.length;r++)if(t[r]!==n[r]){e=!1;break}if(e)return}}this.rebuildGroup(n)}computeRules(e,t,n,r){let i=_m(Ym(this.rules,t,n,r)),a={name:this.componentId+e,rules:r(i,``)};return this.instanceRules.set(e,a),a}rebuildGroup(e){let t=this.componentId;e.clearRules(t);for(let n of this.instanceRules.values())e.insertRules(t,n.name,n.rules)}};function bh(e,...t){let n=gh(e,...t),r=`sc-global-${Yp(JSON.stringify(n))}`,i=new yh(n,r),a=e=>{let t=oh(),n=v.useContext(sh),a;{let e=v.useRef(null);e.current===null&&(e.current=t.styleSheet.allocateGSInstance(r)),a=e.current}t.styleSheet.server&&o(a,e,t.styleSheet,n,t.stylis);{let s=i.isStatic?[a,t.styleSheet,i]:[a,e,t.styleSheet,n,t.stylis,i],c=v.useRef(i);v.useLayoutEffect(()=>{t.styleSheet.server||(c.current!==i&&(t.styleSheet.clearRules(r),c.current=i),o(a,e,t.styleSheet,n,t.stylis))},s),v.useLayoutEffect(()=>()=>{t.styleSheet.server||i.removeStyles(a,t.styleSheet)},[a,t.styleSheet,i])}return t.styleSheet.server&&i.instanceRules.delete(a),null};function o(e,t,n,r,o){if(i.isStatic)i.renderStyles(e,Ap,n,o);else{let s=Object.assign(Object.assign({},t),{theme:zp(t,r,a.defaultProps)});i.renderStyles(e,s,n,o)}}return v.memo(a)}var xh,Sh=class{constructor(e,t){this[xh]=!0,this.inject=(e,t=ih)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=kp+e,this.rules=t,Pp(this.id),bm(this,()=>{throw bp(12,String(this.name))})}getName(e=ih){return e.hash?this.name+Gp(e.hash>>>0):this.name}};function Ch(e,...t){let n=_m(gh(e,...t));return new Sh(Yp(n),n)}xh=Hm,`${xp}`,`${xp}`,`${xp}`;var wh=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),Z=o(((e,t)=>{t.exports=wh()}))(),Th=5e3,Eh=X.div`
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
`,Dh=X.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border: 1px solid ${e=>e.theme.color.warn};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.md};
  color: ${e=>e.theme.color.text};
  max-width: 26rem;
  padding: ${e=>e.theme.space.sm} ${e=>e.theme.space.lg};
  text-align: center;
  width: 100%;
`,Oh=X.div`
  color: ${e=>e.theme.color.warn};
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`,kh=X.div`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  margin-top: ${e=>e.theme.space.xs};
`,Ah=e=>Object.keys(e.achievements?.earned??{}).filter(t=>e.achievements.earned[t]),jh=()=>typeof document<`u`&&document.visibilityState===`hidden`,Mh=e=>{let t=[],n=[],r=0,i=0,a=null,o=!1,s=new Set,c=()=>e(n),l=e=>{let t=setTimeout(()=>{s.delete(t),n=n.filter(t=>t.key!==e.key),c(),u()},Math.max(0,e.hideAt-Date.now()));s.add(t)};function u(){if(!o||(clearTimeout(a),a=null,t.length===0||jh()||n.length>=5))return;let e=r+250-Date.now();if(e>0){a=setTimeout(u,e);return}let s=t.shift(),d=Date.now();i+=1;let f={key:`${s}-${i}`,id:s,hideAt:d+Th};n=[...n,f],r=d,c(),l(f),u()}let d=()=>{jh()||u()};return{mount(){o=!0,n.forEach(l),document.addEventListener(`visibilitychange`,d),u()},unmount(){o=!1,s.forEach(clearTimeout),s.clear(),clearTimeout(a),a=null,document.removeEventListener(`visibilitychange`,d)},enqueue(e){t.push(...e),u()},clearQueue(){t=[]}}};function Nh({state:e,baseline:t}){let[n,r]=(0,v.useState)([]),i=(0,v.useRef)(null),a=(0,v.useRef)(null),o=(0,v.useRef)(null);o.current===null&&(o.current=Mh(r)),(0,v.useEffect)(()=>(o.current.mount(),()=>o.current.unmount()),[]);let s=I.enabled?Ah(e):[],c=s.join(`,`);return(0,v.useEffect)(()=>{let e=new Set(s);(i.current===null||a.current!==t.epoch)&&(i.current!==null&&o.current.clearQueue(),a.current=t.epoch,i.current=new Set(Object.keys(t.earned??{}).filter(e=>t.earned[e])));let n=s.filter(e=>!i.current.has(e)&&be[e]);i.current=e,o.current.enqueue(n)},[c,t.epoch]),(0,Z.jsx)(Eh,{"aria-atomic":`false`,"aria-label":`achievement notifications`,"aria-live":`polite`,"aria-relevant":`additions`,role:`status`,children:n.map(({key:e,id:t})=>(0,Z.jsxs)(Dh,{children:[(0,Z.jsx)(Oh,{children:`Achievement unlocked`}),be[t].name,_r(be[t])&&(0,Z.jsx)(kh,{children:_r(be[t])})]},e))})}var Ph=X.div`
  background: rgba(0, 0, 0, 0.55);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 50;
`,Fh=X.div`
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
`,Ih=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0 0 ${e=>e.theme.space.xs};
  text-transform: uppercase;
`,Lh=X.button`
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
`,Rh=X.span`
  font-size: 1.1rem;
  line-height: 1;
  width: 1.4rem;
`,zh=({open:e,onClose:t,onNavigate:n})=>{if(!e)return null;let r=e=>{n(e),t()};return(0,Z.jsx)(Ph,{"aria-hidden":`false`,onClick:t,onKeyDown:e=>{e.key===`Escape`&&t()},role:`presentation`,children:(0,Z.jsxs)(Fh,{"aria-label":`more menu`,"aria-modal":`true`,onClick:e=>e.stopPropagation(),role:`dialog`,children:[(0,Z.jsx)(Ih,{children:`More`}),(0,Z.jsxs)(Lh,{"aria-label":`open manual`,onClick:()=>r(`info`),type:`button`,children:[(0,Z.jsx)(Rh,{"aria-hidden":`true`,children:`📖`}),`Manual`]}),(0,Z.jsxs)(Lh,{"aria-label":`open milestones`,onClick:()=>r(`milestones`),type:`button`,children:[(0,Z.jsx)(Rh,{"aria-hidden":`true`,children:`🏁`}),`Milestones`]}),I.enabled&&(0,Z.jsxs)(Lh,{"aria-label":`open achievements`,onClick:()=>r(`achievements`),type:`button`,children:[(0,Z.jsx)(Rh,{"aria-hidden":`true`,children:`🏆`}),`Achievements`]}),(0,Z.jsxs)(Lh,{"aria-label":`open settings`,onClick:()=>r(`settings`),type:`button`,children:[(0,Z.jsx)(Rh,{"aria-hidden":`true`,children:`⚙️`}),`Settings`]}),!1]})})},Bh=X.section`
  background: ${e=>e.$raised?e.theme.color.surfaceRaised:e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.sm};
  color: ${e=>e.theme.color.text};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
`,Vh=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Hh=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
  }
`,Uh=X.div`
  color: ${e=>e.theme.color.text};
  font-size: 1.1rem;
  margin-top: 0.25rem;
`,Wh=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,Gh=X(Bh)`
  gap: 0.4rem;
`,Kh=X.h2`
  align-items: center;
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.85rem;
  gap: 0.5rem;
  justify-content: space-between;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,qh=X.button`
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
`,Jh=X.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,Yh=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  opacity: ${e=>e.$earned?1:.8};
`,Xh=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
`,Zh=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`,Qh=X.span`
  color: ${e=>e.$color};
  font-size: 0.82em;
  white-space: nowrap;
`,$h=(e,t,n)=>{let r=mr(e,t.condition);return r?`${n?r.target:Math.min(Math.floor(r.current),r.target)}/${r.target}`:null},eg=e=>{let t=[],n={};return e.forEach(e=>{let r=ye[e.id];r?(n[r.id]||(n[r.id]={key:r.id,name:r.name,levels:[]},t.push(n[r.id])),n[r.id].levels.push(e)):t.push({key:e.id,def:e})}),t},tg=({game:e})=>{let{state:t}=e,[n,r]=(0,v.useState)({}),[i,a]=(0,v.useState)({}),o=(e,t)=>e(e=>({...e,[t]:!e[t]})),s=ch(),c=new Set(xr(t)),l=pe.map(e=>({...e,members:_e.filter(t=>t.group===e.id&&!t.platformDependent)})).filter(e=>e.members.length>0),u=wr(t),d=l.reduce((e,n)=>e+Cr(t,n.id).bonus,0),f=l.reduce((e,n)=>e+Cr(t,n.id).total,0);return(0,Z.jsxs)(Vh,{children:[(0,Z.jsxs)(Hh,{children:[(0,Z.jsx)(`h1`,{children:`Achievements`}),(0,Z.jsxs)(Uh,{"aria-label":`total stars ${u} of ${f}`,children:[`⭐ `,u,`/`,f,d>0?` (incl. ${d} bonus)`:``]})]}),(0,Z.jsx)(Wh,{"aria-label":`achievements page`,children:l.map(e=>{let l=e.members.filter(e=>yr(t,e.id)).length,u=c.has(e.id),d=Cr(t,e.id);return(0,Z.jsxs)(Gh,{"aria-label":`${e.name} achievement group`,children:[(0,Z.jsxs)(Kh,{children:[(0,Z.jsxs)(qh,{"aria-expanded":!!n[e.id],"aria-label":`${e.name} group toggle`,onClick:()=>o(r,e.id),type:`button`,children:[n[e.id]?`▾`:`▸`,` `,e.name]}),(0,Z.jsxs)(Qh,{$color:u?s.color.good:s.color.textMuted,"aria-label":`${e.name} ${l} of ${e.members.length} earned${u?`, group complete`:``}`,children:[u?`✅ `:``,l,`/`,e.members.length,u&&d.bonus>0?` · ⭐ +${d.bonus}`:``]})]}),n[e.id]&&eg(e.members).map(e=>{if(e.levels){let n=e.levels.filter(e=>yr(t,e.id)).length,r=e.levels.length,c=n===r,l=e.levels.find(e=>!yr(t,e.id)),u=e.levels.every(t=>t.bonus===e.levels[0].bonus)?e.levels[0].bonus:null,d=e.levels.length>4,f=[...new Map(e.levels.filter(e=>e.shortBonus&&e.bonus).map(e=>[e.shortBonus,e.bonus]))];return(0,Z.jsxs)(Jh,{"aria-label":`${e.name} achievement level ${n} of ${r}`,style:{alignItems:`flex-start`},children:[(0,Z.jsxs)(Yh,{$earned:n>0,children:[(0,Z.jsx)(qh,{"aria-expanded":!!i[e.key],"aria-label":`${e.name} details`,onClick:()=>o(a,e.key),type:`button`,children:(0,Z.jsx)(`strong`,{children:e.name})}),!i[e.key]&&l&&(0,Z.jsxs)(Xh,{children:[`Next: `,gr(l),$h(t,l,!1)?` (${$h(t,l,!1)})`:``]}),!i[e.key]&&l&&_r(l)&&(0,Z.jsxs)(Xh,{"aria-label":`${e.name} next reward`,children:[`Reward: `,_r(l)]}),i[e.key]&&u&&(0,Z.jsxs)(Xh,{children:[`Reward each level: `,u]}),i[e.key]&&d&&!u&&f.map(([e,t])=>(0,Z.jsxs)(Xh,{children:[e,`: `,t]},e)),i[e.key]&&e.levels.map((n,r)=>{let i=yr(t,n.id),a=$h(t,n,i);if(d){let t=u?null:_r(n);return(0,Z.jsxs)(Xh,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,gr(n),a&&!i?` (${a})`:``,t?` · ${t}`:``]},n.id)}return(0,Z.jsxs)(Zh,{children:[(0,Z.jsxs)(Xh,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,n.trigger,a&&!i?` (${a})`:``]}),!u&&hr(n)&&(0,Z.jsxs)(Xh,{"aria-label":`${e.name} level ${r+1} reward ${i?`earned`:`pending`}`,children:[i?`Reward earned`:`Reward`,`: `,hr(n)]})]},n.id)})]}),(0,Z.jsxs)(Qh,{$color:c?s.color.good:s.color.textMuted,children:[c?`✅ `:n===0?`🔒 `:``,`Lv `,n,`/`,r]})]},e.key)}let{def:n}=e,r=yr(t,n.id),c=n.secret&&!r,l=c?null:$h(t,n,r),u=c?`???`:n.name;return(0,Z.jsxs)(Jh,{"aria-label":`${u} achievement ${r?`earned`:`not yet earned`}`,children:[(0,Z.jsxs)(Yh,{$earned:r,children:[c?(0,Z.jsx)(`strong`,{children:u}):(0,Z.jsx)(qh,{"aria-expanded":!!i[n.id],"aria-label":`${n.name} details`,onClick:()=>o(a,n.id),type:`button`,children:(0,Z.jsx)(`strong`,{children:u})}),!c&&i[n.id]&&(0,Z.jsx)(Xh,{children:n.trigger}),!c&&i[n.id]&&hr(n)&&(0,Z.jsxs)(Xh,{"aria-label":`${n.name} reward ${r?`earned`:`pending`}`,children:[r?`Reward earned`:`Reward`,`: `,hr(n)]})]}),(0,Z.jsxs)(Qh,{$color:r?s.color.good:s.color.textMuted,children:[l&&!r?`${l} `:``,r?`✅`:`🔒`]})]},n.id)})]},e.id)})})]})},ng=`high`,rg=`normal`,ig=()=>b[b.length-1],ag=[{input:`computeCores`,output:`computeNodes`,auto:`autoMergeCoresIntoNode`},{input:`computeNodes`,output:`computeClusters`,auto:`autoMergeNodesIntoCluster`},{input:`computeClusters`,output:`computeNetworks`,auto:`autoMergeClustersIntoNetwork`},{input:`computeNetworks`,output:`computeGrids`,auto:`autoMergeNetworksIntoGrid`},{input:`computeGrids`,output:`computeFabrics`,auto:`autoMergeGridsIntoFabric`},{input:`computeFabrics`,output:`computeClouds`,auto:`autoMergeFabricsIntoCloud`},{input:`computeClouds`,output:`computeDatacenters`,auto:`autoMergeCloudsIntoDatacenter`},{input:`computeDatacenters`,output:`computeSupercomputers`,auto:`autoMergeDatacentersIntoSupercomputer`},{input:`computeSupercomputers`,output:`computeMegacomputers`,auto:`autoMergeSupercomputersIntoMegacomputer`}],og=[tu,au,lu,pu,_u,xu,Tu,ku,Nu],sg=e=>ag.some((t,n)=>Qc(e,n)),cg=e=>(e.intro?.bits??0)>=(e.intro?.capacity??0)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued,lg=e=>!(e.intro?.byteCreated??!1)&&(e.intro?.bits??0)>=8,ug=e=>Eo(e)&&(e.intro?.bits??0)>=qo(e),dg=1,fg={speedUp:[`autoGlobalTickspeed`,`autoGlobalTickspeedEnabled`],scaleUp:[`autoScaleUp`,`autoScaleUpEnabled`],overclock:[`autoOverclock`,`autoOverclockEnabled`],purge:[`autoPurge`,`autoPurgeEnabled`]},pg=(e,t)=>{let[n,r]=fg[t];return!!(t===`purge`?(e[n]??null)!==null:e[n]??!1)&&(e[r]??!0)&&Ed(e,t)<dg},mg=(e,t)=>(e.autobuyers?.[t]??null)!==null&&(e.autobuyersEnabled?.[t]??!0)&&gd(e,t)<dg,hg=(e,t)=>e?ng:t?rg:!1,gg=e=>{if(_i(e))return!1;let t=Ut(e);return b.some(n=>{if(!vi(e)(n)||mg(e,n.id))return!1;let r=e.purchaseLevels?.[n.id]??1,i=e.purchaseLevelProgress?.[n.id]??0,a=Math.max(0,t-i);return a<=0?!1:Jt(n,r,t,i,Gi(e,n),2**53-1)>=a})},_g=e=>_i(e)||!on(e)||pg(e,`speedUp`)?!1:an(e),vg=e=>{if(_i(e)||pg(e,`scaleUp`))return!1;let t=Mr(e);return Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=Nr(e)},yg=e=>{if(_i(e)||pg(e,`overclock`))return!1;let t=ig();return vi(e)(t)?Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=Pr(e):!1},bg=e=>_i(e)&&!pg(e,`purge`),xg=e=>bg(e)||gg(e)||_g(e)||vg(e)||yg(e),Sg=[`speedUp`,`scaleUp`,`restage`,`overclock`,`purge`],Cg=e=>{if((e.purge?.count??0)<1||_i(e))return!1;let t=e.purge?.points??0;return Sg.some(n=>{if(!kd(e,n))return!1;let r=ci(`global`,n);if(r&&!Kr(e,r.id))return!1;let i=e.automationIntervalLevels?.[n]??0;return i<Td(n)&&t>=Dd(n,i)})},wg=e=>{if((e.purge?.count??0)<1)return!1;let t=e.purge?.points??0;if(t>=Ai(e.prestigeDoublePpLevel??0)||!e.prestigeSpeedBonusUnlocked&&t>=1||!e.buyMaxUnlocked&&t>=2||!e.cacheWarmUnlocked&&t>=20)return!0;let n=Cn(xn(e));return n!==null&&t>=n||!e.playtimeBonusUnlocked&&t>=100},Tg=e=>Cg(e)||wg(e),Eg=e=>xg(e),Dg=e=>hg(bg(e)||gg(e),Eg(e)),Og=e=>cg(e)||lg(e)||fo(e)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued||go(e)&&(e.intro?.bits??0)>=ho(e.intro)||_s(e)&&!e.intro?.diskBuildQueued||rs(e)||ug(e),kg=e=>hg(cg(e)||lg(e),Og(e)),Ag=e=>ag.some(({input:t,output:n,auto:r})=>{if(e.intro?.[r])return!1;let i=e.intro?.[t]??0,a=e.intro?.[n]??0;return i>=8&&(Nl(e,r)<10||a<Kc(e,n))}),jg=e=>Ml(e)?Ag(e)||og.some(t=>t(e))||sg(e):!1,Mg=e=>Ml(e)?hg(Ag(e),jg(e)):!1,Ng=e=>En(e)?pt.some(t=>jn(e,t.id)):!1,Pg=e=>Ng(e)?rg:!1,Fg=e=>({game:Dg(e),foundry:kg(e),boosters:Mg(e),compute:Pg(e),perks:Tg(e)?rg:!1}),Ig=`3.25rem`,Lg=Ch`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.85; }
`,Rg=X.nav`
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
`,zg=X.button`
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
`,Bg=X.span`
  font-size: 1.05rem;
  line-height: 1;
`,Vg=X.span`
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`,Hg=X.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  display: block;
  position: absolute;
  right: 0.22rem;
  top: 0.18rem;

  ${e=>e.$emphasis===`high`?gh`
    box-shadow: 0 0 0 2px ${e.theme.color.surfaceRaised};
    height: 0.7rem;
    width: 0.7rem;
    animation: ${Lg} 1.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `:gh`
    height: 0.4rem;
    width: 0.4rem;
  `}
`,Ug=({currentPage:e,onNavigate:t,onOpenMore:n,showTiers:r=!0,showBoosters:i=!1,showComputeFlops:a=!1,showPerks:o=!1,showChallenges:s=!1,moreOpen:c=!1,attention:l={}})=>{let u=[{id:`foundry`,ariaLabel:`open byte foundry`,icon:`🔥`,label:`Foundry`,title:`Byte Foundry — Data Stream and Storage`},i&&{id:`boosters`,ariaLabel:`open power`,icon:`⚡`,label:`Power`,title:`Power — Cells, charge chain, Boost`},a&&{id:`compute`,ariaLabel:`open compute`,icon:`🖥`,label:`Compute`,title:`Compute — PP Flops tiers boost Factory production`},r&&{id:`game`,ariaLabel:`open byte factory`,icon:`🏭`,label:`Factory`,title:`Byte Factory — buy and produce`},o&&{id:`perks`,ariaLabel:`open firmware`,icon:`🔧`,label:`Firmware`,title:`Firmware — automation and prestige upgrades`},s&&{id:`challenges`,ariaLabel:`open challenges`,icon:`🏁`,label:`Challenges`,title:`Challenges — Factory and Daily challenges`}].filter(Boolean),d=e===`info`||e===`milestones`||e===`settings`||e===`dev`||c;return(0,Z.jsxs)(Rg,{"aria-label":`main navigation`,children:[u.map(n=>{let r=e===n.id,i=l[n.id]||!1;return(0,Z.jsxs)(zg,{"aria-current":r?`page`:void 0,"aria-label":n.ariaLabel,$active:r,onClick:()=>t(n.id),title:n.title,type:`button`,children:[i&&(0,Z.jsx)(Hg,{$emphasis:i,"aria-label":i===`high`?`important action available`:`action available`}),(0,Z.jsx)(Bg,{"aria-hidden":`true`,children:n.icon}),(0,Z.jsx)(Vg,{children:n.label})]},n.id)}),(0,Z.jsxs)(zg,{"aria-expanded":c,"aria-haspopup":`dialog`,"aria-label":`open more menu`,$active:d,onClick:n,title:`Manual, Milestones, Settings`,type:`button`,children:[(0,Z.jsx)(Bg,{"aria-hidden":`true`,children:`⋯`}),(0,Z.jsx)(Vg,{children:`More`})]})]})},Wg=`calc(${Ig} + env(safe-area-inset-bottom))`,Gg={primary:`accent`,success:`good`,prestige:`warn`,info:`info`,smart:`violet`,neutral:`textMuted`,ghost:`textMuted`,danger:`danger`,plain:`text`},Kg=({variant:e,color:t,theme:n,disabled:r})=>{let i=e&&Gg[e];return i?r?n.color.disabled:n.color[i]:t},qg={white:`255, 255, 255`,darkgrey:`169, 169, 169`},Jg=e=>{let t=e.replace(`#`,``),n=t.length===3?t.split(``).map(e=>e+e).join(``):t,r=parseInt(n,16);return`${r>>16&255}, ${r>>8&255}, ${r&255}`},Yg=e=>e?e.startsWith(`#`)?Jg(e):qg[e]??`255, 255, 255`:`255, 255, 255`,Xg=Ch`
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--glow-rgb), 0); }
  50% { box-shadow: 0 0 8px 2px rgba(var(--glow-rgb), 0.55); }
`,Zg=e=>Math.min(100,Math.max(0,e??0)),Qg=({disabled:e,$progress:t,$secondaryProgress:n,$progressColor:r,$secondaryProgressColor:i,theme:a})=>{if(t==null&&n==null)return null;let o=r??a.color.good,s=i??a.color.warn,c=Zg(t),l=Zg(c+(n??0)),u=e?`20`:`61`,d=e?`20`:`52`;return gh`
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
  color: ${Kg};
  border: 1.5px solid ${Kg};
  background: ${e=>e.theme.color.surfaceSunken};
  ${Qg}
  cursor: ${e=>e.disabled?`not-allowed`:`pointer`};
  --glow-rgb: ${e=>Yg(Kg(e))};
  animation: ${e=>e.$pulse&&!e.disabled?gh`${Xg} 1.8s ease-in-out infinite`:`none`};
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${Kg};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,$g=X.span.attrs({"aria-hidden":!0})`
  flex: 0 0 auto;
`,e_=X.span`
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,t_=/^[^\p{L}\p{N}$€£(\[{"'“‘…+\-−×]/u,$=({children:e})=>{let t=Array.isArray(e)?e:[e];if(!t.every(e=>typeof e==`string`||typeof e==`number`))return(0,Z.jsx)(e_,{children:e});let n=t.join(``),r=n.indexOf(` `);return r===-1||!t_.test(n)?(0,Z.jsx)(e_,{children:n}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)($g,{children:n.slice(0,r+1)}),(0,Z.jsx)(e_,{children:n.slice(r+1)})]})},n_=X.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`,r_=X.div`
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
`,i_=X(Bh)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,a_=X.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,o_=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
  text-align: left;
`,s_=({onDismiss:e})=>{let t=(0,v.useRef)(null),n=(0,v.useId)();return(0,v.useEffect)(()=>{t.current?.focus()},[]),(0,Z.jsx)(r_,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":n,children:(0,Z.jsxs)(i_,{$raised:!0,children:[(0,Z.jsx)(a_,{id:n,children:`Save not compatible`}),(0,Z.jsx)(o_,{children:`This save was written by an older version of Tens and can no longer be loaded. It has been cleared so you can start fresh from the Byte Foundry.`}),(0,Z.jsx)(Q,{ref:t,type:`button`,variant:`prestige`,"aria-label":`Start fresh with a new save`,onClick:e,children:`Start fresh`})]})})},c_=1e80,l_=30,u_=20,d_=2**53-1,f_=[{id:`10m`,label:`10 minutes`,seconds:600,stepSeconds:1,botCeilingSeconds:540,style:`Hands-on: every second counts`,warmupSeconds:[14400,21600],startExponent:[3,9],modifierCount:[1,2],automations:`mix`,checkInSeconds:null},{id:`1h`,label:`1 hour`,seconds:3600,stepSeconds:5,botCeilingSeconds:3e3,style:`Steady: check in now and then`,warmupSeconds:[7200,14400],startExponent:[3,9],modifierCount:[1,2],automations:`buying`,checkInSeconds:null},{id:`10h`,label:`10 hours`,seconds:36e3,stepSeconds:120,botCeilingSeconds:28800,style:`Passive: a few well-timed decisions`,warmupSeconds:[0,3600],startExponent:[3,8],modifierCount:[1,2],automations:`all`,startPaused:[`scaleUp`,`restage`,`overclock`],checkInSeconds:12600}],p_=[1,2,5],m_=Object.fromEntries(f_.map(e=>[e.id,e])),h_=[{lever:`production`,values:[.25,.5,2,4],describe:e=>`Production ×${e}`},{lever:`clockSpeedPower`,values:[.5,.75,1.5,2],describe:e=>`Accelerate ^${e}`},{lever:`scaleUpPower`,values:[.5,.75,1.5,2],describe:e=>`Scale Up ^${e}`},{lever:`costMultiplier`,values:[.1,.5,5,25],describe:e=>`Costs ×${e}`}],g_=[...b.map(e=>({key:`buy:${e.id}`,group:`buy`,label:e.symbol,unlock:t=>({...t,autobuyers:{...t.autobuyers,[e.id]:1}}),set:t=>sd(e.id,t),isOn:t=>t.autobuyersEnabled?.[e.id]??!0})),...b.map(e=>({key:`tickspeed:${e.id}`,group:`tickspeed`,label:e.symbol,unlock:t=>({...t,tierTickspeedAutobuyer:{...t.tierTickspeedAutobuyer,[e.id]:!0}}),set:t=>Ld(e.id,t),isOn:t=>t.tierTickspeedAutobuyerEnabled?.[e.id]??!0})),{key:`speedUp`,group:`global`,label:`Accelerate`,unlock:e=>({...e,autoGlobalTickspeed:!0}),set:cf,isOn:e=>e.autoGlobalTickspeedEnabled??!0},{key:`scaleUp`,group:`global`,label:`Scale Up`,unlock:e=>({...e,autoScaleUp:!0}),set:sf,isOn:e=>e.autoScaleUpEnabled??!0},{key:`restage`,group:`global`,label:`Restage`,unlock:e=>({...e,autoXpTickspeed:!0}),set:of,isOn:e=>e.autoXpTickspeedEnabled??!0},{key:`overclock`,group:`global`,label:`Overclock`,unlock:e=>({...e,autoOverclock:!0}),set:Id,isOn:e=>e.autoOverclockEnabled??!0}],__=Object.fromEntries(g_.map(e=>[e.key,e])),v_=(e,t)=>!!__[t]?.isOn(e),y_=e=>new Date(e).toISOString().slice(0,10),b_=e=>{let t=new Date(e);return Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()+1)-e},x_=e=>{let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0},S_=e=>{let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}},C_=(e,[t,n])=>t+Math.floor(e()*(n-t+1)),w_=(e,t)=>{let n=g_.map(e=>e.key);if(t===`all`)return n;if(t===`buying`)return n.filter(e=>e.startsWith(`buy:`)||e===`speedUp`);let r=e()<.5,i=n.filter(t=>t===`buy:${b[0].id}`?!0:t.startsWith(`buy:`)?e()<.65:t.startsWith(`tickspeed:`)?r:e()<.5);return i.length===n.length?i.filter(e=>e!==`scaleUp`):i},T_=(e,t)=>e.runLevers===t?e:{...e,runLevers:t},E_=e=>e.startBytes*8,D_=e=>`${e.scaleUpCount??0}|${e.overclockLastClaimCompletedLevels??``}|${e.lastTierXpConsumed??0}`,O_=(e,t,n)=>{let r=T_(t,n.levers);return D_(e)===D_(r)?r:{...r,resources:{...r.resources,[O]:E_(n)}}},k_={buyTier:{make:e=>Ji(e,d_)},tierTickspeed:{make:e=>fd(e)},clockSpeed:{make:()=>zd},scaleUp:{make:()=>ef},overclock:{make:()=>tf},restage:{make:e=>uf(e)},automation:{make:e=>Object.hasOwn(__,e?.key??``)?__[e.key].set(!!e.enabled):e=>e}},A_=b[b.length-1],j_=Object.entries({balance:{weight:2,amount:!0,describe:e=>`Reach a balance of ${B(e)} B`},own:{weight:1,amount:!0,wholeUnits:!0,perTier:!0,describe:(e,t)=>`Own ${B(e)} ${t.name}`},levels:{weight:1,perTier:!0,describe:(e,t)=>`Complete ${e} level${e===1?``:`s`} of ${t.name}`},clock:{weight:2,describe:e=>`Reach Accelerate level ${e}`},overclock:{weight:3,describe:e=>`Overclock at ${e} ${A_.symbol} levels`}}).flatMap(([e,t])=>t.perTier?b.map(n=>({key:`${e}:${n.id}`,kind:e,tier:n,...t})):[{key:e,kind:e,...t}]),M_=Object.fromEntries(j_.map(e=>[e.key,e])),N_=Object.fromEntries(j_.map(e=>[e.key,0])),P_={balance:0,clock:0,owned:{},purchaseLevels:{}},F_=(e,t=e)=>({...e,runPeaks:Yr(e.runPeaks??P_,t)}),I_=(e,t,n)=>{let r=t.runPeaks,i={...n,balance:Math.max(n.balance,r.balance/8),clock:Math.max(n.clock,r.clock)};for(let e of b)i[`own:${e.id}`]=Math.max(n[`own:${e.id}`],r.owned[e.id]??0),i[`levels:${e.id}`]=Math.max(n[`levels:${e.id}`],(r.purchaseLevels[e.id]??1)-1);let a=Ir(t)??0;return a!==(Ir(e)??0)&&(i.overclock=Math.max(n.overclock,a)),i},L_=(e,t,n,r)=>{let i=e.game,a=O_(i,F_(zi(n,d_)(i)),t);return r&&D_(i)!==D_(a)&&r(a),{game:a,metrics:I_(i,a,e.metrics)}},R_=(e,t,n,r,i)=>{let a=e.game,o=k_[n].make(r)(a);if(o===a)return e;let s=O_(a,F_({...o,runPeaks:a.runPeaks},o),t);return i&&D_(a)!==D_(s)&&i(s),{game:s,metrics:I_(a,s,e.metrics)}},z_=[[`clockSpeed`],...b.map(e=>e.id).reverse().map(e=>[`buyTier`,e]),[`scaleUp`],[`overclock`]],B_=(e,t,n)=>{let r=e;for(let e=0;e<u_;e++){let e=r;for(let[r,i]of z_)e=R_(e,t,r,i,n);if(e===r)break;r=e}return r},V_=e=>({...e,runPeaks:Yr(P_,e)}),H_=e=>({game:e,metrics:I_(e,e,N_)}),U_=(e,t,n,r,i)=>{let a=B_(H_(e),t,i),o=[a.metrics];for(let e=0;e<r;e++)a=B_(L_(a,t,n,i),t,i),o.push(a.metrics);return o},W_=(e,t=0)=>e.map(e=>[t,e,!0]),G_=[W_([`scaleUp`,`restage`,`overclock`]),W_([`scaleUp`,`restage`]),[...W_([`scaleUp`,`restage`]),...W_([`overclock`],1)],[...W_([`scaleUp`,`restage`]),...W_([`overclock`],2)],[...W_([`scaleUp`,`restage`,`overclock`]),[1,`overclock`,!1]],[...W_([`scaleUp`,`restage`,`overclock`]),[2,`scaleUp`,!1],[2,`overclock`,!1]],W_([`overclock`,`restage`])],K_=(e,t)=>{let n=new Map;for(let[r,i,a]of e){let e=r*t;n.set(e,[...n.get(e)??[],[`automation`,{key:i,enabled:a}]])}return[...n].map(([e,t])=>({step:e,actions:t})).sort((e,t)=>e.step-t.step)},q_=(e,t,n,r,i)=>{let a=H_(e),o=[];for(let e=0;e<=r;e++){e>0&&(a=L_(a,t,n));let r=i.find(t=>t.step===e);if(r)for(let[e,n]of r.actions)a=R_(a,t,e,n);o.push(a.metrics)}return o},J_=(e,t)=>{if(!(e>0))return 0;let n=10**(Math.floor(Math.log10(e))-t+1),r=Math.floor(e/n)*n;for(;r>e;)r-=n;return r},Y_=e=>({scaleUps:Math.max(0,...Object.values(e.scaleUpTierCounts??{})),overclock:Ir(e)??0}),X_=(e,t,n,r)=>{let i=Math.max(t,r);if(!e.amount)return n>i?n:null;for(let e=1;e<=4;e++){let t=J_(n,e);if(t>i)return t}return null},Z_=(e,t,n)=>{if(!e.amount){let e=Math.max(n+1,t-Math.max(1,Math.round(t*.2)));return e<t?e:null}let r=t=>e.wholeUnits?Math.ceil(t):t;for(let e of[10,4,2]){let i=r(J_(t/e,1));if(i>n&&i<t)return i}let i=r(J_(Math.sqrt(Math.max(1,n)*t),2));return i>n&&i<t?i:null},Q_=(e,t)=>{let n=[...t],r=[];for(;n.length>0;){let t=e()*n.reduce((e,t)=>e+t.weight,0),i=n.findIndex(e=>(t-=e.weight)<0);i<0&&(i=n.length-1),r.push(...n.splice(i,1))}return r},$_=(e,t,n)=>{let r=m_[t],i=n===`fallback`,a=x_(`${e}|${t}|v9|${n}`),o=S_(a),s=i?1e6:p_[Math.floor(o()*p_.length)]*10**C_(o,r.startExponent),c=[];if(!i){let e=[...h_],t=C_(o,r.modifierCount);for(let n=0;n<t;n++){let[t]=e.splice(Math.floor(o()*e.length),1);c.push({lever:t.lever,value:t.values[Math.floor(o()*t.values.length)]})}}let l=Object.fromEntries(c.map(e=>[e.lever,e.value])),u=i?[]:w_(o,r.automations),d=!!r.checkInSeconds&&!i,f=i?0:C_(o,r.warmupSeconds.map(e=>e/l_))*l_,p=r.seconds/r.stepSeconds,m=p/2,h=r.botCeilingSeconds/r.stepSeconds,g=i?h:m+1+Math.floor(o()*(h-m)),_={dateId:e,formatId:t,seed:a,generatorVersion:9,limitSeconds:r.seconds,stepSeconds:r.stepSeconds,startBytes:s,levers:l,conditions:c.map(e=>h_.find(t=>t.lever===e.lever).describe(e.value)),automations:u},v=kt();v.resources={...v.resources,[O]:E_(_)};for(let e of u)v=__[e].unlock(v);v=V_(T_(v,l));let y=v;U_(v,_,l_,f/l_,e=>{y=e});for(let e of i?[]:r.startPaused??[])y=O_(y,__[e].set(!1)(y),_);y=V_(y);let b=[H_(y).metrics];for(let e=H_(y),t=0;t<p;t++)e=L_(e,_,r.stepSeconds),b.push(e.metrics);if(b[p].balance>1e80)return null;let x=b[p],S=i?j_:Q_(o,j_),C=(e,t)=>{let n=X_(e,t[m][e.key],t[g][e.key],x[e.key]);if(n===null)return null;let i=Z_(e,n,x[e.key]);if(i===null)return null;let a=t.findIndex(t=>t[e.key]>=n)*r.stepSeconds;return a>=r.seconds/2&&a<=r.botCeilingSeconds?{objective:e,target:n,attemptMark:i,botSeconds:a}:null},w=null;if(d){let e=G_.map(e=>K_(e,r.checkInSeconds/r.stepSeconds)).map(e=>({plan:e,series:q_(y,_,r.stepSeconds,g,e)})).filter(e=>e.series[g].balance<=c_);for(let t of S){let n=e.reduce((e,n)=>!e||n.series[g][t.key]>e.series[g][t.key]?n:e,null),r=n&&C(t,n.series);if(r){w={...r,plan:n.plan};break}}}else{let e=U_(y,_,r.stepSeconds,g);if(e[g].balance>1e80)return null;for(let t of S)if(w=C(t,e),w){w={...w,plan:null};break}}if(!w)return null;let{objective:T,target:E,attemptMark:D,botSeconds:k,plan:A}=w;return{def:{..._,objective:{key:T.key,kind:T.kind,target:E,label:T.describe(E,T.tier),attemptMark:D,attemptLabel:T.describe(D,T.tier)},headStart:Y_(y)},startGame:y,validation:{attempt:n,warmupSeconds:f,botSeconds:k,plan:A}}},ev=new Map,tv=(e,t)=>{let n=`${e}|${t}`,r=ev.get(n);if(!r){for(let n=0;n<8&&!r;n++)r=$_(e,t,n);r??=$_(e,t,`fallback`),ev.size>64&&ev.clear(),ev.set(n,r)}return r},nv=(e,t)=>tv(e,t).def,rv=e=>le.enabled&&((e.purge?.count??0)>=1||(e.era?.count??0)>=1),iv=e=>e.metrics?.[e.def.objective?.key]??0,av=e=>iv(e)>=e.def.objective?.target,ov=e=>{let t=e.def.objective;if(!t)return 0;let n=iv(e);if(n>=t.target)return 1;if(!M_[t.key]?.amount)return Math.max(0,n/t.target);let r=Math.log10(Math.max(1,t.target));return r>0?Math.min(1,Math.max(0,Math.log10(Math.max(1,n))/r)):0},sv=(e,t,n)=>({...e,daily:{...e.daily,runs:{...e.daily.runs,[t]:n}}}),cv=(e,t,n)=>{let r=e.daily.runs[t];if(!r)return e;let i=av(r),a=r.simSeconds>=r.def.limitSeconds;if(!i&&!a)return e;let o=i||iv(r)>=r.def.objective.attemptMark,s=e.daily.results[r.def.dateId]?.[t]??{won:!1,completed:!1,bestSeconds:null,attempts:0},c=i?s.bestSeconds===null?r.simSeconds:Math.min(s.bestSeconds,r.simSeconds):s.bestSeconds,l={won:s.won||i,completed:s.completed||o,bestSeconds:c,attempts:s.attempts+1,lastOutcome:i?`won`:o?`completed`:`expired`,lastFinishedAt:n},u=sv(e,t,null);return{...u,daily:{...u.daily,results:{...u.daily.results,[r.def.dateId]:{...u.daily.results[r.def.dateId],[t]:l}}}}},lv=(e,t)=>n=>{if(!rv(n)||!m_[e]||n.daily.runs[e])return n;let{def:r,startGame:i}=tv(y_(t),e);return sv(n,e,{def:r,game:i,startedAt:t,lastTickAt:t,simSeconds:0,metrics:H_(i).metrics})},uv=e=>t=>t.daily.runs[e]?sv(t,e,null):t,dv=(e,t,n)=>{let r=e.daily.runs[t];return!!r&&r.def.dateId===y_(n)},fv=(e,t)=>n=>dv(n,e,t)?lv(e,t)(uv(e)(n)):n,pv=e=>t=>{let n=t;for(let t of f_){let r=n.daily?.runs?.[t.id];if(!r)continue;if(r.def.generatorVersion!==9){n=sv(n,t.id,null);continue}let{stepSeconds:i,limitSeconds:a}=r.def,o=Math.max(0,Math.round((a-r.simSeconds)/i)),s=Math.min(o,Math.max(0,Math.floor((e-r.lastTickAt)/1e3/i))),c=e<r.lastTickAt?e:r.lastTickAt+s*i*1e3;if(s===0&&c===r.lastTickAt&&o>0)continue;let l={game:r.game,metrics:r.metrics},u=0;for(;u<s&&(l=L_(l,r.def,i),u++,!(l.metrics[r.def.objective.key]>=r.def.objective.target)););n=cv(sv(n,t.id,{...r,...l,lastTickAt:c,simSeconds:r.simSeconds+u*i}),t.id,e)}return n},mv=(e,t,n,r)=>i=>{if(!Object.hasOwn(k_,t))return i;let a=pv(r)(i),o=a.daily.runs[e];if(!o)return a;let s={game:o.game,metrics:o.metrics},c=R_(s,o.def,t,n);return c===s?a:cv(sv(a,e,{...o,...c}),e,r)},hv=(e,t)=>{let n=Object.values(e.daily?.results?.[t]??{}),r=n.filter(e=>e.won).length,i=+!!n.some(e=>e.won||e.completed);return{wins:r,participation:i,total:r+i}},gv=X.div`
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
`,_v=X(Bh)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,vv=X.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,yv=X.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  margin: 0;
  text-align: left;

  p {
    margin: 0;
  }
`,bv=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.space.sm};
  justify-content: center;
  width: 100%;

  > button {
    flex: 1 1 8rem;
    min-width: 0;
  }
`,xv=({open:e,title:t,children:n,confirmLabel:r=`Confirm`,cancelLabel:i=`Cancel`,confirmVariant:a=`prestige`,onConfirm:o,confirmDisabled:s=!1,onCancel:c,ariaLabel:l})=>{let u=(0,v.useRef)(null),d=(0,v.useId)(),f=(0,v.useRef)(c);return f.current=c,(0,v.useEffect)(()=>{if(!e)return;u.current?.focus();let t=e=>{e.key===`Escape`&&(e.preventDefault(),f.current())};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e]),e?(0,Z.jsx)(gv,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":d,"aria-label":l??t,onClick:e=>{e.target===e.currentTarget&&c()},children:(0,Z.jsxs)(_v,{$raised:!0,children:[(0,Z.jsx)(vv,{id:d,children:t}),(0,Z.jsx)(yv,{children:n}),(0,Z.jsxs)(bv,{children:[(0,Z.jsx)(Q,{ref:u,type:`button`,variant:`neutral`,"aria-label":i,onClick:c,children:i}),(0,Z.jsx)(Q,{type:`button`,variant:a,"aria-label":r,disabled:s,onClick:o,children:r})]})]})}):null},Sv={burst:`Turbo`,standard:`Balanced`,sustain:`Eco`},Cv=e=>Ku(e)>0,wv=e=>Cv(e),Tv=(e,t)=>t<Ku(e),Ev=(e,t)=>t<=Ku(e),Dv=(e,t=0)=>{let n=Vu(e).filter(e=>e.queue[0]>t);if(n.length===0)return null;let r=n.map(e=>{let t=e.queue.length-1,n=e.remainingSeconds+t*Ne[e.type].durationSeconds;return`${Sv[e.type]??e.type} ×${Ne[e.type].multiplier} (${Wi(n)} left${t>0?`, ${t} queued`:``})`});return`Boosted ×${Gu(e,t+1)} production by Compute Boosts — ${r.join(` + `)}`},Ov=gh`
  --boost-glow: ${e=>e.theme.color.warn};
  box-shadow: 0 0 0 1px var(--boost-glow), 0 0 10px 1px var(--boost-glow);
  animation: ${Ch`
  0%, 100% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 6px 0 var(--boost-glow); }
  50% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 14px 2px var(--boost-glow); }
`} 2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,kv={burst:{icon:`💥`,label:`Turbo`},standard:{icon:`⏱️`,label:`Balanced`},sustain:{icon:`🔋`,label:`Eco`}},Av=e=>Wi(e).replace(/ 0[ms]$/,``),jv=(e,t=`symbol`)=>e<=1?b[0][t]:`${b[0][t]}–${b[Math.min(e,b.length)-1][t]}`,Mv=X(Q)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,Nv=X.div`
  display: flex;
  align-items: stretch;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,Pv=`2.8em`,Fv=X(Mv)`
  flex: 0 0 ${Pv};
  width: ${Pv};
  min-width: 0;
  padding-left: 0;
  padding-right: 0;
`,Iv=X.span`
  font-size: 0.78em; /* same em as CompactButton, so the widths match */
  flex: 0 0 ${Pv};
  width: ${Pv};
`,Lv=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,Rv=X.div`
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
`,zv=X.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: left;
  white-space: nowrap;
`,Bv=X.span`
  font-weight: 700;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Vv=X.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: right;
  white-space: nowrap;
`,Hv=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,Uv=e=>{let t=[];for(let n of e){let e=t[t.length-1];e&&e.tierIndex===n?e.count+=1:t.push({tierIndex:n,count:1})}return t},Wv=({lane:e,state:t,actions:n})=>{let{type:r,queue:i,remainingSeconds:a}=e,o=kv[r]??{icon:`⚡`,label:r},s=zu(r,i[0]),c=Ru(r,i[0]),l=Uv(i),u=l.length-1;return(0,Z.jsx)(Lv,{role:`group`,"aria-label":`${o.label} boost controls`,children:l.map((e,i)=>{let l=i>0,d=e.count*s,f=l?d:a+(e.count-1)*s,p=d>0?Math.min(100,f/d*100):0,m=jv(e.tierIndex);return(0,Z.jsxs)(Nv,{children:[i===u?$u(t,r)?(0,Z.jsx)(Fv,{"aria-label":`pop one queued ${o.label} compute boost`,onClick:()=>n.reclaimComputeBoost(r),title:`Pop: refund the last queued boost`,type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`↩`})}):(0,Z.jsx)(Fv,{"aria-label":`forfeit the ${o.label} compute boost with no refund`,disabled:!td(t,r),onClick:()=>{window.confirm(`Forfeit the ${o.label} boost with no refund?`)&&n.forfeitComputeBoost(r)},title:`Forfeit: end the boost now with no refund — asks for confirmation`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`✕`})}):(0,Z.jsx)(Iv,{"aria-hidden":`true`}),(0,Z.jsxs)(Rv,{"aria-label":l?`queued ${o.label} compute boost ${m}`:`active ${o.label} compute boost`,$fill:p,$waiting:l,title:`${o.label} boost ${l?`queued`:`active`}: ×${c} production on ${jv(e.tierIndex,`name`)}, ${Wi(f)}${l?` once it starts`:` left`}`,children:[(0,Z.jsx)(zv,{children:`${e.count}x`}),(0,Z.jsx)(Bv,{children:`${m} ${o.icon} ×${c}`}),(0,Z.jsx)(Vv,{children:Wi(f)})]}),i===0?(0,Z.jsx)(Fv,{"aria-label":`stack the ${o.label} compute boost`,disabled:!Zu(t,r),onClick:()=>n.stackComputeBoost(r),title:`Queue another ${Av(s)} ${o.label} boost — up to 10x`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`+`})}):(0,Z.jsx)(Iv,{"aria-hidden":`true`})]},`${e.tierIndex}-${i}`)})})},Gv=({state:e,actions:t})=>{let n=Vu(e.intro??{});return n.length===0?null:(0,Z.jsx)(Hv,{role:`group`,"aria-label":`active boost controls`,children:n.map(n=>(0,Z.jsx)(Wv,{lane:n,state:e,actions:t},n.type))})},Kv=({challenge:e,onExit:t})=>{let[n,r]=(0,v.useState)(!1);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Q,{"aria-label":`Exit challenge ${e.id} ${e.codename}`,onClick:()=>r(!0),title:`Abandon this challenge and restart the Factory cycle with no reward`,type:`button`,variant:`prestige`,children:`Exit`}),(0,Z.jsx)(xv,{confirmLabel:`Exit challenge`,onCancel:()=>r(!1),onConfirm:()=>{r(!1),t()},open:n,title:`Exit ${e.id}?`,children:(0,Z.jsx)(`p`,{children:`Exiting restarts the current Factory cycle with no reward (no PP, no Purge count). Your progress in this run is lost.`})})]})},qv=e=>{let t=Math.max(0,Math.floor(Number.isFinite(e)?e:0)),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),i=Math.floor(t%3600/60);return n>0?`${n}d ${r}h`:r>0?`${r}h ${i}m`:i>0?`${i}m ${t%60}s`:`${t}s`},Jv=e=>e===8e100?`1 Googol Bytes`:`10^${Math.round(Math.log10(e/8))} Bytes`,Yv=e=>`Unlocks at Purge ${oi(e)}`,Xv=e=>`${e.id} · ${e.target} · ${e.codename}`,Zv=(e,t)=>t-e%t,Qv=e=>{let t=Gr(e);if(!t)return[];let n=e.challenges.activeSeconds??0,r=e.challenges.run??{};switch(t.effect){case`writeLock`:return[(r.haltSeconds??0)>0?`Production halted: ${qv(Math.ceil(r.haltSeconds))} left`:`Production running`];case`hardRefresh`:return[`Next refresh in ${qv(Zv(n,300))} · ${r.refreshes??0} survived`];case`clockDrift`:return[`Next tickspeed loss in ${qv(Zv(n,600))}`];case`dutyCycle`:return[`Tickspeed bonus ${Math.floor(n/30)%2==0?`ON`:`OFF`} for ${qv(Math.ceil(Zv(n,30)))}`];case`bitRot`:return[`Corruption ${Rt(ri(e))} vs ${Rt(e.resources.base??0)} · ${e.challenges.bitRotLosses??0} cycles lost`];default:return[]}},$v=X.section`
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
`,ey=X.button`
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
`,ty=X.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`,ny=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
`,ry=({state:e,onExit:t,children:n})=>{let[r,i]=(0,v.useState)(!1),a=Gr(e);if(!a)return null;let o=qv(e.challenges.activeSeconds);return(0,Z.jsxs)($v,{"aria-label":`active challenge banner`,children:[(0,Z.jsxs)(ty,{children:[(0,Z.jsxs)(ey,{"aria-expanded":r,"aria-label":`${a.id} ${a.codename}, ${r?`hide`:`show`} exit`,onClick:()=>i(e=>!e),type:`button`,children:[a.id,` · `,a.codename,` `,(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:r?`▴`:`▾`})]}),(0,Z.jsx)(ny,{children:a.rule}),(0,Z.jsxs)(ny,{"aria-label":`challenge elapsed time ${o}`,children:[`⏱ `,o,` · goal `,Jv(a.goal)]}),Qv(e).map(e=>(0,Z.jsx)(ny,{"aria-label":`challenge status: ${e}`,children:e},e)),n]}),r&&(0,Z.jsx)(Kv,{challenge:a,onExit:t})]})},iy=X.b`
  color: ${e=>e.theme.color.text};
  font-size: 1.25em;
  padding: 0.25em 0;
  font-variant-numeric: tabular-nums;
`,ay=Object.freeze({removeAds:!1}),oy=()=>({adsAvailable:!1,iapAvailable:!1,init:async()=>{},showRewarded:async()=>({shown:!1,rewarded:!1,reason:`ads_disabled`}),purchase:async()=>({ok:!1,reason:`iap_disabled`}),restore:async()=>({ok:!1,reason:`iap_disabled`}),getEntitlements:async()=>ay}),sy=({loadAds:e=null,loadIap:t=null}={})=>{if(!e&&!t)return oy();let n=null,r=null,i=null,a=ay,o=()=>(n??=(async()=>{let[n,o]=await Promise.all([e?e().catch(()=>null):null,t?t().catch(()=>null):null]);if(o)try{await o.init(),i=o,a=await i.getEntitlements()}catch{i=null}if(n)try{await n.init(),r=n}catch{r=null}})(),n),s=e=>(e?.entitlements&&(a=e.entitlements),e);return{adsAvailable:!!e,iapAvailable:!!t,init:o,showRewarded:async e=>(await o(),a.removeAds?{shown:!1,rewarded:!0,reason:`ad_free`}:r?r.showRewarded(e):{shown:!1,rewarded:!1,reason:`ads_unavailable`}),purchase:async e=>(await o(),i?s(await i.purchase(e)):{ok:!1,reason:`iap_unavailable`}),restore:async()=>(await o(),i?s(await i.restore()):{ok:!1,reason:`iap_unavailable`}),getEntitlements:async()=>(await o(),a)}},cy=null,ly=()=>(cy??=sy({loadAds:null,loadIap:null}),cy),uy=1e4,dy=400,fy=100,py=X.div`
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
`,my=X(Bh).attrs({role:`status`,"aria-live":`polite`})`
  align-items: center;
  max-width: 26rem;
  opacity: ${e=>+!e.$fading};
  pointer-events: auto;
  text-align: center;
  transition: opacity ${dy}ms ease;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,hy=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,gy=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`,_y=({offlineProgress:e,dismissOfflineProgress:t,claimOfflineAdReward:n,monetization:r=ly()})=>{let[i,a]=(0,v.useState)(!1),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(!1),[u,d]=(0,v.useState)(100);if((0,v.useEffect)(()=>{if(!e)return;let t=Date.now();s({start:t,end:t+uy}),l(!1),d(100)},[e]),(0,v.useEffect)(()=>{if(i||!e)return;let t=Date.now();s(e=>e&&{start:t,end:t+uy})},[i,e]),(0,v.useEffect)(()=>{if(!e||!o||c||i)return;let{start:t,end:n}=o,r=n-t,a=()=>{let e=n-Date.now();e<=0?(d(0),l(!0)):d(Math.round(e/r*100))};a();let s=setInterval(a,fy);return()=>clearInterval(s)},[e,o,c,i]),(0,v.useEffect)(()=>{if(!c||i)return;let e=setTimeout(t,dy);return()=>clearTimeout(e)},[c,i,t]),!e)return null;let f=!!n&&r.adsAvailable&&!e.rewardClaimed&&Hi(e.elapsedRealSeconds,e.capSeconds)>0;return(0,Z.jsx)(py,{children:(0,Z.jsxs)(my,{"aria-label":`offline progress notice`,$fading:c,children:[(0,Z.jsxs)(hy,{children:[`Resumed from sleep! You were away for `,Wi(e.elapsedRealSeconds),` — simulated `,Wi(e.effectiveSeconds),` of progress at`,` `,e.rewardClaimed?`100% speed (video bonus).`:`50% speed.`]}),(0,Z.jsxs)(gy,{children:[f&&(0,Z.jsx)(Q,{"aria-label":`Watch a video to simulate your time away at 100% speed`,disabled:i,onClick:async()=>{let t=e;l(!1),a(!0);try{(await r.showRewarded(`offline_full_speed`)).rewarded&&n(t)}finally{a(!1)}},title:`Watch a short video to double your offline progress to 100% speed`,type:`button`,variant:`primary`,children:i?`Loading video…`:`▶ 100% speed`}),(0,Z.jsxs)(Q,{"aria-label":`Dismiss offline progress notice`,variant:`neutral`,onClick:t,title:`Dismiss this notice`,type:`button`,$progress:u,$progressColor:`#525252`,children:[`Dismiss`,(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`Time until this notice auto-dismisses`,"aria-valuenow":u,"aria-valuemin":0,"aria-valuemax":100})]})]})]})})},vy=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom) + ${`2.5rem`});
  font-variant-numeric: tabular-nums;
`,yy=gh`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,by=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
`,xy=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,Sy=Ch`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`,Cy=X(Bh)`
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
  animation: ${e=>e.$animateReveal?gh`${Sy} 0.4s ease-out`:`none`};
  ${e=>e.$boosted&&Ov}

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
`,wy=e=>gh`
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
`,Ty=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: auto;
  white-space: nowrap;
`,Ey=X.div`
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
`,Dy=X(Bh)`
  ${wy(`#0e7490`)}
`,Oy=X(Bh)`
  ${wy(`#1d4ed8`)}
`,ky=X(Bh)`
  ${wy(`#8b5cf6`)}
`,Ay=X(Bh)`
  ${wy(`#c2410c`)}
`,jy=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  > * {
    min-width: 0;
  }
`,My=X(Bh)`
  align-items: center;
  text-align: center;

  ${e=>e.$actionable&&gh`
    cursor: pointer;

    &:hover {
      filter: brightness(1.15);
    }
  `}

  ${e=>e.$actionable&&gh`
    &:focus-visible {
      outline: 2px solid ${e.theme.color.warn};
      outline-offset: 2px;
    }
  `}

`,Ny=X.div`
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.sm};

  &:hover {
    filter: brightness(1.15);
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,Py=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,Fy=X.b`
  color: ${e=>e.theme.color.warn};
  font-size: 1.25em;
`,Iy=X(iy)`
  font-family: ${e=>e.theme.font.body};
  font-size: ${e=>e.theme.type.scale.hero.size};
  line-height: ${e=>e.theme.type.scale.hero.lineHeight};
  padding: 0;
`,Ly=X(Py)`
  text-align: center;
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 0.1rem;
  pointer-events: none;
`,Ry=X.div`
  position: relative;
`,zy=X.div`
  display: flex;
  gap: 3px;
  margin-top: 0.5rem;
  width: 100%;
`,By=X.span`
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: 2px;
  flex: 1;
  height: 0.4rem;
  min-width: 0;
  overflow: hidden;
`,Vy=X.span`
  background: ${e=>e.theme.color.accent};
  display: block;
  height: 100%;
  transition: width ${e=>e.theme.motion.duration.slow} ${e=>e.theme.motion.easing.out};
  width: ${e=>e.$fraction*100}%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,Hy=X.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border-top: 1px solid ${e=>e.theme.color.border};
  bottom: ${Wg};
  left: 0;
  padding: 0.5rem calc(0.75rem + env(safe-area-inset-left)) 0.5rem calc(0.75rem + env(safe-area-inset-right));
  position: fixed;
  right: 0;
  z-index: 39;
`,Uy=X.div`
  ${e=>Qg({$progress:e.$percent,$progressColor:e.theme.color.accent,theme:e.theme})}
  align-items: center;
  border-radius: ${e=>e.theme.radius.pill};
  display: flex;
  height: 1.5rem;
  justify-content: center;
  margin: 0 auto;
  max-width: min(880px, calc(100vw - 2rem));
  width: 100%;
`,Wy=X.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
`,Gy=X(My)`
  box-shadow: none;
  padding: 0.5rem 1rem;
`,Ky=X.ul`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8em;
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
  text-align: left;

  li {
    margin: 0.15rem 0;
  }
`,qy=X.div`
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

  ${e=>e.$compressed&&gh`
    box-shadow: ${e.theme.shadow.md};
    padding: 0.25rem 0;

    ${My} {
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
    ${iy} {
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
`,Jy=X.div`
  height: 1px;
  margin-top: calc(-0.85rem - 1px);
`,Yy=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
  width: 100%;
`,Xy=X.div`
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
`,Zy=X.div`
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
`,Qy=X.div`
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
`,$y=X.div`
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
`,eb=X.div`
  height: ${e=>e.$height}px;
`,tb=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  margin: 0;
`,nb=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,rb=X.h3`
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
`,ib=X.span`
  cursor: pointer;
  flex-shrink: 0;
  min-width: 2.2rem;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
    border-radius: ${e=>e.theme.radius.sm};
  }
`,ab=X.details`
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
  summary:has(${Ey}) {
    pointer-events: none;
    width: 100%;
  }

  summary:has(${Ey}) h2 {
    pointer-events: auto;
  }

  p {
    margin-top: 0.3rem;
  }
`,ob=X.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  margin: 0;
  ${yy}

  @media (max-width: 24.5rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    line-height: 1.15;
  }
`,sb=X(Q)`
  grid-area: buy;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  min-height: 2rem;
  padding: 0 0.6em;
  ${yy}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,cb=X($g)`
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 0.5em;
  font-variant-numeric: tabular-nums;
`,lb=X.span`
  font-weight: 800;
`,ub=X(e_)`
  flex: 1 0 auto;
  text-align: right;
`,db=X(Q)`
  grid-area: upgrade;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  min-height: 2rem;
  padding: 0 0.5em;
  ${yy}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.4em;
  }
`,fb=(e,t)=>t===`base`?Rt(e):t===`bytes`?zt(e):`${B(e)} ${E(t)}`,pb=(e,t)=>Math.min(100,Math.round(e/t*100)),mb=e=>(Math.round(e*100)/100).toFixed(2).replace(/\.?0+$/,``),hb=e=>Math.round((e-1)*100),gb=e=>(Math.round((e-1)*100*100)/100).toFixed(2).replace(/\.?0+$/,``),_b=(e,{precise:t=!1}={})=>e>=2?`${mb(e)}x`:`+${t?gb(e):hb(e)}%`,vb=({game:e})=>{let{actions:t,claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i,state:a}=e,o=ch(),{purge:s}=a,c=a.resources[O]>=ii(a),l=Ur(a),u=a.prestigeDoublePpLevel??0,d=fn(a),f=dn(s.count,d),p=ji(a.resources[O],u,Ur(a)),m=xi(a.resources[O],ii(a)),h=Si(a.resources[O]),g=Math.round(h*100),_=a.resources[O],y=Vt(_),x=Rt(_),S=!!Gr(a)&&Kr(a,Gr(a).id),C=Jv(ii(a)),w=S?0:Math.max(1,p),T=l&&c?`Purge (optional — claim accumulated PP)`:`Purge (requires ${C})`,k=S?`${T} — completes the challenge repeat, awards no Purge Points`:`${T} — awards +${B(w)} Purge Point${w===1?``:`s`}`,[A]=(0,v.useState)(()=>new Set(b.filter(e=>vi(a)(e)).map(e=>e.id))),[j,M]=(0,v.useState)(()=>new Set),ee=e=>M(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}),N=(0,v.useRef)(null),P=(0,v.useRef)(new Map),te=(0,v.useRef)(new Map);(0,v.useEffect)(()=>{if(typeof IntersectionObserver>`u`)return;let e=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting)return;let t=e.target.dataset.tierId;M(e=>{if(!e.has(t))return e;let n=new Set(e);return n.delete(t),n})})});return N.current=e,()=>e.disconnect()},[]);let ne=e=>(te.current.has(e)||te.current.set(e,t=>{let n=N.current,r=P.current.get(e);n&&r&&r!==t&&n.unobserve(r),t?(P.current.set(e,t),n&&n.observe(t)):P.current.delete(e)}),te.current.get(e)),[re,F]=(0,v.useState)(!1),ie=()=>F(e=>!e),ae=_i(a),oe=Gr(a),se=e=>oe?.effect===e,ce=oe?` — disabled by challenge ${oe.id} ${oe.codename}`:``,I=s.count===0,le=!!e.buyUnitMode,ue=!!e.buyMaxMode&&Yi(a)&&!le,de=Ut(a),fe=ae&&I,pe=ae&&!I,L=!!oe||pe||!!e.goal||Vu(a.intro??{}).length>0,R=ei(a),me=a.purchaseLevels?.[R.id]??1,he=vi(a)(R),ge=Mr(a),_e=a.purchaseLevels?.[ge.id]??1,ve=a.scaleUpCount??0,ye=Nr(a),be=Math.max(0,me-1),xe=Math.max(0,_e-1),Se=ye,Ce=pb(xe,Se),we=!ae&&xe>=ye,Te=b[b.indexOf(ge)+1]??null,Ee=Te?.symbol===`TB`,De=Ti(a),Oe=Number.isInteger(De)?String(De):De.toFixed(2),ke=De===2?`doubles`:`multiplies by ${Oe}`,[Ae,je]=(0,v.useState)(he);(0,v.useEffect)(()=>{he&&je(!0)},[he]);let Me=Ir(a)??0,Ne=Pr(a),Pe=Ne,Fe=1+wi(a),Ie=1+wi({...a,overclockLastClaimCompletedLevels:null,overclockCount:0}),Le=1+ot,Re=pb(be,Pe),ze=!ae&&!se(`overclockDisabled`)&&be>=Ne,Be=a.globalTickspeedMultiplier??null,Ve=Be!==null,He=Ci(a),Ue=nn(Be??0),We=on(a),Ge=!ae&&!se(`clockSpeedDisabled`)&&We&&an(a),Ke=cn(a),qe=a.owned[R.id]??0,Je=a.lastTierXpConsumed??0,Ye=Math.floor(a.purge.xp??0),Xe=un(Je),Ze=pb(Ye,Xe),Qe=Ke&&!ae&&!se(`restageDisabled`)&&Ye>=Xe,$e=_b(ln(Ye)),et=()=>{Qe&&window.confirm(`Restage: consume ${B(Ye)} XP for ${$e} faster ${R.name} ticks? This resets every other tier's owned quantity (not their level) and your Bits balance back to 0.${qe>0?``:` You own no ${R.name}, so nothing will be left producing.`}`)&&t.consumeXpForLastTierTickspeed(Ye)},tt=pb(a.resources.base??0,rn(Be??0)),[nt,rt]=(0,v.useState)(We);(0,v.useEffect)(()=>{We&&rt(!0)},[We]);let it=(0,v.useRef)(null);(0,v.useEffect)(()=>{fe&&it.current?.focus()},[fe]);let at=(0,v.useRef)(null),[st,ct]=(0,v.useState)(!1);(0,v.useEffect)(()=>{let e=at.current;if(!e||typeof IntersectionObserver>`u`)return;let t=null,n=new IntersectionObserver(([e])=>{clearTimeout(t),t=setTimeout(()=>ct(!e.isIntersecting),60)});return n.observe(e),()=>{clearTimeout(t),n.disconnect()}},[fe]);let lt=(0,v.useRef)(null),[ut,dt]=(0,v.useState)(60);return(0,v.useEffect)(()=>{let e=lt.current;if(!e||typeof ResizeObserver>`u`)return;let t=new ResizeObserver(()=>dt(e.offsetHeight));return t.observe(e),()=>t.disconnect()},[pe]),fe?(0,Z.jsx)(Zy,{role:`dialog`,"aria-modal":`true`,"aria-label":`Purge required`,children:(0,Z.jsxs)(Qy,{children:[(0,Z.jsx)(`h2`,{children:`💾 Disk full`}),(0,Z.jsxs)(tb,{children:[`You've reached `,Rt(a.resources[O]),` — 1 Googol Bytes. All production has stopped.`]}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Resets your resources, owned tiers, and purchases`}),(0,Z.jsxs)(`li`,{children:[`Awards `,B(p),` Purge Point`,p===1?``:`s`,` — spend them on the Firmware page for automation and production bonuses`]}),(0,Z.jsx)(`li`,{children:`Keeps your unlocked autobuyers and Purge Points`})]}),(0,Z.jsx)(Q,{ref:it,"aria-label":`Purge now`,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:(0,Z.jsx)($,{children:`✦ Purge Now`})})]})}):(0,Z.jsxs)(vy,{children:[(0,Z.jsx)(ry,{onExit:t.exitChallenge,state:a}),pe&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)($y,{ref:lt,"aria-label":`purge available banner`,children:[(0,Z.jsxs)(tb,{children:[C,` reached — production has stopped.`]}),(0,Z.jsxs)(Q,{"aria-label":k,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:[(0,Z.jsx)($g,{children:`✦ `}),(0,Z.jsx)(e_,{children:S?`Complete challenge`:`Purge +${B(w)} PP`})]})]}),(0,Z.jsx)(eb,{$height:ut})]}),(0,Z.jsx)(Hy,{"aria-label":e.goal?`goal progress`:`purge progress`,children:(0,Z.jsxs)(Uy,{$percent:e.goal?e.goal.percent:m,children:[(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":e.goal?e.goal.ariaLabel:`progress toward ${C}, when Purge becomes available`,"aria-valuenow":e.goal?e.goal.percent:m,"aria-valuemin":0,"aria-valuemax":100}),(0,Z.jsx)(Wy,{children:e.goal?e.goal.label:`${m}% to Purge`})]})}),L?(0,Z.jsx)(n_,{as:`h1`,children:`Byte Factory`}):(0,Z.jsx)(by,{children:(0,Z.jsx)(`h1`,{children:`Byte Factory`})}),(0,Z.jsx)(Gv,{actions:t,state:a}),(0,Z.jsx)(_y,{claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i}),(0,Z.jsx)(Jy,{ref:at,"aria-hidden":`true`}),(0,Z.jsxs)(qy,{$compressed:st,$belowBar:pe,$belowBarHeight:ut,children:[(0,Z.jsxs)(My,{$raised:!0,children:[(0,Z.jsxs)(Ry,{children:[(0,Z.jsx)(Ny,{"aria-controls":`global-multipliers-details`,"aria-expanded":re,"aria-label":`money display`,onClick:ie,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),ie())},role:`button`,tabIndex:0,title:`Show or hide the global production multipliers currently in effect`,children:(0,Z.jsx)(Iy,{children:y})}),!st&&y!==x&&(0,Z.jsx)(Ly,{"aria-label":`balance in bits: ${x}`,children:x})]}),!st&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(zy,{"aria-hidden":`true`,children:Array.from({length:8},(e,t)=>{let n=t/8,r=Math.min(1,Math.max(0,(h-n)/.125));return(0,Z.jsx)(By,{children:(0,Z.jsx)(Vy,{$fraction:r})},t)})}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`progress toward the next power of ten Bytes`,"aria-valuenow":g,"aria-valuemin":0,"aria-valuemax":100})]}),re&&!st&&(0,Z.jsxs)(Ky,{id:`global-multipliers-details`,"aria-label":`global production multipliers`,children:[!I&&(0,Z.jsxs)(`li`,{children:[`Playtime bonus: `,a.playtimeBonusUnlocked?`${_b(mn(a))} production speed from ${B(Math.floor((a.activePlaySeconds??0)/3600))}h active play`:`not yet unlocked (${B(100)} PP on Firmware → Prestige)`]}),!I&&(0,Z.jsxs)(`li`,{children:[`Prestige speed bonus: `,d?`${_b(f)} production speed from ${B(s.count)} Purge${s.count===1?``:`s`}`:`not yet unlocked (${B(1)} PP on Firmware → Prestige)`]}),(0,Z.jsxs)(`li`,{children:[`Scale Up: `,ve>0?`${ve} activation${ve===1?``:`s`}; multiplier varies by tier`:`not yet activated (reach ${B(Se)} completed levels on ${ge.name})`]}),nt&&(0,Z.jsxs)(`li`,{children:[`Accelerate: `,Ve?`${_b(He,{precise:!0})} faster ticks on every tier`:`not yet active`]}),Ae&&(0,Z.jsxs)(`li`,{children:[`Overclock: `,Me>0?`The per-level speed bonus is now ${gb(Fe)}% (was ${gb(Ie)}%)`:`not yet claimed (reach ${B(Pe)} completed levels on ${R.name})`]})]})]}),!I&&(0,Z.jsx)(Gy,{"aria-label":`purge points display`,$actionable:c,onClick:c?t.purge:void 0,onKeyDown:e=>{!c||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),t.purge())},role:c?`button`:void 0,tabIndex:c?0:void 0,title:c?`Awards Purge Points and resets your resources`:void 0,children:(0,Z.jsxs)(Py,{children:[(0,Z.jsxs)(Fy,{children:[B(s.points),` PP`]}),d&&` · ${_b(f)} production speed`]})})]}),(nt||Ke)&&(0,Z.jsxs)(jy,{children:[nt&&(0,Z.jsxs)(Oy,{"aria-label":`global accelerate panel`,children:[(0,Z.jsxs)(ab,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(Ey,{children:[(0,Z.jsx)(`h2`,{children:`Accelerate`}),(0,Z.jsxs)(Ty,{title:`Each Accelerate level makes every tier's production ticks faster by this factor (this is the live rate: Overclock raises it and some challenges weaken it)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 +`,gb(Fe),`%/lvl`]})]})}),(0,Z.jsx)(nb,{children:Ve?`${_b(He,{precise:!0})} faster ticks on every tier.`:`Not active yet — spend Bytes to make every tier's production ticks faster, one level at a time.`})]}),(0,Z.jsxs)(Q,{"aria-label":Ve?`Upgrade Accelerate for ${zt(Ue)} (currently ${_b(He,{precise:!0})} faster ticks on every tier)`:`Enable Accelerate for ${zt(Ue)}`,color:Ge?`#3b82f6`:`darkgrey`,disabled:!Ge,onClick:t.buyGlobalTickspeedMultiplier,title:`Spend Bytes to make every tier's production ticks faster (more frequent deliveries, not bigger ones) — each level costs the next power of ten${se(`clockSpeedDisabled`)?ce:``}`,type:`button`,$progress:tt,$progressColor:`#3b82f6`,$pulse:Ge,children:[(0,Z.jsx)($g,{children:`🌐 `}),(0,Z.jsx)(e_,{children:zt(Ue)}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`Accelerate progress`,"aria-valuenow":tt,"aria-valuemin":0,"aria-valuemax":100})]})]}),Ke&&(0,Z.jsxs)(ky,{"aria-label":`restage panel`,children:[(0,Z.jsxs)(ab,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(Ey,{children:[(0,Z.jsx)(`h2`,{children:`Restage`}),(0,Z.jsxs)(Ty,{title:`Each XP consumed makes ${R.name} ticks faster by this factor (compounding)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[R.symbol,` +`,hb(ln(1)),`%/XP`]})]})}),(0,Z.jsxs)(nb,{children:[_b(ln(Je),{precise:!0}),` faster `,R.name,` ticks`,` `,`from `,B(Je),` XP consumed. Next consumption needs at least `,B(Xe),` XP.`]})]}),(0,Z.jsxs)(Q,{"aria-label":`Restage: consume ${B(Ye)} XP for ${$e} ${R.name} tickspeed (resets every other tier's owned quantity and Bits to 0)${se(`restageDisabled`)?ce:``}`,variant:`smart`,disabled:!Qe,onClick:et,title:qe>0?`Consume XP for a compounding +1% ${R.name} tickspeed per XP (min ${B(Xe)} XP right now) — resets every other tier's owned quantity and Bits to 0`:`No ${R.name} owned right now — Restaging now resets everything with nothing left producing`,type:`button`,$progress:Ze,$pulse:Qe,children:[(0,Z.jsx)($g,{children:`🧬 `}),(0,Z.jsxs)(e_,{children:[B(Ye),` XP`]}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`${R.name} Restage progress`,"aria-valuenow":Ze,"aria-valuemin":0,"aria-valuemax":100})]})]})]}),(0,Z.jsx)(xy,{children:b.map((e,n)=>{if(!vi(a)(e))return null;let r=a.resources[e.id]??0,i=a.owned[e.id]??0,s=Ki(a,e.id),c=Gi(a,e),l=a.purchaseLevels?.[e.id]??1,u=Math.max(0,l-1),d=a.purchaseLevelProgress?.[e.id]??0,p=Qr(a,e.id)??e,m=Jt(p,l,de,d,c,2**53-1),h=le?Math.min(1,m):m,g=qt(p,l,de,d,1),_=h>0?qt(p,l,de,d,h):g,v=m>0&&!ae,y=d/de*100,b=h/de*100,x=a.tickspeedLevels?.[e.id]??1,S=tn(x)*(e.id===R.id?ln(a.lastTierXpConsumed??0):1),C=_b(S),w=Or(l,Dr(a)),T=Ar(a,e.id),O=Math.floor(i*f*T*w*Zr(a,e.id)),k=e.producesResourceId===`base`?Rt(O):e.producesResourceId===`bytes`?zt(O):`${B(O)} ${E(e.producesResourceId)}`,M=D(e.id),N=Ei(a,e.id),P=ld(a,e.id,x+1),te=ud(a,e.id,x+1),re=r>=te&&!ae&&!dd(a,e.id),F=ue?V(a,e.id):{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0},ie=F.levels>0?`Buy ${B(F.levels)} full level${F.levels===1?``:`s`} for ${Rt(F.cost)} total; highest level costs ${Rt(F.partialQuantity>0?F.partialCost:F.lastLevelCost)}${F.partialQuantity>0?` (${F.partialQuantity} of ${de} purchases toward the next level)`:``} (${B(u)} completed levels)`:`Buy${h>1?` ×${h}`:``} for ${Rt(_)} (${B(u)} completed levels, ${B(d)} of ${de} purchased toward the next)`,oe=`Tickspeed multiplier (+10% faster ticks) for ${fb(P,e.id)}${te>P+1?` (requires ${fb(te,e.id)} owned)`:``}`,se=F.levels>0?`+${B(F.levels)}`:``,ce=`⚙ ${fb(P,e.id)}`,I=pb(r,te),fe=o.tierAccents[n%o.tierAccents.length],pe=j.has(e.id),L=`${e.id}-details`,me=Tv(a.intro,n);return(0,Z.jsxs)(Cy,{ref:ne(e.id),"data-tier-id":e.id,"aria-label":`${e.name} layer`,$accent:fe,$animateReveal:!A.has(e.id),$boosted:me,children:[(0,Z.jsxs)(Yy,{children:[(0,Z.jsx)(rb,{children:(0,Z.jsxs)(ib,{title:e.name,role:`button`,tabIndex:0,"aria-expanded":pe,"aria-controls":L,onClick:()=>ee(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),ee(e.id))},children:[(0,Z.jsx)(n_,{children:e.name}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]})}),(0,Z.jsxs)(ob,{title:`Owned`,children:[(0,Z.jsx)(n_,{children:`Owned: `}),B(i)]})]}),pe&&(0,Z.jsx)(Xy,{id:L,children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Production: +`,k,` per delivery`]}),(0,Z.jsxs)(`li`,{children:[`Base tickspeed: delivers every `,mb(M),`s`]}),(0,Z.jsxs)(`li`,{children:[`Effective tickspeed: every `,mb(N),`s (tier ×`,mb(S),`, global ×`,mb(He),`)`]}),(0,Z.jsxs)(`li`,{children:[`Completed levels: `,B(u),` (`,B(d),`/`,de,` purchased toward the next) — purchase milestone bonus: ×`,mb(w),` from `,B(s),` lifetime purchases`]}),T>1&&(0,Z.jsxs)(`li`,{children:[`Scale Up bonus: ×`,mb(T)]}),me&&(0,Z.jsx)(`li`,{children:Dv(a.intro,n)}),(0,Z.jsxs)(`li`,{children:[`Costs `,E(e.costResourceId),`, produces `,E(e.producesResourceId)]})]})}),(0,Z.jsxs)(db,{"aria-label":oe,variant:`success`,disabled:!re,onClick:()=>t.buyTickspeedMultiplier(e.id),title:`Tickspeed multiplier level ${x} (${C} faster ticks) — the next level makes it 10% more`,$progress:I,$pulse:re,children:[(0,Z.jsx)($,{children:ce}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`${e.name} tickspeed multiplier progress`,"aria-valuenow":I,"aria-valuemin":0,"aria-valuemax":100})]}),(0,Z.jsxs)(sb,{"aria-label":ie,variant:`plain`,disabled:!v,onClick:()=>t.buyTierQuantity(e.id),title:`Buy ${e.name} to increase your ${E(e.producesResourceId)} production — completing every level (${de} purchases) also multiplies it by ×${Dr(a)}`,$progress:y,$secondaryProgress:b,$pulse:v,children:[(0,Z.jsxs)(cb,{children:[`🛒 `,B(u),se&&(0,Z.jsx)(lb,{children:se})]}),(0,Z.jsx)(ub,{children:Rt(F.levels>0?F.partialQuantity>0?F.partialCost:F.lastLevelCost:_)}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`${e.name} cost-block progress`,"aria-valuenow":d,"aria-valuemin":0,"aria-valuemax":de})]})]},e.id)})}),(0,Z.jsxs)(jy,{children:[(0,Z.jsxs)(Dy,{"aria-label":`scale up panel`,children:[(0,Z.jsxs)(ab,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(Ey,{children:[(0,Z.jsx)(`h2`,{children:`Scale Up`}),(0,Z.jsxs)(Ty,{title:`${De===2?`Doubles`:`Multiplies`} production for tiers unlocked so far`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 ×`,Oe,Ee?` · 🔓 TB`:``]})]})}),(0,Z.jsxs)(nb,{children:[`Resets tiers and `,ke,` production of every tier unlocked so far`,Te?`, and unlocks ${Te.name}`:``,`. Needs `,B(Se),` completed `,ge.name,` levels.`]})]}),(0,Z.jsxs)(Q,{"aria-label":`Scale Up (requires ${Se} completed ${ge.name} levels) — ${ke} production for tiers unlocked so far${Ee?` and unlocks TB`:``}`,color:we?`#22d3ee`:`darkgrey`,disabled:!we,onClick:t.scaleUp,title:`Resets tiers, ${ke} production for tiers unlocked so far${Te?`, and unlocks ${Te.name}`:``} — requires ${Se} completed ${ge.name} levels`,type:`button`,$progress:Ce,$progressColor:`#22d3ee`,$pulse:we,children:[(0,Z.jsx)($g,{children:`⏩ `}),(0,Z.jsxs)(e_,{children:[ge.symbol,` `,B(xe),`/`,B(Se)]}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`Scale Up progress`,"aria-valuenow":Ce,"aria-valuemin":0,"aria-valuemax":100})]})]}),Ae&&(0,Z.jsxs)(Ay,{"aria-label":`overclock panel`,children:[(0,Z.jsxs)(ab,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(Ey,{children:[(0,Z.jsx)(`h2`,{children:`Overclock`}),(0,Z.jsxs)(Ty,{title:`Each completed level multiplies the per-level speed bonus`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🌐 +`,mb(10),`%/lvl`]})]})}),(0,Z.jsx)(nb,{children:Me>0?`The per-level speed bonus is now ${gb(Fe)}% (was ${gb(Ie)}%).`:`Not claimed yet — reach ${B(Pe)} completed ${R.name} levels. Each completed level then multiplies the per-level speed bonus by ×${Le}.`})]}),(0,Z.jsxs)(Q,{"aria-label":`Overclock (requires ${Pe} completed ${R.name} levels) — resets Scale Up's bonus; each completed ${R.name} level (${B(be)} now) multiplies the per-level speed bonus by ×${Le}`,color:ze?`#fb923c`:`darkgrey`,disabled:!ze,onClick:t.overclock,title:`Resets tiers (and Scale Up's bonus); each completed ${R.name} level multiplies the per-level speed bonus by ×${Le} — requires ${Pe} completed levels${se(`overclockDisabled`)?ce:``}`,type:`button`,$progress:Re,$progressColor:`#fb923c`,$pulse:ze,children:[(0,Z.jsx)($g,{children:`⚡ `}),(0,Z.jsxs)(e_,{children:[R.symbol,` `,B(be),`/`,B(Pe)]}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`Overclock progress`,"aria-valuenow":Re,"aria-valuemin":0,"aria-valuemax":100})]})]})]})]})},yb=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,bb=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  margin: 0.1rem 0 0.5rem;
  text-align: center;
`,xb={"10m":`good`,"1h":`info`,"10h":`violet`},Sb=X(Bh)`
  align-items: center;
  border-left: 3px solid ${e=>e.theme.color[xb[e.$formatId]]??e.theme.color.accent};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-areas:
    'label text action'
    'bar bar bar'
    'details details details';
  grid-template-columns: 2.6rem minmax(0, 1fr) 6.5rem;
  padding: 3px 3px 3px ${e=>e.theme.space.sm};
  row-gap: 0;
`,Cb=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,wb=X.span`
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
`,Tb=X.span`
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
`,Eb=X(Q)`
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: action;
  min-height: 2rem;
  padding: 0 0.5em;
  width: 100%;
`,Db=X.div`
  background: ${e=>e.theme.color.border};
  border-radius: 999px;
  grid-area: bar;
  height: 4px;
  margin: 3px 0 2px;
  overflow: hidden;

  > span {
    background: ${e=>e.theme.color[xb[e.$formatId]]??e.theme.color.good};
    display: block;
    height: 100%;
    width: ${e=>e.$percent}%;
  }
`,Ob=X.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,kb=X.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
  margin-top: 0.3rem;
`,Ab=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,jb=X.div`
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
`,Mb=X.div`
  align-items: center;
  display: flex;
  gap: 0.6rem;
  justify-content: space-between;
`,Nb=e=>{let t=Math.max(0,Math.ceil(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},Pb=[{id:`buy`,title:`Auto-buy`,manual:e=>`${e.join(` `)} buying`},{id:`tickspeed`,title:`Auto-tickspeed`,manual:()=>`tickspeed`},{id:`global`,title:`Auto`,manual:e=>e.join(`, `)}],Fb=e=>{if(!e.automations)return``;let t=new Set(e.automations),n=Pb.map(e=>({group:e,missing:g_.filter(n=>n.group===e.id&&!t.has(n.key))})).filter(({missing:e})=>e.length>0).map(({group:e,missing:t})=>e.manual(t.map(e=>e.label)));return n.length>0?`Manual: ${n.join(`, `)}`:``},Ib=X.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.4rem;
`,Lb=X.button`
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
`,Rb=({run:e,onToggle:t})=>{let n=new Set(e.def.automations??[]);return Pb.map(r=>{let i=g_.filter(e=>e.group===r.id&&n.has(e.key));return i.length===0?null:(0,Z.jsxs)(Ib,{"aria-label":`${r.title} switches`,role:`group`,children:[(0,Z.jsx)(Ab,{as:`span`,children:r.title}),i.map(n=>{let i=v_(e.game,n.key),a=`${r.title} ${n.label}`;return(0,Z.jsx)(Lb,{"aria-label":`${a}: ${i?`on`:`paused`}`,"aria-pressed":i,onClick:()=>t(n.key,!i),title:`${a} is ${i?`on — tap to pause`:`paused — tap to resume`}`,type:`button`,$on:i,children:n.label},n.key)})]},r.id)})},zb=e=>[...e.conditions??[],e.startBytes>0&&`starts with ${B(e.startBytes)} B`,e.headStart?.scaleUps>0&&`${e.headStart.scaleUps} Scale Up${e.headStart.scaleUps===1?``:`s`}`,e.headStart?.overclock>0&&`Overclock ${e.headStart.overclock}`,Fb(e)].filter(Boolean).join(` · `),Bb={won:`✓ Won`,completed:`Attempted (no win)`,expired:`Expired`},Vb=({format:e,run:t,actions:n,onBack:r})=>{let i=(t,r)=>n.dailyPlay(e.id,t,r),a=Math.round(ov(t)*100),o=t.def.objective??{label:``,target:0},s=t.metrics?.[o.key]??0,c={state:t.game,goal:{percent:a,label:`${a}% · ${o.label}`,ariaLabel:`progress toward the daily objective: ${o.label}`},offlineProgress:null,buyMaxMode:!1,buyUnitMode:!1,actions:{buyTierQuantity:e=>i(`buyTier`,e),buyTickspeedMultiplier:e=>i(`tierTickspeed`,e),buyGlobalTickspeedMultiplier:()=>i(`clockSpeed`),scaleUp:()=>i(`scaleUp`),overclock:()=>i(`overclock`),consumeXpForLastTierTickspeed:e=>i(`restage`,e),purge:()=>{},exitChallenge:()=>{}}};return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(Bh,{"aria-label":`daily run ${e.id}`,children:[(0,Z.jsxs)(Mb,{children:[(0,Z.jsxs)(yb,{children:[`Daily `,e.label]}),(0,Z.jsx)(Q,{"aria-label":`back to daily challenges`,onClick:r,type:`button`,variant:`prestige`,children:`Back`})]}),(0,Z.jsxs)(Ab,{children:[o.label,` · now `,B(s),` · `,Nb(t.def.limitSeconds-t.simSeconds),` left`]}),o.attemptLabel&&(0,Z.jsxs)(Ab,{"aria-label":`daily run attempt mark`,children:[`Counts as attempted from: `,o.attemptLabel]}),zb(t.def)&&(0,Z.jsx)(Ab,{"aria-label":`daily run conditions`,children:zb(t.def)}),(0,Z.jsx)(jb,{$percent:a,children:(0,Z.jsx)(`span`,{})}),(0,Z.jsx)(Rb,{onToggle:(e,t)=>i(`automation`,{key:e,enabled:t}),run:t})]}),(0,Z.jsx)(vb,{game:c})]})},Hb=({state:e,actions:t})=>{let[n,r]=(0,v.useState)(()=>Date.now()),[i,a]=(0,v.useState)(null),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(()=>new Set),u=e=>l(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});(0,v.useEffect)(()=>{let e=window.setInterval(()=>r(Date.now()),1e3);return()=>window.clearInterval(e)},[]);let d=y_(n),f=hv(e,d),p=i?e.daily.runs[i]:null;return p?(0,Z.jsx)(`div`,{"aria-label":`daily firmware page`,children:(0,Z.jsx)(Vb,{actions:t,format:f_.find(e=>e.id===i),onBack:()=>a(null),run:p})}):(0,Z.jsxs)(`div`,{"aria-label":`daily firmware page`,children:[(0,Z.jsxs)(bb,{children:[d,` · `,(0,Z.jsxs)(`span`,{"aria-label":`daily credits`,children:[`Credits `,f.total,`/`,4,` · new in `,Nb(b_(n)/1e3)]})]}),(0,Z.jsx)(Cb,{children:f_.map(n=>{let r=e.daily.runs[n.id],i=e.daily.results[d]?.[n.id],o=r&&r.def.dateId!==d,l=r?r.def:nv(d,n.id),f=c.has(n.id),p=zb(l),m=r?`${o?`from ${r.def.dateId} · `:``}${Nb(r.def.limitSeconds-r.simSeconds)} left · ${Math.round(ov(r)*100)}%`:[i&&Bb[i.lastOutcome],i?.bestSeconds!=null&&`best ${Nb(i.bestSeconds)}`].filter(Boolean).join(` · `);return(0,Z.jsxs)(Sb,{$formatId:n.id,"aria-label":`daily ${n.id}`,children:[(0,Z.jsx)(wb,{"aria-expanded":f,"aria-label":`${n.id} ${n.label} details`,onClick:()=>u(n.id),onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u(n.id))},role:`button`,tabIndex:0,title:n.label,children:n.id}),(0,Z.jsxs)(Tb,{title:`${l.objective.label} · ${m}`,children:[(0,Z.jsx)(`strong`,{children:l.objective.label}),m&&(0,Z.jsxs)(`span`,{children:[` · `,m]})]}),r?(0,Z.jsx)(Eb,{"aria-label":`open daily ${n.id}`,onClick:()=>a(n.id),type:`button`,variant:`primary`,children:`▶ Resume`}):(0,Z.jsx)(Eb,{"aria-label":`${i?`replay`:`start`} daily ${n.id}`,onClick:()=>{t.dailyStart(n.id),a(n.id)},type:`button`,variant:`prestige`,children:i?`↻ Replay`:`🏁 Start`}),r&&(0,Z.jsx)(Db,{$formatId:n.id,$percent:Math.round(ov(r)*100),"aria-label":`daily ${n.id} progress`,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":Math.round(ov(r)*100),role:`progressbar`,children:(0,Z.jsx)(`span`,{})}),f&&(0,Z.jsxs)(Ob,{children:[p&&(0,Z.jsx)(Ab,{"aria-label":`daily ${n.id} conditions`,children:p}),r&&(0,Z.jsxs)(kb,{children:[!o&&(0,Z.jsx)(Q,{"aria-label":`restart daily ${n.id}`,onClick:()=>s({kind:`restart`,formatId:n.id}),type:`button`,children:`Restart`}),(0,Z.jsx)(Q,{"aria-label":`forfeit daily ${n.id}`,onClick:()=>s({kind:`forfeit`,formatId:n.id}),type:`button`,variant:`danger`,children:`Forfeit`})]})]})]},n.id)})}),(0,Z.jsx)(xv,{confirmLabel:o?.kind===`restart`?`Restart`:`Forfeit`,onCancel:()=>s(null),onConfirm:()=>{o.kind===`restart`?dv(e,o.formatId,Date.now())&&t.dailyRestart(o.formatId):t.dailyForfeit(o.formatId),s(null)},open:!!o,title:o?.kind===`restart`?`Restart this challenge?`:`Forfeit this challenge?`,children:(0,Z.jsxs)(`p`,{children:[`This run's progress is lost`,o?.kind===`restart`?` and a fresh run starts.`:`.`]})})]})},Ub=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Wb=X.p`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: ${e=>e.theme.type.scale.xs.size};
  gap: ${e=>e.theme.space.md};
  justify-content: center;
  margin: ${e=>e.theme.space.xs} 0 ${e=>e.theme.space.sm};
`,Gb=X.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,Kb={completed:gh`
    background: color-mix(in srgb, ${e=>e.theme.color.good} 14%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.good};
  `,available:gh`
    border-color: ${e=>e.theme.color.warn};
  `,active:gh`
    background: color-mix(in srgb, ${e=>e.theme.color.warn} 18%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.warn};
    border-width: 2px;
  `,locked:gh``},qb=(e,t)=>t===`completed`?e.color.good:t===`locked`?e.color.textFaint:e.color.warn,Jb=X.button`
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
  ${e=>Kb[e.$status]}
  ${e=>e.$selected&&gh`
    outline: 2px solid ${e.theme.color.text};
    outline-offset: 1px;
  `}

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,Yb=X.span`
  color: ${e=>e.$status===`locked`?e.theme.color.textFaint:e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.md.size};
  font-weight: 700;
  line-height: 1.1;
`,Xb=X.span`
  color: ${e=>qb(e.theme,e.$status)};
  font-size: 0.68rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Zb=X.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  margin-top: ${e=>e.theme.space.sm};
  padding-top: ${e=>e.theme.space.sm};
  row-gap: 2px;
`,Qb=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,$b=Object.fromEntries(b.map(e=>[e.name,e.symbol])),ex={speedUp:`🌐`,scaleUp:`⏩`,restage:`🧬`,overclock:`🚀`,purge:`✦`},tx=e=>{if(e.automation?.kind===`global`)return ex[e.automation.key]??e.target;let t=e.target.startsWith(`⚙ `),n=t?e.target.slice(2):e.target;return`${t?`⚙`:``}${$b[n]??n}`},nx={active:`active`,completed:`completed`,available:`ready`,locked:`locked`},rx=(e,t)=>Gr(e)?.id===t.id?`active`:Kr(e,t.id)?`completed`:`available`,ix=({def:e,state:t,onCancel:n,onConfirm:r})=>{if(!e)return null;let i=Kr(t,e.id);return(0,Z.jsxs)(xv,{confirmLabel:i?`Start repeat`:`Start challenge`,onCancel:n,onConfirm:r,open:!0,title:`Start ${Xv(e)}?`,children:[(0,Z.jsx)(`p`,{children:e.rule}),(0,Z.jsxs)(`p`,{children:[`Goal: `,Jv(e.goal),`, then Purge.`]}),(0,Z.jsxs)(`p`,{children:[`Your current Factory cycle is lost and awards no PP.`,i?` Repeats award no PP.`:``]})]})},ax=({state:e,onStart:t,onExit:n})=>{let r=Gr(e),i=P.filter(e=>ce.has(e.id)).map(t=>{let n=si(e,t.id);return{def:t,unlocked:n,status:n?rx(e,t):`locked`}}),[a,o]=(0,v.useState)(null),s=i.find(e=>e.status===`active`)??i.find(e=>e.status===`available`),c=i.find(e=>e.def.id===a)??s,l=i.reduce((e,t)=>({...e,[t.status]:(e[t.status]??0)+1}),{}),u=({def:t,unlocked:n,status:r})=>{if(!n)return`🔒 P${oi(t)}`;if(r===`active`)return`active`;let i=e.challenges?.bestSeconds?.[t.id];return r===`completed`?i===void 0?`✓`:`✓${qv(i).replace(` `,``)}`:tx(t)};return(0,Z.jsx)(`div`,{"aria-label":`challenges firmware page`,children:(0,Z.jsxs)(Bh,{children:[(0,Z.jsx)(Ub,{children:`Factory challenges`}),(0,Z.jsxs)(Wb,{"aria-label":`challenge counts`,children:[(0,Z.jsxs)(Xb,{$status:`completed`,children:[`● done `,l.completed??0]}),(0,Z.jsxs)(Xb,{$status:`available`,children:[`● ready `,(l.available??0)+(l.active??0)]}),(0,Z.jsxs)(Xb,{$status:`locked`,children:[`● locked `,l.locked??0]})]}),(0,Z.jsx)(Gb,{role:`group`,"aria-label":`factory challenge tiles`,children:i.map(e=>{let{def:t,unlocked:n,status:r}=e;return(0,Z.jsxs)(Jb,{$selected:c?.def.id===t.id,$status:r,"aria-label":`${t.id}${n?` ${t.codename}`:``}, ${nx[r]}`,"aria-pressed":c?.def.id===t.id,onClick:()=>o(t.id),title:n?Xv(t):`${t.id} · ${t.target} · ${Yv(t)}`,type:`button`,children:[(0,Z.jsx)(Yb,{$status:r,children:t.id}),(0,Z.jsx)(Xb,{$status:r,children:u(e)})]},t.id)})}),c&&(0,Z.jsxs)(Zb,{"aria-label":`challenge ${c.def.id}`,children:[(0,Z.jsxs)(`span`,{children:[c.unlocked?(0,Z.jsx)(`strong`,{children:Xv(c.def)}):(0,Z.jsxs)(`strong`,{children:[c.def.id,` · `,c.def.target]}),c.unlocked?(0,Z.jsx)(Qb,{children:c.def.rule}):(0,Z.jsxs)(Qb,{children:[`🔒 `,Yv(c.def)]})]}),c.unlocked&&c.status===`active`&&n&&(0,Z.jsx)(Kv,{challenge:c.def,onExit:n}),c.unlocked&&c.status!==`active`&&(0,Z.jsx)(Q,{"aria-label":`${c.status===`completed`?`Repeat`:`Start`} challenge ${Xv(c.def)}${r?` (disabled: another challenge is active)`:``}`,disabled:!!r,onClick:()=>t(c.def.id),title:r?`Finish or exit ${r.id} first`:`Start this challenge`,type:`button`,variant:`prestige`,children:c.status===`completed`?`↻ Repeat`:`🏁 Start`})]})]})})},ox=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,sx=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,cx=X.div`
  display: flex;
  gap: 0.5rem;
`,lx=X(Q)`
  flex: 1;
  font-size: 0.95rem;
  gap: 0.4rem;
`,ux=[{id:`factory`,icon:`🏁`,label:`Factory`,ariaLabel:`open factory challenges`,title:`Factory — beat a nerfed run to unlock each automation's speed upgrades`},{id:`daily`,icon:`📅`,label:`Daily`,ariaLabel:`open daily challenges`,title:`Daily — three timed Factory challenges every UTC day`}],dx=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=ch(),[a,o]=(0,v.useState)(`factory`),[s,c]=(0,v.useState)(null);(0,v.useEffect)(()=>{o(`factory`)},[t]);let l=rv(n),u=a===`daily`&&!l?`factory`:a;return(0,Z.jsxs)(ox,{children:[(0,Z.jsx)(sx,{children:(0,Z.jsx)(`h1`,{children:`Challenges`})}),(0,Z.jsx)(cx,{role:`tablist`,"aria-label":`challenge types`,children:ux.filter(e=>e.id!==`daily`||l).map(e=>(0,Z.jsxs)(lx,{"aria-label":e.ariaLabel,"aria-selected":u===e.id,color:u===e.id?i.color.text:i.color.textMuted,onClick:()=>o(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),` `,e.label]},e.id))}),u===`factory`&&(0,Z.jsx)(ax,{onExit:r.exitChallenge,onStart:c,state:n}),u===`daily`&&(0,Z.jsx)(Hb,{actions:r,state:n}),(0,Z.jsx)(ix,{def:s?P.find(e=>e.id===s):null,onCancel:()=>c(null),onConfirm:()=>{r.enterChallenge(s),c(null)},state:n})]})},fx=`🏷️`,px=X.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  width: 100%;
`,mx=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,hx=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,gx=X.p`
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.accent};
`,_x=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,vx=Ch`
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.25); }
`,yx=e=>e.$activeKind===`rebuild`?e.theme.color.warn:e.theme.color.violet,bx=Ch`
  0%, 100% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 6px 1px var(--disk-glow); }
  50% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 14px 4px var(--disk-glow); }
`,xx=X.div.attrs(e=>({style:e.$activeKind?{background:`conic-gradient(from 0deg, color-mix(in srgb, ${yx(e)} 70%, transparent) ${Math.round((e.$progress??0)*360)}deg, ${e.theme.color.surfaceSunken} 0deg)`}:void 0}))`
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
  border: 1.5px solid ${e=>e.$activeKind?yx(e):e.$full?e.theme.color.accent:e.$empty?e.theme.color.textMuted:e.theme.color.surfaceSunken};
  background: ${e=>e.$full?e.$pullEligible?e.theme.color.good:`color-mix(in srgb, ${e.theme.color.accent} 40%, transparent)`:e.$empty?e.theme.color.surfaceSunken:`transparent`};
  ${e=>e.$activeKind?`--disk-glow: ${yx(e)}; box-shadow: 0 0 0 1px var(--disk-glow), 0 0 10px 2px var(--disk-glow);`:``}
  ${e=>e.$queued?`border-style: dashed; border-color: ${e.theme.color.info};`:``}
  animation: ${e=>e.$activeKind&&!e.$paused?bx:e.$pullEligible?vx:`none`} 1.4s ease-in-out infinite;
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
`,Sx=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,Cx=X.div`
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
`,wx=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.$flushing?e.theme.color.info:e.theme.color.accent};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
  opacity: 0.85;
  pointer-events: none;
`,Tx=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,Ex=X.div`
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
`,Dx=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.info};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,Ox=({actions:e,size:t,state:n})=>{let{intro:r}=n,i=r.disks?.[t]??0,a=r.disksBuiltTotal??{},o=Math.max(a[t]??0,i),s=Math.max(0,o-i),c=ic(n,t),l=c!==null,u=io(n,t),d=rc(n,t),f=r.diskBuild?.size===t,p=r.diskCache?.[t]??0,m=t/8,h=U(t),g=hs(m),_=f?(r.disksBuiltTotal?.[t]??0)+1:null,v=f?Math.ceil(r.diskBuild.remainingSeconds):null,y=os(n),b=ns(n),x=t===y?ls(n,t):0,S=t===y&&!b&&o<9&&(!!r.diskBuildQueued||x>0),C=t===y&&b&&i<9&&o<9,w=S?`provision`:C?`rebuild`:null,T=S?o:C?i:-1,E=S?Math.min(1,x/ss(n,t)):C&&r.lowerRebuild?.size===t?Math.min(1,r.lowerRebuild.progress??0):0,D=S&&(!r.diskBuildQueued||!_s(n)||Math.max(0,(qa(n,Oa(t))??0)-oo(n,Oa(t)))<=0),O=Math.round(E*100),k=ks(n,t),A=k?Fs(n,t):!1,j=k?Ns(k):0,M=k?Ps(k):0,ee=k&&k.segmentsCollected<10,N=k&&k.segmentsCollected>=10,P=zs(n,t)&&typeof e?.expediteDiskFill==`function`,te=Bs(n,t),ne=js(k).length>0,re=Js(n,t),F=!!re,ie=F&&Zs(n,t),ae=F?Math.max(0,1-Xs(re)):1,oe=F?t*ae:p,se=Qs(t);return(0,Z.jsxs)(px,{children:[f?(0,Z.jsx)(gx,{children:`Rebuilding ${h} x ${_} array - Ready in ${v}s`}):se?(0,Z.jsxs)(mx,{children:[(0,Z.jsx)(hx,{"aria-hidden":`true`,title:`${g} read-cache blocks`,children:g}),(0,Z.jsx)(Sx,{role:`group`,"aria-label":F?`${h} read cache flushing to disk${ie?` paused for tier match`:``}`:`${h} read cache`,children:Array.from({length:8},(e,r)=>{let i=Math.min(m,Math.max(0,oe-r*m)),a=i>=m,o=!a&&i>0?i/m:0;return(0,Z.jsx)(Cx,{"aria-label":F?`${h} cache block ${r+1} flushing to disk`:`${h} cache block ${r+1}`,title:F?ie?`Flush paused — matching tier claims this size first`:`Flushing read cache to disk (${Math.ceil(re.remainingSeconds/Qa(n,Oa(t)))}s)`:a?`${g} banked toward ${c??`the matching tier`}`:o>0?`Filling from Staging (${Math.round(o*100)}%)`:`Filling from Staging`,$full:a,$flushing:F&&(a||o>0),children:o>0?(0,Z.jsx)(wx,{$fill:o,$flushing:F}):null},r)})})]}):null,k&&!f?(0,Z.jsxs)(mx,{children:[(0,Z.jsxs)(hx,{"aria-hidden":`true`,title:`${h} write cache`,children:[`→ `,h]}),(0,Z.jsx)(Tx,{role:`progressbar`,"aria-label":N?`${h} write cache flushing to disk`:`${h} write cache collecting${A?` paused for tier match`:``}`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round((N?M:j)*100),children:ee?Array.from({length:10},(e,t)=>{let n=k.segmentsCollected,r=Ns(k),i=t<n,a=t===n&&r>0;return(0,Z.jsx)(Ex,{$filled:i||a,$active:a||t===n&&!A,title:A?`Collect paused — matching tier claims those smaller disks first`:i?`Collected`:a?ne?`Collecting from smaller disks and Staging`:`Filling from Staging`:te?`Filling from smaller disks and Staging`:`Waiting for Staging`},t)}):(0,Z.jsx)(Ex,{$filled:!0,$active:!0,$flushBar:!0,style:{flex:`1 1 100%`},children:(0,Z.jsx)(Dx,{$fill:M})})})]}):null,(0,Z.jsxs)(mx,{children:[(0,Z.jsx)(hx,{"aria-hidden":`true`,title:`${h} disks`,children:h}),(0,Z.jsx)(_x,{role:`group`,"aria-label":`${h} disks`,children:Array.from({length:9},(n,r)=>{let a=r<i,o=!a&&r<i+s,p=w!==null&&r===T,m=o&&!p&&P,g=o&&!p&&te&&r===i;return(0,Z.jsx)(xx,{...p?{role:`progressbar`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":O}:null,...m?{as:`button`,type:`button`,onClick:()=>e.expediteDiskFill(t)}:null,"aria-label":p?`${w===`provision`?`provisioning`:`rebuilding`} ${h} disk`:a?u?`${h} disk pulling into ${c}`:`full ${h} disk`:o?g?`empty ${h} disk queued for filling`:m?`empty ${h} disk — fill sooner from smaller disks`:`empty ${h} disk`:`not yet built ${h} disk`,title:p?`${w===`provision`?`Provisioning`:`Rebuilding`} this disk — ${O}%${D?` (paused)`:``}`:f?`This array is offline while it rebuilds`:a?u?`Pulling into 1 free ${c} — empties it, ready to fill again from Staging`:d?`${c??`Its matching tier`} has already moved past this size — can't fund that tier again until the next Purge${Os(t)?`, but can still fill a queued larger disk`:``}`:l?`Waiting its turn — the matching tier already has progress toward this level`:`Pulls automatically once ${h}'s own fixed corresponding tier reaches its matching level`:o?se?`Built, waiting to fill from read cache`:g?`Queued — filling from smaller disks and Staging at once`:m?`Filling from Staging — click to also fill it from smaller disks`:`Built, filling from Staging`:`Not yet built`,$full:a,$empty:o,$pullEligible:a&&u,$activeKind:p?w:null,$progress:p?E:0,$paused:p&&D,$clickable:m,$queued:g},r)})})]})]})},kx=X.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  width: 1rem;
  margin-right: 0.25rem;
  font-size: 0.75rem;
  line-height: 1;
  text-align: center;
  font-weight: 400;
`,Ax=X.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${e=>e.theme.space.md};
  width: 100%;
`,jx=X.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,Mx=X.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e=>e.theme.space.sm};
`,Nx=X.h4`
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
`,Px=X.span`
  flex-shrink: 0;
`,Fx=X.div`
  position: relative;
  width: 100%;
  /* Insets the text to the same left/right edges as the pool tile above; a header-only render's
     container (a collapsed pool card's lake row) supplies its own padding instead. */
  padding: ${e=>e.$flush?`0`:`0 0.25rem`};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`,Ix=X.div`
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
`,Lx=X.span`
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
`,Rx=X.div`
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
`,zx=X.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,Bx=X.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,Vx=e=>{let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:Wi(t)},Hx=X.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
  font-variant-numeric: tabular-nums;
`,Ux=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,Wx=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,Gx=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Kx=X.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  justify-content: space-between;
  margin-top: 0.15rem;
`,qx=X.div`
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
`,Jx=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.accent};
  opacity: 0.8;
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,Yx=X(Q)`
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
`,Xx=X.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${e=>e.theme.color.border};
  margin: 0;
`,Zx=e=>{let t=[];for(let n=1;n<=10;n+=1){let r=getDataLakeDepositedUnits(n)(e),i=W(e,n),a=pc(e,n)>0;(r>0||(i?.purchased??0)>0||(i?.boostersUnlocked??!1)||a)&&t.push(n)}return t},Qx=({actions:e,state:t,bare:n=!1,tierIndex:r,section:i})=>{let a=i!==`body`,o=i!==`header`,s=i===`header`,c=r==null?Zx(t):[r];if(c.length===0)return null;let l=(0,Z.jsx)(Ax,{children:c.map(n=>{let r=fc(n),i=Uc(n)(t),c=Pe[n-1]??`Cell`,l=vl(n),u=hc(t,n),d=!mc(t,n)&&He[pc(t,n)+1],f=ds(u*l,n),p=ds(i*l,n),m=yc(t,n),h=Sc(t,n),g=Cc(t,n),_=Ec(t,n),v=Ac(t,n),y=jc(t,n),b=kl(t,n),x=Dl(t,n),S=Vc(t,n),C=ka(t,n),w=ul(t,n),T=nl(t,n),E=!T&&rl(t,n),D=ll(t,n),O=fl(t,n),k=kc(t,n)*l,A=Mc(t,n),j=A&&Tl(t,n),M=j||A&&C&&qa(t,n)>=Ga(t,n)?Va(t,n)*(j?Qa(t,n):1)*Bc(t,n):0,ee=O||b&&!D&&!E&&!T,N=i*l,P=!ee&&S&&!E&&M>0&&i<=u&&k<N?Vx((N-k)/M):null,te=S?v/100:0,ne=(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(kx,{children:fx}),p]}),re=`${S?v:0}%`;return(0,Z.jsxs)(jx,{"aria-label":a?`${r} lake`:void 0,children:[a&&(0,Z.jsxs)(Fx,{$flush:s,children:[(0,Z.jsxs)(Mx,{children:[(0,Z.jsxs)(Nx,{title:`${r} Data Lake — funds ${c}`,children:[(0,Z.jsxs)(Px,{"aria-hidden":`true`,children:[(0,Z.jsx)(kx,{children:`🏞️`}),r]}),(0,Z.jsx)(`span`,{children:`Lake`})]}),(0,Z.jsxs)(zx,{title:`Current fill speed`,children:[`⚡ `,U(M),`/s`]})]}),(0,Z.jsxs)(Ix,{children:[D?(0,Z.jsx)(Hx,{title:`Auto-converting toward the next ${c} — drawing from this pool's own staging until ${p} is banked, then buys 1 and stops`,children:ne}):E?(0,Z.jsx)(Hx,{title:`${c} is already at the max — spend or charge it up first`,children:ne}):w?(0,Z.jsx)(Hx,{title:`Automatically buys the next ${c} for ${p} whenever this lake has enough stored`,children:ne}):T?(0,Z.jsx)(Yx,{"aria-label":`buy 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Buy 1 ${c} for ${p}`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:ne})}):S?(0,Z.jsx)(Yx,{"aria-label":`start converting toward 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Draws from this pool's own staging automatically until ${p} is banked, then buys 1 ${c} and stops — automatic overflow fill takes over once this entire pool is built`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:ne})}):(0,Z.jsx)(Hx,{title:`Build a ${U(l)} disk in Storage to unlock ${c} here`,children:ne}),O?(0,Z.jsx)(Yx,{"aria-label":`flush the ${r} Storage Pool`,onClick:()=>e.flushStoragePool(n),title:`Empty this pool and lake, add 1000 ${r} of permanent lake capacity, and begin free automatic disk rebuilding`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`🗜 Flush Pool`})}):b&&!D&&!E&&!T?(0,Z.jsx)(Yx,{"aria-label":`increase the ${r} Data Lake's capacity ×10`,onClick:()=>e.doubleDataLakeCapacity(n),title:`Empties the lake (${U(x)} banked) to grow its capacity from ${f} to ${ds(d*l,n)} — unlocked by completing that array in Storage`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`⚡ Scale Out`})}):P?(0,Z.jsxs)(Bx,{title:`Time until the next Cell's cost is banked at the current fill speed`,children:[`⏳ `,P]}):null]}),s?(0,Z.jsx)(Lx,{$withBar:!0,title:y?`Banked toward the next ${c} (${p})`:`The next ${c} costs more than this lake can hold (${p}) — Scale Out or Flush Pool`,children:re}):(0,Z.jsx)(Lx,{$withBar:!0,title:`Currently filled`,children:Wo(ps(k,n))}),(0,Z.jsx)(Rx,{role:`progressbar`,"aria-label":`${r} lake fill progress`,"aria-valuenow":S?v:0,"aria-valuemin":0,"aria-valuemax":100,$fill:te})]}),o&&(()=>{let e=S?Tc(t,n):0,i=U(l);return(0,Z.jsxs)(`div`,{title:S?`${r} Lake buffer — pool input fills this permanent ${i} buffer first; each full buffer is then moved into a ${i} disk (or consolidated with 9 disks of every smaller size into a larger one)`:`${r} Lake pool — waiting on a ${i} disk to be built in Storage before this can start filling`,children:[(0,Z.jsxs)(Kx,{children:[(0,Z.jsx)(`span`,{children:`buffer`}),(0,Z.jsx)(`span`,{children:S?`${U(g)} / ${i}`:`Locked · 0 / ${i}`})]}),(0,Z.jsx)(Rx,{role:`progressbar`,"aria-label":`${r} lake pool — fills its ${i} buffer`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&_&&(()=>{let e=Dc(t,n),i=ds(l*_.target,n);return(0,Z.jsxs)(`div`,{title:`Moving the full buffer${_.target>1?` and every smaller disk`:``} into one ${i} disk`,children:[(0,Z.jsxs)(Kx,{children:[(0,Z.jsxs)(`span`,{children:[`→ `,i,` disk`]}),(0,Z.jsxs)(`span`,{children:[Math.round(e*100),`%`]})]}),(0,Z.jsx)(Rx,{role:`progressbar`,"aria-label":`${r} lake transfer — building a ${i} disk`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&ze.filter(e=>(m[e]??0)>0).map(e=>{let i=h[e]??0,a=m[e],o=S&&_?.target===e,s=l*e,c=o?Dc(t,n):0,u=ds(s,n);return(0,Z.jsxs)(Wx,{children:[(0,Z.jsx)(Gx,{"aria-hidden":`true`,children:u}),(0,Z.jsx)(Ux,{role:`group`,"aria-label":`${r} lake ${u} disks`,children:Array.from({length:a},(e,t)=>{let n=t<i,r=!n&&t===i&&o;return(0,Z.jsx)(qx,{$full:n,"aria-label":n?`full ${u} lake disk`:r?`filling ${u} lake disk, ${Math.round(c*100)}%`:`empty ${u} lake disk`,children:r&&(0,Z.jsx)(Jx,{$fill:c})},t)})})]},e)}),o&&(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`${r} lake deposits`,"aria-valuenow":Math.round((u>0?Math.min(1,kc(t,n)/u):0)*100),"aria-valuemin":0,"aria-valuemax":100})]},n)})});return n?(0,Z.jsxs)(Z.Fragment,{children:[a&&!s&&(0,Z.jsx)(Xx,{}),l]}):(0,Z.jsx)(Bh,{"aria-label":`Data Lakes`,children:l})},$x=h(),eS=X.div`
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
`,tS=X.h4`
  margin: 0 0 ${e=>e.theme.space.xs};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
`,nS=X.dl`
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
`,rS=X.p`
  margin: ${e=>e.theme.space.xs} 0 0;
  color: ${e=>e.theme.color.textMuted};
`,iS=8,aS=6,oS=({anchorRef:e,id:t,onClose:n,title:r,rows:i,note:a})=>{let o=(0,v.useRef)(null),[s,c]=(0,v.useState)(null);return(0,v.useLayoutEffect)(()=>{let t=e.current?.getBoundingClientRect();if(!t)return;let n=o.current?.offsetHeight??0,r=window.innerHeight-iS-n,i=t.bottom+aS,a=t.top-aS-n,s=i<=r||a<iS?Math.max(iS,Math.min(i,r)):a,l=Math.max(iS,window.innerWidth-t.right);c(e=>e?.top===s&&e?.right===l?e:{top:s,right:l})}),(0,v.useLayoutEffect)(()=>{let t=o.current,n=e.current;return t?.focus({preventScroll:!0}),()=>{t?.contains(document.activeElement)&&n?.focus({preventScroll:!0})}},[e]),(0,v.useEffect)(()=>{let t=e=>o.current?.contains(e),r=r=>{!t(r.target)&&!e.current?.contains(r.target)&&n()},i=e=>{t(e.target)||n()},a=e=>{e.key===`Escape`&&n()};return document.addEventListener(`pointerdown`,r,!0),document.addEventListener(`wheel`,i,{capture:!0,passive:!0}),document.addEventListener(`touchmove`,i,{capture:!0,passive:!0}),document.addEventListener(`scroll`,i,!0),document.addEventListener(`keydown`,a),window.addEventListener(`resize`,n),()=>{document.removeEventListener(`pointerdown`,r,!0),document.removeEventListener(`wheel`,i,{capture:!0}),document.removeEventListener(`touchmove`,i,{capture:!0}),document.removeEventListener(`scroll`,i,!0),document.removeEventListener(`keydown`,a),window.removeEventListener(`resize`,n)}},[e,n]),(0,$x.createPortal)((0,Z.jsxs)(eS,{ref:o,id:t,role:`dialog`,"aria-label":r,tabIndex:-1,style:s??{top:0,right:iS,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,Z.jsx)(tS,{children:r}),(0,Z.jsx)(nS,{children:i.map(({label:e,value:t})=>(0,Z.jsxs)(`div`,{style:{display:`contents`},children:[(0,Z.jsx)(`dt`,{children:e}),(0,Z.jsx)(`dd`,{children:t})]},e))}),a&&(0,Z.jsx)(rS,{children:a})]}),document.body)},sS=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.md};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.lg} + env(safe-area-inset-top))
    ${e=>e.theme.space.md} ${e=>e.theme.space.lg};
  color: ${e=>e.theme.color.text};
`,cS=X.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,lS=X.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,uS=X.p`
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
`,dS=X.button`
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
`,fS=({theme:e})=>gh`
  border: 1.5px solid color-mix(in srgb, ${e.color.borderStrong} 65%, ${e.color.text});
  box-shadow: ${e.shadow.md};
`,pS=({theme:e})=>`color-mix(in srgb, ${e.color.surfaceSunken} 45%, ${e.color.surface})`,mS=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;

  ${e=>gh`
  button {
    background-color: ${pS(e)};
    border-width: 1px;
    border-color: color-mix(in srgb, currentColor 45%, transparent);
  }
`}
`,hS=X(Bh)`
  width: 100%;
  padding: 0;
  overflow: hidden;
  ${fS}

  button {
    background-color: ${pS};
    border: 0;
    border-radius: 0;
  }
`,gS=e=>{if(!Number.isFinite(e))return`—`;let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:Wi(t)},_S=(e,t,n)=>ma(e,t,t,n),vS=(e,t,n)=>{let r=_S(e,t,n);return r===null?null:gS(r)},yS=X.div`
  display: flex;
  gap: ${e=>e.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`,bS=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
`,xS=Ch`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`,SS=X.span`
  display: inline-block;
  animation: ${xS} 1.2s steps(4, jump-none) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,CS=X.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: ${e=>e.theme.space.md};
  width: 100%;
  min-width: 0;
  text-align: left;
`,wS=X.span`
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
`,TS=X.span`
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
`,ES=X.span`
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
`,DS=X.span`
  grid-column: 3;
  grid-row: 2;
  align-self: end;
  justify-self: end;
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.85;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,OS=X.span`
  grid-column: 3;
  grid-row: 1;
  justify-self: end;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,kS=X(Rx)`
  margin-top: 0;
`,AS=X.span`
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.85;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,jS=X(Bh)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${fS}
  ${e=>e.$boosted&&Ov}
`,MS=X.div`
  padding: calc(0.6rem - 1px) 0.75rem 0.6rem;
  border-top: 1px solid ${e=>e.theme.color.border};
  &:empty {
    display: none;
  }
`,NS=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;
`,PS=X(Bh)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${fS}
  ${e=>e.$boosted&&Ov}

  > :first-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`,FS=X.button`
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
`,IS=X.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  pointer-events: none;
`,LS=X.button`
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
`,RS=X.div`
  position: relative;
  width: 100%;
`,zS=X.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0 ${e=>e.theme.space.sm};
  width: 100%;
`,BS=X.h3`
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
`,VS=X.span`
  flex-shrink: 0;
`,HS=X(X.span`
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
`,US=X.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem 0.75rem;
  border: 0;
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.text};
  ${Qg}
  background-color: ${pS};
`,WS=X(US)`
  position: relative;
`,GS=X(US)`
  align-items: stretch;
  padding-top: calc(0.6rem - 1px);
  border-top: 1px solid ${e=>e.theme.color.border};
  border-radius: 0;
`,KS=X(US)`
  position: relative;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`,qS=(e,t,n,r=!0)=>{let i=Po(t,n),a=i&&e>0&&e<i.divisor?Po(e,n):i;return r?Ho(e,a):Vo(e,a)},JS=(e,t,n=``)=>{let r=Po(e,!0);return`${Uo(e/r.divisor)} → ${Uo(t/r.divisor)} ${r.symbol}${n}`},YS=(e,t)=>Vo(e,Po(e,t)),XS=5e3,ZS=e=>/^[\d,]+(\.0+)?(\s|$)/.test(e),QS=e=>{let[t,n]=(0,v.useState)(null),[r,i]=(0,v.useState)(0);return(0,v.useEffect)(()=>{let e=()=>i(e=>e+1);return window.addEventListener(`pointerdown`,e),window.addEventListener(`keydown`,e),()=>{window.removeEventListener(`pointerdown`,e),window.removeEventListener(`keydown`,e)}},[]),(0,v.useEffect)(()=>{if(n(null),!ZS(e))return;let t=setTimeout(()=>n(e),XS);return()=>clearTimeout(t)},[e,r]),t===e},$S=({bits:e,poolIndex:t,large:n})=>{let r=QS(ms(e,t))?ps(e,t):ms(e,t);return(0,Z.jsx)(uS,{$large:n,children:r})},eC=e=>Math.min(100,Math.max(0,e)),tC=8,nC=X.div`
  display: grid;
  grid-template-columns: 1fr 40% 1fr;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
`,rC=X.span`
  justify-self: start;
  text-align: left;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,iC=X.span`
  justify-self: end;
  font-weight: 600;
  color: ${e=>e.theme.color.warn};
  white-space: nowrap;
`,aC=X.span`
  grid-column: 3;
  justify-self: end;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,oC=X.div`
  position: relative;
  min-width: 0;
  height: ${tC}px;
  border-radius: ${e=>e.theme.radius.pill};
  background: transparent;
  overflow: hidden;
`,sC=X(X.div`
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
`,cC=X.span`
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.85));
`,lC=({capacityText:e,bonusPercent:t=0,ariaLabel:n,timeLeftText:r=null,bufferNoun:i=`buffer`})=>{let a=Math.min(100,Math.max(0,t)),o=a>0;return(0,Z.jsxs)(nC,{children:[(0,Z.jsxs)(rC,{children:[(0,Z.jsx)(kx,{children:`📦`}),e]}),o&&(0,Z.jsx)(oC,{role:`progressbar`,"aria-label":`${n} ping bonus`,"aria-valuenow":Math.round(a),"aria-valuetext":`+${Math.round(a)}%`,"aria-valuemin":0,"aria-valuemax":100,children:(0,Z.jsx)(sC,{$widthPercent:a/100*100})}),o&&(0,Z.jsxs)(iC,{children:[`+`,Math.round(a),`% `,(0,Z.jsx)(cC,{children:`👆`})]}),!o&&r&&(0,Z.jsxs)(aC,{title:`Estimated time until this ${i} is full, following the fill multiplier and assuming nothing else draws from it`,children:[`⏳ `,r]})]})},uC=[[10,[229,72,77]],[100,[59,130,246]],[Oe,[48,164,108]]],dC=e=>{let t=uC.length-1;if(e<=uC[0][0])return`rgb(${uC[0][1].join(`,`)})`;if(e>=uC[t][0])return`rgb(${uC[t][1].join(`,`)})`;let n=uC.findIndex(([t])=>e<=t),[r,i]=uC[n-1],[a,o]=uC[n],s=Math.log(e/r)/Math.log(a/r);return`rgb(${i.map((e,t)=>Math.round(e+(o[t]-e)*s)).join(`,`)})`},fC=({game:e,focusNonce:t=0})=>{let{actions:n,claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a,state:o}=e,{intro:s}=o,c=s.bits>=s.capacity,l=QS(qS(s.bits,s.capacity,s.byteCreated,!0)),u=!s.byteCreated&&s.bits>=8,d=Do(o),f=Ia(o),[p,m]=(0,v.useState)(null);(0,v.useEffect)(()=>{m(null)},[f]);let h=p===0?null:p??f,[g,_]=(0,v.useState)(null),y=(0,v.useRef)(null),x=(0,v.useCallback)(()=>_(null),[]),S=e=>_(t=>t===e?null:e),C=e=>`${Wo(Go(e))}/s`,w=ua(s),T=Wu(s),E=s.byteCreated?C(xa(s)):null,D=va(s),O=vS(s.bits,s.capacity,w*T),k=f>=1&&(s.dataStreamTapBonusPercent??0)>=100,A=ns(o),j=os(o),M=ts(o),ee=cs(o,M),N=ss(o,M),P=Oa(M),te=Math.max(0,qa(o,P)-oo(o,P)),ne=as(o),re=rs(o),F=oa(s).toFixed(3),ie=oa({...s,unlockedDiskSteps:aa(s)+1}).toFixed(3),ae=U(Qo(aa(s)+1)),oe=()=>{(typeof window>`u`||typeof window.confirm!=`function`||window.confirm(`Reformat to unlock ${ae} disks? The Foundry restarts from scratch (Capacity, Disks, Data Lakes, pool compactions and Compute entities); Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are then auto-rebuilt up to your prior highs. Bitrate exponent ${F} → ${ie}.`))&&n.unlockNextDiskSize()},se=d?gs(o):[],ce=!A&&_s(o),I=s.diskBuild,le=!A&&!ne&&so(o)&&!ce&&!I,ue=Math.min(N,ls(o,M)),de=Math.floor(ue+1e-9),fe=ue>0||s.diskBuildQueued,pe=I?eC(100-I.remainingSeconds/I.totalSeconds*100):ne?100:fe?eC(ue/N*100):0,L=ic(o,M),R=mo(o),me=go(o),he=!!s.capacityUpgradeQueued,ge=!!s.speedUpgradeQueued,_e=he||ge,ve=s.capacity,ye=ho(s),be=s.capacity*2,xe=YS(be,!0),Se=ca(s),Ce=ua(Se?{...s,capacity:be}:{...s,speedCapacity:ye*2}),we=`${Go(Ce)}/s`,Te=w>0?`×${Number((Ce/w).toFixed(2))}`:``,Ee=eC(s.bits/8*100),De=eC((s.capacityUpgradeProgress??0)/ve*100),Oe=eC((s.speedUpgradeProgress??0)/ye*100),ke=ge?Oe:De,Ae=Ca(s),je=Ae?.cost??0,Me=Ae?.progress??0,Ne=Ae?.multiplierPercent??100,Pe=C(Ae?.rate??0),Fe=Ae?.rate??0,Ie=gS(Fe>0&&je>0?Math.max(0,je-Me)/Fe:1/0),Le=eC(s.bits/s.capacity*100),Re=()=>{ce?n.provisionDisk():n.queueDiskBuild()},ze=s.diskBuildQueued,Be=`${de}/${N}`,Ve=N>1||de>0?` · ${Be}`:``,He=`Provision ${U(M)} Disk`,Ue=!!ze&&!I&&!ne&&!A,We=Oa(j),Ge=A?s.diskBuild?`waiting for build`:ja(o,We)?`waiting for earlier pool`:Va(o,We)<=0?`waiting for pool`:qa(o,We)<=oo(o,We)?`waiting for staging`:null:null,Ke=I?{icon:`🏗`,label:`Provisioning ${U(I.size)} Disk`,status:`${Math.ceil(I.remainingSeconds)}s left`}:ne?{icon:`✅`,label:`All Pools Complete (${U(M)})`,status:null}:A?{icon:`🔁`,label:He,status:`Rebuilding ${U(j)} first · ${Ge??`automatic`}`}:ze?{icon:`⏳`,label:`Provisioning ${U(M)} Disk`,status:`${de>0?Be:`Queued`} · ${ce?te>0?`building`:`waiting for staging`:le?`after disk fill`:`waiting for pool`}`}:ce?{icon:`🏦`,label:He,status:`Ready · ${fx} ${U(ee)}${Ve}`}:{icon:`🏦`,label:He,status:`${fx} ${U(ee)}${Ve} · tap to queue`,reason:le?`disk fill comes first`:`pool not ready (offline, rebuilding or too small)`},qe=Qa(o,A?We:P),Je=100*qe,Ye=(A?Ha(o,We):Va(o,P))*qe,Xe=`${Wo(U(Ye))}/s`,Ze=A&&Va(o,We)<=0,Qe=Ts(o),$e=Qe.disksTotal>0?eC(Qe.disksDone/Qe.disksTotal*100):0,et=Qe.seconds,tt=A?$e:pe,nt=Math.max(0,(N-ue)*M),rt=$a(o,P)*Za(o,P)/100*qu(s,P),it=Math.min(nt,te),at=Ye>0?it/Ye+(nt-it)/Math.max(Math.min(Ye,rt),Number.MIN_VALUE):1/0,ot=A?gS(et):le?`—`:gS(at),st=d&&!ne&&!I&&Ye>0&&(A||ze),ct=(0,Z.jsx)(Q,{"aria-label":`reformat to unlock disk size`,onClick:oe,title:`Reformat the Byte Foundry to unlock ${ae} disks. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are auto-rebuilt up to your prior highs; Compute entities and pool compactions are not. The bitrate exponent rises ${F} → ${ie}.`,type:`button`,variant:`prestige`,children:(0,Z.jsxs)(bS,{children:[(0,Z.jsxs)(`span`,{children:[`🔁 Reformat: unlock `,ae,` Disks`]}),(0,Z.jsx)(AS,{children:`Bitrate exponent ${F} → ${ie} · auto-rebuilds to your highs`})]})}),lt=re?ct:(0,Z.jsxs)(Q,{"aria-label":I?`disk array rebuilding`:ne?`disk ladder complete`:`provision disk`,"aria-description":Ke.reason?`${Ke.status} (${Ke.reason})`:Ke.status??void 0,disabled:!!I||ne||A,onClick:Re,title:I?`Provisioning ${U(I.size)} — ${Math.ceil(I.remainingSeconds)}s (array offline)`:ne?`All ${Da()} storage pools are complete through ${U(M)}`:A?`Smaller sizes are rebuilt first (one staging fill per disk, no provisioning cost) (${U(j)} now); ${U(M)} unlocks for provisioning once they are done`:ze?`Armed — draws from the pool staging at the pool's fixed bandwidth${le?` once Disk Fill is done`:``} (${de}/${N} passes so far)`:ce?L?`Costs ${U(ee)}, paid in ${N} pass${N===1?``:`es`} of ${U(M)} each (${de}/${N} collected) — creates an empty ${U(M)} container; its cache fills it automatically, and once full it is pulled right away to complete a ${L} level`:`Costs ${U(ee)}, paid in ${N} pass${N===1?``:`es`} of ${U(M)} each (${de}/${N} collected) — creates an empty ${U(M)} container; its cache fills it automatically; it is pulled once its matching tier reaches the matching level`:le?`Disk Fill comes first — click to arm this build so it starts the instant it is your turn`:`The pool isn't ready yet (offline, rebuilding or too small) — click to arm this build so it starts as soon as it is (${de}/${N} passes so far)`,type:`button`,variant:ne||A?`neutral`:ze?`smart`:ce?`info`:`neutral`,$progress:tt,$pulse:Ue,children:[st?(0,Z.jsxs)(CS,{children:[(0,Z.jsxs)(wS,{children:[Ke.icon,` `,A?`Rebuilding`:`${U(M)} Disk…`]}),(0,Z.jsx)(TS,{children:A?(()=>{let e=Qo(aa(s)-1);return e>j?`${U(j)} → ${U(e)}`:`${U(j)} disks`})():de>0?Be:`Queued`}),(0,Z.jsxs)(ES,{children:[Math.floor(tt),`%`]}),(0,Z.jsxs)(OS,{style:{color:dC(Je),...A&&Qe.projected?{opacity:.55}:null},title:Ze?`Projected bandwidth — this rebuild waits for the pool's Capacity`:A&&Qe.projected?`Pool bandwidth — a later pool is not live yet, so the total time is an estimate`:`Pool fill bandwidth funding this disk`,children:[`⚡ `,A&&Qe.projected?`~`:``,Xe]}),ot!==`—`&&(0,Z.jsxs)(DS,{style:Qe.projected?{opacity:.5,fontStyle:`italic`}:void 0,title:Qe.projected?`Estimate — part of this rebuild waits for a pool's Capacity`:void 0,children:[`⏳ `,Qe.projected?`~`:``,ot]})]}):(0,Z.jsxs)(bS,{children:[(0,Z.jsxs)(`span`,{children:[Ke.icon,` `,Ke.label,Ue?`…`:``]}),Ke.status&&(0,Z.jsx)(AS,{children:Ke.status})]}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`byte foundry disk build progress`,"aria-valuenow":Math.round(tt),"aria-valuemin":0,"aria-valuemax":100})]}),ut=g===null||g===`stream`&&!!E||g===`upgrade`&&s.byteCreated&&_e&&!!Ae||d&&Array.from({length:f},(e,t)=>`pool-${t+1}`).includes(g);(0,v.useEffect)(()=>{ut||_(null)},[ut]);let dt=g===`stream`,ft=null;if(dt){let e=_a(s),t=s.dataStreamTapBonusPercent??0,n=0;for(let e=1;e<=f;e+=1)n+=Va(o,e);ft=[{label:`Bitrate now`,value:E},{label:`Base Bitrate`,value:C(w)},...T===1?[]:[{label:`Compute Boost`,value:`×${T}`}],{label:`Fill multiplier`,value:`${Math.round(e)}%`},{label:`Ping bonus (upgrades)`,value:`+${Math.round(t)}%`},{label:`Bitrate exponent`,value:F},...d&&f>0?[{label:`Reserved by pools`,value:C(Math.min(w,n))}]:[],...Ae?[{label:`Upgrade bar drawing`,value:Pe}]:[],{label:`Buffer`,value:`${Math.floor(Le*10)/10}% full`},{label:`Time to full`,value:O??(c?`Full`:`—`)},...me&&!_e?[{label:`After Upgrade Bitrate`,value:`${we} (${Te})`}]:[]]}let pt=g===`upgrade`&&!!Ae,mt=pt?[{label:`Draw now`,value:Pe},{label:`Base Bitrate`,value:C(w)},{label:`Data Stream delivers`,value:E},{label:`Progress`,value:`${Go(Me)} / ${Go(je)}`},{label:`Time left`,value:Ie},...Ae.kind===`speed`?[{label:`Bitrate after`,value:JS(w,Ce,`/s`)}]:[{label:`Capacity after`,value:JS(s.capacity,be)},...Se?[{label:`Bitrate after`,value:JS(w,Ce,`/s`)}]:[]]]:null;return(0,Z.jsxs)(sS,{children:[(0,Z.jsx)(_y,{claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a}),(0,Z.jsx)(lS,{children:(0,Z.jsx)(cS,{children:`🔥 Byte Foundry`})}),(0,Z.jsxs)(PS,{"aria-label":`Data Stream`,$boosted:wv(s),children:[(0,Z.jsxs)(WS,{as:s.mainGameUnlocked?`div`:`section`,"aria-label":s.mainGameUnlocked?void 0:`data stream balance`,$progress:Le,children:[s.mainGameUnlocked&&(0,Z.jsx)(FS,{type:`button`,onClick:n.tapIntroBit,disabled:k,"aria-label":`ping to generate a bit`,title:k?`Ping bonus already at the 100% cap`:void 0}),(0,Z.jsxs)(IS,{children:[(0,Z.jsxs)(RS,{children:[(0,Z.jsxs)(zS,{children:[(0,Z.jsx)(BS,{children:(0,Z.jsxs)(`span`,{children:[(0,Z.jsx)(kx,{children:`🌊`}),`Data Stream`]})}),(0,Z.jsx)(uS,{$large:!(s.byteCreated&&(s.dataStreamTapBonusPercent??0)>0),children:qS(s.bits,s.capacity,s.byteCreated,!l)}),E&&(0,Z.jsxs)(HS,{ref:dt?y:void 0,$centered:!(s.dataStreamTapBonusPercent>0)&&!O,$color:dC(D),title:`Delivered bitrate at ${Math.round(D)}% fill multiplier`,"aria-label":`data stream bitrate ${E}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":dt,"aria-controls":dt?`data-stream-speed-details`:void 0,onClick:()=>S(`stream`),children:[`⚡ `,E]}),dt&&(0,Z.jsx)(oS,{anchorRef:y,id:`data-stream-speed-details`,onClose:x,title:`Data Stream bitrate`,rows:ft})]}),(0,Z.jsx)(lC,{capacityText:YS(s.capacity,s.byteCreated),bonusPercent:s.dataStreamTapBonusPercent??0,timeLeftText:O,ariaLabel:`data stream fill-based bitrate multiplier`})]}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`data stream bit balance`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":s.capacity})]})]}),s.byteCreated&&_e&&(0,Z.jsxs)(GS,{"aria-label":ge?`upgrade bitrate`:`upgrade capacity`,as:`section`,title:ge?`Upgrading Bitrate — pulling the Data Stream's Bitrate into the bar`:`Upgrading to ${xe} — pulling the Data Stream's base Bitrate into the bar`,children:[(0,Z.jsxs)(CS,{children:[(0,Z.jsxs)(wS,{children:[(0,Z.jsx)(kx,{children:`⏫`}),`Upgrading`,(0,Z.jsx)(SS,{children:`…`})]}),(0,Z.jsxs)(TS,{children:[(0,Z.jsx)(kx,{children:ge?`⚡`:`📦`}),ge?JS(w,Ce,`/s`):JS(s.capacity,be)]}),(0,Z.jsxs)(ES,{children:[Math.floor(ke),`%`]}),(0,Z.jsxs)(HS,{ref:pt?y:void 0,$color:dC(Ne),style:{gridColumn:3,gridRow:1,alignSelf:`start`,justifySelf:`end`},title:`Upgrade draw at a constant 1x Bitrate`,"aria-label":`upgrade draw bitrate ${Pe}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":pt,"aria-controls":pt?`upgrade-speed-details`:void 0,onClick:()=>S(`upgrade`),children:[`⚡ `,Pe]}),pt&&(0,Z.jsx)(oS,{anchorRef:y,id:`upgrade-speed-details`,onClose:x,title:Ae.kind===`speed`?`Upgrade Bitrate draw`:`Upgrade Capacity draw`,rows:mt}),(0,Z.jsxs)(DS,{children:[`⏳ `,Ie]})]}),(0,Z.jsx)(kS,{$fill:Math.min(1,Math.max(0,ke/100)),"aria-hidden":`true`}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`data stream upgrade progress`,"aria-valuenow":Math.round(ke),"aria-valuemin":0,"aria-valuemax":100})]}),(u||s.byteCreated&&!_e)&&(0,Z.jsxs)(mS,{children:[u&&(0,Z.jsxs)(Q,{"aria-label":`compile 8 bits into a Byte`,onClick:n.combineIntroByte,type:`button`,variant:`primary`,$progress:Ee,children:[(0,Z.jsx)($,{children:`🔗 Compile into a Byte`}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`byte foundry compile progress`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":8})]}),s.byteCreated&&!_e&&(0,Z.jsx)(yS,{children:!_e&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Q,{"aria-label":`upgrade data stream capacity`,disabled:!R,onClick:n.pickIntroCapacityMilestone,title:R?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling doubles Capacity${Se?` and raises Bitrate with it`:``}`:`Capacity is already at its maximum`,"aria-description":R?`Costs ${Go(ve)}; capacity ${xe}${Se?` and bitrate ${we}`:``} after upgrading`:void 0,type:`button`,variant:R?`prestige`:`neutral`,children:(0,Z.jsxs)(bS,{children:[(0,Z.jsx)(`span`,{children:Se?`Upgrade`:`Upgrade Capacity`}),(0,Z.jsx)(AS,{children:R?`🏷️ ${Go(ve)} · 📦 ×2${Se?` · ⚡ ${Te}`:``}`:`📦 Max capacity`})]})}),!Se&&(0,Z.jsx)(Q,{"aria-label":`upgrade data stream bitrate`,disabled:!me,onClick:n.queueIntroSpeedUpgrade,title:me?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling raises Bitrate`:`Base Bitrate cannot exceed Capacity^${F} — upgrade Capacity first`,"aria-description":me?`Costs ${Go(ye)}; bitrate ${we} after upgrading`:void 0,type:`button`,variant:me?`prestige`:`neutral`,children:(0,Z.jsxs)(bS,{children:[(0,Z.jsx)(`span`,{children:`Upgrade Bitrate`}),(0,Z.jsx)(AS,{children:me?`🏷️ ${Go(ye)} · ⚡ ${Te}`:`⚡ Needs Capacity`})]})})]})})]})]}),s.byteCreated&&(0,Z.jsx)(hS,{"aria-label":`Provision Disk`,children:lt}),d&&Array.from({length:f},(e,t)=>{let r=t+1,i=$a(o,r),a=qa(o,r),c=Ga(o,r),l=c>0?eC(a/c*100):0,u=a>=c,d=Za(o,r),f=Xa(o,r),p=vS(a,c,i),_=Tl(o,r),v=se.filter(e=>Oa(e)===r),C=h===r,T=b[r-1]?.symbol??`#${r}`,E=e=>`${Wo(U(e))}/s`,D=E(i*d/100*qu(s,r)),O=g===`pool-${r}`,k=null,A=Va(o,r);if(O){let e=0;for(let t=1;t<r;t+=1)e+=Va(o,t);let t=Ya(o,r);k=[{label:`Fill bandwidth now`,value:D},{label:`Available (before multiplier)`,value:E(i)},{label:`Bandwidth (theoretical)`,value:E(A)},{label:`Data Stream bitrate`,value:E(w)},...r>1?[{label:`Taken by earlier pools`,value:E(Math.min(w,e))}]:[],{label:`Fill multiplier`,value:`${Math.round(t)}%`},{label:`Ping bonus (disks, merges, provisioning, lake)`,value:`+${Math.round(f)}%`},{label:`Staging`,value:`${Math.floor(l*10)/10}% full`},{label:`Time to full`,value:p??(u?`Full`:`—`)},..._?[{label:`Draining to Data Lake`,value:E(A*Qa(o,r))}]:[]]}return(0,Z.jsxs)(jS,{"aria-label":`pool ${r}`,$boosted:Ev(s,r),children:[(0,Z.jsxs)(KS,{$progress:l,children:[(0,Z.jsx)(FS,{type:`button`,onClick:()=>n.tapPoolBuffer(r),"aria-label":`ping pool ${r} staging`}),(0,Z.jsxs)(IS,{children:[(0,Z.jsxs)(RS,{children:[(0,Z.jsxs)(zS,{children:[(0,Z.jsx)(BS,{children:(0,Z.jsxs)(LS,{type:`button`,"aria-expanded":C,"aria-label":`${C?`collapse`:`expand`} pool ${r}`,onClick:()=>m(C?0:r),children:[(0,Z.jsxs)(VS,{"aria-hidden":`true`,children:[(0,Z.jsx)(kx,{children:`💧`}),T]}),(0,Z.jsx)(`span`,{children:`Pool`})]})}),(0,Z.jsx)($S,{bits:a,poolIndex:r,large:f<=0}),(0,Z.jsxs)(HS,{ref:O?y:void 0,$centered:f<=0&&!p,$color:dC(d),title:`Available fill bandwidth at ${Math.round(d)}% fill multiplier`,"aria-label":`pool ${r} bandwidth ${D}, show bandwidth details`,"aria-haspopup":`dialog`,"aria-expanded":O,"aria-controls":O?`pool-${r}-speed-details`:void 0,onClick:()=>S(`pool-${r}`),children:[`⚡ `,D]}),O&&(0,Z.jsx)(oS,{anchorRef:y,id:`pool-${r}-speed-details`,onClose:x,title:`${T} Pool bandwidth`,rows:k,note:i>=A?void 0:r>1?`Limited by the Data Stream: earlier pools take their Bandwidth first.`:`Limited by the Data Stream's own bitrate.`})]}),(0,Z.jsx)(lC,{capacityText:ds(c,r),bonusPercent:f,timeLeftText:p,bufferNoun:`staging`,ariaLabel:`pool ${r} fill-based bandwidth multiplier`})]}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":`pool ${r} staging`,"aria-valuenow":Math.round(l),"aria-valuemin":0,"aria-valuemax":100})]})]}),!C&&(0,Z.jsx)(MS,{children:(0,Z.jsx)(Qx,{actions:n,state:o,bare:!0,section:`header`,tierIndex:r})}),C&&(0,Z.jsxs)(NS,{children:[v.map(e=>(0,Z.jsx)(Ox,{actions:n,size:e,state:o},e)),(0,Z.jsx)(Qx,{actions:n,state:o,bare:!0,tierIndex:r})]})]},r)}),!s.mainGameUnlocked&&(0,Z.jsx)(dS,{"aria-label":`ping to generate a bit`,disabled:c||k,title:!c&&k?`Ping bonus already at the 100% cap`:void 0,onClick:n.tapIntroBit,type:`button`,children:`👆 Ping`})]})},pC=X.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  max-width: 520px;
  margin: 0 auto;
  padding: calc(1.25rem + env(safe-area-inset-top)) 1rem calc(1.25rem + env(safe-area-inset-bottom));
  color: ${e=>e.theme.color.text};
  font-variant-numeric: tabular-nums;
`,mC=X.header`
  text-align: center;
  width: 100%;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    margin: 0 0 0.35rem;
  }
`,hC=X.p`
  color: ${e=>e.theme.color.accent};
  font-family: ${e=>e.theme.font.display};
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
`,gC=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  text-align: center;
`,_C=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,vC=X(Bh)`
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
`,yC=gh`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,bC=X.div`
  align-items: baseline;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
`,xC=X.span`
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
`,SC=X.span`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 500;
  ${yC}
`,CC=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: boost;
  text-align: right;
  ${yC}
`,wC=X(Q)`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  grid-area: buy;
  min-height: 2rem;
  padding: 0 0.6em;
  width: 100%;
  ${yC}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,TC=X.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,EC=Object.fromEntries(b.map(e=>[e.id,e])),DC=({game:e})=>{let{actions:t,state:n}=e,r=n.purge?.points??0,i=Fn(n),a=En(n),o=ch(),[s,c]=(0,v.useState)(()=>new Set),l=e=>c(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});return(0,Z.jsxs)(pC,{"aria-label":`compute flops screen`,children:[(0,Z.jsxs)(mC,{children:[(0,Z.jsx)(`h1`,{children:`🖥 Compute`}),(0,Z.jsx)(hC,{"aria-label":`cumulative flops boost`,children:Rn(i)})]}),!a&&(0,Z.jsxs)(gC,{children:[`Unlocks at `,100,` PP — you have `,B(r),` PP.`]}),(0,Z.jsx)(_C,{"aria-label":`compute flops tiers`,children:pt.map((e,i)=>{let c=n.computeFlops?.owned?.[e.id]??0,u=Ln(n,e.boostsTierId),d=An(e,c),f=jn(n,e.id),p=EC[e.boostsTierId],m=p?.name??e.boostsTierId,h=s.has(e.id),g=(ft*100).toFixed(2);return(0,Z.jsxs)(vC,{$accent:o.tierAccents[i%o.tierAccents.length],"aria-label":`${e.name} · ${e.outputLabel} compute tier`,children:[(0,Z.jsxs)(bC,{children:[(0,Z.jsx)(xC,{"aria-expanded":h,"aria-label":`${e.name} (${e.outputLabel}) details`,onClick:()=>l(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),l(e.id))},role:`button`,tabIndex:0,title:`${e.name} · ${e.outputLabel}`,children:e.symbol}),(0,Z.jsxs)(SC,{title:`Owned`,children:[(0,Z.jsx)(n_,{children:`Owned: `}),B(c)]})]}),(0,Z.jsxs)(CC,{title:`${m} production multiplier`,children:[p?.symbol??m,` ×`,u.toFixed(2)]}),(0,Z.jsx)(wC,{"aria-label":`buy ${e.name} (${e.outputLabel}) for ${B(d)} Purge Points`,disabled:!a||!f,onClick:()=>t.buyComputeFlopsTier(e.id),title:a?f?`Spend ${B(d)} PP for +${g}%/s on ${m}`:`Costs ${B(d)} PP — you have ${B(r)} PP`:`Reach 100 PP to reveal Compute`,type:`button`,variant:`success`,children:(0,Z.jsxs)($,{children:[B(d),` PP`]})}),h&&(0,Z.jsxs)(TC,{children:[e.name,` · `,e.outputLabel,` · +`,g,`%/s `,m,` production each ·`,` `,m,` ×`,u.toFixed(4)]})]},e.id)})})]})},OC=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.lg};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.xl} + env(safe-area-inset-top))
    ${e=>e.theme.space.lg} ${e=>e.theme.space.xl};
  color: ${e=>e.theme.color.text};
`,kC=X.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,AC=X.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,jC=X.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,MC=X.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`,NC=X.div`
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
`,PC=X.div`
  height: 0.6rem;
`,FC=X.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  margin-left: auto;
  gap: 4px;
`,IC=X.span`
  color: ${e=>e.theme.color.textMuted};
  flex: 0 0 auto;
  font-size: 0.78em;
  font-weight: 400;
  white-space: nowrap;
`,LC=X.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 0.45rem 0.6rem;
  border-radius: ${e=>e.theme.radius.lg};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.$selected?e.theme.color.warn:e.theme.color.border};
`,RC=X.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.md};
  border-radius: ${e=>e.theme.radius.md};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
`,zC=X.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px ${e=>e.theme.space.xs};
  width: 100%;
`,BC=X.button`
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
`,VC=X.span`
  flex: 0 0 auto;
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
`,HC=X.span`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 5px;
`,UC=X.span`
  align-items: baseline;
  display: flex;
  gap: 0.35rem;
  min-width: 0;
`,WC=X.span`
  flex: 0 0 auto;
  width: 1.6rem;
  font-size: 1.15rem;
  text-align: center;
`,GC=X.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 3px;
`,KC=X.span`
  flex: 0 0 auto;
  width: 0.62rem;
  height: 0.62rem;
  border-radius: 50%;
  border: 1.2px solid ${e=>e.$filled?e.theme.color.good:e.theme.color.borderStrong};
  background: ${e=>e.$filled?e.theme.color.good:`transparent`};
`,qC=X(Q)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,JC=X(qC)`
  border-radius: 999px;
  font-size: 0.72rem;
  min-height: 1.45rem;
  min-width: 4.5rem;
  padding: 0.1em 0.75em;
`,YC=X(qC)`
  min-height: 1.9rem;
  min-width: 3.9rem;
`,XC=X.span`
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
`,ZC=X.p`
  margin: 0;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,QC=X.div`
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
`,$C=[{key:`core`,label:`Cells`,symbol:`⬡`,countField:`computeCores`,mergeOutputLabel:`Battery`,mergeOutputField:`computeNodes`,mergeAction:`mergeComputeCoresIntoNode`,autoFlagField:`autoMergeCoresIntoNode`,autoCostLabel:`Batteries`,autoCostField:`computeNodes`,enableAutoAction:`enableAutoMergeCoresIntoNode`,autoAriaLabel:`unlock the Charger for Cells into Batteries`,startAction:`startComputeCoresMerge`,timerField:`computeCoresMergeRemainingSeconds`},{key:`nodesIntoCluster`,label:`Batteries`,symbol:`🔗`,countField:`computeNodes`,mergeOutputLabel:`Pack`,mergeOutputField:`computeClusters`,mergeAction:`mergeComputeNodesIntoCluster`,autoFlagField:`autoMergeNodesIntoCluster`,autoCostLabel:`Packs`,autoCostField:`computeClusters`,enableAutoAction:`enableAutoMergeNodesIntoCluster`,autoAriaLabel:`unlock the Charger for Batteries into Packs`,startAction:`startComputeNodesMerge`,timerField:`computeNodesMergeRemainingSeconds`},{key:`clustersIntoNetwork`,label:`Packs`,symbol:`🧩`,countField:`computeClusters`,mergeOutputLabel:`Bank`,mergeOutputField:`computeNetworks`,mergeAction:`mergeComputeClustersIntoNetwork`,autoFlagField:`autoMergeClustersIntoNetwork`,autoCostLabel:`Banks`,autoCostField:`computeNetworks`,enableAutoAction:`enableAutoMergeClustersIntoNetwork`,autoAriaLabel:`unlock the Charger for Packs into Banks`,startAction:`startComputeClustersMerge`,timerField:`computeClustersMergeRemainingSeconds`},{key:`networksIntoGrid`,label:`Banks`,symbol:`🕸️`,countField:`computeNetworks`,mergeOutputLabel:`Generator`,mergeOutputField:`computeGrids`,mergeAction:`mergeComputeNetworksIntoGrid`,autoFlagField:`autoMergeNetworksIntoGrid`,autoCostLabel:`Generators`,autoCostField:`computeGrids`,enableAutoAction:`enableAutoMergeNetworksIntoGrid`,autoAriaLabel:`unlock the Charger for Banks into Generators`,startAction:`startComputeNetworksMerge`,timerField:`computeNetworksMergeRemainingSeconds`},{key:`gridsIntoFabric`,label:`Generators`,symbol:`▦`,countField:`computeGrids`,mergeOutputLabel:`Turbine`,mergeOutputField:`computeFabrics`,mergeAction:`mergeComputeGridsIntoFabric`,autoFlagField:`autoMergeGridsIntoFabric`,autoCostLabel:`Turbines`,autoCostField:`computeFabrics`,enableAutoAction:`enableAutoMergeGridsIntoFabric`,autoAriaLabel:`unlock the Charger for Generators into Turbines`,startAction:`startComputeGridsMerge`,timerField:`computeGridsMergeRemainingSeconds`},{key:`fabricsIntoCloud`,label:`Turbines`,symbol:`🧵`,countField:`computeFabrics`,mergeOutputLabel:`Plant`,mergeOutputField:`computeClouds`,mergeAction:`mergeComputeFabricsIntoCloud`,autoFlagField:`autoMergeFabricsIntoCloud`,autoCostLabel:`Plants`,autoCostField:`computeClouds`,enableAutoAction:`enableAutoMergeFabricsIntoCloud`,autoAriaLabel:`unlock the Charger for Turbines into Plants`,startAction:`startComputeFabricsMerge`,timerField:`computeFabricsMergeRemainingSeconds`},{key:`cloudsIntoDatacenter`,label:`Plants`,symbol:`☁️`,countField:`computeClouds`,mergeOutputLabel:`Grid`,mergeOutputField:`computeDatacenters`,mergeAction:`mergeComputeCloudsIntoDatacenter`,autoFlagField:`autoMergeCloudsIntoDatacenter`,autoCostLabel:`Grids`,autoCostField:`computeDatacenters`,enableAutoAction:`enableAutoMergeCloudsIntoDatacenter`,autoAriaLabel:`unlock the Charger for Plants into Grids`,startAction:`startComputeCloudsMerge`,timerField:`computeCloudsMergeRemainingSeconds`},{key:`datacentersIntoSupercomputer`,label:`Grids`,symbol:`🏢`,countField:`computeDatacenters`,mergeOutputLabel:`Reactor`,mergeOutputField:`computeSupercomputers`,mergeAction:`mergeComputeDatacentersIntoSupercomputer`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,autoCostLabel:`Reactors`,autoCostField:`computeSupercomputers`,enableAutoAction:`enableAutoMergeDatacentersIntoSupercomputer`,autoAriaLabel:`unlock the Charger for Grids into Reactors`,startAction:`startComputeDatacentersMerge`,timerField:`computeDatacentersMergeRemainingSeconds`},{key:`supercomputersIntoMegacomputer`,label:`Reactors`,symbol:`🖥️`,countField:`computeSupercomputers`,mergeOutputLabel:`Fusion`,mergeOutputField:`computeMegacomputers`,mergeAction:`mergeComputeSupercomputersIntoMegacomputer`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,autoCostLabel:`Fusions`,autoCostField:`computeMegacomputers`,enableAutoAction:`enableAutoMergeSupercomputersIntoMegacomputer`,autoAriaLabel:`unlock the Charger for Reactors into Fusions`,startAction:`startComputeSupercomputersMerge`,timerField:`computeSupercomputersMergeRemainingSeconds`},{key:`megacomputer`,label:`Fusions`,symbol:`👑`,countField:`computeMegacomputers`}],ew=(e,t,n)=>e>=8&&t<n,tw=({game:e})=>{let{actions:t,state:n}=e,{intro:r}=n,[i,a]=(0,v.useState)(()=>{let e=$C.reduce((e,t,n)=>t.autoFlagField&&r[t.autoFlagField]?n+1:e,0);return e>0?e:Vu(r)[0]?.queue[0]??1}),o=Vu(r),s=o.length>0,c=o.map(e=>e.queue[0]),l=r.computeMergePageUnlocked?i:1,u=(l?$C[l-1]:null)&&(0,Z.jsxs)(Z.Fragment,{children:[!r.computeMergePageUnlocked&&(0,Z.jsx)(ZC,{title:`Boosts ${jv(l,`name`)}`,children:`Boosts ${jv(l)}`}),(0,Z.jsx)(QC,{role:`group`,"aria-label":`compute boost`,children:Object.keys(Ne).map(e=>{let i=Ru(e,l),a=zu(e,l),o=kv[e].label,s=!!Hu(r,e),c=`×${i} production, ${Av(a)}`;return(0,Z.jsx)(qC,{"aria-label":s?`queue ${o.toLowerCase()} compute boost`:`activate ${o.toLowerCase()} compute boost`,disabled:!Yu(n,e,l),onClick:()=>t.activateComputeBoost(e,l),title:s?`Queue ${o}: runs after the current one, ${c} — up to 10x`:`${o}: ${c} — runs alongside other boosts and adds up`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`${kv[e].icon} ×${i} · ${Av(a)}`})},e)})})]});return(0,Z.jsxs)(OC,{children:[s?(0,Z.jsx)(n_,{as:`h1`,children:`⚡ Power`}):(0,Z.jsx)(kC,{children:(0,Z.jsx)(AC,{children:`⚡ Power`})}),s&&(0,Z.jsx)(Gv,{actions:t,state:n}),!s&&(0,Z.jsx)(ZC,{children:`No boost running`}),!r.computeMergePageUnlocked&&(0,Z.jsx)(RC,{"aria-label":`boost`,children:u}),r.computeMergePageUnlocked?(0,Z.jsx)(MC,{"aria-label":`compute entities`,children:$C.map((e,i)=>{let o=i+1,s=r[e.countField]??0,d=!!e.autoFlagField,f=d?!!r[e.autoFlagField]:!1,p=e.autoCostField?r[e.autoCostField]??0:0,m=d&&!f&&p>=10,h=d?Nl(n,e.autoFlagField):0,g=d&&!f&&h<10,_=Math.min(100,p/10*100),y=e.timerField?r[e.timerField]??0:0,b=y>0,x=d?Kc(n,e.mergeOutputField):10,S=d&&Zl(n,i),C=d?Jc(n,o):0,w=d&&Xc(n,i),T=d&&Qc(n,i),E=w?Math.min(10,Math.max(0,s-C)):Math.min(s,10),D=f?S:ew(s,r[e.mergeOutputField]??0,x),O=d&&(!f||l===o||b||w||D||C>0),k=i>0?$C[i-1]:null,A=$C.some((e,t)=>t>=i&&(r[e.countField]??0)>0);if(!(i===0||A||f||b||l===o||c.includes(o)||k&&((r[k.countField]??0)>=8||r[k.autoFlagField])))return null;let j=$C[i+1]?.symbol??`⬆`,M=d&&(f?(0,Z.jsx)(JC,{"aria-label":`charge ${e.label.toLowerCase()}: move units down one per second, then merge 8 into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:!T,onClick:()=>t.startComputeCharge(i),title:w?`Charging — one unit moves into the Charger each second, then it merges`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge: move units from the top row into the Charger one per second, then merge 8 into 1 ${e.mergeOutputLabel} (needs 8 ${e.label} held)`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:w?`⏳ ${C}/8`:`⚡ Charge`})}):(0,Z.jsx)(JC,{"aria-label":`charge up 8 ${e.label.toLowerCase()} into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:g?s<8:!ew(s,r[e.mergeOutputField]??0,x),onClick:()=>t[e.mergeAction](),title:g?`Charge up: spend 8 ${e.label} into this tier's Charger (${h}/10) — the first 10 charges unlock Auto-charge, then charges make ${e.mergeOutputLabel}`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge up: spend 8 ${e.label} for 1 ${e.mergeOutputLabel}`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:`${e.symbol} 8→1 ${g?`🔌`:j}`})})),ee=d&&(f?(0,Z.jsx)(XC,{$fill:C/8,$running:b,"aria-label":b?`${e.label} charger, auto-charge in progress, ${Wi(y)} left`:`${e.label} charger, ${C}/8 filled`,role:`img`,title:b?`Auto-charging: ${Wi(y)} left`:`Charger: ${C}/8 — fills past 10 held and charges on its own when full, or press Charge to move units into it one per second`,children:b?`⏳ ${Wi(y)}`:`🔌 ${C}/8`}):m?(0,Z.jsx)(YC,{"aria-label":e.autoAriaLabel,onClick:()=>t[e.enableAutoAction](),title:`Unlock this tier's Charger now: sacrifice 10 of your ${B(p)} ${e.autoCostLabel}`,type:`button`,variant:`info`,$progress:_,children:(0,Z.jsx)($,{children:`🔓 10/10`})}):(0,Z.jsx)(XC,{$fill:h/10,"aria-label":`${e.label} charger unlock, ${h}/10 charges`,role:`img`,title:`Charger: ${h}/10 — this tier's first 10 charges build it, then it charges on its own whenever ${e.label} is completely full`,children:`🔓 ${h}/10`})),N=d&&O;return(0,Z.jsxs)(v.Fragment,{children:[(0,Z.jsxs)(LC,{"data-boost-tier":!0,"aria-label":`${e.label} tier`,$selected:l===o,children:[(0,Z.jsxs)(zC,{children:[(0,Z.jsxs)(BC,{type:`button`,onClick:()=>a(o),"aria-pressed":l===o,"aria-label":`select ${e.label} to fund a compute boost`,title:`Select ${e.label} to show its Boost presets — they'll boost ${jv(o,`name`)}`,$selected:l===o,children:[(0,Z.jsx)(WC,{"aria-hidden":`true`,children:e.symbol}),(0,Z.jsxs)(HC,{children:[(0,Z.jsxs)(UC,{children:[(0,Z.jsxs)(VC,{children:[e.label,(0,Z.jsx)(n_,{children:` ${B(E)}/10`})]}),(0,Z.jsxs)(IC,{"aria-hidden":`true`,children:[`→ `,jv(o)]})]}),(0,Z.jsx)(GC,{role:`group`,"aria-label":`${e.label} slots`,children:Array.from({length:10},(e,t)=>(0,Z.jsx)(KC,{$filled:t<E,"aria-hidden":`true`},t))})]})]}),ee&&(0,Z.jsx)(FC,{children:ee})]}),l===o&&u]}),N?(0,Z.jsx)(NC,{children:M}):(0,Z.jsx)(PC,{})]},e.key)})}):(0,Z.jsx)(jC,{children:`⬡ ${B(r.computeCores??0)}/10 · 🔗 ${B(r.computeNodes??0)}/10`})]})},nw=X.button.attrs({type:`button`})`
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
`;b.reduce((e,t)=>({...e,[t.id]:t.name}),{}),pt.reduce((e,t)=>({...e,[t.id]:`${t.name} · ${t.outputLabel}`}),{});var rw=[{id:`foundry`,icon:`🔥`,label:`Foundry`,match:e=>/^intro$|^computeAutoBoost/.test(e)},{id:`compute`,icon:`🖥`,label:`Compute`,match:e=>/^computeFlops/.test(e)},{id:`era`,icon:`⏻`,label:`Reboot`,match:e=>/^(era|eons|eonsUpgrades|hyperscaler)/i.test(e)},{id:`purge`,icon:`🏆`,label:`Prestige`,match:e=>/^purge|^autoPurge|^prestige/.test(e)},{id:`perks`,icon:`🔧`,label:`Firmware`,match:e=>/autobuyer|^auto|IntervalLevels$|AttemptBudgets?$|BonusUnlocked$/i.test(e)},{id:`factory`,icon:`📶`,label:`Factory`,match:()=>!0}];X.main`
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
`,X(Bh)`
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
`,[`foundry`,`compute`,`factory`,`perks`,`purge`,`era`].map(e=>rw.find(t=>t.id===e));var iw=`0.5.0`,aw=X.main`
  width: min(720px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,ow=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`,sw=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.7rem;
  margin-top: 0.15rem;
`,cw=X(Bh)`
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
`,lw=()=>{let e=Qt(b[0].id),t=Qt(b[b.length-1].id),n=$t(b[0].id),r=Pr({}),i=b[b.length-1].name,a=b[0].name;return(0,Z.jsxs)(aw,{children:[(0,Z.jsxs)(ow,{children:[(0,Z.jsx)(`h1`,{children:`Tens — Manual`}),(0,Z.jsxs)(sw,{children:[`v`,iw]})]}),(0,Z.jsxs)(cw,{"aria-label":`overview section`,children:[(0,Z.jsx)(`h2`,{children:`Overview`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Everything scales by powers of ten — costs, production, and most upgrades.`}),(0,Z.jsxs)(`li`,{children:[`Buy every tier with `,(0,Z.jsx)(`strong`,{children:`Bits`}),` (the base currency; 8 Bits = 1 Byte).`]}),(0,Z.jsxs)(`li`,{children:[`Each owned tier produces the tier below it, so production cascades down the ladder;`,` `,a,` produce Bytes, which are added to your Bits.`]}),(0,Z.jsx)(`li`,{children:`The main balance switches from Bits to whole Bytes once you reach 8,000 Bits (1,000 Bytes). Costs and production rates still show in Bits.`}),(0,Z.jsxs)(`li`,{children:[`Reaching `,(0,Z.jsx)(`strong`,{children:`1 Googol Bytes`}),` (8×10^100 Bits) freezes production until you Purge — unless you have unlocked Overflow mode (see Purge).`]}),(0,Z.jsxs)(`li`,{children:[`Once bought (`,2,` PP on Firmware → ✦ Prestige), the `,(0,Z.jsx)(`strong`,{children:`Buy max`}),` toggle makes each purchase buy as many levels as you can afford. Tiers buy full levels only — a partly bought level takes its own click.`]})]})]}),(0,Z.jsxs)(cw,{"aria-label":`prestige ladder section`,children:[(0,Z.jsx)(`h2`,{children:`Prestige ladder`}),(0,Z.jsx)(`p`,{children:`Each layer resets everything the layer below it resets, plus more — so a higher layer keeps less, but awards a longer-lasting currency.`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Purge`}),` — at 1 Googol Bytes. `,(0,Z.jsx)(`em`,{children:`Resets:`}),` Bits and resources, owned Factory tiers, Scale Ups, Overclocks, Accelerate, Restage XP, the per-cycle Compute (Flops) boost.`,` `,(0,Z.jsx)(`em`,{children:`Keeps:`}),` the Data Stream balance, Purge Points, Compression levels, automation unlocks, Overflow mode, the Byte generator, Capacity, Disks, Data Lakes, Compute entities, owned Compute (Flops) units and the System log.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reboot`}),` — at 1 Googol unspent PP. `,(0,Z.jsx)(`em`,{children:`Resets:`}),` everything Purge resets, plus unspent PP, the Purge count, Compression levels, owned Compute (Flops) units, and the whole Foundry (Capacity, Disks, Data Lakes, Compute entities).`,` `,(0,Z.jsx)(`em`,{children:`Keeps:`}),` automation unlocks, Overflow mode, the main-game unlock, the System log, Flops autobuyer unlocks, Kernels and hyperscalers. Awards Kernels.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reinstall`}),` — a future layer above Reboot, not yet in the game.`]})]})]}),(0,Z.jsxs)(cw,{"aria-label":`byte foundry section`,children:[(0,Z.jsx)(`h2`,{children:`Byte Foundry`}),(0,Z.jsxs)(`p`,{children:[`Every new save starts here, before any `,a,` exist. Unlocking the main game is permanent — no Purge or Reboot sends you back through this gate. Reopen the Foundry any time from the bottom nav. The Data Stream’s Capacity uses binary units (KiB, MiB, …; 1 KiB = 1,024 Bytes); Storage pools, Disks and Data Lakes use decimal units (KB, MB, …; 1 KB = 1,000 Bytes).`]}),(0,Z.jsx)(`h3`,{children:`The loop`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Ping`}),` the Data Stream to add one second of its production. Once Storage appears (at `,Go(ke),` Capacity), a ping instead adds a temporary ping bonus to what it feeds (below).`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Compile`}),` the first `,8,` bits into a permanent Byte generator that produces on its own from then on. Capacity starts at`,` `,Go(we(1).startBits),` and doubles with each Capacity upgrade, up to the last storage pool’s limit.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Fill multiplier`}),` — the Data Stream’s Bitrate and each pool’s Bandwidth are shown as the rate actually delivered: the base rate times a multiplier that depends on how full that buffer is. (A pool’s buffer is called its Staging.) It is `,Oe/100,`× when empty, 1× at half full and`,` `,10/100,`× when full; the color runs red (slow) → blue → green (fast). Pinging the Data Stream (once Storage appears) or a pool’s Staging tile adds a +`,5,`% ping bonus (up to `,100,`%), which fades by `,1,`% per second and shows as a thin bar and “+x% 👆”. A ping never speeds the fill itself (it already reaches`,` `,Oe/100,`×); it speeds what that buffer feeds — on the Data Stream, Upgrade Capacity / Bitrate; on a pool, disk provisioning, disk fills and merges, rebuilds and the Data Lake.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Upgrade Capacity`}),` costs your current Capacity and doubles it.`,` `,(0,Z.jsx)(`strong`,{children:`Upgrade Bitrate`}),` costs your current Bitrate level. Only one runs at a time: it becomes a progress bar that draws the Data Stream’s base Bitrate from the Buffer, ahead of everything else, and applies when full. Base Bitrate is (Bitrate level in Bytes)`,(0,Z.jsx)(`sup`,{children:`exponent`}),` per second and can never exceed Capacity`,(0,Z.jsx)(`sup`,{children:`exponent`}),`, so raise Capacity to unlock more Bitrate. The exponent starts at `,Te,` (a square root); pool Bandwidth is capped by the same exponent.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reformat`}),` — when every unlocked disk size is complete, this button replaces Provision Disk. It unlocks the next disk size. Each new pool closes`,` `,Math.round((1-Ee)*100),`% of the exponent’s remaining gap to 1.0; within a pool, new disk sizes initially close 10% of the gap to the next pool’s exponent. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are replayed automatically up to your previous highs.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Auto-convert`}),` turns Data Stream bits into free `,a,` at their current per-unit cost, automatically, every cycle. The main game itself unlocks (permanently) once Upgrade Capacity raises Capacity to Storage’s`,` `,Go(ke),` threshold.`]})]}),(0,Z.jsx)(`h3`,{children:`What resets vs. what stays`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Resets each Purge:`}),` any partly bought`,` `,a,` level.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Kept through Purge:`}),` the Byte generator, Capacity/Bitrate upgrades, Disks, Data Lakes, every Compute entity, and the main-game unlock. Reboot resets most of this (see Reboot).`]}),(0,Z.jsx)(`li`,{children:`Later cycles are a quick pit stop, not a full replay.`})]}),(0,Z.jsx)(`h3`,{children:`Forced priority`}),(0,Z.jsx)(`p`,{children:`When more than one of these is available, only the highest-ranked one can be used:`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Disk Fill → Provision Disk → Compute Boost`}),(0,Z.jsx)(`li`,{children:`Upgrade Capacity / Upgrade Bitrate, Data Lake Cell purchases and Data Lake capacity upgrades are outside this order — they are never blocked by it.`})]})]}),(0,Z.jsxs)(cw,{"aria-label":`storage section`,children:[(0,Z.jsx)(`h2`,{children:`Storage`}),(0,Z.jsxs)(`p`,{children:[`Appears on the Foundry screen once the Data Stream’s Capacity reaches`,` `,Go(ke),`. There are ten pools (KB … QB), all fed by the shared Data Stream — earlier pools take their share of its bitrate first. Pool N appears once Capacity reaches 1024`,(0,Z.jsx)(`sup`,{children:`N`}),` Bytes (1 KiB, 1 MiB, …), whatever disks you have built.`]}),(0,Z.jsx)(`h3`,{children:`Provisioning Disks`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Click Provision Disk once to start a build; it draws its cost from the pool’s Staging at the pool’s base Bandwidth and pauses (losing nothing) whenever the Staging is empty. The Nth disk of an array costs N× the disk’s size.`}),(0,Z.jsxs)(`li`,{children:[`Up to `,9,` disks can be built at each size before the next size opens, stepping through every power of ten (1 KB → 10 KB → 100 KB → 1 MB …). Each pool holds three sizes; to build in a pool, every array in the earlier pools must be complete. Sizes beyond those already unlocked need a Reformat.`]})]}),(0,Z.jsx)(`h3`,{children:`Cache and automatic pulling`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Each pool’s smallest array keeps a read Cache of `,8,` blocks that together hold one disk’s worth of bits (e.g. a 1 MB array → 8 × 1 Mb). Whenever the Cache has room, it fills from the pool’s Staging at `,5,`× the pool’s Bandwidth.`]}),(0,Z.jsxs)(`li`,{children:[`That array’s empty disks fill from its read Cache, taking as long as one cache block would at `,2,`× your Foundry production rate. Every larger size fills through its own write Cache straight from Staging (after the smaller sizes’ caches), then is written at `,2,`×. Click an empty disk to fill it sooner: it takes Staging ahead of the other larger disks, pulls in every full smaller disk it needs from the same pool at once (each at`,` `,5,`× your rate) while Staging keeps filling it, and is written at `,5,`× instead of`,` `,2,`×. Nothing ever crosses from one pool into another.`]}),(0,Z.jsxs)(`li`,{children:[`Every disk size matches one tier and level (KB sizes → Kilobytes, MB sizes → Megabytes, …; the 1st/2nd/3rd size in a pool → that tier’s level 1/2/3). A full, clean-slate disk is`,` `,(0,Z.jsx)(`strong`,{children:`pulled`}),` automatically — no click or autobuyer needed — the moment its tier is at exactly that level with no purchases toward it yet, completing the whole level at once. A level you have already started buying is never topped off by a disk; the disk waits for that tier’s next fresh level.`]}),(0,Z.jsx)(`li`,{children:`A tier still on its level 1 with no disk to pull draws from its pool’s Cache directly instead. Later levels only ever come from whole disks.`}),(0,Z.jsx)(`li`,{children:`Disks are permanent across Purges; a full disk stays full.`})]}),(0,Z.jsx)(`h3`,{children:`Data Lakes`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Each pool has its own Data Lake (KB … QB), shown in its pool card. A lake unlocks once its pool has built at least one disk, and turns stored data into Cells.`}),(0,Z.jsxs)(`li`,{children:[`A lake fills from its own pool’s Staging into a permanent 1-unit buffer, which moves into lake disks and consolidates into bigger ones. Filling toward a Cell only waits for Staging to be full to `,(0,Z.jsx)(`em`,{children:`start`}),`; after that it no longer waits for Staging to refill — it only needs every built disk in that pool full, nothing being provisioned there, and Staging holding more than the read cache’s share — until the Cell is bought. A Cell is paid with whole disks that add up to exactly its cost; disks are never broken, so the lake keeps filling until exact change exists. Clicking its 🏷️ cost control fills the same way until the next Cell is affordable, buys one, then stops. Once all of the pool’s disks are built, its overflow also pours into the lake.`]}),(0,Z.jsxs)(`li`,{children:[`A lake shows its contents as disk squares, filled smallest first: up to`,` `,Le.join(`/`),` disks of ×1/×10/×100 its unit. The last unit of each capacity level sits in the lake’s own buffer instead of a square, just as a Storage array’s Cache stands in for a 10th disk.`]}),(0,Z.jsxs)(`li`,{children:[`Lake capacity starts at 1 unit and can be raised ×10 per level (`,He.map(e=>e.toLocaleString()).join(`, `),`). Each level unlocks once the matching Storage array is fully built, and buying it empties the lake.`]}),(0,Z.jsx)(`li`,{children:`The nth Cell bought from a lake costs n units and instantly grants 1 compute entity of that lake’s tier (KB → Cell, MB → Battery, …). Once a pool has all of its disks built, its lake buys every affordable Cell automatically for the rest of the Reboot cycle — through pool flushes, Reformats and Purges.`})]}),(0,Z.jsx)(`h3`,{children:`Flushing`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`When a pool has every disk built, its lake is completely full, and the next Cell costs more than the lake can hold, a `,(0,Z.jsx)(`strong`,{children:`🗜 Flush Pool`}),` button appears. It never fires on its own.`]}),(0,Z.jsx)(`li`,{children:`A flush empties that pool’s disks, Staging and lake (Cells bought and earlier flush rewards stay) and permanently adds 1,000 units of lake capacity. A pool’s first two flushes also each upgrade one of its two disk-size exponent steps to close 10% of the gap to 1.0. These upgrades survive Reformat, Purge, and Reboot. Lakes fill at 10% of their pool’s Bandwidth, plus 10% (additive) per flush.`}),(0,Z.jsx)(`li`,{children:`Afterwards the pool rebuilds its disks for free, one at a time, smallest first. Until it is complete again, later pools can’t start new disk builds.`})]})]}),(0,Z.jsxs)(cw,{"aria-label":`power section`,children:[(0,Z.jsx)(`h2`,{children:`Power`}),(0,Z.jsxs)(`p`,{children:[`Unlocks once the Data Stream’s Capacity reaches`,` `,Go(je),`. Open it from the bottom nav’s Power item. Cells come from the Data Lakes described under Storage.`]}),(0,Z.jsx)(`h3`,{children:`Cells and the charge chain`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Chain: Cell → Battery → Pack → Bank → Generator → Turbine → Plant → Grid → Reactor → Fusion. Cells only come from KB Data Lake purchases.`}),(0,Z.jsxs)(`li`,{children:[`Each entity caps at `,10,` held; Cell purchases pause at the cap until you spend some (a charge-up or a Boost).`]}),(0,Z.jsxs)(`li`,{children:[`Charge up: turn `,8,` of one entity into 1 of the next (needs`,` `,8,` held). It is instant.`]}),(0,Z.jsxs)(`li`,{children:[`A step's first `,10,` charges go into its Charger instead of the next entity (🔓 n/`,10,`); the `,10,`th unlocks it, with nothing sacrificed. The Charger holds `,8,` more (`,18,` held in total) that fills as the entity keeps growing past `,10,`. Press ⚡ Charge to move units from the top row into the Charger one per second, then `,8,` → 1 merges instantly.`]}),(0,Z.jsxs)(`li`,{children:[`An automatic charge starts only when all `,18,` slots are full and runs on a timer: the time `,8,` of the smallest disks in that entity’s own pool take to fill from its read Cache (Cells use the KB pool, Batteries the MB pool, …). It waits until that pool is visible and speeds up as the pool gets faster.`]})]}),(0,Z.jsx)(`h3`,{children:`Compute Boost`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Select a tier on Power to show its Turbo / Balanced / Eco presets; activating one spends 1 of that entity. Every tier gives the same multiplier and duration — higher tiers boost more Factory tiers (Cell: Kilobytes only, Battery: Kilobytes and Megabytes, Pack: the first three, …).`}),(0,Z.jsxs)(`li`,{children:[`Turbo ×`,Ne.burst.multiplier,` for`,` `,Wi(Ne.burst.durationSeconds),`; Balanced ×`,Ne.standard.multiplier,` for`,` `,Wi(Ne.standard.durationSeconds),`; Eco ×`,Ne.sustain.multiplier,` for`,` `,Wi(Ne.sustain.durationSeconds),`.`]}),(0,Z.jsxs)(`li`,{children:[`A boost also multiplies the Byte generator’s production and speeds up the matching Storage pools’ Staging (pool N for Factory tier N) by +`,Ne.burst.poolBonusPercent,`% / +`,Ne.standard.poolBonusPercent,`% / +`,Ne.sustain.poolBonusPercent,`% for Turbo / Balanced / Eco.`]}),(0,Z.jsxs)(`li`,{children:[`Boosts of different multipliers (Turbo, Balanced, Eco) run `,(0,Z.jsx)(`strong`,{children:`in parallel`}),` and their multipliers add up. Boosts of the same multiplier `,(0,Z.jsx)(`strong`,{children:`queue`}),` (up to`,` `,10,`): the running one is never interrupted, and the waiting ones run afterwards, strongest (broadest tier) first.`]}),(0,Z.jsxs)(`li`,{children:[`Each running multiplier has its own timer bar showing the time left. `,(0,Z.jsx)(`strong`,{children:`+`}),` on its right queues another. `,(0,Z.jsx)(`strong`,{children:`Pop`}),` (↩) on its left refunds the last queued boost; once none are queued it becomes `,(0,Z.jsx)(`strong`,{children:`Forfeit`}),` (✕), which ends that boost with no refund after a confirmation.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Auto Boost`}),` is automatic for every tier whose charge is automated: each time that automatic charge starts, one of the tier's remaining tokens starts (or queues) your preferred preset. Choose the preset on Power (default Balanced).`]}),(0,Z.jsx)(`li`,{children:`Fusions are used only to fund Boosts.`})]})]}),(0,Z.jsxs)(cw,{"aria-label":`compute flops section`,children:[(0,Z.jsx)(`h2`,{children:`Compute`}),(0,Z.jsxs)(`p`,{children:[`A separate screen (nav `,(0,Z.jsx)(`strong`,{children:`Compute`}),`) with ten tiers,`,` `,(0,Z.jsx)(`strong`,{children:`Cores → Superclouds`}),` (outputting KFlops → QFlops), bought with Purge Points; each boosts the matching Factory tier. It appears once you hold `,100,` PP; the first tier costs`,` `,ut.toLocaleString(),` PP.`]}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Base costs climb ×1,000 per tier like Factory tiers (`,ut.toLocaleString(),` –`,` `,dt.toExponential(0).replace(`+`,``),` PP), and the price rises with `,(0,Z.jsx)(`strong`,{children:`every`}),` purchase rather than every 8.`]}),(0,Z.jsxs)(`li`,{children:[`Each owned unit adds `,(ft*100).toFixed(2),`% per second to its Factory tier’s boost, which multiplies production by`,` `,(0,Z.jsx)(`strong`,{children:`(1 + boost)`}),`.`]}),(0,Z.jsxs)(`li`,{children:[`The header’s `,(0,Z.jsx)(`strong`,{children:`Flops`}),` total weights each tier’s boost by 10`,(0,Z.jsx)(`sup`,{children:`n`}),` `,`(`,(0,Z.jsx)(`strong`,{children:`K + 10·M + 100·G + … + 10⁹·Q`}),`); production uses each tier’s own boost. Boosts reset each Purge; owned units are kept.`]})]})]}),(0,Z.jsxs)(cw,{"aria-label":`accelerate section`,children:[(0,Z.jsx)(`h2`,{children:`Accelerate`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Spend Bytes to make every tier’s production ticks 1% faster per level, compounding — more frequent deliveries, not bigger ones.`}),(0,Z.jsx)(`li`,{children:`Each level costs the next power of ten (10 B, 100 B, 1,000 B, …).`}),(0,Z.jsxs)(`li`,{children:[`Unlocks once `,a,` complete their first level.`]}),(0,Z.jsx)(`li`,{children:`Each tier row also has its own tickspeed upgrade, paid for with units of that tier itself — buying one lowers that tier’s owned count.`}),(0,Z.jsxs)(`li`,{children:[i,`’ tickspeed upgrade may spend your last unit (other tiers always keep one). Restage while holding 0 `,i,` (nothing is left producing) to earn Spent QB — then 1 is credited regardless of balance, more often with more completed levels.`]}),(0,Z.jsxs)(`li`,{children:[`After `,b.length,` Scale Ups in a run (the first onto `,i,`), the Restage upgrade appears beside Accelerate (above the tier list): spend XP for +1% faster `,i,` ticks per XP (compounding). Each Restage must add at least 10% to the XP already restaged (minimum 1). It resets every other tier’s owned quantity and your Bits. Auto Restage (Firmware → Automation, unlocked at Purge `,nt.restage,`) spends it for you, every `,rt.restage.baseSeconds,` s at first — faster with its speed upgrades.`]})]})]}),(0,Z.jsxs)(cw,{"aria-label":`scale up section`,children:[(0,Z.jsx)(`h2`,{children:`Scale Up`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Reach 3 completed levels on the tier Scale Up is currently working through — starting with `,a,` — to claim a Scale Up.`]}),(0,Z.jsxs)(`li`,{children:[`Resets tiers and resources and unlocks the next tier. After a later reset, an already-unlocked tier reappears once the tier before it reaches`,` `,2,` completed levels.`]}),(0,Z.jsx)(`li`,{children:`Doubles production for every tier unlocked so far; the bonuses stack (×2, ×4, ×8, …) and a newly unlocked tier starts at ×1. They last until the next Overclock or Purge.`}),(0,Z.jsx)(`li`,{children:`Each of the first ten claims needs 3 completed levels on the last unlocked tier. After that, repeated claims on the final tier need 6, 9, 12, and so on.`}),(0,Z.jsx)(`li`,{children:`Byte Foundry progress is untouched.`})]})]}),(0,Z.jsxs)(cw,{"aria-label":`overclock section`,children:[(0,Z.jsx)(`h2`,{children:`Overclock`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Reach the required number of completed `,i,` levels to claim an Overclock.`]}),(0,Z.jsx)(`li`,{children:`Resets tiers and resources like Scale Up and also clears Scale Up’s bonuses. Autobuyers and Purge Points are kept.`}),(0,Z.jsx)(`li`,{children:`In exchange, multiplies the per-level speed bonus by ×1.1 for each completed level you had when you claimed (1% → 1.1% → 1.21% → …).`}),(0,Z.jsxs)(`li`,{children:[`The first claim needs `,r,` completed levels — a minimum; you can keep climbing first. Each later claim needs `,4,` more completed levels than the previous claim was taken at (fewer with the Overclock step achievements).`]}),(0,Z.jsx)(`li`,{children:`Nothing is banked — each claim replaces the previous one, so only the completed level reached at your latest claim sets the boost. Waiting to claim at a higher level gives a bigger boost.`})]})]}),(0,Z.jsxs)(cw,{"aria-label":`tier autobuyers section`,children:[(0,Z.jsx)(`h2`,{children:`Tier Autobuyers`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Each tier’s autobuyer and its tickspeed autobuyer unlock automatically as your Purge count grows — see Firmware → 🤖 Automation for the exact thresholds.`}),(0,Z.jsx)(`li`,{children:`Once unlocked, the same row pauses or resumes it without losing it.`}),(0,Z.jsxs)(`li`,{children:[`An autobuyer buys `,(0,Z.jsx)(`strong`,{children:`one full level per attempt`}),`, only when that whole level (or the rest of a partly bought one) is affordable; Buy max never applies to it. Speed upgrades on that same row shorten its interval down to 10 ms; each level after that doubles how many levels one attempt can buy, up to 1024. In Buy mode `,(0,Z.jsx)(`strong`,{children:`Single`}),` `,`(Firmware → Prestige) an attempt buys one unit instead, at the same interval, and those extra levels pause. A tier autobuyer’s speed upgrades start at `,10,` PP × the tier’s number (10, 20, 30 …); its tickspeed autobuyer’s at `,it.baseCost,` PP × the same.`]})]})]}),(0,Z.jsxs)(cw,{"aria-label":`milestones section`,children:[(0,Z.jsx)(`h2`,{children:`Milestones`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Tier autobuyers:`}),` one tier every`,` `,`Purge`,`, from Purge`,` `,e,` (`,a,`) through Purge`,` `,t,` (`,i,`).`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Tier tickspeed autobuyers:`}),` start at Purge`,` `,n,`, then every`,` `,`Purge`,` after that.`]}),(0,Z.jsx)(`li`,{children:`More → Milestones tracks your story milestones and Reboot progress.`})]})]}),(0,Z.jsxs)(cw,{"aria-label":`prestige section`,children:[(0,Z.jsx)(`h2`,{children:`Purge`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Prestige`}),` is the umbrella term for every reset-for-rewards: Purge, Reboot, Reformat Byte Foundry and a pool’s Flush. Purge is the Factory one.`]}),(0,Z.jsxs)(`li`,{children:[`Available at 1 Googol Bytes (8×10^100 Bits), where production freezes until you Purge. Getting Auto Purge’s interval down to `,1,` s or less unlocks `,(0,Z.jsx)(`strong`,{children:`Overflow mode`}),`: production keeps running past 1 Googol Bytes and Purge becomes optional.`]}),(0,Z.jsxs)(`li`,{children:[`Awards 1 Purge Point (PP) for every `,64,` powers of ten in your balance: 100 powers at 1 Googol Bytes is 1 PP. Each Compression upgrade halves the powers needed per PP (100 ÷ 32 = 3 PP, then 6, 12, …), and once that reaches 1, doubles the PP per power. Past 1 Googol Bytes the count only keeps growing in Overflow mode.`]}),(0,Z.jsxs)(`li`,{children:[`Compression costs `,10,`^(level+1) PP (10, 100, 1,000, …) on Firmware → ✦ Prestige and is permanent across Purges.`]}),(0,Z.jsx)(`li`,{children:`Spend PP on Firmware for automation and upgrades.`}),(0,Z.jsxs)(`li`,{children:[`Your first Purge Point buys the Purge speed bonus (`,1,` PP on Firmware → Prestige): production speed grows with your Purge count, forever: ×1.1 after your first Purge, ×2 at 10 Purges, ×3 at 100, ×4 at 1,000, and so on (×(1 + log₁₀ Purges)).`]}),(0,Z.jsxs)(`li`,{children:[`Cache Warm (`,20,` PP on Firmware → Prestige) starts every Purge, Scale Up and Overclock with level 1 already complete for the tier of your highest unlocked Storage pool, with or without disks.`]}),(0,Z.jsxs)(`li`,{children:[`The one-time Playtime bonus (`,100,` PP on Firmware → Prestige) adds +`,Ze*100,`% production speed per hour of active play; offline, hidden-tab, and background catch-up time doesn't count.`]}),(0,Z.jsx)(`li`,{children:`Resets resources, owned tiers and this run’s progress. Unlocked autobuyers stay, and Foundry, Storage and Power progress carries over.`}),(0,Z.jsx)(`li`,{children:`Your first Purge uses a full-screen prompt; after that, use the Purge bar at the top of the Factory or tap the PP display.`})]})]}),(0,Z.jsxs)(cw,{"aria-label":`sleep mode section`,children:[(0,Z.jsx)(`h2`,{children:`Sleep mode`}),(0,Z.jsx)(`ul`,{children:(0,Z.jsxs)(`li`,{children:[`Time away is simulated when you come back, up to`,` `,Wi(Ge),` at first. Each Sleep mode upgrade (Firmware → ✦ Prestige; `,qe.map(e=>B(e)).join(` / `),` PP) adds`,` `,Wi(Ke),`, up to `,Wi(We),`. Absences of `,Wi(600),` `,`or less run at full speed; longer ones run at`,` `,Ue*100,`% speed and show a “Resumed from sleep” summary.`]})})]}),(0,Z.jsxs)(cw,{"aria-label":`reboot section`,children:[(0,Z.jsx)(`h2`,{children:`Reboot`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`An optional deeper reset once you hold`,` `,gt.toExponential(0).replace(`+`,``),` (1 Googol) unspent PP. Nothing freezes at that point.`]}),(0,Z.jsxs)(`li`,{children:[`Each Reboot awards 1 Kernel, ×`,10,` per Kernel Amplifier level. Spend Kernels on Firmware → ⏻ Kernels: hyperscalers (a Flops boost that builds up every second on every tier, until the next Purge, Scale Up or Overclock), Hyperscaler efficiency, Kernel amplifier and Auto Hyperscaler.`]}),(0,Z.jsx)(`li`,{children:`Reboot from More → Settings → Reboot (asks for confirmation). More → Milestones shows your Reboots, Kernels and eligibility.`}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Resets:`}),` Foundry upgrades and Capacity, Disks, Data Lakes, Compute entities, the Factory (resources, owned tiers, Compression level), unspent PP, Purge count, and owned Compute (Flops) units.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause settings, Overflow mode, the main-game unlock, the System log, the Compute screen, Flops autobuyer unlocks, Kernels and hyperscalers. Reboot `,(0,Z.jsx)(`em`,{children:`N`}),` also unlocks the `,(0,Z.jsx)(`em`,{children:`N`}),`th Compute tier’s autobuyer for free.`]})]})]})]})},uw=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,dw=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,fw=X(Bh)`
  gap: 0.4rem;
`,pw=X.ol`
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
`,mw=X.li`
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
`,hw=X.p`
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
`,gw=X.span`
  color: ${e=>e.$color??e.theme.color.textMuted};
  opacity: ${e=>e.$dimmed?.75:1};
`,_w=({game:e})=>{let{state:t}=e,n=ch(),{purge:r}=t,i=t.era?.count??0,a=t.eons?.balance??0,o=Bn(t),s=[{label:`The first Kilobyte`,reached:!!t.intro?.mainGameUnlocked},{label:`Go Googol`,reached:(r.count??0)>0},{label:`Open Compute`,reached:!!t.computeFlops?.pageUnlocked},{label:`DeGoogoled`,reached:Ur(t)},{label:`First Reboot`,reached:i>0}];return(0,Z.jsxs)(uw,{children:[(0,Z.jsx)(dw,{children:(0,Z.jsx)(`h1`,{children:`Milestones`})}),(0,Z.jsxs)(fw,{"aria-label":`milestones page`,children:[(0,Z.jsx)(pw,{"aria-label":`milestones category`,children:s.map(e=>(0,Z.jsx)(mw,{$reached:e.reached,"aria-label":`${e.label} milestone ${e.reached?`reached`:`not yet reached`}`,children:e.label},e.label))}),(0,Z.jsxs)(hw,{"aria-label":`reboot status`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`⏻`}),(0,Z.jsxs)(`span`,{"aria-label":`${i} reboots`,children:[(0,Z.jsx)(`strong`,{children:i}),` Reboots`]}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),(0,Z.jsxs)(`span`,{"aria-label":`${a} kernels held`,children:[(0,Z.jsx)(`strong`,{children:a}),` Kernels`]}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),o?(0,Z.jsx)(gw,{$color:n.color.good,"aria-label":`reboot eligible now`,children:`✅ Eligible`}):(0,Z.jsx)(gw,{$color:n.color.disabled,$dimmed:!0,"aria-label":`reboot locked — requires ${gt.toExponential(0).replace(`+`,``)} unspent Purge Points`,children:`🔒 1 Googol PP`})]})]})]})},vw=({game:e})=>{if(!Yi(e.state))return null;let t=!!e.buyMaxMode;return(0,Z.jsx)(nw,{$on:t,"aria-label":`Buy max mode`,"aria-pressed":t,onClick:()=>e.setBuyMaxMode(!t),title:t?`Buy max is on: each purchase buys as many levels as you can afford (Factory tiers buy full levels only — a partial level takes its own click). Click to turn off.`:`Buy max is off: each purchase buys one level. Click to buy as many levels as you can afford instead.`})},yw=X.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
`,bw=X(Q)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&gh`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,xw=[{id:`level`,unit:!1,icon:`📶`,label:`Level`,title:`Buy level: each Buy fills as many units as you can afford, up to the end of the current level.`},{id:`single`,unit:!0,icon:`1️⃣`,label:`Single`,title:`Buy single: each Buy — and each autobuyer attempt, at the same interval — purchases exactly one unit, so autobuying is much slower (bulk-level upgrades are suspended).`}],Sw=({game:e})=>(0,Z.jsx)(yw,{role:`group`,"aria-label":`buy mode`,children:xw.map(t=>{let n=!!e.buyUnitMode===t.unit;return(0,Z.jsx)(bw,{"aria-label":`buy ${t.id} mode`,"aria-pressed":n,onClick:()=>e.setBuyUnitMode(t.unit),title:`${t.title}${n?` (selected)`:``}`,type:`button`,variant:n?`prestige`:`neutral`,$selected:n,children:`${t.icon} ${t.label}`},t.id)})}),Cw=X.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
  width: 100%;
`,ww=X(Q)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&gh`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,Tw=({value:e,onChange:t})=>(0,Z.jsx)(Cw,{role:`group`,"aria-label":`auto boost preference`,children:Object.keys(Ne).map(n=>{let r=kv[n],i=e===n;return(0,Z.jsx)(ww,{"aria-label":`set auto boost preference to ${r.label.toLowerCase()}`,"aria-pressed":i,onClick:()=>t(n),title:`Auto Boost preference: ${r.label}${i?` (selected)`:``}`,type:`button`,variant:i?`prestige`:`neutral`,$selected:i,children:`${r.icon} ${r.label}`},`auto-${n}`)})}),Ew=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Dw=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,Ow=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0.2rem 0 0;
`,kw=X.div`
  display: flex;
  gap: 0.5rem;
`,Aw=X(Q)`
  flex: 1;
  font-size: 1.15rem;
  position: relative;
`,jw=X.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  height: 0.5rem;
  position: absolute;
  right: 0.4rem;
  top: 0.3rem;
  width: 0.5rem;
`,Mw=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,Nw=X(Bh)`
  gap: 0.4rem;
`,Pw=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Fw=X.div`
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
`,Iw=X.div`
  align-items: start;
  display: grid;
  gap: 0.4rem;
  /* $narrow: tier/Flops cells show only the symbol (KB, MF…), so three fit a 320px phone; named
     (global) cells need a full row on a phone and go two-up on wider screens. */
  grid-template-columns: repeat(auto-fill, minmax(${e=>e.$narrow?`4.75rem`:`18.5rem`}, 1fr));
`,Lw=({tier:e})=>(0,Z.jsxs)(`span`,{title:e.name,style:{flexShrink:0},children:[(0,Z.jsx)(n_,{children:e.name}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]}),Rw=X.div`
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
`,zw=X.div`
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
`,Bw=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,Vw=X.div`
  color: ${e=>e.theme.color.textFaint};
  column-gap: 0.3rem;
  display: grid;
  font-size: 0.68rem;
  font-weight: 600;
  grid-template-columns: 1.8rem minmax(0, 1fr) minmax(0, 1fr);
  letter-spacing: 0.06em;
  padding: 0 0.25rem 0 calc(0.45rem + 3px);
  text-transform: uppercase;
`,Hw=X.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,Uw=X.div`
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
`,Ww=X.span`
  color: ${e=>e.$color??e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.1;
  opacity: ${e=>e.$dimmed?.55:1};
`,Gw=X.span`
  display: flex;
  gap: 4px;
`,Kw=X.button`
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
`,qw=X.span`
  color: ${e=>e.theme.color.textFaint};
  font-size: 0.68rem;
  white-space: nowrap;
`,Jw=X.div`
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
`,Yw=X.span`
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
`,Xw=X.span`
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
`,Zw=X.div`
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
`,Qw=X.span`
  font-weight: 600;
  min-width: 0;
`,$w=X.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  margin-right: 0.45rem;
  text-align: center;
  width: 1.5em;
`,eT=X.span`
  display: inline-block;
  margin-right: 0.45rem;
  opacity: ${e=>e.$dimmed?.55:1};
  text-align: center;
  width: 1.5em;
`,tT=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`,nT=X.button`
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
`,rT=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  grid-column: 1 / -1;
  justify-self: stretch;
  line-height: 1.35;
  margin: 0.3rem 0 0;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,iT=X.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`,aT=X.p`
  margin: 0;
  padding: ${({theme:e})=>e.space.md} ${({theme:e})=>e.space.lg};
  margin-bottom: ${({theme:e})=>e.space.sm};
  border-radius: ${({theme:e})=>e.radius.md};
  border: 1px solid #38bdf8;
  font-size: 0.85rem;
  line-height: 1.35;
`,oT=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  font-weight: 400;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,sT=X(Q)`
  font-size: 0.85em;
  gap: 0.35rem;
  min-width: 5.5rem;
  padding: 0.45em 0.7em;
  white-space: nowrap;
`,cT=X.span`
  align-items: center;
  color: ${e=>e.$color};
  display: inline-flex;
  font-size: 0.92em;
  font-variant-numeric: tabular-nums;
  gap: 0.3rem;
  opacity: ${e=>e.$dimmed?.55:1};
  white-space: nowrap;
`,lT=(e,t)=>Math.min(100,Math.round(e/t*100)),uT=({icon:e,subject:t,unit:n,milestone:r,current:i,progressLabel:a,display:o})=>{let s=ch();return(0,Z.jsxs)(iT,{children:[(0,Z.jsx)(cT,{$color:s.color.disabled,$dimmed:!0,"aria-label":`${t} unlocks at ${n} ${r}`,title:`${t} — unlocks at ${n} ${r} (you're at ${n} ${i})`,children:o??(0,Z.jsxs)(Z.Fragment,{children:[e&&`${e} `,`🔒 `,r]})}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":a,"aria-valuenow":Math.min(i,r),"aria-valuemin":0,"aria-valuemax":r})]})},dT=({name:e,icon:t,title:n})=>{let r=ch();return(0,Z.jsxs)(cT,{$color:r.color.good,"aria-label":`${e} unlocked`,title:n??`${e} unlocked`,children:[t,` ✓`]})},fT=({ariaLabel:e,color:t,cost:n,points:r,disabled:i,onClick:a,title:o,icon:s,label:c,progressLabel:l})=>(0,Z.jsxs)(sT,{"aria-label":e,color:i?`darkgrey`:t,disabled:i,onClick:a,title:o,type:`button`,$progress:lT(r,n),$progressColor:t,children:[(0,Z.jsx)($g,{children:s}),(0,Z.jsx)(e_,{children:c}),(0,Z.jsx)(n_,{role:`progressbar`,"aria-label":l,"aria-valuenow":Math.min(r,n),"aria-valuemin":0,"aria-valuemax":n})]}),pT=({ariaLabel:e,narrow:t=!1,bare:n=!1,inlineAction:r=!1,icon:i,name:a,label:o=a,owned:s,enabled:c=!0,onToggle:l,toggleLabel:u,statusTitle:d,title:f,subText:p,lockedBadge:m,lockedAction:h,ownedBadge:g,ownedAction:_})=>{let v=`${a} ${c?`active`:`paused`}`,y=s?_:h;return(0,Z.jsxs)(Rw,{$bare:n,$narrow:t,"aria-label":e,title:f,children:[(0,Z.jsxs)(Jw,{$narrow:t,$wrap:r,children:[(0,Z.jsxs)(Qw,{children:[s&&l&&!i&&(0,Z.jsx)(n_,{role:`img`,"aria-label":v,children:c?`active `:`paused `}),i&&(s&&l?(0,Z.jsx)(eT,{$dimmed:!c,role:`img`,"aria-label":v,title:d,children:i}):(0,Z.jsx)($w,{children:i})),o]}),s&&p&&(0,Z.jsx)(Yw,{$wide:!t,children:p}),r&&(y||!t&&s&&l)&&(0,Z.jsx)(Xw,{$narrow:t,children:y}),s&&l&&(0,Z.jsx)(nw,{$on:c,"aria-label":u,"aria-pressed":c,onClick:l,title:`${c?`Pause`:`Resume`} ${u}`}),s&&!l&&g,!s&&m]}),!r&&y&&(0,Z.jsx)(Zw,{$narrow:t,children:y})]})},mT=[{id:`automation`,icon:`🤖`,ariaLabel:`open automation`,title:`Automation — unlock, pause/resume and speed up every automation`},{id:`prestige`,icon:`✦`,ariaLabel:`open prestige`,title:`Prestige — Speed bonus, Sleep mode, Compression, playtime bonus, Overflow mode and Buy max`}],hT=X.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-variant-numeric: tabular-nums;
  color: ${e=>e.theme.color.text};
`,gT=X.span`
  min-width: 4.5em;
  text-align: center;
  font-size: 0.9rem;
`,_T=X(Q)`
  min-width: 32px;
  min-height: 32px;
  padding: 0;
`,vT={id:`kernels`,icon:`⏻`,ariaLabel:`open kernels`,title:`Kernels — spend Kernels earned by Rebooting`},yT=e=>e>=1e3?`${Math.round(e)/1e3} s`:`${Math.round(e*10)/10} ms`,bT=e=>e>=1e3?`${Number((e/1e3).toFixed(e>=1e4?0:1))}s`:`${Math.round(e)}ms`,xT=e=>String(Number(e.toFixed(2))),ST=e=>`${Number((e/3600).toFixed(1))}h`,CT=e=>{let t=ki(e+1);if(t>1)return`${B(ki(e))} → ${B(t)} PP per extra digit`;let[n,r]=[Oi(e),Oi(e+1)];return`1 PP per ${B(n)} → ${B(r)} extra digit${r===1?``:`s`}`},wT=({ariaLabel:e,icon:t,name:n,value:r,details:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return(0,Z.jsxs)(Fw,{"aria-label":e,children:[(0,Z.jsxs)(tT,{children:[(0,Z.jsx)(Qw,{children:(0,Z.jsxs)(nT,{"aria-expanded":o,"aria-label":`${n} details`,onClick:()=>s(e=>!e),type:`button`,children:[(0,Z.jsx)($w,{children:t}),n]})}),r&&(0,Z.jsx)(oT,{"aria-label":`${n} value`,children:r})]}),a,o&&(0,Z.jsx)(rT,{"aria-label":`${n} description`,children:i})]})},TT=[{key:`speedUp`,name:`Auto Accelerate`,icon:`🌐`,owned:e=>e.autoGlobalTickspeed??!1,enabled:e=>e.autoGlobalTickspeedEnabled??!0,setEnabled:`setAutoGlobalTickspeedEnabled`},{key:`scaleUp`,name:`Auto Scale Up`,icon:`⏩`,owned:e=>e.autoScaleUp??!1,enabled:e=>e.autoScaleUpEnabled??!0,setEnabled:`setAutoScaleUpEnabled`,statusTitle:e=>e?`Scale Up triggers automatically the instant it's eligible`:`Auto Scale Up is paused — it will not trigger until resumed`},{key:`restage`,name:`Auto Restage`,icon:`🧬`,owned:e=>e.autoXpTickspeed??!1,enabled:e=>e.autoXpTickspeedEnabled??!0,setEnabled:`setAutoXpTickspeedEnabled`},{key:`overclock`,name:`Auto Overclock`,icon:`🚀`,owned:e=>e.autoOverclock??!1,enabled:e=>e.autoOverclockEnabled??!0,setEnabled:`setAutoOverclockEnabled`},{key:`purge`,name:`Auto Purge`,icon:`✦`,owned:e=>(e.autoPurge??null)!==null,enabled:e=>e.autoPurgeEnabled??!0,setEnabled:`setAutoPurgeEnabled`}],ET=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=ch(),{purge:a}=n,o=a.points??0,s=a.count??0,c=n.era?.count??0,l=s===0,u=_i(n),[d,f]=(0,v.useState)(`automation`),[p,m]=(0,v.useState)(null),h=Gr(n);(0,v.useEffect)(()=>{f(`automation`)},[t]);let g=n.prestigeDoublePpLevel??0,_=Ai(g),y=!l&&o>=_,x=!n.prestigeSpeedBonusUnlocked&&o>=1,S=dn(s,!0),C=!n.playtimeBonusUnlocked&&o>=100,w=!Yi(n)&&o>=2,T=xn(n),E=Cn(T),D=ST(Sn(n)),O=ST(Sn({...n,sleepModeCapLevel:T+1})),k=ST(Ke),A=!n.cacheWarmUnlocked&&o>=20,j=vn(n),M=mn({...n,playtimeBonusUnlocked:!0}),ee=Me.some(e=>!!n.intro?.[e.autoFlagField]),N=n.computeAutoChargeEnabled??!0,te=n.intro?.computeAutoBoostEnabled??!0,ne=n.eons?.balance??0,re=c>=1||ne>0,F=re?[...mT,vT]:mT,ie=Un(n)||Xn(n)||Object.keys(xt).some(e=>Jn(n,e)),ae={kernels:re&&ie&&`kernel upgrade available`,automation:Cg(n)&&`automation perk available`,prestige:wg(n)&&`prestige perk available`},oe=({maxed:e,cost:t,ariaLabel:n,label:r,onClick:i,progressLabel:a,title:s})=>e?null:(0,Z.jsx)(fT,{ariaLabel:n,color:`#34d399`,cost:t,disabled:u||o<t,icon:`⏫`,label:r??`${B(t)} PP`,onClick:i,points:o,progressLabel:a,title:s}),se=e=>si(n,e.id)?(0,Z.jsxs)(Q,{"aria-label":`Start challenge ${Xv(e)} to unlock ${e.target} speed upgrades${h?` (disabled: another challenge is active)`:``}`,disabled:!!h,onClick:()=>m(e.id),title:`Complete challenge ${e.id} to unlock this automation's speed upgrades`,type:`button`,variant:`prestige`,children:[`🏁 `,e.id]}):(0,Z.jsxs)(Q,{"aria-label":`Challenge ${e.id} ${Yv(e).toLowerCase()}`,disabled:!0,title:Yv(e),type:`button`,variant:`prestige`,children:[`🔒 `,e.id]}),ce=(e,t)=>{let r=ci(e,t);return r&&!Kr(n,r.id)?r:null},I=b.every(e=>{let t=n.autobuyerIntervalLevels?.[e.id]??0,r=n.tierTickspeedIntervalLevels?.[e.id]??0;return(n.autobuyers[e.id]??null)!==null&&!!n.tierTickspeedAutobuyer?.[e.id]&&t>=yd(e.id)&&r>=jd()&&!ce(`tierTickspeed`,e.id)&&!ce(`tierAutobuyer`,e.id)}),le=()=>{let e=zr(n),t=(e,t,n)=>{let r=Math.max(0,e.indexOf(t));return e[Math.min(e.length-1,Math.max(0,r+n))]},i=[{key:`targetPpExponent`,icon:`✦`,name:`Purge at PP`,options:Array.from({length:101},(e,t)=>t),label:e=>e===0?`Off`:`10^${e} PP`,details:`Auto Purge waits until a Purge would award at least this many PP. Needs Overflow mode (production must keep running past 1 Googol Bytes); the manual Purge always works.`},{key:`minSeconds`,icon:`⏳`,name:`Minimum time`,options:_t,label:e=>e===0?`Off`:e>=3600?`${e/3600} h`:e>=60?`${e/60} min`:`${e} s`,details:`Auto Purge waits until this much time has passed since the last Purge, or Googol Bytes is reached, whichever is later.`},{key:`bestMultiplier`,icon:`📈`,name:`Best PP multiple`,options:vt,label:e=>e===0?`Off`:`×${e}`,details:`Auto Purge waits until a Purge would award at least this multiple of your best Purge award since the last Reboot. Needs Overflow mode.`}];return(0,Z.jsx)(Z.Fragment,{children:i.map(n=>{let i=e[n.key],a=t(n.options,i,-1),o=t(n.options,i,1);return(0,Z.jsx)(wT,{ariaLabel:`auto purge ${n.name.toLowerCase()} setting`,details:n.details,icon:n.icon,name:n.name,children:(0,Z.jsxs)(hT,{role:`group`,"aria-label":`${n.name} stepper`,children:[(0,Z.jsx)(_T,{"aria-label":`Decrease ${n.name}`,disabled:a===i,onClick:()=>r.setAutoPurgeSetting(n.key,a),type:`button`,children:`−`}),(0,Z.jsx)(gT,{"aria-label":`${n.name} value`,children:n.label(i)}),(0,Z.jsx)(_T,{"aria-label":`Increase ${n.name}`,disabled:o===i,onClick:()=>r.setAutoPurgeSetting(n.key,o),type:`button`,children:`+`})]})},n.key)})})},ue=()=>(0,Z.jsxs)(Mw,{"aria-label":`automation firmware page`,children:[(0,Z.jsxs)(Nw,{"aria-label":`global automation category`,children:[(0,Z.jsx)(Pw,{children:`Global Automation`}),(0,Z.jsx)(Iw,{children:TT.map(e=>{let t=e.owned(n),i=e.enabled(n),a=kd(n,e.key),o=n.automationIntervalLevels?.[e.key]??0,c=o>=Td(e.key),l=Dd(e.key,o),u=ci(`global`,e.key),d=u&&!Kr(n,u.id)?u:null;return(0,Z.jsx)(pT,{ariaLabel:`${e.name.toLowerCase()} row`,enabled:i,icon:e.icon,inlineAction:!0,label:e.name.replace(/^Auto /,``),lockedBadge:(0,Z.jsx)(uT,{current:s,milestone:Rr(e.key),progressLabel:`${e.name} unlock milestone progress`,subject:e.name,unit:`Purge`}),name:e.name,onToggle:()=>r[e.setEnabled](!i),owned:t,ownedAction:a?d?se(d):oe({maxed:c,cost:l,ariaLabel:`Upgrade ${e.name} speed to level ${o+1} for ${B(l)} Purge Points — interval ×0.9`,onClick:()=>r.buyAutomationIntervalUpgrade(e.key),progressLabel:`${e.name} speed PP progress`,title:`Spend Purge Points to shorten this automation's interval by 10% (floor 10 ms); cost doubles each level`}):null,statusTitle:e.statusTitle?.(i),subText:a&&!c?bT(Ed(n,e.key)*1e3):null,title:a&&c?`${e.name}: every ${yT(Ed(n,e.key)*1e3)} (max)`:void 0,toggleLabel:`${e.name} automation`},e.key)})}),n.autoPurge!=null&&le()]}),(0,Z.jsxs)(Nw,{"aria-label":`tier autobuyers category`,children:[(0,Z.jsx)(Pw,{children:`Tier Autobuyers`}),I?(0,Z.jsx)(Hw,{"aria-label":`tier autobuyer tiles`,role:`group`,children:b.map((e,t)=>{let a=n.autobuyersEnabled?.[e.id]??!0,o=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,s=`${e.name}'s tickspeed autobuyer`,c=`${e.name}'s autobuyer`;return(0,Z.jsxs)(Uw,{$on:a&&o,"aria-label":`${e.name} automation`,title:`${e.name}: tickspeed autobuyer and autobuyer fully upgraded`,children:[(0,Z.jsx)(Ww,{$color:i.tierAccents[t%i.tierAccents.length],children:(0,Z.jsx)(Lw,{tier:e})}),(0,Z.jsxs)(Gw,{children:[(0,Z.jsx)(n_,{role:`img`,"aria-label":`${s} ${o?`active`:`paused`}`}),(0,Z.jsx)(Kw,{$on:o,"aria-label":s,"aria-pressed":o,onClick:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!o),title:`${o?`Pause`:`Resume`} ${s}`,type:`button`,children:`⚙`}),(0,Z.jsx)(n_,{role:`img`,"aria-label":`${c} ${a?`active`:`paused`}`}),(0,Z.jsx)(Kw,{$on:a,"aria-label":c,"aria-pressed":a,onClick:()=>r.setAutobuyerEnabled(e.id,!a),title:`${a?`Pause`:`Resume`} ${c}`,type:`button`,children:`🤖`})]})]},e.id)})}):(0,Z.jsxs)(Bw,{children:[(0,Z.jsxs)(Vw,{"aria-hidden":`true`,children:[(0,Z.jsx)(`span`,{children:`Tier`}),(0,Z.jsx)(`span`,{children:`⚙ Tickspeed`}),(0,Z.jsx)(`span`,{children:`🤖 Buy`})]}),b.map((e,t)=>{let a=(n.autobuyers[e.id]??null)!==null,o=n.autobuyersEnabled?.[e.id]??!0,c=Qt(e.id),l=n.autobuyerIntervalLevels?.[e.id]??0,u=l>=yd(e.id),d=l>=md(e.id),f=a?vd(n,e.id):1,p=Sd(l,e.id),m=n.tierTickspeedAutobuyer?.[e.id]??!1,h=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,g=n.tierTickspeedIntervalLevels?.[e.id]??0,_=g>=jd(),v=Nd(g,e.id),y=ce(`tierTickspeed`,e.id),b=ce(`tierAutobuyer`,e.id);return(0,Z.jsxs)(zw,{$accent:i.tierAccents[t%i.tierAccents.length],"aria-label":`${e.name} automation`,children:[(0,Z.jsx)(Lw,{tier:e}),(0,Z.jsx)(pT,{ariaLabel:`${e.name} tickspeed autobuyer`,enabled:h,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,Z.jsx)(uT,{current:s,milestone:$t(e.id),progressLabel:`${e.name} tickspeed autobuyer milestone progress`,subject:`${e.name}'s tickspeed autobuyer`,unit:`Purge`}),name:`${e.name}'s tickspeed autobuyer`,onToggle:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!h),owned:m,ownedAction:y?se(y):oe({maxed:_,cost:v,ariaLabel:`Upgrade ${e.name}'s tickspeed autobuyer speed to level ${g+1} for ${B(v)} Purge Points — interval ×0.9`,onClick:()=>r.buyTierTickspeedIntervalUpgrade(e.id),progressLabel:`${e.name} tickspeed autobuyer speed PP progress`,title:`Spend Purge Points to shorten this tier's tickspeed autobuyer interval by 10% (floor 10 ms); cost doubles each level`}),subText:m&&!_?bT(Md(n,e.id)*1e3):null,title:m&&_?`${e.name} tickspeed autobuyer: every ${yT(Md(n,e.id)*1e3)} (max)`:void 0,toggleLabel:`${e.name}'s tickspeed autobuyer`}),(0,Z.jsx)(pT,{ariaLabel:`${e.name} autobuyer`,enabled:o,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,Z.jsx)(uT,{current:s,milestone:c,progressLabel:`${e.name} autobuyer unlock milestone progress`,subject:`${e.name}'s autobuyer`,unit:`Purge`}),name:`${e.name}'s autobuyer`,onToggle:()=>r.setAutobuyerEnabled(e.id,!o),owned:a,ownedAction:b?se(b):oe({maxed:u,cost:p,ariaLabel:d?`Upgrade ${e.name}'s autobuyer to level ${l+1} for ${B(p)} Purge Points — doubles levels bought per attempt to up to ${f*2}`:`Upgrade ${e.name}'s autobuyer speed to level ${l+1} for ${B(p)} Purge Points — interval ×0.9`,label:void 0,onClick:()=>r.buyAutobuyerIntervalUpgrade(e.id),progressLabel:`${e.name} autobuyer speed PP progress`,title:d?`At the 10 ms floor, each further level doubles how many full levels one autobuyer attempt can buy (as many as are affordable, at least one); cost keeps rising`:`Spend Purge Points to shorten this autobuyer's purchase interval by 10% (floor 10 ms); past the floor, levels double how many levels it buys per attempt`}),subText:a&&!u?f>1?`×${f}`:bT(gd(n,e.id)*1e3):null,title:a&&u?`${e.name} autobuyer: every ${yT(gd(n,e.id)*1e3)} · ${f}/buy (max)`:void 0,toggleLabel:`${e.name}'s autobuyer`})]},e.id)})]})]}),ee&&(0,Z.jsxs)(Nw,{"aria-label":`power automation category`,children:[(0,Z.jsx)(Pw,{children:`Power Automation`}),(0,Z.jsxs)(Iw,{children:[ee&&(0,Z.jsx)(pT,{ariaLabel:`auto-charge row`,enabled:N,icon:`🔌`,inlineAction:!0,label:`Charge`,name:`Auto-charge`,onToggle:()=>r.setComputeAutoChargeEnabled(!N),owned:!0,statusTitle:N?`Auto-charge starts timed reserve charges on its own`:`Auto-charge is paused — no new automatic charge starts until resumed (instant charge-ups still work)`,title:`Bought per tier on Power; pause or resume all of them here`,toggleLabel:`Auto-charge`}),(0,Z.jsx)(pT,{ariaLabel:`auto boost row`,enabled:te,icon:`🤖`,inlineAction:!0,label:`Boost`,name:`Auto Boost`,onToggle:()=>r.setComputeAutoBoostEnabled(!te),owned:!0,statusTitle:te?`Auto Boost spends one token on your preferred Boost preset with each automatic charge`:`Auto Boost is paused`,title:`Automatic once any tier's Auto-charge is bought on Power; pause it and choose its preset here`,toggleLabel:`Auto Boost`}),(0,Z.jsxs)(Rw,{"aria-label":`compute auto boost`,style:{gridColumn:`1 / -1`},children:[(0,Z.jsx)(Jw,{children:(0,Z.jsx)(Qw,{children:`Boost preset`})}),(0,Z.jsx)(Tw,{onChange:r.setComputeAutoBoostType,value:n.intro.computeAutoBoostType??`standard`})]})]})]}),n.computeFlops?.pageUnlocked&&(0,Z.jsxs)(Nw,{"aria-label":`compute autobuyers category`,children:[(0,Z.jsx)(Pw,{children:`Compute Autobuyers`}),(0,Z.jsx)(Hw,{"aria-label":`compute autobuyer tiles`,role:`group`,children:pt.map(e=>{let t=(n.computeFlopsAutobuyers?.[e.id]??null)!==null,i=n.computeFlopsAutobuyersEnabled?.[e.id]??!0,a=`${e.name} (${e.outputLabel}) autobuyer`,o=er(e.id);return(0,Z.jsxs)(Uw,{$on:t&&i,"aria-label":`${e.name} · ${e.outputLabel} autobuyer`,children:[(0,Z.jsx)(Ww,{$dimmed:!t,children:(0,Z.jsx)(Lw,{tier:e})}),t?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(n_,{role:`img`,"aria-label":`${a} ${i?`active`:`paused`}`}),(0,Z.jsx)(Kw,{$on:i,"aria-label":a,"aria-pressed":i,onClick:()=>r.setComputeFlopsAutobuyerEnabled(e.id,!i),title:`${i?`Pause`:`Resume`} ${a}`,type:`button`,children:i?`on`:`paused`})]}):(0,Z.jsx)(qw,{children:(0,Z.jsx)(uT,{current:c,display:`🔒 R${o}`,milestone:o,progressLabel:`${e.name} (${e.outputLabel}) autobuyer unlock milestone progress`,subject:`${e.name} (${e.outputLabel}) autobuyer`,unit:`Reboot`})})]},e.id)})})]})]}),de=()=>(0,Z.jsxs)(Mw,{"aria-label":`prestige firmware page`,children:[(0,Z.jsxs)(Nw,{"aria-label":`purge points category`,children:[(0,Z.jsx)(Pw,{children:`Purge Points`}),!n.prestigeSpeedBonusUnlocked&&(0,Z.jsx)(aT,{"aria-label":`purge points tutorial`,children:`Purge Points (PP) buy permanent upgrades. Start with the Speed bonus.`}),(0,Z.jsx)(wT,{ariaLabel:`speed bonus upgrade`,details:`Multiplies all production, growing with your Purge count: ×1.1 after the 1st Purge, ×2 at 10, ×3 at 100, ×4 at 1,000… (×(1 + log₁₀ Purges)). One-time purchase, permanent.`,icon:`🚀`,name:`Speed bonus`,value:n.prestigeSpeedBonusUnlocked?`Production ×${xT(S)}`:`Production ×1 → ×${xT(S)}`,children:n.prestigeSpeedBonusUnlocked?(0,Z.jsx)(dT,{icon:`🚀`,name:`Speed bonus`}):(0,Z.jsx)(fT,{ariaLabel:`Unlock speed bonus for 1 Purge Points`,color:`#38bdf8`,cost:1,disabled:!x,icon:`🔓`,label:`${B(1)} PP`,onClick:r.buyPrestigeSpeedBonus,points:o,progressLabel:`Speed bonus unlock PP progress`})}),(0,Z.jsx)(wT,{ariaLabel:`sleep mode upgrade`,details:`Longest time away simulated when you come back (at ${Ue*100}% speed past 10 min). Each level adds ${k}: ${qe.map(e=>B(e)).join(` / `)} PP, up to ${ST(We)}.`,icon:`😴`,name:`Sleep mode`,value:E===null?`Time away: up to ${D}`:`Time away: up to ${D} → ${O}`,children:E===null?(0,Z.jsx)(dT,{icon:`😴`,name:`Sleep mode`,title:`Sleep mode at its maximum`}):(0,Z.jsx)(fT,{ariaLabel:`Buy Sleep mode level ${T+1} for ${B(E)} Purge Points — +${k} of time away`,color:`#a78bfa`,cost:E,disabled:o<E,icon:`⏫`,label:`${B(E)} PP`,onClick:r.buySleepModeCapUpgrade,points:o,progressLabel:`Sleep mode upgrade PP progress`})}),(0,Z.jsx)(wT,{ariaLabel:`compression upgrade`,details:`Past 1 Googol Bytes, each extra digit of your balance earns more Purge Points. Each level halves the digits needed per PP until 1, then doubles PP per digit. Costs 10, 100, 1,000… PP.`,icon:`✦`,name:`Compression`,value:CT(g),children:(0,Z.jsx)(fT,{ariaLabel:`Buy Compression level ${g+1} for ${B(_)} Purge Points — ${g<6?`halves powers needed per PP`:`doubles PP per power`}`,color:`#fbbf24`,cost:_,disabled:!y,icon:`⏫`,label:`${B(_)} PP`,onClick:r.buyPrestigeDoublePp,points:o,progressLabel:`Compression upgrade PP progress`})}),(0,Z.jsx)(wT,{ariaLabel:`cache warm upgrade`,details:`Every Purge, Scale Up, Overclock, challenge exit and Reboot starts with level 1 already complete, free, for the tier of your highest unlocked Storage pool, disks or not (now ${j.name}). One-time purchase, permanent. Not applied inside challenges.`,icon:`🔥`,name:`Cache Warm`,value:n.cacheWarmUnlocked?`Runs start with ${j.symbol} level 1 done`:`Start runs with ${j.symbol} level 1 done`,children:n.cacheWarmUnlocked?(0,Z.jsx)(dT,{icon:`🔥`,name:`Cache Warm`}):(0,Z.jsx)(fT,{ariaLabel:`Unlock Cache Warm for 20 Purge Points`,color:`#f97316`,cost:20,disabled:!A,icon:`🔓`,label:`${B(20)} PP`,onClick:r.buyCacheWarm,points:o,progressLabel:`Cache Warm unlock PP progress`})}),(0,Z.jsx)(wT,{ariaLabel:`playtime bonus upgrade`,details:`+${Ze*100}% production per hour of active play. Offline, hidden-tab and background time don't count. One-time purchase, permanent.`,icon:`⏱`,name:`Playtime bonus`,value:n.playtimeBonusUnlocked?`Production ×${xT(M)}`:`+${Ze*100}% production per hour played`,children:n.playtimeBonusUnlocked?(0,Z.jsx)(dT,{icon:`⏱`,name:`Playtime bonus`}):(0,Z.jsx)(fT,{ariaLabel:`Unlock playtime bonus for 100 Purge Points`,color:`#38bdf8`,cost:100,disabled:!C,icon:`🔓`,label:`${B(100)} PP`,onClick:r.buyPlaytimeBonus,points:o,progressLabel:`Playtime bonus unlock PP progress`})}),(0,Z.jsx)(wT,{ariaLabel:`overflow mode unlock`,details:`Keep earning past 1 Googol Bytes without freezing; Purge whenever you choose to claim PP. Unlocks when Auto Purge's interval reaches 1 s or less.`,icon:`♾`,name:`Overflow mode`,value:Ur(n)?null:`Keep producing past 1 Googol Bytes`,children:Ur(n)?(0,Z.jsx)(dT,{icon:`♾`,name:`Overflow mode`}):(0,Z.jsx)(cT,{$color:i.color.disabled,$dimmed:!0,"aria-label":`Overflow mode locked`,title:`Unlocks when Auto Purge's interval reaches 1 s or less`,children:`♾ 🔒`})})]}),(0,Z.jsxs)(Nw,{"aria-label":`purchasing category`,children:[(0,Z.jsx)(Pw,{children:`Purchasing`}),(0,Z.jsx)(wT,{ariaLabel:`buy mode toggle`,details:`Level (default): each Factory Buy fills as many units as you can afford, up to the end of the current level. Single: each Buy purchases exactly one unit (it overrides Buy max for the Buy button). Autobuyers follow the mode at the same interval, so in Single they buy one unit per attempt — a level takes several times longer. The choice is per device.`,icon:`🛒`,name:`Buy mode`,children:(0,Z.jsx)(Sw,{game:e})}),(0,Z.jsx)(wT,{ariaLabel:`buy max toggle`,details:`When on, each purchase buys as many levels as you can afford. Factory tiers buy full levels only — a partly bought level takes its own click. One-time purchase; the switch is per device.`,icon:`⏭`,name:`Buy max`,value:Yi(n)?null:`Buy every affordable level in one tap`,children:Yi(n)?(0,Z.jsx)(vw,{game:e}):(0,Z.jsx)(fT,{ariaLabel:`Unlock Buy max for 2 Purge Points`,color:`#38bdf8`,cost:2,disabled:!w,icon:`🔓`,label:`${B(2)} PP`,onClick:r.buyBuyMaxUnlock,points:o,progressLabel:`Buy max unlock PP progress`})})]})]}),fe=({ariaLabel:e,cost:t,disabled:n,onClick:r,progressLabel:i})=>(0,Z.jsx)(fT,{ariaLabel:e,color:`#a78bfa`,cost:t,disabled:n,icon:`🏷️`,label:`${B(t)} ${t===1?`Kernel`:`Kernels`}`,onClick:r,points:ne,progressLabel:i}),pe=e=>`${B(e*100)}%/s`;return(0,Z.jsxs)(Ew,{children:[(0,Z.jsxs)(Dw,{children:[(0,Z.jsx)(`h1`,{children:`Firmware`}),d===`kernels`&&re?(0,Z.jsxs)(Ow,{"aria-label":`kernels display`,children:[`⏻ `,B(ne),` `,ne===1?`Kernel`:`Kernels`]}):(0,Z.jsxs)(Ow,{"aria-label":`purge points display`,children:[`✦ `,B(o),` PP`]})]}),(0,Z.jsx)(kw,{role:`tablist`,"aria-label":`firmware view`,children:F.map(e=>(0,Z.jsxs)(Aw,{"aria-label":e.ariaLabel,"aria-selected":d===e.id,color:d===e.id?i.color.text:i.color.textMuted,onClick:()=>f(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),ae[e.id]&&(0,Z.jsx)(jw,{"aria-label":ae[e.id]})]},e.id))}),d===`automation`&&ue(),d===`prestige`&&de(),d===`kernels`&&re&&(()=>{let e=n.hyperscalerCount??0,t=Gn(n,`hyperscalerEfficiency`),i=qn(n,`hyperscalerEfficiency`),a=ft,o=e=>a+e*yt,s=Kn(`hyperscalerEfficiency`,t),c=Gn(n,`eonAmplifier`),l=qn(n,`eonAmplifier`),u=Kn(`eonAmplifier`,c),d=!!n.eonsUpgrades?.autoHyperscalerUnlocked,f=n.eonsUpgrades?.autoHyperscalerEnabled??!0,p=Hn(e);return(0,Z.jsx)(Mw,{children:(0,Z.jsxs)(Nw,{"aria-label":`kernels category`,children:[(0,Z.jsx)(Pw,{children:`Kernels`}),(0,Z.jsx)(wT,{ariaLabel:`hyperscaler upgrade`,details:`Each hyperscaler adds ${pe(o(t))} per second to every Factory tier's Flops boost until the next Purge, Scale Up or Overclock. Hyperscalers are permanent and survive Purge and Reboot; the boost they have built resets with it.`,icon:`☁`,name:`Hyperscaler`,value:`${e} owned · +${pe(o(t))} each`,children:fe({ariaLabel:`Buy hyperscaler for ${B(p)} Kernels`,cost:p,disabled:!Un(n),onClick:r.buyHyperscaler,progressLabel:`Hyperscaler Kernel progress`})}),(0,Z.jsx)(wT,{ariaLabel:`hyperscaler efficiency upgrade`,details:`Each level adds ${pe(yt)} per second to every hyperscaler. Level ${t} of ${xt.hyperscalerEfficiency.maxLevel}.`,icon:`⚙`,name:`Hyperscaler efficiency`,value:i?`Level ${t} (max)`:`+${pe(o(t))} → +${pe(o(t+1))} each`,children:i?(0,Z.jsx)(dT,{icon:`⚙`,name:`Hyperscaler efficiency`}):fe({ariaLabel:`Buy hyperscaler efficiency for ${B(s)} Kernels`,cost:s,disabled:!Jn(n,`hyperscalerEfficiency`),onClick:()=>r.buyEonUpgrade(`hyperscalerEfficiency`),progressLabel:`Hyperscaler efficiency Kernel progress`})}),(0,Z.jsx)(wT,{ariaLabel:`kernel amplifier upgrade`,details:`Each level multiplies the Kernels a Reboot awards by 10. Level ${c} of ${xt.eonAmplifier.maxLevel}.`,icon:`🔆`,name:`Kernel amplifier`,value:l?`${B(Vn(n))} Kernels per Reboot (max)`:`${B(Vn(n))} → ${B(Vn({...n,eonsUpgrades:{...n.eonsUpgrades,eonAmplifierLevel:c+1}}))} Kernels per Reboot`,children:l?(0,Z.jsx)(dT,{icon:`🔆`,name:`Kernel amplifier`}):fe({ariaLabel:`Buy kernel amplifier for ${B(u)} Kernels`,cost:u,disabled:!Jn(n,`eonAmplifier`),onClick:()=>r.buyEonUpgrade(`eonAmplifier`),progressLabel:`Kernel amplifier Kernel progress`})}),(0,Z.jsx)(wT,{ariaLabel:`auto hyperscaler upgrade`,details:`Buys a hyperscaler automatically whenever you can afford one. Pause it to save Kernels for other upgrades. One-time purchase, permanent.`,icon:`🤖`,name:`Auto Hyperscaler`,value:d?null:`Buys hyperscalers for you`,children:d?(0,Z.jsx)(nw,{$on:f,"aria-label":`Auto Hyperscaler`,"aria-pressed":f,onClick:()=>r.setAutoHyperscalerEnabled(!f),title:`${f?`Pause`:`Resume`} Auto Hyperscaler`}):fe({ariaLabel:`Unlock Auto Hyperscaler for 100 Kernels`,cost:100,disabled:!Xn(n),onClick:r.buyAutoHyperscaler,progressLabel:`Auto Hyperscaler Kernel progress`})})]})})})(),(0,Z.jsx)(ix,{def:p?P.find(e=>e.id===p):null,onCancel:()=>m(null),onConfirm:()=>{r.enterChallenge(p),m(null)},state:n})]})},DT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),OT=new Set([`Tens`,`Thousands`,`Millions`,`Billions`,`Trillions`,`Quadrillions`,`Pentillions`,`Hexillions`,`Septillions`,`Octillions`,`Nonillions`,`Decillions`]),kT=[`resources`,`owned`,`purchased`,`purchaseLevels`,`purchaseLevelProgress`,`autobuyers`,`autobuyersEnabled`,`tickspeedLevels`,`autobuyerAttemptBudgets`,`tierProductionAccumulators`,`smartAutobuyer`,`tierTickspeedAutobuyer`,`tierTickspeedAutobuyerEnabled`,`everUnlockedTierIds`],AT=e=>e&&DT(e)&&Object.keys(e).some(e=>OT.has(e)),jT=e=>{if(!e||!DT(e)||e.saveSchemaVersion===3)return null;if(e.resources?.Ones!==void 0)return`legacy_money_id`;let t=e.intro;if(t===void 0){if(kT.some(t=>{let n=e[t];return n&&DT(n)&&Object.keys(n).length>0}))return`missing_intro`}else{if(t.completed!==void 0&&t.mainGameUnlocked===void 0)return`legacy_intro_gate`;if(t.storageBanks!==void 0||t.storageBanksBuiltTotal!==void 0||t.storageAutoRedeemedSizes!==void 0)return`legacy_storage_fields`}return e.prestige?.pp!==void 0&&e.prestige?.xp===void 0?`legacy_prestige_xp`:e.prestige?.level!==void 0&&e.prestige?.count===void 0?`legacy_prestige_count`:e.autobuyers&&Object.values(e.autobuyers).some(e=>e===!0||e===!1)?`legacy_boolean_autobuyers`:e.autoPrestige===!0||e.autoPrestige===!1?`legacy_boolean_auto_prestige`:kT.some(t=>AT(e[t]))?`legacy_tier_ids`:null},MT=[[`reboot`,`purge`],[`prestige`,`purge`],[`autoReboot`,`autoPurge`],[`autoPrestige`,`autoPurge`],[`autoRebootEnabled`,`autoPurgeEnabled`],[`autoPrestigeEnabled`,`autoPurgeEnabled`],[`autoRebootAttemptBudget`,`autoPurgeAttemptBudget`],[`autoPrestigeAttemptBudget`,`autoPurgeAttemptBudget`]],NT=[[`latency`,`speedUp`],[`reboot`,`purge`],[`prestige`,`purge`]],PT=[[`rebootNumber`,`purgeNumber`],[`prestigeNumber`,`purgeNumber`]],FT=(e,t)=>{if(!e||typeof e!=`object`)return e;let n={...e};for(let[e,r]of t)e in n&&(r in n||(n[r]=n[e]),delete n[e]);return n},IT=e=>{let t=FT(e,MT);return t.automationIntervalLevels&&=FT(t.automationIntervalLevels,NT),t.automationAttemptBudgets&&=FT(t.automationAttemptBudgets,NT),Array.isArray(t.prestigeMuseum?.history)&&(t.prestigeMuseum={...t.prestigeMuseum,history:t.prestigeMuseum.history.map(e=>FT(e,PT))}),t},LT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),RT=e=>{let{saveSchemaVersion:t,...n}=e;return n},zT=e=>{if(!LT(e))return{ok:!1,reason:`invalid_payload`};if(e.saveSchemaVersion===3)return{ok:!0,payload:RT(e)};if(e.saveSchemaVersion===1||e.saveSchemaVersion===2)return{ok:!0,payload:IT(RT(e))};let t=jT(e);return t?{ok:!1,reason:t}:{ok:!0,payload:IT(e)}},BT=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),VT=e=>JSON.parse(e,(e,t)=>{if(e!==`__proto__`&&e!==`constructor`&&e!==`prototype`)return t}),HT=()=>cE(),UT=(e,t=HT())=>{if(!t)return zT(e);if(!e||typeof e!=`object`||Array.isArray(e))return{ok:!1,reason:`invalid_payload`};let{saveSchemaVersion:n,...r}=e;return{ok:!0,payload:IT(r)}},WT=`tens_game_state`,GT=`tens_last_save_timestamp`,KT=`tens_saves_meta`,qT=`tens_dev_mode_active`,JT=`dev`,YT=`tens_dev_state`,XT=`tens_dev_timestamp`,ZT=`TENS-SUPPORT`,QT=e=>e===JT?YT:e===`0`?WT:`tens_slot_${e}_state`,$T=e=>e===JT?XT:e===`0`?GT:`tens_slot_${e}_timestamp`,eE=e=>`Save ${e+1}`,tE=()=>({activeSlotId:`0`,unlockedSlotCount:1,supporterUnlocked:!1,supporterSource:null,slots:[{id:`0`,name:eE(0)}]}),nE=e=>String(e??``).trim().toUpperCase().replace(/[\s_]+/g,`-`).replace(/-+/g,`-`),rE=()=>{try{let e=localStorage.getItem(KT);return e?VT(e):null}catch{return null}},iE=e=>{try{localStorage.setItem(KT,JSON.stringify(e))}catch{}},aE=e=>{let t=e.supporterUnlocked?3:1,n=[],r=new Map;if(e.slots)for(let t of e.slots)r.set(t.id,t);for(let e=0;e<t;e+=1){let t=String(e);n.push(r.get(t)??{id:t,name:eE(e)})}let i=n.some(t=>t.id===e.activeSlotId)?e.activeSlotId:`0`;return{...e,unlockedSlotCount:t,activeSlotId:i,slots:n,supporterUnlocked:!!e.supporterUnlocked,supporterSource:e.supporterSource??null}},oE=e=>{let t=tE();if(!BT(e))return t;let n=!!e.supporterUnlocked,r=new Map;if(Array.isArray(e.slots))for(let t of e.slots){if(!BT(t))continue;let e=String(t.id??``);if(!/^\d+$/.test(e))continue;let n=Number(e);n<0||n>=3||r.set(e,{id:e,name:typeof t.name==`string`&&t.name.trim()?t.name.trim():eE(n)})}return aE({...t,supporterUnlocked:n,supporterSource:e.supporterSource===`code`||e.supporterSource===`dummy_purchase`?e.supporterSource:n?`code`:null,activeSlotId:String(e.activeSlotId??`0`),slots:Array.from(r.values())})},sE=()=>{let e=oE(rE());return iE(e),e},cE=()=>{try{return localStorage.getItem(qT)===`1`}catch{return!1}},lE=e=>{try{e?localStorage.setItem(qT,`1`):localStorage.removeItem(qT)}catch{}},uE=()=>cE()?JT:sE().activeSlotId,dE=(e=`code`)=>{let t=sE();if(t.supporterUnlocked)return{ok:!0,already:!0,meta:t};let n=aE({...t,supporterUnlocked:!0,supporterSource:e===`dummy_purchase`?`dummy_purchase`:`code`});return iE(n),{ok:!0,meta:n}},fE=e=>{try{return localStorage.getItem(QT(e))!=null}catch{return!1}},pE=()=>{let e=sE(),t=[],n=new Map;for(let t of e.slots)n.set(t.id,t);for(let r=0;r<3;r+=1){let i=String(r),a=r<e.unlockedSlotCount,o=n.get(i);t.push({id:i,name:o?.name??eE(r),unlocked:a,isActive:e.activeSlotId===i,isEmpty:!a||!fE(i)})}return t},mE=e=>{if(cE())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=sE(),r=Number(t);if(!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount)return{ok:!1,reason:`locked`};if(n.activeSlotId===t)return{ok:!0,already:!0,meta:n};let i={...n,activeSlotId:t};return iE(i),{ok:!0,meta:i}},hE=(e,t)=>{let n=String(e),r=sE(),i=String(t??``).trim();if(!i)return{ok:!1,reason:`empty`};let a=r.slots.findIndex(e=>e.id===n);if(a<0)return{ok:!1,reason:`missing`};let o=r.slots.map((e,t)=>t===a?{...e,name:i.slice(0,40)}:e),s={...r,slots:o};return iE(s),{ok:!0,meta:s}},gE=e=>nE(e)===`TENS-SUPPORT`?dE(`code`):{ok:!1,reason:`invalid`},_E=()=>dE(`dummy_purchase`),vE=()=>{let e=sE();return e.slots.find(t=>t.id===e.activeSlotId)?.name??eE(0)},yE=()=>{let e=sE(),t=vE(),n=[];return e.unlockedSlotCount>1&&n.push(`other save slots`),e.supporterUnlocked&&n.push(`your Supporter unlock`),`Erase "${t}" (active save) and start over from the Byte Foundry?${n.length?`\n\nKept: ${n.join(` and `)}.`:``}\n\nThis cannot be undone.`},bE=()=>`Reformat Byte Foundry on "${vE()}"?\n\nUse this if Capacity (or Storage / Compute) went too far.\n\nErased: Data Stream Buffer, Data Stream Capacity (and pool staging), Data Stream upgrade progress, all Disks/Storage, and all Compute. Multipliers restart from scratch.\n\nConvenience: Compile, Upgrade Data Stream, and Provision Disk all auto-press again up to your pre-reset highs as soon as each is affordable — you do not need to click them. Capacity remains on its doubling ladder up to the active pool ceiling.\n\nAlso kept: Byte Factory, Purge Points, Purge count and upgrades, and (if already unlocked) access to the main game this cycle.\n\nOther save slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,xE=e=>`Clear "${e?.name??`this save`}"${e?.isActive?` (currently active — you will restart at the Byte Foundry)`:``}?\n\nOther slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,SE=()=>`Erase ALL save progress on this device?\n\n${sE().supporterUnlocked?`Your Supporter unlock and slot names stay.`:`Slot names stay.`}\n\nThis cannot be undone.`,CE=e=>{try{localStorage.removeItem(QT(e)),localStorage.removeItem($T(e))}catch{}},wE=e=>{if(cE())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=sE(),r=Number(t);return!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount?{ok:!1,reason:`locked`}:(CE(t),{ok:!0,clearedActive:n.activeSlotId===t,meta:n})},TE=()=>{if(cE())return{ok:!1,reason:`dev_mode_active`};for(let e=0;e<3;e+=1)CE(String(e));return{ok:!0,meta:sE()}},EE=e=>{try{let t=uE(),n=(e??localStorage).getItem(QT(t));return n?VT(n):null}catch{return null}},DE=()=>{let e=uE(),t=EE();if(!t)return null;let n=UT(t);return n.ok?null:(CE(e),HT()?null:n.reason)},OE=(e,t)=>({...e,...t??{}}),kE=e=>BT(e)&&!(`depositedUnits`in e)&&(`deposits`in e||`transfers`in e),AE=e=>kE(e)&&Array.isArray(e.transfers)?e.transfers.length:0,jE=e=>{let t=e.deposits??{},n=Ie.reduce((e,n)=>e+(Number(t[n])||0)*n,0),r=Math.max(0,Number(e.purchased)||0)+AE(e);return{depositedUnits:n,fillBits:0,purchased:r,boostersUnlocked:n>0||r>0,autoConvertActive:!1,capacityLevel:Math.max(0,Number(e.capacityLevel)||0)}},ME=(e,t)=>{let n=Ot(),r={};for(let e of Object.keys(n)){let i=t?.[e];if(kE(i)){n[e]={...n[e],...jE(i)};let t=AE(i);t>0&&(r[e]=t)}else n[e]={...n[e],...i??{}}}return{dataLakes:n,pendingComputeGrants:r}},NE=(e,t)=>{let n=Object.keys(t);if(n.length===0)return e;let r={...e};for(let e of n){let n=Number(e),i=Fe[n-1];if(!i)continue;let a=t[e];r[i]=(r[i]??0)+a,n===1&&(r.computeCoresEverEarned=(r.computeCoresEverEarned??0)+a,r.computeMergePageUnlocked=(r.computeMergePageUnlocked??!1)||r.computeCoresEverEarned>=8)}return r},PE=(e,t)=>{let n={...e,...t??{}};return bt.forEach(e=>{let t=Number(n[e.levelField]),r=Number.isFinite(t)?Math.max(0,Math.floor(t)):0;n[e.levelField]=e.maxLevel==null?r:Math.min(r,e.maxLevel)}),n},FE=e=>{let t=e,n=kt(),{lastTierTickspeedXpUnlocked:r,lastTierLevelCreditAccumulator:i,autobuyerBulkLevels:a,autoPrestigeAutobuyer:o,autoPrestigeAutobuyerEnabled:s,speedUpCount:c,autoSpeedUp:l,autoSpeedUpEnabled:u,...d}=t,{dataLakes:f,pendingComputeGrants:p}=ME(n.intro.dataLakes,t.intro?.dataLakes),{tickSpeedSeconds:m,productionMultiplier:h,productionAccumulator:g,productionMilestoneTier:_,productionMilestoneTierClaims:v,computeFundedBandwidthClaims:y,computeBandwidthSacrificeIndex:b,computeMergeDurationUpgrades:x,...S}=t.intro??{};return ui(en(ro(tr({...n,...d,accelerateBoughtThisCycle:typeof t.accelerateBoughtThisCycle==`boolean`?t.accelerateBoughtThisCycle:t.globalTickspeedMultiplier!=null||t.overclockLastClaimCompletedLevels!=null||(t.overclockCount??0)>0||(t.scaleUpCount??0)>0,manualPurchaseThisCycle:typeof t.manualPurchaseThisCycle==`boolean`?t.manualPurchaseThisCycle:Object.values(t.purchased??{}).some(e=>e>0)||t.globalTickspeedMultiplier!=null||t.overclockLastClaimCompletedLevels!=null||(t.overclockCount??0)>0||(t.scaleUpCount??c??0)>0,scaleUpCount:t.scaleUpCount??c??n.scaleUpCount,scaleUpTierCounts:OE(n.scaleUpTierCounts,t.scaleUpTierCounts??Object.fromEntries(Object.keys(n.scaleUpTierCounts).map(e=>[e,t.scaleUpCount??c??0]))),prestigeSpeedBonusUnlocked:t.prestigeSpeedBonusUnlocked===!0,buyMaxUnlocked:t.buyMaxUnlocked===!0,autoScaleUp:t.autoScaleUp??l??n.autoScaleUp,autoScaleUpEnabled:t.autoScaleUpEnabled??u??n.autoScaleUpEnabled,resources:OE(n.resources,(({bytes:e,...t})=>t)(t.resources??{})),owned:OE(n.owned,t.owned),purchased:OE(n.purchased,t.purchased),purchaseLevels:OE(n.purchaseLevels,t.purchaseLevels),purchaseLevelProgress:OE(n.purchaseLevelProgress,t.purchaseLevelProgress),autobuyers:OE(n.autobuyers,t.autobuyers),autobuyersEnabled:OE(n.autobuyersEnabled,t.autobuyersEnabled),tickspeedLevels:OE(n.tickspeedLevels,t.tickspeedLevels),autobuyerAttemptBudgets:OE(n.autobuyerAttemptBudgets,t.autobuyerAttemptBudgets),tierProductionAccumulators:OE(n.tierProductionAccumulators,t.tierProductionAccumulators),autobuyerIntervalLevels:OE(n.autobuyerIntervalLevels,t.autobuyerIntervalLevels),automationIntervalLevels:{...n.automationIntervalLevels,...t.automationIntervalLevels??{}},tierTickspeedIntervalLevels:OE(n.tierTickspeedIntervalLevels,t.tierTickspeedIntervalLevels),automationAttemptBudgets:{...n.automationAttemptBudgets,...t.automationAttemptBudgets??{}},tierTickspeedAttemptBudgets:OE(n.tierTickspeedAttemptBudgets,t.tierTickspeedAttemptBudgets),autoOverclock:t.autoOverclock??n.autoOverclock,autoOverclockEnabled:t.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:t.computeAutoChargeEnabled??n.computeAutoChargeEnabled,tierTickspeedAutobuyer:OE(n.tierTickspeedAutobuyer,t.tierTickspeedAutobuyer),tierTickspeedAutobuyerEnabled:OE(n.tierTickspeedAutobuyerEnabled,t.tierTickspeedAutobuyerEnabled),everUnlockedTierIds:OE(n.everUnlockedTierIds,t.everUnlockedTierIds),purge:{...n.purge,...t.purge??{},unboundedUnlocked:!!t.purge?.unboundedUnlocked},challenges:{...n.challenges,...t.challenges??{},completed:{...t.challenges?.completed??{}},run:{...n.challenges.run,...t.challenges?.run??{}},bestSeconds:{...t.challenges?.bestSeconds??{}}},achievements:{earned:{...t.achievements?.earned??{}},counters:{...n.achievements.counters,...t.achievements?.counters??{},...t.eons?.balance>(t.achievements?.counters?.kernelsEarned??0)?{kernelsEarned:t.eons.balance}:{}}},daily:{runs:{...t.daily?.runs??{}},results:{...t.daily?.results??{}}},era:{...n.era,...t.era??{}},eons:{...n.eons,...t.eons??{}},hyperscalerCount:t.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:PE(n.eonsUpgrades,t.eonsUpgrades),autoPurgeSettings:{...n.autoPurgeSettings,...t.autoPurgeSettings??{}},computeFlopsAutobuyers:OE(n.computeFlopsAutobuyers,t.computeFlopsAutobuyers),computeFlopsAutobuyersEnabled:OE(n.computeFlopsAutobuyersEnabled,t.computeFlopsAutobuyersEnabled),computeFlopsAutobuyerAttemptBudgets:OE(n.computeFlopsAutobuyerAttemptBudgets,t.computeFlopsAutobuyerAttemptBudgets),prestigeMuseum:{history:Array.isArray(t.prestigeMuseum?.history)?t.prestigeMuseum.history:n.prestigeMuseum.history,pinnedIds:Array.isArray(t.prestigeMuseum?.pinnedIds)?t.prestigeMuseum.pinnedIds:n.prestigeMuseum.pinnedIds},intro:NE({...n.intro,...S,dataLakes:f},p),computeFlops:{pageUnlocked:!!t.computeFlops?.pageUnlocked||Math.max(0,Number(t.purge?.points)||0)>=100,owned:{...n.computeFlops.owned,...t.computeFlops?.owned??{}},cumulativeBoost:{...n.computeFlops.cumulativeBoost,...t.computeFlops?.cumulativeBoost??{}}}}))))},IE=e=>{let t=uE();try{localStorage.setItem(QT(t),JSON.stringify({saveSchemaVersion:3,...e})),localStorage.setItem($T(t),String(Date.now()))}catch{}},LE=e=>{try{let t=EE(e);if(!t)return null;let n=UT(t);return n.ok?FE(n.payload):null}catch{return null}},RE=()=>{let e=uE();try{let t=localStorage.getItem($T(e));if(!t)return null;let n=Number(t);return Number.isFinite(n)?n:null}catch{return null}},zE=()=>{cE()?BE():wE(uE())},BE=()=>(CE(JT),{ok:!0}),VE=(e,t)=>Object.keys(t).reduce((n,r)=>{if(r===`__proto__`||r===`constructor`||r===`prototype`)return n;let i=t[r],a=e[r];return n[r]=BT(i)&&BT(a)?VE(a,i):i,n},{...e}),HE=(e,t)=>{if(!cE())return{ok:!1,reason:`dev_mode_inactive`};let n;try{n=VT(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!BT(n))return{ok:!1,reason:`invalid_json`};let r={saveSchemaVersion:3,...BT(t)?VE(t,n):n};try{localStorage.setItem(YT,JSON.stringify(r))}catch{return{ok:!1,reason:`storage_error`}}let i=LE();return i?{ok:!0,state:i}:{ok:!1,reason:`invalid_state`}},UE=e=>JSON.stringify({saveSchemaVersion:3,...e}),WE=e=>{if(!Object.keys(e).some(e=>Object.hasOwn(kt(),e))||e.resources!==void 0&&!BT(e.resources))return!1;let t=e.resources?.base;return t===void 0||Number.isFinite(t)},GE=e=>{let t;try{t=VT(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!BT(t))return{ok:!1,reason:`invalid_json`};let n=UT(t);if(!n.ok)return{ok:!1,reason:`incompatible_save`};if(!HT()&&!WE(n.payload))return{ok:!1,reason:`invalid_state`};let r=FE(n.payload);return IE(r),{ok:!0,state:r}},KE=`tens_buy_max_mode`,qE=()=>{try{return localStorage.getItem(KE)===`true`}catch{return!1}},JE=e=>{try{localStorage.setItem(KE,e?`true`:`false`)}catch{}},YE=`tens_buy_unit_mode`,XE=()=>{try{return localStorage.getItem(YE)===`true`}catch{return!1}},ZE=e=>{try{localStorage.setItem(YE,e?`true`:`false`)}catch{}},QE=`tens_theme_preference`,$E=()=>{try{let e=localStorage.getItem(QE);return e===`dark`||e===`light`||e===`system`?e:`system`}catch{return`system`}},eD=e=>{try{(e===`dark`||e===`light`||e===`system`)&&localStorage.setItem(QE,e)}catch{}},tD;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(tD||={});var nD=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},rD=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,iD=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?rD(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new nD(`"${e}" plugin is not implemented on ${c}`,tD.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new nD(`"${e}.${t}()" is not implemented on ${c}`,tD.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t).then(e=>e),r=async()=>{let t=await n;await g({eventName:e,callbackId:t})},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=nD,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},aD=(e=>e.Capacitor=iD(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),oD=aD.registerPlugin,sD=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new aD.Exception(e,tD.Unimplemented)}unavailable(e=`not available`){return new aD.Exception(e,tD.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},cD=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),lD=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),uD=class extends sD{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=lD(n).trim(),r=lD(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=cD(e.key),n=cD(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};oD(`CapacitorCookies`,{web:()=>new uD});var dD=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),fD=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},pD=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,mD=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=fD(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},hD=class extends sD{async request(e){let t=mD(e,e.webFetchExtra),n=pD(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await dD(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};oD(`CapacitorHttp`,{web:()=>new hD});var gD;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(gD||={});var _D;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(_D||={});var vD=class extends sD{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};oD(`SystemBars`,{web:()=>new vD});var yD=`https://mohanpednekar.github.io/tens/`,bD=`${yD}privacy.html`,xD=`${yD}terms.html`,SD=X(Bh)`
  gap: 0.5rem;

  h2 {
    font-size: ${e=>e.theme.type.scale.md.size};
    margin: 0;
  }

  p {
    color: ${e=>e.theme.color.textMuted};
    margin: 0;
  }
`,CD=X.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
`,wD=X.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 100%;
`,TD=X.input`
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
`,ED=X.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.8rem;
  margin: 0;
`,DD=X.textarea`
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
`,OD={invalid_json:`That is not valid save JSON.`,incompatible_save:`That save is from an incompatible version.`,invalid_state:`That save could not be loaded.`},kD=({game:e})=>{let[t,n]=(0,v.useState)(``),[r,i]=(0,v.useState)(null),a=(0,v.useRef)(null),o=async()=>{let t=e.exportSaveJson();n(t);try{await navigator.clipboard.writeText(t),i({text:`Save copied to clipboard (also shown below).`})}catch{i({text:`Save shown below — copy it manually.`})}},s=()=>{let t=URL.createObjectURL(new Blob([e.exportSaveJson()],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`tens-save.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)},c=t=>{if(!t.trim())return i({error:!0,text:`Paste a save or choose a file first.`});if(!window.confirm(`Replace the active save slot with this save? Current progress in the slot is lost.`))return;let r=e.applyCloudSave(t);i(r.ok?{text:`Save imported.`}:{error:!0,text:OD[r.reason]??`Import failed.`}),r.ok&&n(``)};return(0,Z.jsxs)(SD,{"aria-label":`manual save section`,children:[(0,Z.jsx)(`h2`,{children:`Backup / Restore`}),(0,Z.jsx)(DD,{"aria-label":`save JSON`,onChange:e=>n(e.target.value),placeholder:`Paste save JSON here to import`,value:t}),(0,Z.jsxs)(CD,{children:[(0,Z.jsx)(Q,{onClick:o,type:`button`,children:(0,Z.jsx)($,{children:`Copy save`})}),(0,Z.jsx)(Q,{onClick:s,type:`button`,children:(0,Z.jsx)($,{children:`Download file`})}),(0,Z.jsx)(Q,{onClick:()=>a.current?.click(),type:`button`,children:(0,Z.jsx)($,{children:`Choose file…`})}),(0,Z.jsx)(Q,{onClick:()=>c(t),type:`button`,children:(0,Z.jsx)($,{children:`Import`})}),(0,Z.jsx)(`input`,{accept:`application/json,.json`,"aria-label":`save file`,hidden:!0,onChange:async e=>{let t=e.target.files?.[0];e.target.value=``,t&&n(await t.text())},ref:a,type:`file`})]}),r&&(0,Z.jsx)(ED,{$error:r.error,children:r.text})]})},AD=X.div`
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
`,jD=()=>(0,Z.jsxs)(SD,{"aria-label":`legal section`,children:[(0,Z.jsx)(`h2`,{children:`Legal`}),(0,Z.jsxs)(AD,{children:[(0,Z.jsx)(`a`,{href:bD,rel:`noopener noreferrer`,target:`_blank`,children:`Privacy Policy`}),(0,Z.jsx)(`a`,{href:xD,rel:`noopener noreferrer`,target:`_blank`,children:`Terms of Use`})]})]}),MD={removeAds:`Ads removed — rewards are now granted instantly. Thank you!`,supportTip:`Thank you for supporting Tens!`},ND=({service:e=ly()})=>{let[t,n]=(0,v.useState)({removeAds:!1}),[r,i]=(0,v.useState)(!1),[a,o]=(0,v.useState)(null);if((0,v.useEffect)(()=>{if(!e.iapAvailable)return;let t=!0;return e.getEntitlements().then(e=>{t&&n(e)}),()=>{t=!1}},[e]),!e.iapAvailable)return null;let s=async(e,t)=>{i(!0),o(null);let r=await e();i(!1),r.entitlements&&n(r.entitlements),r.ok?o({error:!1,text:t}):r.cancelled||o({error:!0,text:`The store could not complete that. Please try again.`})};return(0,Z.jsxs)(SD,{"aria-label":`store section`,children:[(0,Z.jsx)(`h2`,{children:`Store`}),(0,Z.jsx)(`p`,{children:`Optional extras. Every part of the game stays free to play.`}),(0,Z.jsxs)(CD,{children:[(0,Z.jsx)(Q,{"aria-label":`buy remove ads`,disabled:r||t.removeAds,onClick:()=>s(()=>e.purchase(`removeAds`),MD.removeAds),type:`button`,variant:`primary`,children:(0,Z.jsx)($,{children:t.removeAds?`Ads removed`:`Remove ads`})}),(0,Z.jsx)(Q,{"aria-label":`buy support tip`,disabled:r,onClick:()=>s(()=>e.purchase(`supportTip`),MD.supportTip),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Leave a tip`})}),(0,Z.jsx)(Q,{"aria-label":`restore purchases`,disabled:r,onClick:()=>s(()=>e.restore(),`Purchases restored.`),type:`button`,variant:`ghost`,children:(0,Z.jsx)($,{children:`Restore purchases`})})]}),a&&(0,Z.jsx)(ED,{$error:a.error,children:a.text})]})},PD=X.main`
  width: min(520px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,FD=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,ID=X(CD)`
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  padding: 0.55rem 0.65rem;
  background: ${e=>e.$active?e.theme.color.surfaceSunken:`transparent`};
`,LD=X.div`
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
`,RD=X.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
  margin: 0;
  padding: 0;
`,zD=X.li`
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
`,BD=X.svg`
  display: block;
  height: 64px;
  width: 100%;
`,VD=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  margin: 0;
`,HD=X.div`
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;

  & > button {
    font-size: 0.78rem;
    min-height: 1.9rem;
    padding: 0.2em 0.6em;
  }
`,UD=(e,t)=>{if(!e.length)return``;let n=e.map(e=>Math.max(0,Number(e[t])||0)),r=Math.max(...n,1),i=Math.min(...n,0),a=Math.max(r-i,1);return n.map((e,t)=>{let r=n.length===1?0:t/(n.length-1)*100,o=40-(e-i)/a*40;return`${t===0?`M`:`L`}${r.toFixed(2)} ${o.toFixed(2)}`}).join(` `)},WD=X.h2`
  color: ${e=>e.$danger?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0.9rem 0.2rem 0.35rem;
  text-transform: uppercase;
`,GD=X.div`
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.lg};
  overflow: hidden;
`,KD=({label:e,danger:t=!1,children:n})=>(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(WD,{$danger:t,children:e}),(0,Z.jsx)(GD,{children:n})]}),qD=X.div`
  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,JD=gh`
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
`,YD=X.button`
  ${JD}
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: -2px;
  }
`,XD=X.div`
  ${JD}
`,ZD=X.span`
  align-items: center;
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: ${e=>e.theme.radius.sm};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 0.9rem;
  height: 1.65rem;
  justify-content: center;
  width: 1.65rem;
`,QD=X.span`
  flex: 1 1 auto;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,$D=X.span`
  color: ${e=>e.theme.color.textMuted};
  flex-shrink: 0;
  font-size: 0.85rem;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,eO=X.span`
  color: ${e=>e.theme.color.textFaint};
  flex-shrink: 0;
  transform: rotate(${e=>e.$open?`90deg`:`0deg`});
  transition: transform 120ms ease;
`,tO=X.div`
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
`,nO=({icon:e,label:t,value:n,danger:r=!1,inline:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return i?(0,Z.jsx)(qD,{children:(0,Z.jsxs)(XD,{$danger:r,children:[(0,Z.jsx)(ZD,{"aria-hidden":`true`,children:e}),(0,Z.jsx)(QD,{children:t}),i]})}):(0,Z.jsxs)(qD,{children:[(0,Z.jsxs)(YD,{$danger:r,"aria-expanded":o,"aria-label":`${t} settings`,onClick:()=>s(e=>!e),type:`button`,children:[(0,Z.jsx)(ZD,{"aria-hidden":`true`,children:e}),(0,Z.jsx)(QD,{children:t}),n!=null&&n!==``&&(0,Z.jsx)($D,{children:n}),(0,Z.jsx)(eO,{$open:o,"aria-hidden":`true`,children:`›`})]}),o&&(0,Z.jsx)(tO,{children:a})]})},rO=({game:e,onReset:t,onResetByteFoundry:n,themePreference:r=`system`,onThemePreferenceChange:i})=>{let a=_i(e.state),o=!!e.savesMeta?.supporterUnlocked,[s,c]=(0,v.useState)(``),[l,u]=(0,v.useState)(null),[d,f]=(0,v.useState)(!1),p=e.state.era?.count??0,m=e.state.eons?.balance??0,h=Bn(e.state),g=Vn(e.state),_=e.state.purge?.points??0,y=e=>e===1?`Kernel`:`Kernels`,b=e.state.prestigeMuseum??{history:[],pinnedIds:[]},x=new Set(b.pinnedIds??[]),S=b.history??[],C=S.filter(e=>x.has(e.id)),w=o?S:S.slice(0,1),T=t=>{t.preventDefault();let n=e.redeemUnlockCode(s);n.ok?(c(``),u({error:!1,text:n.already?`Supporter pack already unlocked.`:`Supporter pack unlocked.`})):u({error:!0,text:`That code is not valid.`})},E=()=>{let t=e.purchaseSupporterDummy();u({error:!1,text:t.already?`Supporter pack already unlocked.`:`Dummy checkout complete — Supporter pack unlocked (no real charge).`})},D=t=>{let n=window.prompt(`Rename save slot`,t.name);n!=null&&e.renameSaveSlot(t.id,n)},O=t=>{a&&t.isActive||window.confirm(xE(t))&&e.clearSlot(t.id)},k=()=>{a||window.confirm(SE())&&e.eraseAllSaveProgress()},A=()=>{Bn(e.state)&&(e.actions.eraAscend(),f(!1))},j=!!ly().iapAvailable,M=UD(e.opsSamples??[],`money`),ee=UD(e.opsSamples??[],`prestigePoints`);return(0,Z.jsxs)(PD,{children:[(0,Z.jsx)(FD,{children:(0,Z.jsx)(`h1`,{children:`Settings`})}),(0,Z.jsxs)(KD,{label:`Game`,children:[(0,Z.jsx)(nO,{icon:`💛`,label:`Supporter`,value:o?`Unlocked`:`Free`,children:(0,Z.jsxs)(SD,{"aria-label":`supporter pack section`,children:[(0,Z.jsx)(`h2`,{children:`Supporter pack`}),(0,Z.jsx)(`p`,{children:`Optional meta extras only — extra save slots, System log pins, and the Task Manager. Never changes Bits, PP, Disks, Compute, or unlock order. Real payment comes later; for now use a code or the dummy checkout.`}),o?(0,Z.jsxs)(ED,{children:[`Unlocked`,e.savesMeta?.supporterSource===`dummy_purchase`?` (dummy checkout)`:` (unlock code)`,`.`,` `,3,` save slots · System log · Task Manager.`]}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(VD,{children:[`Free: `,1,` save slot. Unlock code (placeholder): `,(0,Z.jsx)(`code`,{children:ZT})]}),(0,Z.jsxs)(wD,{onSubmit:T,children:[(0,Z.jsx)(TD,{"aria-label":`supporter unlock code`,autoComplete:`off`,onChange:e=>c(e.target.value),placeholder:`Enter unlock code`,value:s}),(0,Z.jsx)(Q,{"aria-label":`redeem supporter unlock code`,type:`submit`,variant:`primary`,children:(0,Z.jsx)($,{children:`Redeem code`})})]}),(0,Z.jsx)(Q,{"aria-label":`dummy supporter checkout`,onClick:E,type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Dummy checkout (free)`})})]}),l&&(0,Z.jsx)(ED,{$error:l.error,children:l.text})]})}),(0,Z.jsx)(nO,{icon:`💾`,label:`Save slots`,value:e.saveSlots?.find(e=>e.isActive)?.name,children:(0,Z.jsxs)(SD,{"aria-label":`save slots section`,children:[(0,Z.jsx)(`h2`,{children:`Save slots`}),(0,Z.jsx)(`p`,{children:`Independent runs on this device. Switching saves the current slot first. Reset / Clear wipe progress only — your Supporter unlock is never removed here.`}),!1,(e.saveSlots??[]).map(t=>(0,Z.jsxs)(ID,{$active:t.isActive,children:[(0,Z.jsxs)(LD,{children:[(0,Z.jsxs)(`strong`,{children:[t.name,t.isActive?` · active`:``]}),(0,Z.jsx)(`span`,{children:t.unlocked?t.isEmpty?`Empty (starts at Byte Foundry)`:`Has saved progress`:`Locked — unlock Supporter pack`})]}),t.unlocked&&(0,Z.jsxs)(CD,{children:[!t.isActive&&(0,Z.jsx)(Q,{"aria-label":`switch to ${t.name}`,disabled:!1,onClick:()=>e.switchSaveSlot(t.id),title:void 0,type:`button`,variant:`primary`,children:(0,Z.jsx)($,{children:`Play`})}),(0,Z.jsx)(Q,{"aria-label":`rename ${t.name}`,onClick:()=>D(t),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Rename`})}),(0,Z.jsx)(Q,{"aria-label":`clear ${t.name}`,disabled:a&&t.isActive,onClick:()=>O(t),title:a&&t.isActive?`Purge first — production is frozen at 1 Googol Bytes`:`Erase this slot only (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`Clear…`})})]})]},t.id))]})}),(0,Z.jsx)(nO,{icon:`⏻`,label:`Reboot`,value:`${m} ${y(m)}`,children:(0,Z.jsxs)(SD,{"aria-label":`reboot section`,children:[(0,Z.jsx)(`h2`,{children:`Reboot`}),(0,Z.jsx)(`p`,{children:`Voluntary meta-prestige when you hold enough unspent Purge Points — no production freeze. Awards Kernels for future upgrades.`}),(0,Z.jsxs)(CD,{children:[(0,Z.jsx)(`span`,{children:`Reboots`}),(0,Z.jsx)(`strong`,{children:p})]}),(0,Z.jsxs)(CD,{children:[(0,Z.jsx)(`span`,{children:`Kernels`}),(0,Z.jsxs)(`strong`,{children:[m,` `,y(m)]})]}),(0,Z.jsx)(`p`,{children:h?`Ready — next Reboot awards ${g} ${y(g)}.`:`Requires 1 Googol PP unspent (you have ${B(_)} PP).`}),(0,Z.jsx)(Q,{"aria-label":h?`Reboot — open confirmation`:`Reboot — requires 1 Googol unspent Purge Points`,disabled:!h,onClick:()=>f(!0),type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`⏻ Reboot…`})})]})}),(0,Z.jsx)(nO,{icon:`📜`,label:`System log`,value:o?`${S.length}`:`🔒`,children:(0,Z.jsxs)(SD,{"aria-label":`system log section`,children:[(0,Z.jsx)(`h2`,{children:`System log`}),o?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`p`,{children:[`Pin standout runs — display only, no bonuses. Cap `,10,` pins.`]}),C.length>0&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(VD,{children:`Pinned`}),(0,Z.jsx)(RD,{"aria-label":`pinned purge entries`,children:C.map(t=>(0,Z.jsxs)(zD,{children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,Z.jsx)(`div`,{children:(0,Z.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,Vt(t.moneyBits)]})})]}),(0,Z.jsx)(Q,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Unpin`})})]},`pin-${t.id}`))})]}),(0,Z.jsx)(VD,{children:`Recent history`}),w.length===0?(0,Z.jsx)(VD,{children:`No purges recorded yet.`}):(0,Z.jsx)(RD,{"aria-label":`system log history`,children:w.map(t=>(0,Z.jsxs)(zD,{children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,Z.jsx)(`div`,{children:(0,Z.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,Rt(t.moneyBits)]})})]}),x.has(t.id)?(0,Z.jsx)(Q,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Unpin`})}):(0,Z.jsx)(Q,{"aria-label":`pin purge ${t.purgeNumber}`,disabled:x.size>=10,onClick:()=>e.actions.pinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Pin`})})]},t.id))})]}):(0,Z.jsxs)(VD,{children:[`History still records in the background. Unlock Supporter to browse past purges and pin up to `,10,`.`,S.length>0&&` Latest: Purge #${S[0].purgeNumber} (+${S[0].pointsAwarded} PP).`]})]})}),(0,Z.jsx)(nO,{icon:`📈`,label:`Task Manager`,value:o?null:`🔒`,children:(0,Z.jsxs)(SD,{"aria-label":`task manager section`,children:[(0,Z.jsx)(`h2`,{children:`Task Manager`}),o?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`p`,{children:[`Live session samples (not persisted). Balance: `,Vt(e.state.resources?.base??0),` · PP: `,e.state.purge?.points??0]}),(0,Z.jsx)(VD,{children:`Bits`}),(0,Z.jsx)(BD,{"aria-label":`bits sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,Z.jsx)(`path`,{d:M||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})}),(0,Z.jsx)(VD,{children:`Purge Points`}),(0,Z.jsx)(BD,{"aria-label":`purge points sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,Z.jsx)(`path`,{d:ee||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})})]}):(0,Z.jsx)(VD,{children:`Unlock Supporter for live Bits and Purge Point sparklines. Information only — no production change.`})]})})]}),(0,Z.jsxs)(KD,{label:`Data`,children:[!1,(0,Z.jsx)(nO,{icon:`🗄`,label:`Backup / Restore`,children:(0,Z.jsx)(kD,{game:e})}),j&&(0,Z.jsx)(nO,{icon:`🛒`,label:`Store`,children:(0,Z.jsx)(ND,{})}),(0,Z.jsx)(nO,{icon:`ℹ`,label:`About`,children:(0,Z.jsxs)(SD,{"aria-label":`about section`,children:[(0,Z.jsx)(`h2`,{children:`About`}),(0,Z.jsx)(`p`,{children:`Tens — an incremental game themed around powers of ten.`})]})}),(0,Z.jsx)(nO,{icon:`⚖`,label:`Legal`,children:(0,Z.jsx)(jD,{})})]}),(0,Z.jsx)(KD,{label:`Display`,children:(0,Z.jsx)(nO,{icon:`🎨`,inline:(0,Z.jsx)(HD,{role:`group`,"aria-label":`theme preference`,children:[{id:`system`,label:`System`},{id:`light`,label:`Light`},{id:`dark`,label:`Dark`}].map(({id:e,label:t})=>(0,Z.jsx)(Q,{"aria-label":`use ${e} theme`,"aria-pressed":r===e,onClick:()=>i?.(e),type:`button`,variant:r===e?`primary`:`neutral`,children:(0,Z.jsx)($,{children:t})},e))}),label:`Theme`})}),(0,Z.jsx)(KD,{danger:!0,label:`Danger zone`,children:(0,Z.jsx)(nO,{danger:!0,icon:`⚠`,label:`Reset, Reformat, Erase…`,children:(0,Z.jsxs)(SD,{"aria-label":`danger zone`,children:[(0,Z.jsx)(`h2`,{children:`Danger zone`}),(0,Z.jsxs)(`p`,{children:[`Erase the `,(0,Z.jsx)(`strong`,{children:`active`}),` save (“`,e.saveSlots?.find(e=>e.isActive)?.name??`Save 1`,`”) and start from the Byte Foundry. Other slots and your Supporter unlock stay.`]}),(0,Z.jsxs)(Q,{"aria-describedby":`settings-reset-description`,"aria-label":`Reset game`,disabled:a,onClick:t,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases the active save slot and starts over (asks for confirmation)`,type:`button`,variant:`danger`,children:[(0,Z.jsx)($,{children:`↺ Reset active save…`}),(0,Z.jsx)(n_,{id:`settings-reset-description`,children:`Erases the active save slot and starts over; other slots and Supporter unlock stay`})]}),(0,Z.jsx)(`p`,{children:`Restart the Byte Foundry on the active save — Data Stream Capacity, Disks, Data Lakes and Compute entities. Compile, Upgrade Capacity, Upgrade Bitrate, Provision Disk and Data Lake upgrades/Cells then replay automatically up to your pre-reset highs. Byte Factory and Purge progress stay.`}),(0,Z.jsxs)(Q,{"aria-describedby":`settings-reset-foundry-description`,"aria-label":`Reformat Byte Foundry`,disabled:a,onClick:n,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Restarts the Foundry; Compile, Data Stream upgrades, Disks and Data Lakes replay automatically up to prior highs`,type:`button`,variant:`danger`,children:[(0,Z.jsx)($,{children:`↺ Reformat Byte Foundry…`}),(0,Z.jsx)(n_,{id:`settings-reset-foundry-description`,children:`Restarts Capacity, Storage, Data Lakes and Compute from scratch, then replays upgrades, Disks and Data Lakes automatically up to pre-reset highs; Byte Factory and Purge progress stay`})]}),(0,Z.jsx)(`p`,{children:`Wipe every slot’s progress on this device. Does not remove the Supporter unlock.`}),(0,Z.jsx)(Q,{"aria-label":`Erase all save progress`,disabled:a||!1,onClick:k,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases all slots but keeps Supporter unlock (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`Erase all save progress…`})})]})})}),(0,Z.jsxs)(xv,{cancelLabel:`Cancel`,confirmLabel:`Reboot`,confirmVariant:`prestige`,onCancel:()=>f(!1),onConfirm:A,open:d,title:`Reboot?`,children:[(0,Z.jsxs)(`p`,{children:[`Awards `,g,` `,y(g),` and resets the Byte Foundry for a deep reset — Factory itself stays permanently reachable, no gate to tap back through.`]}),(0,Z.jsxs)(`p`,{children:[(0,Z.jsx)(`strong`,{children:`Resets:`}),` Foundry generator upgrades, Data Stream Capacity, Disks, Compute entities, Byte Factory tiers and resources, unspent PP and Purge count, Compression level, and Compute owned units.`]}),(0,Z.jsxs)(`p`,{children:[(0,Z.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause flags, Overflow mode latch, System log, Compute page reveal, Flops autobuyer unlocks, Kernels (+ award), and hyperscalers.`]})]})]})},iO=2**53-1,aO=e=>e?Ii:iO,oO=2,sO=(e,t,n=iO)=>{let r=e>0?Bi(e,Sn(t)):0;return r<=0?null:{state:Vi(e,n)(t),offlineProgress:e>600?{elapsedRealSeconds:e,effectiveSeconds:r,capSeconds:Sn(t)}:null}},cO=()=>{sE();let e=DE(),t=LE();if(!t)return{state:kt(),offlineProgress:null,incompatibleSaveReason:e,baselineEarned:{}};let n=RE(),r=sO(n?(Date.now()-n)/1e3:0,t,aO(XE()))??{state:t,offlineProgress:null};return{...r,state:Dn(r.state),incompatibleSaveReason:null,baselineEarned:t.achievements?.earned??{}}},lO=()=>{let[e]=(0,v.useState)(cO),[t,n]=(0,v.useState)(e.state),[r,i]=(0,v.useState)(e.offlineProgress),[a,o]=(0,v.useState)(e.incompatibleSaveReason),[s,c]=(0,v.useState)(()=>sE()),[l,u]=(0,v.useState)(()=>pE()),[d,f]=(0,v.useState)(()=>cE()),[p,m]=(0,v.useState)([]),[h,g]=(0,v.useState)(()=>({epoch:0,earned:e.baselineEarned})),_=(0,v.useCallback)(e=>{g(t=>({epoch:t.epoch+1,earned:e?.achievements?.earned??{}}))},[]),y=(0,v.useRef)(t);(0,v.useEffect)(()=>{y.current=t},[t]);let b=(0,v.useCallback)(()=>{c(sE()),u(pE())},[]);(0,v.useEffect)(()=>{let e=Date.now(),t=()=>{let t=(Date.now()-e)/1e3;if(t>oO){let r=Sn(y.current),a=Bi(t,r);if(a>0){n(e=>Vi(t,aO(D.current))(e)),t>600&&i({elapsedRealSeconds:t,effectiveSeconds:a,capSeconds:r}),e=Date.now();return}}let r=100/1e3;n(e=>{let t=zi(r,aO(D.current))(e);return document.visibilityState===`visible`?Tn(r)(t):t}),e=Date.now()},r=window.setInterval(t,100),a=()=>{document.visibilityState===`visible`&&t()};return document.addEventListener(`visibilitychange`,a),()=>{window.clearInterval(r),document.removeEventListener(`visibilitychange`,a)}},[]),(0,v.useEffect)(()=>{let e=window.setInterval(()=>n(e=>pv(Date.now())(e)),1e3);return()=>window.clearInterval(e)},[]),(0,v.useEffect)(()=>{IE(t)},[t]),(0,v.useEffect)(()=>{if(!s.supporterUnlocked){m([]);return}let e=()=>{let e=y.current;m(t=>{let n=[...t,{t:Date.now(),money:e.resources?.base??0,prestigePoints:e.purge?.points??0}];return n.length>60?n.slice(n.length-60):n})};e();let t=window.setInterval(e,Je);return()=>window.clearInterval(t)},[s.supporterUnlocked,s.activeSlotId]);let[x,S]=(0,v.useState)(qE),C=(0,v.useRef)(x),w=(0,v.useCallback)(e=>{C.current=!!e,JE(!!e),S(!!e)},[]),[T,E]=(0,v.useState)(XE),D=(0,v.useRef)(T),O=(0,v.useCallback)(e=>{D.current=!!e,ZE(!!e),E(!!e)},[]),k=(0,v.useMemo)(()=>{let e=(e,t)=>n(n=>(C.current&&Yi(n)?t:e)(n));return{buyTierQuantity:t=>D.current?n(e=>gf(Ji(t,1))(e)):e(gf(Ji(t,iO)),gf(ta(t))),buyTickspeedMultiplier:t=>e(fd(t),Zi(fd(t))),buyAutobuyerIntervalUpgrade:e=>n(Cd(e)),buyAutomationIntervalUpgrade:e=>n(Ad(e)),buyTierTickspeedIntervalUpgrade:e=>n(Pd(e)),setAutoOverclockEnabled:e=>n(Id(e)),startComputeCharge:e=>n($c(e)),setComputeAutoChargeEnabled:e=>n(Fd(e)),buyGlobalTickspeedMultiplier:()=>e(zd,Zi(zd)),buyPlaytimeBonus:()=>n(hn),buyBuyMaxUnlock:()=>n(gn),buyCacheWarm:()=>n(_n),buySleepModeCapUpgrade:()=>e(wn,Zi(wn)),buyPrestigeSpeedBonus:()=>n(pn),buyPrestigeDoublePp:()=>e(Er,Zi(Er)),buyComputeFlopsTier:t=>e(Nn(t),Zi(Nn(t))),buyHyperscaler:()=>n(Wn),setAutoPurgeSetting:(e,t)=>n(Vr(e,t)),buyEonUpgrade:e=>n(Yn(e)),buyAutoHyperscaler:()=>n(Zn),setAutoHyperscalerEnabled:e=>n(Qn(e)),eraAscend:()=>n(pf),enterChallenge:e=>n(qd(e)),exitChallenge:()=>n(Jd),purge:()=>n(ff),dailyStart:e=>n(lv(e,Date.now())),dailyForfeit:e=>n(uv(e)),dailyRestart:e=>n(fv(e,Date.now())),dailyPlay:(e,t,r)=>n(mv(e,t,r,Date.now())),scaleUp:()=>n(ef),overclock:()=>n(tf),setComputeAutoBoostEnabled:e=>n(id(e)),setComputeAutoBoostType:e=>n(ad(e)),consumeXpForLastTierTickspeed:e=>n(uf(e)),setAutoScaleUpEnabled:e=>n(sf(e)),setAutoXpTickspeedEnabled:e=>n(of(e)),setAutoGlobalTickspeedEnabled:e=>n(cf(e)),setAutoPurgeEnabled:e=>n(Rd(e)),setAutobuyerEnabled:(e,t)=>n(sd(e,t)),setTierTickspeedAutobuyerEnabled:(e,t)=>n(Ld(e,t)),setComputeFlopsAutobuyerEnabled:(e,t)=>n(nr(e,t)),tapIntroBit:()=>n(Ta),tapPoolBuffer:e=>n(eo(e)),combineIntroByte:()=>n(Ea),pickIntroCapacityMilestone:()=>n(bo),queueIntroSpeedUpgrade:()=>n(_o),unlockNextDiskSize:()=>n(is),clearIntroCapacityUpgradeQueue:()=>n(Co),convertIntroBitsToKilobytes:()=>n(Jo),provisionDisk:()=>n(vs),queueDiskBuild:()=>n(ys),clearDiskBuildQueue:()=>n(bs),expediteDiskFill:e=>n(Vs(e)),doubleDataLakeCapacity:e=>n(jl(e)),activateComputeBoost:(e,t)=>n(hf(e,t)),stackComputeBoost:e=>n(K(e)),reclaimComputeBoost:e=>n(ed(e)),forfeitComputeBoost:e=>n(nd(e)),mergeComputeCoresIntoNode:()=>n(Fl),mergeComputeNodesIntoCluster:()=>n(Il),mergeComputeClustersIntoNetwork:()=>n(Ll),mergeComputeNetworksIntoGrid:()=>n(Rl),mergeComputeGridsIntoFabric:()=>n(zl),mergeComputeFabricsIntoCloud:()=>n(Bl),mergeComputeCloudsIntoDatacenter:()=>n(Vl),mergeComputeDatacentersIntoSupercomputer:()=>n(Hl),mergeComputeSupercomputersIntoMegacomputer:()=>n(Ul),enableAutoMergeCoresIntoNode:()=>n(eu),enableAutoMergeNodesIntoCluster:()=>n(iu),enableAutoMergeClustersIntoNetwork:()=>n(cu),enableAutoMergeNetworksIntoGrid:()=>n(fu),enableAutoMergeGridsIntoFabric:()=>n(gu),enableAutoMergeFabricsIntoCloud:()=>n(bu),enableAutoMergeCloudsIntoDatacenter:()=>n(wu),enableAutoMergeDatacentersIntoSupercomputer:()=>n(Ou),enableAutoMergeSupercomputersIntoMegacomputer:()=>n(Mu),startComputeCoresMerge:()=>n(nu),startComputeNodesMerge:()=>n(ou),startComputeClustersMerge:()=>n(uu),startComputeNetworksMerge:()=>n(mu),startComputeGridsMerge:()=>n(vu),startComputeFabricsMerge:()=>n(Su),startComputeCloudsMerge:()=>n(Eu),startComputeDatacentersMerge:()=>n(Au),startComputeSupercomputersMerge:()=>n(Pu),startDataLakeAutoConvert:e=>n(ml(e)),flushStoragePool:e=>n(pl(e)),pinMuseumEntry:e=>n(Xd(e)),unpinMuseumEntry:e=>n(Zd(e))}},[]),A=(0,v.useCallback)(()=>{zE(),_(null),n(kt()),i(null),o(null),m([]),b()},[b]),j=(0,v.useCallback)(()=>{n(mf)},[]),M=(0,v.useCallback)(e=>{let t=wE(e);return t.ok&&(t.clearedActive&&(_(null),n(kt()),i(null),o(null),m([])),b()),t},[b]),ee=(0,v.useCallback)(()=>{let e=TE();return e.ok&&(_(null),n(kt()),i(null),o(null),m([]),b()),e},[b]),N=(0,v.useCallback)(()=>i(null),[]),P=(0,v.useRef)(new WeakSet),te=(0,v.useCallback)(e=>!e||e.rewardClaimed||P.current.has(e)?!1:(P.current.add(e),n(t=>Ui(e.elapsedRealSeconds,aO(D.current),e.capSeconds)(t)),i(t=>t===e?{...e,effectiveSeconds:e.effectiveSeconds+Hi(e.elapsedRealSeconds,e.capSeconds),rewardClaimed:!0}:t),!0),[]),ne=(0,v.useCallback)(()=>o(null),[]),re=(0,v.useCallback)(e=>{IE(y.current);let t=mE(e);if(!t.ok)return t;if(t.already)return b(),t;let r=DE(),a=LE()??kt(),s=RE(),c=sO(s?(Date.now()-s)/1e3:0,a,aO(D.current));return _(a),n(c?.state??a),i(c?.offlineProgress??null),o(r),m([]),b(),t},[b]),F=(0,v.useCallback)(()=>{IE(y.current);let e=!cE();lE(e),f(e);let t=DE(),r=LE();_(r),n(r??kt()),i(null),o(t),m([]),b()},[b]),ie=(0,v.useCallback)(()=>{cE()&&(BE(),_(null),n(kt()),i(null),o(null),m([]))},[]),ae=(0,v.useCallback)(e=>{let t=HE(e,y.current);return t.ok&&(_(t.state),n(t.state),i(null),o(null)),t},[]),oe=(0,v.useCallback)(e=>{cE()&&n(t=>ro(e(t)))},[]),se=(0,v.useCallback)(()=>UE(y.current),[]),ce=(0,v.useCallback)(e=>{let t=GE(e);return t.ok&&(y.current=t.state,_(t.state),n(t.state),i(null),o(null)),t},[]),I=(0,v.useCallback)((e,t)=>{let n=hE(e,t);return n.ok&&b(),n},[b]),le=(0,v.useCallback)(e=>{let t=gE(e);return t.ok&&b(),t},[b]);return{actions:k,applyCloudSave:ce,applyDevStateJson:ae,buyMaxMode:x,buyUnitMode:T,claimOfflineAdReward:te,clearSlot:M,devModeActive:d,dismissIncompatibleSaveNotice:ne,dismissOfflineProgress:N,eraseAllSaveProgress:ee,exportSaveJson:se,incompatibleSaveReason:a,offlineProgress:r,achievementBaseline:h,opsSamples:p,purchaseSupporterDummy:(0,v.useCallback)(()=>{let e=_E();return e.ok&&b(),e},[b]),redeemUnlockCode:le,renameSaveSlot:I,resetByteFoundry:j,resetDevState:ie,resetGame:A,saveSlots:l,savesMeta:s,setBuyMaxMode:w,setBuyUnitMode:O,setDevState:oe,state:t,switchSaveSlot:re,toggleDevMode:F}},uO=bh`
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
`,dO={dark:{page:`#0c0d11`,surface:`#16181f`,surfaceRaised:`#1e212a`,surfaceSunken:`#262a34`,border:`#2a2e39`,borderStrong:`#3a3f4d`,text:`#eef1f7`,textMuted:`#98a1b2`,textFaint:`#6b7280`,accent:`#7c9bff`,good:`#57d98a`,warn:`#f0c260`,info:`#56b6f0`,violet:`#b39bff`,danger:`#f87171`,disabled:`#7d8595`},light:{page:`#e8ecf2`,surface:`#ffffff`,surfaceRaised:`#ffffff`,surfaceSunken:`#dfe4ec`,border:`#d4dae4`,borderStrong:`#bec7d4`,text:`#171a21`,textMuted:`#5c6675`,textFaint:`#808a99`,accent:`#3b5bdb`,good:`#0a6b30`,warn:`#875600`,info:`#1f7ac0`,violet:`#7048c4`,danger:`#d64545`,disabled:`#9aa0ab`}},fO={dark:{sm:`0 1px 2px rgba(0, 0, 0, 0.45)`,md:`0 6px 18px rgba(0, 0, 0, 0.55)`},light:{sm:`0 1px 3px rgba(20, 30, 60, 0.08)`,md:`0 8px 24px rgba(20, 30, 60, 0.12)`}},pO={dark:[`#60a5fa`,`#f472b6`,`#a78bfa`,`#fb923c`,`#22d3ee`,`#38bdf8`,`#f87171`,`#818cf8`],light:[`#2563eb`,`#db2777`,`#7c3aed`,`#ea580c`,`#0891b2`,`#0284c7`,`#dc2626`,`#4f46e5`]},mO={xs:`0.25rem`,sm:`0.4rem`,md:`0.6rem`,lg:`0.85rem`,xl:`1.25rem`,"2xl":`2rem`},hO={sm:`6px`,md:`10px`,lg:`12px`,pill:`999px`},gO={minHeight:500,medium:600,expanded:900,wide:1360,splitMinWidth:784,splitMinAspect:.8},_O={duration:{fast:`0.05s`,base:`0.15s`,slow:`0.4s`},easing:{standard:`ease`,out:`ease-out`,inOut:`ease-in-out`}},vO={display:`"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,body:`"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,mono:`ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`},yO={scale:{xs:{size:`0.72rem`,lineHeight:`1rem`},sm:{size:`0.82rem`,lineHeight:`1.15rem`},md:{size:`0.95rem`,lineHeight:`1.35rem`},lg:{size:`1.1rem`,lineHeight:`1.5rem`},xl:{size:`1.75rem`,lineHeight:`2.1rem`},hero:{size:`2.4rem`,lineHeight:`2.7rem`}},numeric:`tabular-nums`},bO=[`dark`,`light`],xO=`dark`,SO=e=>{let t=bO.includes(e)?e:xO;return{mode:t,color:dO[t],shadow:fO[t],tierAccents:pO[t],space:mO,radius:hO,motion:_O,breakpoints:gO,font:vO,type:yO}},CO={dark:SO(`dark`),light:SO(`light`)},wO=({width:e,height:t})=>!(t>=gO.minHeight)||!(e>=gO.medium)?`compact`:e<gO.expanded?`medium`:e<gO.wide?`expanded`:`wide`;gO.medium,gO.expanded,gO.wide;var TO={layoutClass:`compact`,width:0,height:0},EO=()=>{if(typeof window>`u`)return null;let e=window.visualViewport,t=Math.round(window.innerWidth||e?.width||0),n=Math.round(window.innerHeight||e?.height||0);return t>0&&n>0?{width:t,height:n}:null},DO=()=>{let e=EO();return e?{...e,layoutClass:wO(e)}:TO},OO=()=>{let[e,t]=(0,v.useState)(DO);return(0,v.useEffect)(()=>{if(typeof window>`u`)return;let e=null,n=window.requestAnimationFrame??(e=>setTimeout(e,16)),r=window.cancelAnimationFrame??clearTimeout,i=()=>{e=null;let n=DO();t(e=>e.width===n.width&&e.height===n.height&&e.layoutClass===n.layoutClass?e:n)},a=()=>{e===null&&(e=n(i))};window.addEventListener(`resize`,a),window.addEventListener(`orientationchange`,a);let o=window.visualViewport;return o?.addEventListener(`resize`,a),a(),()=>{window.removeEventListener(`resize`,a),window.removeEventListener(`orientationchange`,a),o?.removeEventListener(`resize`,a),e!==null&&r(e)}},[]),e},kO=(0,v.createContext)(TO),AO=({children:e})=>(0,Z.jsx)(kO.Provider,{value:OO(),children:e}),jO=()=>typeof window>`u`||typeof window.matchMedia!=`function`?xO:window.matchMedia(`(prefers-color-scheme: light)`).matches?`light`:`dark`,MO=e=>e===`light`||e===`dark`?e:jO(),NO=({mode:e=xO,children:t})=>(0,Z.jsx)(lh,{theme:CO[e]??CO.dark,children:t}),PO=()=>MO($E()),FO=new Set([`info`,`boosters`,`compute`,`milestones`,`achievements`,`settings`,`dev`]),IO=X.div`
  padding-bottom: ${Wg};
`;function LO(){let e=lO(),[t,n]=(0,v.useState)($E),[r,i]=(0,v.useState)(PO),[a,o]=(0,v.useState)(`game`),[s,c]=(0,v.useState)(!1),[l,u]=(0,v.useState)(0),[d,f]=(0,v.useState)(0),[p,m]=(0,v.useState)(0),h=e.state.intro.mainGameUnlocked,g=!FO.has(a)&&(!h||a===`foundry`),_=g?`foundry`:a,y=Ml(e.state),b=En(e.state),x=h,S=h&&Xi(e.state),C=S,w=e=>{e===`boosters`&&!y||e===`compute`&&!b||e===`game`&&!h||e===`perks`&&!S||e===`challenges`&&!C||(e===`storage`?(c(!1),m(e=>e+1),o(`foundry`)):(c(!1),e===`perks`&&u(e=>e+1),e===`challenges`&&f(e=>e+1),e===`foundry`&&m(e=>e+1),o(e)))},T=()=>{_i(e.state)||window.confirm(yE())&&(e.resetGame(),o(`game`),c(!1))},E=()=>{_i(e.state)||window.confirm(bE())&&(e.resetByteFoundry(),a===`boosters`&&o(`foundry`))};(0,v.useEffect)(()=>{if(!s)return;let e=e=>{e.key===`Escape`&&c(!1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[s]),(0,v.useEffect)(()=>{if(t!==`system`||typeof window.matchMedia!=`function`)return;let e=window.matchMedia(`(prefers-color-scheme: light)`),n=()=>i(MO(`system`));return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[t]);let D=e=>{eD(e),n(e),i(MO(e))},O;O=g?(0,Z.jsx)(fC,{focusNonce:p,game:e}):a===`info`?(0,Z.jsx)(lw,{}):a===`boosters`?(0,Z.jsx)(tw,{game:e}):a===`compute`?(0,Z.jsx)(DC,{game:e}):a===`perks`&&S?(0,Z.jsx)(ET,{focusNonce:l,game:e}):a===`challenges`&&C?(0,Z.jsx)(dx,{focusNonce:d,game:e}):a===`milestones`?(0,Z.jsx)(_w,{game:e}):a===`achievements`&&I.enabled?(0,Z.jsx)(tg,{game:e}):a===`dev`?(0,Z.jsx)(vb,{game:e}):a===`settings`?(0,Z.jsx)(rO,{game:e,onReset:T,onResetByteFoundry:E,onThemePreferenceChange:D,themePreference:t}):(0,Z.jsx)(vb,{game:e});let k=Fg(e.state);return(0,Z.jsxs)(NO,{mode:r,children:[(0,Z.jsx)(uO,{}),(0,Z.jsxs)(AO,{children:[(0,Z.jsx)(IO,{children:O}),(0,Z.jsx)(Ug,{attention:k,currentPage:_,moreOpen:s,onNavigate:w,onOpenMore:()=>c(e=>!e),showBoosters:y,showComputeFlops:b,showPerks:S,showChallenges:C,showTiers:x}),(0,Z.jsx)(zh,{onClose:()=>c(!1),onNavigate:w,open:s}),(0,Z.jsx)(Nh,{baseline:e.achievementBaseline,state:e.state}),e.incompatibleSaveReason?(0,Z.jsx)(s_,{onDismiss:e.dismissIncompatibleSaveNotice}):null]})]})}var RO=`modulepreload`,zO=function(e){return`/tens/`+e},BO={},VO=function(e){return e.pathname.endsWith(`.css`)},HO=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},UO=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=zO(t,n);let r=s(t),i=VO(r);return HO(BO,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:RO,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},WO=e=>{e&&e instanceof Function&&UO(async()=>{let{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}=await import(`./web-vitals-viX3FQND.js`);return{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}},[]).then(({onCLS:t,onINP:n,onFCP:r,onLCP:i,onTTFB:a})=>{t(e),n(e),r(e),i(e),a(e)})},GO=document.getElementById(`root`);if(!GO)throw Error(`Root element not found`);(0,y.createRoot)(GO).render((0,Z.jsx)(v.StrictMode,{children:(0,Z.jsx)(LO,{})})),WO();