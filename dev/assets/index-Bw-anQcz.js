var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=(e,t)=>{let n=()=>Array.from({length:e.length},(t,n)=>e.key(n)).filter(e=>e!=null&&e.startsWith(t));return{get length(){return n().length},key:e=>{let r=n()[e];return r==null?null:r.slice(t.length)},getItem:n=>e.getItem(t+n),setItem:(n,r)=>e.setItem(t+n,r),removeItem:n=>e.removeItem(t+n),clear:()=>n().forEach(t=>e.removeItem(t))}};((e=`dev:`)=>{if(!e)return!1;try{return Object.defineProperty(window,"localStorage",{configurable:!0,value:l(window.localStorage,e)}),!0}catch{return!1}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function D(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function O(e,t){return D(e.type,t,e.props)}function k(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function A(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ee=/\/+/g;function j(e,t){return typeof e==`object`&&e&&e.key!=null?A(``+e.key):t.toString(36)}function te(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function M(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,M(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+j(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(ee,`$&/`)+`/`),M(o,r,i,``,function(e){return e})):o!=null&&(k(o)&&(o=O(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ee,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+j(a,u),c+=M(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+j(a,u++),c+=M(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return M(te(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function N(e,t,n){if(e==null)return e;var r=[],i=0;return M(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ne(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var P=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function re(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,P)}catch(e){P(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function ie(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else re(ie.bind(null,e))}var F={map:N,forEach:function(e,t,n){N(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return N(e,function(){t++}),t},toArray:function(e){return N(e,function(e){return e})||[]},only:function(e){if(!k(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=F,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=ie,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!E.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return D(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)E.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return D(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=k,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ne}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=re,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.1`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&ee(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ee(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function ee(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ee(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=u(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=u(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),h=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}function m(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&m(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function w(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function T(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function E(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var D=Object.assign,O=Symbol.for(`react.element`),k=Symbol.for(`react.transitional.element`),A=Symbol.for(`react.portal`),ee=Symbol.for(`react.fragment`),j=Symbol.for(`react.strict_mode`),te=Symbol.for(`react.profiler`),M=Symbol.for(`react.consumer`),N=Symbol.for(`react.context`),ne=Symbol.for(`react.forward_ref`),P=Symbol.for(`react.suspense`),re=Symbol.for(`react.suspense_list`),ie=Symbol.for(`react.memo`),F=Symbol.for(`react.lazy`),ae=Symbol.for(`react.activity`),oe=Symbol.for(`react.legacy_hidden`),se=Symbol.for(`react.memo_cache_sentinel`),ce=Symbol.for(`react.view_transition`),le=Symbol.for(`react.recoverable`),ue=Symbol.iterator;function de(e){return typeof e!=`object`||!e?null:(e=ue&&e[ue]||e[`@@iterator`],typeof e==`function`?e:null)}var fe=Symbol.for(`react.client.reference`);function pe(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===fe?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case ee:return`Fragment`;case te:return`Profiler`;case j:return`StrictMode`;case P:return`Suspense`;case re:return`SuspenseList`;case ae:return`Activity`;case ce:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case A:return`Portal`;case N:return e.displayName||`Context`;case M:return(e._context.displayName||`Context`)+`.Consumer`;case ne:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ie:return t=e.displayName||null,t===null?pe(e.type)||`Memo`:t;case F:t=e._payload,e=e._init;try{return pe(e(t))}catch{}}return null}var me=Array.isArray,I=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,L=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,R={pending:!1,data:null,method:null,action:null},he=[],ge=-1;function _e(e){return{current:e}}function ve(e){0>ge||(e.current=he[ge],he[ge]=null,ge--)}function ye(e,t){ge++,he[ge]=e.current,e.current=t}var be=_e(null),xe=_e(null),Se=_e(null),Ce=_e(null);function we(e,t){switch(ye(Se,t),ye(xe,e),ye(be,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?mp(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=mp(t),e=hp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}ve(be),ye(be,e)}function Te(){ve(be),ve(xe),ve(Se)}function Ee(e){var t=e.memoizedState;t!==null&&(dh._currentValue=t.memoizedState,ye(Ce,e)),t=be.current;var n=hp(t,e.type);t!==n&&(ye(xe,e),ye(be,n))}function De(e){xe.current===e&&(ve(be),ve(xe)),Ce.current===e&&(ve(Ce),dh._currentValue=R)}var Oe,ke;function Ae(e){if(Oe===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Oe=t&&t[1]||``,ke=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Oe+e+ke}var je=!1;function Me(e,t){if(!e||je)return``;je=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{je=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Ae(n):``}function Ne(e,t){switch(e.tag){case 26:case 27:case 5:return Ae(e.type);case 16:return Ae(`Lazy`);case 13:return e.child!==t&&t!==null?Ae(`Suspense Fallback`):Ae(`Suspense`);case 19:return Ae(`SuspenseList`);case 0:case 15:return Me(e.type,!1);case 11:return Me(e.type.render,!1);case 1:return Me(e.type,!0);case 31:return Ae(`Activity`);case 30:return Ae(`ViewTransition`);default:return``}}function Pe(e){try{var t=``,n=null;do t+=Ne(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Fe=Object.prototype.hasOwnProperty,Ie=t.unstable_scheduleCallback,Le=t.unstable_cancelCallback,Re=t.unstable_shouldYield,ze=t.unstable_requestPaint,Be=t.unstable_now,Ve=t.unstable_getCurrentPriorityLevel,He=t.unstable_ImmediatePriority,Ue=t.unstable_UserBlockingPriority,We=t.unstable_NormalPriority,Ge=t.unstable_LowPriority,Ke=t.unstable_IdlePriority,qe=t.log,Je=t.unstable_setDisableYieldValue,Ye=null,Xe=null;function Ze(e){if(typeof qe==`function`&&Je(e),Xe&&typeof Xe.setStrictMode==`function`)try{Xe.setStrictMode(Ye,e)}catch{}}var Qe=Math.clz32?Math.clz32:tt,$e=Math.log,et=Math.LN2;function tt(e){return e>>>=0,e===0?32:31-($e(e)/et|0)|0}var nt=256,rt=262144,it=4194304;function at(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ot(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=at(n))):i=at(o):i=at(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=at(n))):i=at(o)):i=at(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function st(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function ct(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-Qe(n),i=1<<r;t|=e[r],n&=~i}return t}function lt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ut(){var e=it;return it<<=1,!(it&62914560)&&(it=4194304),e}function dt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ft(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function pt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Qe(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&mt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function mt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Qe(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ht(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Qe(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function gt(e,t){var n=t&-t;return n=n&42?1:_t(n),(n&(e.suspendedLanes|t))===0?n:0}function _t(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function vt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function yt(){var e=L.p;return e===0?(e=window.event,e===void 0?32:X(e.type)):e}function bt(e,t){var n=L.p;try{return L.p=e,t()}finally{L.p=n}}var xt=Math.random().toString(36).slice(2),St=`__reactFiber$`+xt,Ct=`__reactProps$`+xt,wt=`__reactContainer$`+xt,Tt=`__reactEvents$`+xt,z=`__reactListeners$`+xt,Et=`__reactHandles$`+xt,Dt=`__reactResources$`+xt,Ot=`__reactMarker$`+xt,kt=`__reactLoad$`+xt;function At(e){delete e[St],delete e[Ct],delete e[z],delete e[Et]}function jt(e){var t;if(t=e[St])return t;for(var n=e.parentNode;n;){if(t=n[wt]||n[St]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=gm(e);e!==null;){if(n=e[St])return n;e=gm(e)}return t}e=n,n=e.parentNode}return null}function Mt(e){if(e=e[St]||e[wt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Nt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Pt(e){var t=e[Dt];return t||=e[Dt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Ft(e){e[Ot]=!0}function It(e){e[kt]=void 0}var Lt=new Set,Rt={};function B(e,t){zt(e,t),zt(e+`Capture`,t)}function zt(e,t){for(Rt[e]=t,e=0;e<t.length;e++)Lt.add(t[e])}var Bt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Vt={},Ht={};function Ut(e){return Fe.call(Ht,e)?!0:Fe.call(Vt,e)?!1:Bt.test(e)?Ht[e]=!0:(Vt[e]=!0,!1)}var V=!1;function Wt(){var e=V;return V=!1,e}function Gt(e,t,n){if(Ut(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Kt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function qt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function Jt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Yt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Xt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Zt(e){if(!e._valueTracker){var t=Yt(e)?`checked`:`value`;e._valueTracker=Xt(e,t,``+e[t])}}function Qt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Yt(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var $t=/[\n"\\]/g;function en(e){return e.replace($t,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function tn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Jt(t)):e.value!==``+Jt(t)&&(e.value=``+Jt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):rn(e,Jt(n)):o===`number`&&e.value==t?rn(e,Jt(e.value)):rn(e,Jt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Jt(s):e.removeAttribute(`name`)}function nn(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Zt(e);return}n=n==null?``:``+Jt(n),t=t==null?n:``+Jt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Zt(e)}function rn(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function an(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Jt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function on(e,t,n){t!=null&&(t=``+Jt(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+Jt(n)}function sn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(me(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Jt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Zt(e)}function cn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ln=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function un(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||ln.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function dn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,V=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(un(e,a,r),V=!0)}else for(var o in t)t.hasOwnProperty(o)&&un(e,o,t[o])}function fn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var pn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),mn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function hn(e){return mn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function gn(){}var _n=null;function vn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var yn=null,bn=null;function xn(e){var t=Mt(e);if(t&&(e=t.stateNode)){var n=e[Ct]||null;a:switch(e=t.stateNode,t.type){case`input`:if(tn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+en(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Ct]||null;if(!a)throw Error(i(90));tn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Qt(r)}break a;case`textarea`:on(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&an(e,!!n.multiple,t,!1)}}}var Sn=!1;function Cn(e,t,n){if(Sn)return e(t,n);Sn=!0;try{return e(t)}finally{if(Sn=!1,(yn!==null||bn!==null)&&(Ud(),yn&&(t=yn,e=bn,bn=yn=null,xn(t),e)))for(t=0;t<e.length;t++)xn(e[t])}}function wn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Ct]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var Tn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,En=!1;if(Tn)try{var Dn={};Object.defineProperty(Dn,"passive",{get:function(){En=!0}}),window.addEventListener(`test`,Dn,Dn),window.removeEventListener(`test`,Dn,Dn)}catch{En=!1}var On=null,kn=null,An=null;function jn(){if(An)return An;var e,t=kn,n=t.length,r,i=`value`in On?On.value:On.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return An=i.slice(e,1<r?1-r:void 0)}function Mn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Nn(){return!0}function Pn(){return!1}function Fn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Nn:Pn,this.isPropagationStopped=Pn,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Nn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Nn)},persist:function(){},isPersistent:Nn}),t}var In={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ln=Fn(In),Rn=D({},In,{view:0,detail:0}),zn=Fn(Rn),Bn,Vn,Hn,Un=D({},Rn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:er,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Hn&&(Hn&&e.type===`mousemove`?(Bn=e.screenX-Hn.screenX,Vn=e.screenY-Hn.screenY):Vn=Bn=0,Hn=e),Bn)},movementY:function(e){return`movementY`in e?e.movementY:Vn}}),Wn=Fn(Un),Gn=Fn(D({},Un,{dataTransfer:0})),Kn=Fn(D({},Rn,{relatedTarget:0})),qn=Fn(D({},In,{animationName:0,elapsedTime:0,pseudoElement:0})),Jn=Fn(D({},In,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Yn=Fn(D({},In,{data:0})),Xn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Zn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Qn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function $n(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Qn[e])?!!t[e]:!1}function er(){return $n}var tr=Fn(D({},Rn,{key:function(e){if(e.key){var t=Xn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Mn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Zn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:er,charCode:function(e){return e.type===`keypress`?Mn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Mn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),nr=Fn(D({},Un,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),rr=Fn(D({},In,{submitter:0})),ir=Fn(D({},Rn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:er})),ar=Fn(D({},In,{propertyName:0,elapsedTime:0,pseudoElement:0})),or=Fn(D({},Un,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),sr=Fn(D({},In,{newState:0,oldState:0,source:0})),cr=[9,13,27,32],lr=Tn&&`CompositionEvent`in window,ur=null;Tn&&`documentMode`in document&&(ur=document.documentMode);var dr=Tn&&`TextEvent`in window&&!ur,fr=Tn&&(!lr||ur&&8<ur&&11>=ur),pr=` `,mr=!1;function hr(e,t){switch(e){case`keyup`:return cr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function gr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var _r=!1;function vr(e,t){switch(e){case`compositionend`:return gr(t);case`keypress`:return t.which===32?(mr=!0,pr):null;case`textInput`:return e=t.data,e===pr&&mr?null:e;default:return null}}function yr(e,t){if(_r)return e===`compositionend`||!lr&&hr(e,t)?(e=jn(),An=kn=On=null,_r=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return fr&&t.locale!==`ko`?null:t.data;default:return null}}var br={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!br[e.type]:t===`textarea`}function Sr(e,t,n,r){yn?bn?bn.push(r):bn=[r]:yn=r,t=Qf(t,`onChange`),0<t.length&&(n=new Ln(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Cr=null,wr=null;function Tr(e){Gf(e,0)}function Er(e){if(Qt(Nt(e)))return e}function Dr(e,t){if(e===`change`)return t}var Or=!1;if(Tn){var kr;if(Tn){var Ar=`oninput`in document;if(!Ar){var jr=document.createElement(`div`);jr.setAttribute(`oninput`,`return;`),Ar=typeof jr.oninput==`function`}kr=Ar}else kr=!1;Or=kr&&(!document.documentMode||9<document.documentMode)}function Mr(){Cr&&(Cr.detachEvent(`onpropertychange`,Nr),wr=Cr=null)}function Nr(e){if(e.propertyName===`value`&&Er(wr)){var t=[];Sr(t,wr,e,vn(e)),Cn(Tr,t)}}function Pr(e,t,n){e===`focusin`?(Mr(),Cr=t,wr=n,Cr.attachEvent(`onpropertychange`,Nr)):e===`focusout`&&Mr()}function Fr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Er(wr)}function Ir(e,t){if(e===`click`)return Er(t)}function Lr(e,t){if(e===`input`||e===`change`)return Er(t)}function Rr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var zr=typeof Object.is==`function`?Object.is:Rr;function Br(e,t){if(zr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Fe.call(t,i)||!zr(e[i],t[i]))return!1}return!0}function Vr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Hr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ur(e,t){var n=Hr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Hr(n)}}function Wr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Wr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Vr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Vr(e.document)}return t}function Kr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var qr=Tn&&`documentMode`in document&&11>=document.documentMode,Jr=null,Yr=null,Xr=null,Zr=!1;function Qr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Zr||Jr==null||Jr!==Vr(r)||(r=Jr,`selectionStart`in r&&Kr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Xr&&Br(Xr,r)||(Xr=r,r=Qf(Yr,`onSelect`),0<r.length&&(t=new Ln(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Jr)))}function $r(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ei={animationend:$r(`Animation`,`AnimationEnd`),animationiteration:$r(`Animation`,`AnimationIteration`),animationstart:$r(`Animation`,`AnimationStart`),transitionrun:$r(`Transition`,`TransitionRun`),transitionstart:$r(`Transition`,`TransitionStart`),transitioncancel:$r(`Transition`,`TransitionCancel`),transitionend:$r(`Transition`,`TransitionEnd`)},ti={},ni={};Tn&&(ni=document.createElement(`div`).style,`AnimationEvent`in window||(delete ei.animationend.animation,delete ei.animationiteration.animation,delete ei.animationstart.animation),`TransitionEvent`in window||delete ei.transitionend.transition);function ri(e){if(ti[e])return ti[e];if(!ei[e])return e;var t=ei[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ni)return ti[e]=t[n];return e}var ii=ri(`animationend`),ai=ri(`animationiteration`),oi=ri(`animationstart`),si=ri(`transitionrun`),ci=ri(`transitionstart`),li=ri(`transitioncancel`),ui=ri(`transitionend`),di=new Map,fi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);fi.push(`scrollEnd`);function pi(e,t){di.set(e,t),B(t,[e])}var mi=0;function hi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=wd.identifierPrefix;var n=mi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function gi(e){if(e==null||typeof e==`string`)return e;var t=null,n=Md;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function _i(e,t){return e=gi(e),t=gi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var vi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},yi=[],bi=0,xi=0;function Si(){for(var e=bi,t=xi=bi=0;t<e;){var n=yi[t];yi[t++]=null;var r=yi[t];yi[t++]=null;var i=yi[t];yi[t++]=null;var a=yi[t];if(yi[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Ei(n,i,a)}}function Ci(e,t,n,r){yi[bi++]=e,yi[bi++]=t,yi[bi++]=n,yi[bi++]=r,xi|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function wi(e,t,n,r){return Ci(e,t,n,r),Di(e)}function Ti(e,t){return Ci(e,null,null,t),Di(e)}function Ei(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Qe(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Di(e){if(50<Nd)throw Nd=0,Pd=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Oi={};function ki(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ai(e,t,n,r){return new ki(e,t,n,r)}function ji(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Mi(e,t){var n=e.alternate;return n===null?(n=Ai(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Ni(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Pi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)ji(r)&&(s=1);else if(typeof r==`string`)s=Zm(e,n,be.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case ae:return e=Ai(31,n,t,a),e.elementType=ae,e.lanes=o,e;case ee:return Fi(n.children,a,o,t);case j:s=8,a|=24;break;case te:return e=Ai(12,n,t,a|2),e.elementType=te,e.lanes=o,e;case P:return e=Ai(13,n,t,a),e.elementType=P,e.lanes=o,e;case re:return e=Ai(19,n,t,a),e.elementType=re,e.lanes=o,e;case oe:case ce:return e=a|32,e=Ai(30,n,t,e),e.elementType=ce,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case N:s=10;break a;case M:s=9;break a;case ne:s=11;break a;case ie:s=14;break a;case F:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Ai(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Fi(e,t,n,r){return e=Ai(7,e,r,t),e.lanes=n,e}function Ii(e,t,n){return e=Ai(6,e,null,t),e.lanes=n,e}function Li(e){var t=Ai(18,null,null,0);return t.stateNode=e,t}function Ri(e,t,n){return t=Ai(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var zi=new WeakMap;function Bi(e,t){if(typeof e==`object`&&e){var n=zi.get(e);return n===void 0?(t={value:e,source:t,stack:Pe(t)},zi.set(e,t),t):n}return{value:e,source:t,stack:Pe(t)}}var Vi=[],Hi=0,Ui=null,Wi=0,Gi=[],Ki=0,qi=null,Ji=1,Yi=``;function Xi(e,t){Vi[Hi++]=Wi,Vi[Hi++]=Ui,Ui=e,Wi=t}function Zi(e,t,n){Gi[Ki++]=Ji,Gi[Ki++]=Yi,Gi[Ki++]=qi,qi=e;var r=Ji;e=Yi;var i=32-Qe(r)-1;r&=~(1<<i),n+=1;var a=32-Qe(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ji=1<<32-Qe(t)+i|n<<i|r,Yi=a+e}else Ji=1<<a|n<<i|r,Yi=e}function Qi(e){e.return!==null&&(Xi(e,1),Zi(e,1,0))}function $i(e){for(;e===Ui;)Ui=Vi[--Hi],Vi[Hi]=null,Wi=Vi[--Hi],Vi[Hi]=null;for(;e===qi;)qi=Gi[--Ki],Gi[Ki]=null,Yi=Gi[--Ki],Gi[Ki]=null,Ji=Gi[--Ki],Gi[Ki]=null}function ea(e,t){Gi[Ki++]=Ji,Gi[Ki++]=Yi,Gi[Ki++]=qi,Ji=t.id,Yi=t.overflow,qi=e}var ta=null,na=null,H=!1,ra=null,ia=!1,aa=Error(i(519));function oa(e){throw fa(Bi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),aa}function sa(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[St]=e,t[Ct]=r,n){case`dialog`:J(`cancel`,t),J(`close`,t);break;case`iframe`:case`object`:case`embed`:J(`load`,t);break;case`video`:case`audio`:for(n=0;n<Uf.length;n++)J(Uf[n],t);break;case`source`:J(`error`,t);break;case`img`:case`image`:case`link`:J(`error`,t),J(`load`,t);break;case`details`:J(`toggle`,t);break;case`input`:J(`invalid`,t),nn(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:J(`invalid`,t);break;case`textarea`:J(`invalid`,t),sn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||ip(t.textContent,n)?(r.popover!=null&&(J(`beforetoggle`,t),J(`toggle`,t)),r.onScroll!=null&&J(`scroll`,t),r.onScrollEnd!=null&&J(`scrollend`,t),r.onClick!=null&&(t.onclick=gn),t=!0):t=!1,t||oa(e,!0)}function ca(e){for(ta=e.return;ta;)switch(ta.tag){case 5:case 31:case 13:ia=!1;return;case 27:case 3:ia=!0;return;default:ta=ta.return}}function la(e){if(e!==ta)return!1;if(!H)return ca(e),H=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||_p(e.type,e.memoizedProps)),n=!n),n&&na&&oa(e),ca(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));na=hm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));na=hm(e)}else t===27?(t=na,Ep(e.type)?(e=mm,mm=null,na=e):na=t):na=ta?pm(e.stateNode.nextSibling):null;return!0}function ua(){na=ta=null,H=!1}function da(){var e=ra;return e!==null&&(gd===null?gd=e:gd.push.apply(gd,e),ra=null),e}function fa(e){ra===null?ra=[e]:ra.push(e)}var pa=_e(null),ma=null,ha=null;function ga(e,t,n){ye(pa,t._currentValue),t._currentValue=n}function _a(e){e._currentValue=pa.current,ve(pa)}function va(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ya(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),va(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),va(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),va(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ba(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;zr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Ce.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[dh]:e.push(dh))}a=a.return}return e!==null&&ya(t,e,n,r),t.flags|=262144,e!==null}function xa(e){for(e=e.firstContext;e!==null;){if(!zr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Sa(e){ma=e,ha=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ca(e){return Ta(ma,e)}function wa(e,t){return ma===null&&Sa(e),Ta(e,t)}function Ta(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ha===null){if(e===null)throw Error(i(308));ha=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ha=ha.next=t;return n}var Ea=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Da=t.unstable_scheduleCallback,Oa=t.unstable_NormalPriority,ka={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Aa(){return{controller:new Ea,data:new Map,refCount:0}}function ja(e){e.refCount--,e.refCount===0&&Da(Oa,function(){e.controller.abort()})}function Ma(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Na=null;function Pa(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Fa=null,Ia=0,La=0,Ra=null;function za(e,t){if(Fa===null){var n=Fa=[];Ia=0,La=zf(),Ra={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Ia++,t.then(Ba,Ba),t}function Ba(){if(--Ia===0&&(Na=null,Fa!==null)){Ra!==null&&(Ra.status=`fulfilled`);var e=Fa;Fa=null,La=0,Ra=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Va(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ha=I.S;I.S=function(e,t){if(yd=Be(),typeof t==`object`&&t&&typeof t.then==`function`&&za(e,t),Na!==null)for(var n=Tf;n!==null;)Ma(n,Na),n=n.next;if(n=e.types,n!==null){for(var r=Tf;r!==null;)Ma(r,n),r=r.next;if(La!==0){r=Na,r===null&&(r=Na=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Ha!==null&&Ha(e,t)};var Ua=_e(null);function Wa(){var e=Ua.current;return e===null?nd.pooledCache:e}function Ga(e,t){t===null?ye(Ua,Ua.current):ye(Ua,t.pool)}function Ka(){var e=Wa();return e===null?null:{parent:ka._currentValue,pool:e}}var qa=Error(i(460)),Ja=Error(i(474)),Ya=Error(i(542)),Xa={then:function(){}};function Za(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Qa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(gn,gn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,no(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(gn,gn);else{if(e=nd,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,no(e),e}throw eo=t,qa}}function $a(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(eo=e,qa):e}}var eo=null;function to(){if(eo===null)throw Error(i(459));var e=eo;return eo=null,e}function no(e){if(e===qa||e===Ya)throw Error(i(483))}var ro=null,io=0;function ao(e){var t=io;return io+=1,ro===null&&(ro=[]),Qa(ro,e,t)}function oo(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function so(e,t){throw t.$$typeof===O?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function co(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Mi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Ii(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===ee?(e=d(e,t,n.props.children,r,n.key),oo(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===F&&$a(i)===t.type)?(t=a(t,n.props),oo(t,n),t.return=e,t):(t=Pi(n.type,n.key,n.props,null,e.mode,r),oo(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ri(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Fi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Ii(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case k:return n=Pi(t.type,t.key,t.props,null,e.mode,n),oo(n,t),n.return=e,n;case A:return t=Ri(t,e.mode,n),t.return=e,t;case F:return t=$a(t),f(e,t,n)}if(me(t)||de(t))return t=Fi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,ao(t),n);if(t.$$typeof===N)return f(e,wa(e,t),n);so(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case k:return n.key===i?l(e,t,n,r):null;case A:return n.key===i?u(e,t,n,r):null;case F:return n=$a(n),p(e,t,n,r)}if(me(n)||de(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,ao(n),r);if(n.$$typeof===N)return p(e,t,wa(e,n),r);so(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case k:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case A:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case F:return r=$a(r),m(e,t,n,r,i)}if(me(r)||de(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,ao(r),i);if(r.$$typeof===N)return m(e,t,n,wa(t,r),i);so(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),H&&Xi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return H&&Xi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),H&&Xi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),H&&Xi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return H&&Xi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),H&&Xi(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===ee&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case k:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===ee){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),oo(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===F&&$a(l)===r.type){n(e,r.sibling),c=a(r,o.props),oo(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===ee?(c=Fi(o.props.children,e.mode,c,o.key),oo(c,o),c.return=e,e=c):(c=Pi(o.type,o.key,o.props,null,e.mode,c),oo(c,o),c.return=e,e=c)}return s(e);case A:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Ri(o,e.mode,c),c.return=e,e=c}return s(e);case F:return o=$a(o),_(e,r,o,c)}if(me(o))return h(e,r,o,c);if(de(o)){if(l=de(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,ao(o),c);if(o.$$typeof===N)return _(e,r,wa(e,o),c);so(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Ii(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{io=0;var i=_(e,t,n,r);return ro=null,i}catch(t){if(t===qa||t===Ya)throw t;var a=Ai(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var lo=co(!0),uo=co(!1),fo=!1;function po(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function mo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ho(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function go(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,td&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Di(e),Ei(e,null,n),t}return Ci(e,r,t,n),Di(e)}function _o(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ht(e,n)}}function vo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var yo=!1;function bo(){if(yo){var e=Ra;if(e!==null)throw e}}function xo(e,t,n,r){yo=!1;var i=e.updateQueue;fo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(K&f)===f:(r&f)===f){f!==0&&f===La&&(yo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=D({},d,f);break a;case 2:fo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),ud|=o,e.lanes=o,e.memoizedState=d}}function So(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Co(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)So(n[e],t)}var wo=_e(null),To=_e(0);function Eo(e,t){e=cd,ye(To,e),ye(wo,t),cd=e|t.baseLanes}function Do(){ye(To,cd),ye(wo,wo.current)}function Oo(){cd=To.current,ve(wo),ve(To)}var ko=_e(null),Ao=null;function jo(e){var t=e.alternate;ye(Io,Io.current&1),ye(ko,e),Ao===null&&(t===null||wo.current!==null||t.memoizedState!==null)&&(Ao=e)}function Mo(e){ye(Io,Io.current),ye(ko,e),Ao===null&&(Ao=e)}function No(e){e.tag===22?(ye(Io,Io.current),ye(ko,e),Ao===null&&(Ao=e)):Po()}function Po(){ye(Io,Io.current),ye(ko,ko.current)}function Fo(e){ve(ko),Ao===e&&(Ao=null),ve(Io)}var Io=_e(0);function Lo(e,t){ye(ko,ko.current),ye(Io,t)}function Ro(e){ve(Io),ve(ko),Ao===e&&(Ao=null)}function zo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||um(n)||dm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bo=0,U=null,Vo=null,Ho=null,Uo=!1,Wo=!1,Go=!1,Ko=0,qo=0,Jo=null,Yo=0;function Xo(){throw Error(i(321))}function Zo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!zr(e[n],t[n]))return!1;return!0}function Qo(e,t,n,r,i,a){return Bo=a,U=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,I.H=e===null||e.memoizedState===null?hc:gc,Go=!1,a=n(r,i),Go=!1,Wo&&(a=es(t,n,r,i)),$o(e),a}function $o(e){I.H=mc;var t=Vo!==null&&Vo.next!==null;if(Bo=0,Ho=Vo=U=null,Uo=!1,qo=0,Jo=null,t)throw Error(i(300));e===null||Mc||(e=e.dependencies,e!==null&&xa(e)&&(Mc=!0))}function es(e,t,n,r){U=e;var a=0;do{if(Wo&&(Jo=null),qo=0,Wo=!1,25<=a)throw Error(i(301));if(a+=1,Ho=Vo=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}I.H=_c,o=t(n,r)}while(Wo);return o}function ts(){var e=I.H,t=e.useState()[0];return t=typeof t.then==`function`?cs(t):t,e=e.useState()[0],(Vo===null?null:Vo.memoizedState)!==e&&(U.flags|=1024),t}function ns(){var e=Ko!==0;return Ko=0,e}function rs(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function is(e){if(Uo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Uo=!1}Bo=0,Ho=Vo=U=null,Wo=!1,qo=Ko=0,Jo=null}function as(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ho===null?U.memoizedState=Ho=e:Ho=Ho.next=e,Ho}function os(){if(Vo===null){var e=U.alternate;e=e===null?null:e.memoizedState}else e=Vo.next;var t=Ho===null?U.memoizedState:Ho.next;if(t!==null)Ho=t,Vo=e;else{if(e===null)throw U.alternate===null?Error(i(467)):Error(i(310));Vo=e,e={memoizedState:Vo.memoizedState,baseState:Vo.baseState,baseQueue:Vo.baseQueue,queue:Vo.queue,next:null},Ho===null?U.memoizedState=Ho=e:Ho=Ho.next=e}return Ho}function ss(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function cs(e){var t=qo;return qo+=1,Jo===null&&(Jo=[]),e=Qa(Jo,e,t),t=U,(Ho===null?t.memoizedState:Ho.next)===null&&(t=t.alternate,I.H=t===null||t.memoizedState===null?hc:gc),e}function ls(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return cs(e);if(e.$$typeof===le)return;if(e.$$typeof===N)return Ca(e)}throw Error(i(438,String(e)))}function us(e){var t=null,n=U.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=U.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=ss(),U.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=se;return t.index++,n}function ds(e,t){return typeof t==`function`?t(e):t}function fs(e){return ps(os(),Vo,e)}function ps(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Bo&f)===f:(K&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===La&&(d=!0);else if((Bo&p)===p){u=u.next,p===La&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,U.lanes|=p,ud|=p;f=u.action,Go&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,U.lanes|=f,ud|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!zr(o,e.memoizedState)&&(Mc=!0,d&&(n=Ra,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function ms(e){var t=os(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);zr(o,t.memoizedState)||(Mc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function hs(e,t,n){var r=U,a=os(),o=H;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!zr((Vo||a).memoizedState,n);if(s&&(a.memoizedState=n,Mc=!0),a=a.queue,Bs(vs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Ho!==null&&!!(Ho.memoizedState.tag&1),Fs(e?9:8,{destroy:void 0},_s.bind(null,r,a,n,t),null),e){if(r.flags|=2048,nd===null)throw Error(i(349));o||Bo&127||gs(r,t,n)}return n}function gs(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=U.updateQueue,t===null?(t=ss(),U.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function _s(e,t,n,r){t.value=n,t.getSnapshot=r,ys(t)&&bs(e)}function vs(e,t,n){return n(function(){ys(t)&&bs(e)})}function ys(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!zr(e,n)}catch{return!0}}function bs(e){var t=Ti(e,2);t!==null&&Rd(t,e,2)}function xs(e){var t=as();if(typeof e==`function`){var n=e;if(e=n(),Go){Ze(!0);try{n()}finally{Ze(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ds,lastRenderedState:e},t}function Ss(e,t,n,r){return e.baseState=n,ps(e,Vo,typeof r==`function`?r:ds)}function Cs(e,t,n,r,a){if(dc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};I.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,ws(t,o)):(o.next=n.next,t.pending=n.next=o)}}function ws(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=I.T,o={};o.types=a===null?null:a.types,I.T=o;try{var s=n(i,r),c=I.S;c!==null&&c(o,s),Ts(e,t,s)}catch(n){Ds(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),I.T=a}}else try{a=n(i,r),Ts(e,t,a)}catch(n){Ds(e,t,n)}}function Ts(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Es(e,t,n)},function(n){return Ds(e,t,n)}):Es(e,t,n)}function Es(e,t,n){t.status=`fulfilled`,t.value=n,Os(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,ws(e,n)))}function Ds(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Os(t),t=t.next;while(t!==r)}e.action=null}function Os(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ks(e,t){return t}function As(e,t){if(H){var n=nd.formState;if(n!==null){a:{var r=U;if(H){if(na){b:{for(var i=na,a=ia;i.nodeType!==8;)if(!a||(i=pm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){na=pm(i.nextSibling),r=i.data===`F!`;break a}}oa(r)}r=!1}r&&(t=n[0])}}return n=as(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ks,lastRenderedState:t},n.queue=r,n=cc.bind(null,U,r),r.dispatch=n,r=xs(!1),a=uc.bind(null,U,!1,r.queue),r=as(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Cs.bind(null,U,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function js(e){return Ms(os(),Vo,e)}function Ms(e,t,n){if(t=ps(e,t,ks)[0],e=fs(ds)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=cs(t)}catch(e){throw e===qa?Ya:e}else r=t;t=os();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(U.flags|=2048,Fs(9,{destroy:void 0},Ns.bind(null,i,n),null)),[r,a,e]}function Ns(e,t){e.action=t}function Ps(e){var t=os(),n=Vo;if(n!==null)return Ms(t,n,e);os(),t=t.memoizedState,n=os();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Fs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=U.updateQueue,t===null&&(t=ss(),U.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Is(){return os().memoizedState}function Ls(e,t,n,r){var i=as();U.flags|=e,i.memoizedState=Fs(1|t,{destroy:void 0},n,r===void 0?null:r)}function Rs(e,t,n,r){var i=os();r=r===void 0?null:r;var a=i.memoizedState.inst;Vo!==null&&r!==null&&Zo(r,Vo.memoizedState.deps)?i.memoizedState=Fs(t,a,n,r):(U.flags|=e,i.memoizedState=Fs(1|t,a,n,r))}function zs(e,t){Ls(8390656,8,e,t)}function Bs(e,t){Rs(2048,8,e,t)}function Vs(e){U.flags|=4;var t=U.updateQueue;if(t===null)t=ss(),U.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Hs(e){var t=os().memoizedState;return Vs({ref:t,nextImpl:e}),function(){if(td&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Us(e,t){return Rs(4,2,e,t)}function Ws(e,t){return Rs(4,4,e,t)}function Gs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ks(e,t,n){n=n==null?null:n.concat([e]),Rs(4,4,Gs.bind(null,t,e),n)}function qs(){}function Js(e,t){var n=os();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Zo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ys(e,t){var n=os();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Zo(t,r[1]))return r[0];if(r=e(),Go){Ze(!0);try{e()}finally{Ze(!1)}}return n.memoizedState=[r,t],r}function Xs(e,t,n){return n===void 0||Bo&1073741824&&!(K&261930)?e.memoizedState=t:(e.memoizedState=n,e=Id(),U.lanes|=e,ud|=e,n)}function Zs(e,t,n,r){return zr(n,t)?n:wo.current===null?!(Bo&106)||Bo&1073741824&&!(K&261930)?(Mc=!0,e.memoizedState=n):(e=Id(),U.lanes|=e,ud|=e,t):(e=Xs(e,n,r),zr(e,t)||(Mc=!0),e)}function Qs(e,t,n,r,i){var a=L.p;L.p=a!==0&&8>a?a:8;var o=I.T,s={};s.types=o===null?null:o.types,I.T=s,uc(e,!1,t,n);try{var c=i(),l=I.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?lc(e,t,Va(c,r),Fd(e)):lc(e,t,r,Fd(e))}catch(n){lc(e,t,{then:function(){},status:`rejected`,reason:n},Fd())}finally{L.p=a,o!==null&&s.types!==null&&(o.types=s.types),I.T=o}}function $s(){}function ec(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=tc(e).queue;Qs(e,a,t,R,n===null?$s:function(){return nc(e),n(r)})}function tc(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:R,baseState:R,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ds,lastRenderedState:R},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ds,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function nc(e){var t=tc(e);t.next===null&&(t=e.alternate.memoizedState),lc(e,t.next.queue,{},Fd())}function rc(){return Ca(dh)}function ic(){return os().memoizedState}function ac(){return os().memoizedState}function oc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Fd();e=ho(n);var r=go(t,e,n);r!==null&&(Rd(r,t,n),_o(r,t,n)),t={cache:Aa()},e.payload=t;return}t=t.return}}function sc(e,t,n){var r=Fd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},dc(e)?fc(t,n):(n=wi(e,t,n,r),n!==null&&(Rd(n,e,r),pc(n,t,r)))}function cc(e,t,n){lc(e,t,n,Fd())}function lc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(dc(e))fc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,zr(s,o))return Ci(e,t,i,0),nd===null&&Si(),!1}catch{}if(n=wi(e,t,i,r),n!==null)return Rd(n,e,r),pc(n,t,r),!0}return!1}function uc(e,t,n,r){if(r={lane:2,revertLane:zf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},dc(e)){if(t)throw Error(i(479))}else t=wi(e,n,r,2),t!==null&&Rd(t,e,2)}function dc(e){var t=e.alternate;return e===U||t!==null&&t===U}function fc(e,t){Wo=Uo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function pc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ht(e,n)}}var mc={readContext:Ca,use:ls,useCallback:Xo,useContext:Xo,useEffect:Xo,useImperativeHandle:Xo,useLayoutEffect:Xo,useInsertionEffect:Xo,useMemo:Xo,useReducer:Xo,useRef:Xo,useState:Xo,useDebugValue:Xo,useDeferredValue:Xo,useTransition:Xo,useSyncExternalStore:Xo,useId:Xo,useHostTransitionStatus:Xo,useFormState:Xo,useActionState:Xo,useOptimistic:Xo,useMemoCache:Xo,useCacheRefresh:Xo,useEffectEvent:Xo},hc={readContext:Ca,use:ls,useCallback:function(e,t){return as().memoizedState=[e,t===void 0?null:t],e},useContext:Ca,useEffect:zs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Ls(4194308,4,Gs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ls(4194308,4,e,t)},useInsertionEffect:function(e,t){Ls(4,2,e,t)},useMemo:function(e,t){var n=as();t=t===void 0?null:t;var r=e();if(Go){Ze(!0);try{e()}finally{Ze(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=as();if(n!==void 0){var i=n(t);if(Go){Ze(!0);try{n(t)}finally{Ze(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=sc.bind(null,U,e),[r.memoizedState,e]},useRef:function(e){var t=as();return e={current:e},t.memoizedState=e},useState:function(e){e=xs(e);var t=e.queue,n=cc.bind(null,U,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:qs,useDeferredValue:function(e,t){return Xs(as(),e,t)},useTransition:function(){var e=xs(!1);return e=Qs.bind(null,U,e.queue,!0,!1),as().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=U,a=as();if(H){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),nd===null)throw Error(i(349));K&127||gs(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,zs(vs.bind(null,r,o,e),[e]),r.flags|=2048,Fs(9,{destroy:void 0},_s.bind(null,r,o,n,t),null),n},useId:function(){var e=as(),t=nd.identifierPrefix;if(H){var n=Yi,r=Ji;n=(r&~(1<<32-Qe(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Ko++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Yo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:rc,useFormState:As,useActionState:As,useOptimistic:function(e){var t=as();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=uc.bind(null,U,!0,n),n.dispatch=t,[e,t]},useMemoCache:us,useCacheRefresh:function(){return as().memoizedState=oc.bind(null,U)},useEffectEvent:function(e){var t=as(),n={impl:e};return t.memoizedState=n,function(){if(td&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},gc={readContext:Ca,use:ls,useCallback:Js,useContext:Ca,useEffect:Bs,useImperativeHandle:Ks,useInsertionEffect:Us,useLayoutEffect:Ws,useMemo:Ys,useReducer:fs,useRef:Is,useState:function(){return fs(ds)},useDebugValue:qs,useDeferredValue:function(e,t){return Zs(os(),Vo.memoizedState,e,t)},useTransition:function(){var e=fs(ds)[0],t=os().memoizedState;return[typeof e==`boolean`?e:cs(e),t]},useSyncExternalStore:hs,useId:ic,useHostTransitionStatus:rc,useFormState:js,useActionState:js,useOptimistic:function(e,t){return Ss(os(),Vo,e,t)},useMemoCache:us,useCacheRefresh:ac,useEffectEvent:Hs},_c={readContext:Ca,use:ls,useCallback:Js,useContext:Ca,useEffect:Bs,useImperativeHandle:Ks,useInsertionEffect:Us,useLayoutEffect:Ws,useMemo:Ys,useReducer:ms,useRef:Is,useState:function(){return ms(ds)},useDebugValue:qs,useDeferredValue:function(e,t){var n=os();return Vo===null?Xs(n,e,t):Zs(n,Vo.memoizedState,e,t)},useTransition:function(){var e=ms(ds)[0],t=os().memoizedState;return[typeof e==`boolean`?e:cs(e),t]},useSyncExternalStore:hs,useId:ic,useHostTransitionStatus:rc,useFormState:Ps,useActionState:Ps,useOptimistic:function(e,t){var n=os();return Vo===null?(n.baseState=e,[e,n.queue.dispatch]):Ss(n,Vo,e,t)},useMemoCache:us,useCacheRefresh:ac,useEffectEvent:Hs};function W(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var vc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Fd(),i=ho(r);i.payload=t,n!=null&&(i.callback=n),t=go(e,i,r),t!==null&&(Rd(t,e,r),_o(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Fd(),i=ho(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=go(e,i,r),t!==null&&(Rd(t,e,r),_o(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Fd(),r=ho(n);r.tag=2,t!=null&&(r.callback=t),t=go(e,r,n),t!==null&&(Rd(t,e,n),_o(t,e,n))}};function yc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Br(n,r)||!Br(i,a):!0}function bc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&vc.enqueueReplaceState(t,t.state,null)}function xc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=D({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Sc(e){vi(e)}function Cc(e){console.error(e)}function wc(e){vi(e)}function Tc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ec(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Dc(e,t,n){return n=ho(n),n.tag=3,n.payload={element:null},n.callback=function(){Tc(e,t)},n}function Oc(e){return e=ho(e),e.tag=3,e}function kc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ec(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ec(t,n,r),typeof i!=`function`&&(Sd===null?Sd=new Set([this]):Sd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Ac(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ba(t,n,a,!0),n=ko.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Ao===null?Xd():n.alternate===null&&ld===0&&(ld=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Xa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),yf(e,r,a)),!1;case 22:return n.flags|=65536,r===Xa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),yf(e,r,a)),!1}throw Error(i(435,n.tag))}return yf(e,r,a),Xd(),!1}if(H)return t=ko.current,t===null?(r!==aa&&(t=Error(i(423),{cause:r}),fa(Bi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Bi(r,n),a=Dc(e.stateNode,r,a),vo(e,a),ld!==4&&(ld=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==aa&&(e=Error(i(422),{cause:r}),fa(Bi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Bi(o,n),hd===null?hd=[o]:hd.push(o),ld!==4&&(ld=2),t===null)return!0;r=Bi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Dc(n.stateNode,r,e),vo(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(Sd===null||!Sd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Oc(a),kc(a,e,n,r),vo(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var jc=Error(i(461)),Mc=!1;function Nc(e,t,n,r){t.child=e===null?uo(t,null,n,r):lo(t,e.child,n,r)}function Pc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Sa(t),r=Qo(e,t,n,o,a,i),s=ns(),e!==null&&!Mc?(rs(e,t,i),cl(e,t,i)):(H&&s&&Qi(t),t.flags|=1,Nc(e,t,r,i),t.child)}function Fc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ji(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Ic(e,t,a,r,i)):(e=Pi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!ll(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Br:n,n(o,r)&&e.ref===t.ref)return cl(e,t,i)}return t.flags|=1,e=Mi(a,r),e.ref=t.ref,e.return=t,t.child=e}function Ic(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Br(a,r)&&e.ref===t.ref){if(Mc=!1,t.pendingProps=r=a,ll(e,i))e.flags&131072&&(Mc=!0);else return t.lanes=e.lanes,cl(e,t,i)}}return Wc(e,t,n,r,i)}function Lc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return zc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ga(t,a===null?null:a.cachePool),a===null?Do():Eo(t,a),No(t);else return r=t.lanes=536870912,zc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ga(t,null),Do(),Po()):(Ga(t,a.cachePool),Eo(t,a),Po(),t.memoizedState=null);return Nc(e,t,i,n),t.child}function Rc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function zc(e,t,n,r,i){var a=Wa();return a=a===null?null:{parent:ka._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ga(t,null),Do(),No(t),e!==null&&ba(e,t,r,!0),t.childLanes=i,null}function Bc(e,t){return t=$c({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Vc(e,t,n){return lo(t,e.child,null,n),e=Bc(t,t.pendingProps),e.flags|=2,Fo(t),t.memoizedState=null,e}function Hc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(H){if(r.mode===`hidden`)return e=Bc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Rc(null,e);if(Mo(t),(e=na)?(e=lm(e,ia),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qi===null?null:{id:Ji,overflow:Yi},retryLane:536870912,hydrationErrors:null},n=Li(e),n.return=t,t.child=n,ta=t,na=null)):e=null,e===null)throw oa(t);return t.lanes=536870912,null}return Bc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Mo(t),a){if(t.flags&256)t.flags&=-257,t=Vc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Mc||ba(e,t,n,!1),a=(n&e.childLanes)!==0,Mc||a){if(wo.current===null){if(r=nd,r!==null&&(s=gt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Ti(e,s),Rd(r,e,s),jc;Xd()}t=Vc(e,t,n)}else e=o.treeContext,na=pm(s.nextSibling),ta=t,H=!0,ra=null,ia=!1,e!==null&&ea(t,e),t=Bc(t,r),t.flags|=134221824;return t}return e=Mi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Uc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Wc(e,t,n,r,i){return Sa(t),n=Qo(e,t,n,r,void 0,i),r=ns(),e!==null&&!Mc?(rs(e,t,i),cl(e,t,i)):(H&&r&&Qi(t),t.flags|=1,Nc(e,t,n,i),t.child)}function Gc(e,t,n,r,i,a){return Sa(t),t.updateQueue=null,n=es(t,r,n,i),$o(e),r=ns(),e!==null&&!Mc?(rs(e,t,a),cl(e,t,a)):(H&&r&&Qi(t),t.flags|=1,Nc(e,t,n,a),t.child)}function Kc(e,t,n,r,i){if(Sa(t),t.stateNode===null){var a=Oi,o=n.contextType;typeof o==`object`&&o&&(a=Ca(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=vc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},po(t),o=n.contextType,a.context=typeof o==`object`&&o?Ca(o):Oi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(W(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&vc.enqueueReplaceState(a,a.state,null),xo(t,r,a,i),bo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=xc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Oi,typeof u==`object`&&u&&(o=Ca(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&bc(t,a,r,o),fo=!1;var f=t.memoizedState;a.state=f,xo(t,r,a,i),bo(),l=t.memoizedState,s||f!==l||fo?(typeof d==`function`&&(W(t,n,d,r),l=t.memoizedState),(c=fo||yc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,mo(e,t),o=t.memoizedProps,u=xc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Oi,typeof l==`object`&&l&&(c=Ca(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&bc(t,a,r,c),fo=!1,f=t.memoizedState,a.state=f,xo(t,r,a,i),bo();var p=t.memoizedState;o!==d||f!==p||fo||e!==null&&e.dependencies!==null&&xa(e.dependencies)?(typeof s==`function`&&(W(t,n,s,r),p=t.memoizedState),(u=fo||yc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&xa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Uc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=lo(t,e.child,null,i),t.child=lo(t,null,n,i)):Nc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=cl(e,t,i),e}function qc(e,t,n,r){return ua(),t.flags|=256,Nc(e,t,n,r),t.child}var Jc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yc(e){return{baseLanes:e,cachePool:Ka()}}function Xc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=pd),e}function Zc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Io.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(H){if(i?jo(t):Po(),(e=na)?(e=lm(e,ia),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qi===null?null:{id:Ji,overflow:Yi},retryLane:536870912,hydrationErrors:null},n=Li(e),n.return=t,t.child=n,ta=t,na=null)):e=null,e===null)throw oa(t);return t.lanes=dm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Po(),i=t.mode,a=$c({mode:`hidden`,children:a},i),r=Fi(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Yc(n),r.childLanes=Xc(e,o,n),t.memoizedState=Jc,Rc(null,r)):(jo(t),Qc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return tl(e,t,a,o,r,c,s,n)}return i?(Po(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Mi(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Fi(i,a,n,null),i.flags|=2):i=Mi(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Rc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Yc(n):(a=i.cachePool,a===null?a=Ka():(s=ka._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Xc(e,o,n),t.memoizedState=Jc,Rc(e.child,r)):(jo(t),n=e.child,e=n.sibling,n=Mi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Qc(e,t){return t=$c({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function $c(e,t){return e=Ai(22,e,null,t),e.lanes=0,e}function el(e,t,n){return lo(t,e.child,null,n),e=Qc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function tl(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(jo(t),t.flags&=-257,el(e,t,c)):t.memoizedState===null?(Po(),o=a.fallback,s=t.mode,a=$c({mode:`visible`,children:a.children},s),o=Fi(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,lo(t,e.child,null,c),a=t.child,a.memoizedState=Yc(c),a.childLanes=Xc(e,r,c),t.memoizedState=Jc,Rc(null,a)):(Po(),t.child=e.child,t.flags|=128,null);if(jo(t),dm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,fa({value:a,source:null,stack:null})),el(e,t,c)}if(Mc||ba(e,t,c,!1),r=(c&e.childLanes)!==0,Mc||r){if(wo.current!==null)return el(e,t,c);if(r=nd,r!==null&&(a=gt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Ti(e,a),Rd(r,e,a),jc;return um(o)||Xd(),el(e,t,c)}return um(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,na=pm(o.nextSibling),ta=t,H=!0,ra=null,ia=!1,e!==null&&ea(t,e),t=Qc(t,a.children),t.flags|=134221824,t)}function nl(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),va(e.return,t,n)}function rl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&zo(n)===null&&(t=e),e=e.sibling}return t}function il(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function al(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function ol(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Io.current;if(t.flags&128)return Lo(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Lo(t,o),i===`backwards`&&e!==null?(al(e),Nc(e,t,r,n),al(e)):Nc(e,t,r,n),r=H?Wi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&nl(e,n,t);else if(e.tag===19)nl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=rl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,al(t)),il(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&zo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}il(t,!0,n,null,a,r);break;case`together`:il(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=rl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),il(t,!1,i,n,a,r)}return t.child}function sl(e,t,n){var r=t.pendingProps;return ga(t,t.type,r.value),Nc(e,t,r.children,n),t.child}function cl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),ud|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(ba(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Mi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Mi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ll(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&xa(e)))}function ul(e,t,n){switch(t.tag){case 3:we(t,t.stateNode.containerInfo),ga(t,ka,e.memoizedState.cache),ua();break;case 27:case 5:Ee(t);break;case 4:we(t,t.stateNode.containerInfo);break;case 10:ga(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Mo(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return jo(t),t.flags|=128,null;r=ba(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Zc(e,t,n):(jo(t),e=cl(e,t,n),e===null?null:e.sibling)}jo(t);break;case 19:if(t.flags&128)return ol(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(ba(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return ol(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Lo(t,Io.current),r)break;return null;case 22:return t.lanes=0,Lc(e,t,n,t.pendingProps);case 24:ga(t,ka,e.memoizedState.cache)}return cl(e,t,n)}function dl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Mc=!0;else{if(!ll(e,n)&&!(t.flags&128))return Mc=!1,ul(e,t,n);Mc=!!(e.flags&131072)}}else Mc=!1,H&&t.flags&1048576&&Zi(t,Wi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=$a(t.elementType),t.type=e,typeof e==`function`)ji(e)?(r=xc(e,r),t.tag=1,t=Kc(null,t,e,r,n)):(t.tag=0,t=Wc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===ne){t.tag=11,t=Pc(null,t,e,r,n);break a}if(a===ie){t.tag=14,t=Fc(null,t,e,r,n);break a}if(a===N){t.tag=10,t.type=e,t=sl(null,t,n);break a}}throw t=pe(e)||e,Error(i(306,t,``))}}return t;case 0:return Wc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=xc(r,t.pendingProps),Kc(e,t,r,a,n);case 3:a:{if(we(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,mo(e,t),xo(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ga(t,ka,r),r!==o.cache&&ya(t,[ka],n,!0),bo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=qc(e,t,r,n);break a}if(r!==a){a=Bi(Error(i(424)),t),fa(a),t=qc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(na=pm(e.firstChild),ta=t,H=!0,ra=null,ia=!0,n=uo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(ua(),r===a){t=cl(e,t,n);break a}Nc(e,t,r,n)}t=t.child}return t;case 26:return Uc(e,t),e===null?(n=Lm(t.type,null,t.pendingProps,null))?t.memoizedState=n:H||(t.stateNode=gp(t.type,t.pendingProps,Se.current,t)):t.memoizedState=Lm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Ee(t),e===null&&H&&(r=t.stateNode=ym(t.type,t.pendingProps,Se.current),ta=t,ia=!0,a=na,Ep(t.type)?(mm=a,na=pm(r.firstChild)):na=a),Nc(e,t,t.pendingProps.children,n),Uc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&H&&((a=r=na)&&(r=sm(r,t.type,t.pendingProps,ia),r===null?a=!1:(t.stateNode=r,ta=t,na=pm(r.firstChild),ia=!1,a=!0)),a||oa(t)),Ee(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,_p(a,o)?r=null:s!==null&&_p(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Qo(e,t,ts,null,null,n),dh._currentValue=a),Uc(e,t),Nc(e,t,r,n),t.child;case 6:return e===null&&H&&((e=n=na)&&(n=cm(n,t.pendingProps,ia),n===null?e=!1:(t.stateNode=n,ta=t,na=null,e=!0)),e||oa(t)),null;case 13:return Zc(e,t,n);case 4:return we(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=lo(t,null,r,n):Nc(e,t,r,n),t.child;case 11:return Pc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Uc(e,t),Nc(e,t,r,n),t.child;case 8:return Nc(e,t,t.pendingProps.children,n),t.child;case 12:return Nc(e,t,t.pendingProps.children,n),t.child;case 10:return sl(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,Sa(t),a=Ca(a),r=r(a),t.flags|=1,Nc(e,t,r,n),t.child;case 14:return Fc(e,t,t.type,t.pendingProps,n);case 15:return Ic(e,t,t.type,t.pendingProps,n);case 19:return ol(e,t,n);case 31:return Hc(e,t,n);case 22:return Lc(e,t,n,t.pendingProps);case 24:return Sa(t),r=Ca(ka),e===null?(a=Wa(),a===null&&(a=nd,o=Aa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},po(t),ga(t,ka,a)):((e.lanes&n)!==0&&(mo(e,t),xo(t,null,null,n),bo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ga(t,ka,r),r!==a.cache&&ya(t,[ka],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ga(t,ka,r))),Nc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:H&&Qi(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Uc(e,t),Nc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function fl(e){e.flags|=4}function pl(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Qm(t,r):Qm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(qd())e.flags|=8192;else throw eo=Xa,Ja}}else e.flags&=-16777217}function ml(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!$m(t)){if(qd())e.flags|=8192;else throw eo=Xa,Ja}}function hl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:ut(),e.lanes|=t,md|=t)}function gl(e,t){if(!H)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function _l(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function vl(e,t,n){var r=t.pendingProps;switch($i(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return _l(t),null;case 1:return _l(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),_a(ka),Te(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(la(t)?fl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,da())),_l(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(fl(t),o===null?(_l(t),pl(t,a,null,r,n)):(_l(t),ml(t,o))):o?o===e.memoizedState?(_l(t),t.flags&=-16777217):(fl(t),_l(t),ml(t,o)):(e=e.memoizedProps,e!==r&&fl(t),_l(t),pl(t,a,e,r,n)),null;case 27:if(De(t),n=Se.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&fl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return _l(t),t.subtreeFlags&=-33554433,null}e=be.current,la(t)?sa(t,e):(e=ym(a,r,n),t.stateNode=e,fl(t))}return _l(t),t.subtreeFlags&=-33554433,null;case 5:if(De(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&fl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return _l(t),t.subtreeFlags&=-33554433,null}if(o=be.current,la(t))sa(t,o);else{var s=pp(Se.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[St]=t,o[Ct]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(op(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&fl(t)}}return _l(t),t.subtreeFlags&=-33554433,pl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&fl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=Se.current,la(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=ta,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[St]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||ip(e.nodeValue,n)),e||oa(t,!0)}else e=pp(e).createTextNode(r),e[St]=t,t.stateNode=e}return _l(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=la(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[St]=t}else ua(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;_l(t),e=!1}else n=da(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Fo(t),t):(Fo(t),null);if(t.flags&128)throw Error(i(558))}return _l(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=la(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[St]=t}else ua(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;_l(t),a=!1}else a=da(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Fo(t),t):(Fo(t),null)}return Fo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),hl(t,t.updateQueue),_l(t),null);case 4:return Te(),e===null&&Jf(t.stateNode.containerInfo),t.flags|=67108864,_l(t),null;case 10:return _a(t.type),_l(t),null;case 19:if(Ro(t),r=t.memoizedState,r===null)return _l(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)gl(r,!1);else{if(ld!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=zo(e),o!==null){for(t.flags|=128,gl(r,!1),e=o.updateQueue,t.updateQueue=e,hl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Ni(n,e),n=n.sibling;return Lo(t,Io.current&1|2),H&&Xi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Be()>bd&&(t.flags|=128,a=!0,gl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=zo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,hl(t,e),gl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!H)return _l(t),null}else 2*Be()-r.renderingStartTime>bd&&n!==536870912&&(t.flags|=128,a=!0,gl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Be(),e.sibling=null,o=Io.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||H?Lo(t,o):(n=o,ye(ko,t),ye(Io,n),Ao===null&&(Ao=t)),H&&Xi(t,r.treeForkCount),e}return _l(t),null;case 22:case 23:return Fo(t),Oo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(_l(t),t.subtreeFlags&6&&(t.flags|=8192)):_l(t),n=t.updateQueue,n!==null&&hl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&ve(Ua),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),_a(ka),_l(t),null;case 25:return null;case 30:return t.flags|=33554432,_l(t),null}throw Error(i(156,t.tag))}function yl(e,t){switch($i(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return _a(ka),Te(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return De(t),null;case 31:if(t.memoizedState!==null){if(Fo(t),t.alternate===null)throw Error(i(340));ua()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Fo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));ua()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ro(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Te(),null;case 10:return _a(t.type),null;case 22:case 23:return Fo(t),Oo(),e!==null&&ve(Ua),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return _a(ka),null;case 25:return null;default:return null}}function bl(e,t){switch($i(t),t.tag){case 3:_a(ka),Te();break;case 26:case 27:case 5:De(t);break;case 4:Te();break;case 31:t.memoizedState!==null&&Fo(t);break;case 13:Fo(t);break;case 19:Ro(t);break;case 10:_a(t.type);break;case 22:case 23:Fo(t),Oo(),e!==null&&ve(Ua);break;case 24:_a(ka)}}function xl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){vf(t,t.return,e)}}function Sl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){vf(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){vf(t,t.return,e)}}function Cl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Co(t,n)}catch(t){vf(e,e.return,t)}}}function wl(e,t,n){n.props=xc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){vf(e,t,n)}}function Tl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=hi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Rp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new zp(e);m(e.child,!1,nm,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){vf(e,t,n)}}function El(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){vf(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){vf(e,t,n)}else n.current=null}}function Dl(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)im(e.stateNode,t[n])}function Ol(e){for(var t=e.return;t!==null&&(jl(t)&&im(e.stateNode,t.stateNode),!Al(t));)t=t.return}function kl(e){for(var t=e.return;t!==null&&(jl(t)&&am(e.stateNode,t.stateNode),!Al(t));)t=t.return}function Al(e){return e.tag===5||e.tag===3||e.tag===27}function jl(e){return e&&e.tag===7&&e.stateNode!==null}function Ml(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){vf(e,e.return,t)}}function Nl(e,t,n){try{var r=e.stateNode;cp(r,e.type,n,t),r[Ct]=t}catch(t){vf(e,e.return,t)}}function Pl(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ep(e.type)||e.tag===4}function Fl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Pl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ep(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Il(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=gn)),Dl(e,r),V=!0;else if(i!==4&&(i===27&&(Dl(e,r),r=null,Ep(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Il(e,t,n,r),e=e.sibling;e!==null;)Il(e,t,n,r),e=e.sibling}function Ll(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Dl(e,r),V=!0;else if(i!==4&&(i===27&&(Dl(e,r),r=null,Ep(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Ll(e,t,n,r),e=e.sibling;e!==null;)Ll(e,t,n,r),e=e.sibling}function Rl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);op(t,r,n),t[St]=e,t[Ct]=n}catch(t){vf(e,e.return,t)}}var zl=!1,Bl=null;function Vl(e){(e.tag===30||e.subtreeFlags&33554432)&&(zl=!0)}var Hl=null;function Ul(){var e=Hl;return Hl=null,e}var Wl=0;function Gl(e,t,n,r,i){return Wl=0,Kl(e.child,t,n,r,i)}function Kl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Mp(o);r.push(s),s.view&&(a=!0)}else a||Mp(o).view&&(a=!0);zl=!0,kp(o,Wl===0?t:t+`_`+Wl,n),Wl++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Kl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function ql(e,t){for(;e!==null;)e.tag===5?Ap(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||ql(e.child,t),e=e.sibling}function Jl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Jl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=_i(t.default,t.share),t!==`none`&&(Gl(e,n,t,null,!1)||ql(e.child,!1))}e=e.sibling}}function Yl(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=hi(r,n),a=_i(r.default,n.paired?r.share:r.enter);a===`none`?Jl(e):Gl(e,i,a,null,!1)?(Jl(e),n.paired||t||Ld(e,r.onEnter)):ql(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Yl(e,t),e=e.sibling;else Jl(e)}function Xl(e){if(Bl!==null&&Bl.size!==0){var t=Bl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=_i(n.default,n.share);if(a!==`none`&&(Gl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Ld(e,n.onShare)):ql(e.child,!1)),t.delete(r),t.size===0)break}}}Xl(e)}e=e.sibling}}}function Zl(e){if(e.tag===30){var t=e.memoizedProps,n=hi(t,e.stateNode),r=Bl===null?void 0:Bl.get(n),i=_i(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Gl(e,n,i,null,!1)?r===void 0?Ld(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Bl.delete(n),Ld(e,t.onShare)):ql(e.child,!1)),Bl!==null&&Xl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Zl(e),e=e.sibling;else Bl!==null&&Xl(e)}function Ql(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=hi(t,e.stateNode);t=_i(t.default,t.update),e.flags&=-5,t!==`none`&&Gl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Ql(e);e=e.sibling}}function $l(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,ql(e.child,!1))}$l(e)}e=e.sibling}}function eu(e){if(e.tag===30)e.stateNode.paired=null,ql(e.child,!1),$l(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)eu(e),e=e.sibling;else $l(e)}function tu(e){for(e=e.child;e!==null;)e.tag===30?ql(e.child,!1):e.subtreeFlags&33554432&&tu(e),e=e.sibling}function nu(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Wl<a.length){var l=a[Wl],u=Mp(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&kp(c,Wl===0?n:n+`_`+Wl,i),s&&e.flags&4||(Hl===null&&(Hl=[]),Hl.push(c,Wl===0?r:r+`_`+Wl,t.memoizedProps)),Wl++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:nu(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function ru(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=hi(n,r),a=_i(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(Np)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Wl=0,i=nu(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Ld(e,n.onUpdate))}else e.subtreeFlags&33554432&&ru(e,t);e=e.sibling}}var iu=!1,au=!1,ou=!1,su=!1,cu=typeof WeakSet==`function`?WeakSet:Set,lu=null,uu=!1,du=!1,fu=!1,pu=!1;function mu(e,t,n){if(e=e.containerInfo,dp=bh,e=Gr(e),Kr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(fp={focusedElem:e,selectionRange:r},bh=!1,n=(n&335544064)===n,lu=t,t=n?9270:1024;lu!==null;){if(e=lu,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Zl(r[a]);if(e.alternate===null&&e.flags&2)n&&Vl(e),hu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Zl(r),hu(n);continue}if(r!==null&&r.memoizedState!==null){n&&Vl(e),hu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,lu=r):(n&&Ql(e),hu(n))}}Bl=null}function hu(e){for(;lu!==null;){var t=lu,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=xc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){vf(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)om(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:om(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=hi(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=_i(a.default,a.update),a!==`none`&&Gl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,lu=r;break}lu=t.return}}function gu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Iu(e,n),r&4&&xl(5,n);break;case 1:if(Iu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){vf(n,n.return,e)}else{var i=xc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){vf(n,n.return,e)}}}r&64&&Cl(n),r&512&&Tl(n,n.return);break;case 3:if(Iu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Co(e,t)}catch(e){vf(n,n.return,e)}}break;case 27:t===null&&r&4&&Rl(n);case 26:case 5:Iu(e,n),t===null&&r&4&&Ml(n),r&512&&Tl(n,n.return);break;case 12:Iu(e,n);break;case 31:Iu(e,n),r&4&&Tu(e,n);break;case 13:Iu(e,n),r&4&&Eu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Sf.bind(null,n),fm(e,n))));break;case 22:if(r=n.memoizedState!==null||iu,!r){var a=t!==null&&t.memoizedState!==null||au;t=iu,i=au,iu=r,(au=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Ru(e,n,r)):Iu(e,n),iu=t,au=i}break;case 30:Iu(e,n),r&512&&Tl(n,n.return);break;case 7:r&512&&Tl(n,n.return);default:Iu(e,n)}}function _u(e,t){for(e=e.child;e!==null;)vu(e,t),e=e.sibling}function vu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){vf(e,e.return,t)}yu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,V=!0}catch(t){vf(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?Op(s,!0):Op(e.stateNode,!1)}catch(t){vf(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&_u(e,t);break;default:_u(e,t)}}function yu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:vu(n,r);break a;case 22:n.memoizedState===null&&yu(n,r);break a;default:yu(n,r)}}e=e.sibling}}function bu(e){var t=e.alternate;t!==null&&(e.alternate=null,bu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&At(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var xu=null,Su=!1;function Cu(e,t,n){for(n=n.child;n!==null;)wu(e,t,n),n=n.sibling}function wu(e,t,n){if(Xe&&typeof Xe.onCommitFiberUnmount==`function`)try{Xe.onCommitFiberUnmount(Ye,n)}catch{}switch(n.tag){case 26:au||El(n,t),Cu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!au&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:au||El(n,t),kl(n);var r=xu,i=Su;Ep(n.type)&&(xu=n.stateNode,Su=!1),Cu(e,t,n),bm(n.stateNode,n.type,n.memoizedProps),xu=r,Su=i;break;case 5:au||El(n,t),kl(n);case 6:if(n.tag===6&&kl(n),r=xu,i=Su,xu=null,Cu(e,t,n),xu=r,Su=i,xu!==null){if(Su)try{(xu.nodeType===9?xu.body:xu.nodeName===`HTML`?xu.ownerDocument.body:xu).removeChild(n.stateNode),V=!0}catch(e){vf(n,t,e)}else try{xu.removeChild(n.stateNode),V=!0}catch(e){vf(n,t,e)}}break;case 18:xu!==null&&(Su?(e=xu,Dp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Wh(e)):Dp(xu,n.stateNode));break;case 4:r=xu,i=Su,xu=n.stateNode.containerInfo,Su=!0,Cu(e,t,n),xu=r,Su=i;break;case 0:case 11:case 14:case 15:Sl(2,n,t),au||Sl(4,n,t),Cu(e,t,n);break;case 1:au||(El(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&wl(n,t,r)),Cu(e,t,n);break;case 21:Cu(e,t,n);break;case 22:au=(r=au)||n.memoizedState!==null,Cu(e,t,n),au=r;break;case 30:El(n,t),Cu(e,t,n);break;case 7:au||El(n,t),Cu(e,t,n);break;default:Cu(e,t,n)}}function Tu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Wh(e)}catch(e){vf(t,t.return,e)}}}function Eu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Wh(e)}catch(e){vf(t,t.return,e)}}function Du(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new cu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new cu),t;default:throw Error(i(435,e.tag))}}function Ou(e,t){var n=Du(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Cf.bind(null,e,t);t.then(r,r)}})}function ku(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Ep(l.type)){xu=l.stateNode,Su=!1;break a}break;case 5:xu=l.stateNode,Su=!1;break a;case 3:case 4:xu=l.stateNode.containerInfo,Su=!0;break a}l=l.return}if(xu===null)throw Error(i(160));wu(s,c,o),xu=null,Su=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ju(t,e,n),t=t.sibling}var Au=null;function ju(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}ku(t,e,n),Mu(e),a&4&&(Sl(3,e,e.return),xl(3,e),Sl(5,e,e.return));break;case 1:ku(t,e,n),Mu(e),a&512&&(au||r===null||El(r,r.return)),a&64&&iu&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=Au,ku(t,e,n),Mu(e),a&512&&(au||r===null||El(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(iu)e.stateNode=gp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[Ot]||r[St]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),op(r,t,n),r[St]=e,Ft(r),t=r;break a;case`link`:if(o=Ym(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),op(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Ym(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),op(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[St]=e,Ft(r),t=r}e.stateNode=t}}else iu||Xm(o,e.type,e.stateNode)}else e.stateNode=Wm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Nl(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||au||t.parentNode.removeChild(t)):a.count--,n===null?iu||Xm(o,e.type,e.stateNode):Wm(o,n,e.memoizedProps))}break;case 27:ku(t,e,n),Mu(e),a&512&&(au||r===null||El(r,r.return)),r!==null&&a&4&&Nl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=ou,ou=!1,ku(t,e,n),ou=o,Mu(e),a&512&&(au||r===null||El(r,r.return)),e.flags&32){t=e.stateNode;try{cn(t,``),V=!0}catch(t){vf(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Nl(e,t,r===null?t:r.memoizedProps)),a&1024&&(su=!0);break;case 6:if(ku(t,e,n),Mu(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,V=!0}catch(t){vf(e,e.return,t)}}break;case 3:if(V=!1,Jm=null,o=Au,Au=wm(t.containerInfo),ku(t,e,n),Au=o,Mu(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Wh(t.containerInfo)}catch(t){vf(e,e.return,t)}su&&(su=!1,Nu(e)),V=!1;break;case 4:a=ou,ou=iu,r=Wt(),o=Au,Au=wm(e.stateNode.containerInfo),ku(t,e,n),Mu(e),Au=o,V&&du&&(fu=!0),V=r,ou=a;break;case 12:ku(t,e,n),Mu(e);break;case 31:ku(t,e,n),Mu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Ou(e,t)));break;case 13:ku(t,e,n),Mu(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(vd=Be()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Ou(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=iu,l=au,u=ou;iu=c||o,ou=u||o,au=l||s,ku(t,e,n),au=l,ou=u,iu=c,Mu(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||iu||au||(t=s||au,n=iu,r=au,iu=o||iu,au=t,Lu(e,2),iu=n,au=r),!o&&ou||_u(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Ou(e,n))));break;case 19:ku(t,e,n),Mu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Ou(e,t)));break;case 30:a&512&&(au||r===null||El(r,r.return)),a=Wt(),o=du,s=(n&335544064)===n,c=e.memoizedProps,du=s&&_i(c.default,c.update)!==`none`,ku(t,e,n),Mu(e),s&&r!==null&&V&&(e.flags|=4),du=o,V=a;break;case 21:break;case 7:a&512&&(au||r===null||El(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:ku(t,e,n),Mu(e)}}function Mu(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Pl(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(jl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(Al(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Ll(e,Fl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(cn(l,``),n.flags&=-33),Ll(e,Fl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Il(e,Fl(e),u,s);break;default:throw Error(i(161))}}catch(t){vf(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Nu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Nu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,bh=!0,t.reset(),bh=!1),e=e.sibling}}function Pu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Fu(t,e),t=t.sibling;else ru(t,!1)}function Fu(e,t){var n=e.alternate;if(n===null)Yl(e,!1);else switch(e.tag){case 3:if(pu=uu=!1,Ul(),Pu(t,e),!uu&&!fu){if(e=Hl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ap(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),pu=!0}Hl=null;break;case 5:Pu(t,e);break;case 4:r=uu,uu=!1,Pu(t,e),uu&&(fu=!0),uu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Pu(t,e):Yl(e,!1));break;case 30:r=uu,i=Ul(),uu=!1,Pu(t,e),uu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=hi(a,o),o=hi(n.memoizedProps,o);var s=_i(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Wl=0,t=nu(e,n,t,o,s,a,!0),Wl!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Ld(e,e.memoizedProps.onUpdate),Hl=i):i!==null&&(i.push.apply(i,Hl),Hl=i),uu=e.flags&32?!0:r;break;default:Pu(t,e)}}function Iu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)gu(e,t.alternate,t),t=t.sibling}function Lu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:Sl(4,n,n.return),Lu(n,r);break;case 1:El(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&wl(n,n.return,i),Lu(n,r);break;case 27:r&2&&bm(n.stateNode,n.type,n.memoizedProps);case 5:El(n,n.return),n.tag!==5&&n.tag!==27||kl(n),Lu(n,r);break;case 6:kl(n);break;case 26:El(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||au||i.parentNode.removeChild(i),Lu(n,r);break;case 22:n.memoizedState===null&&Lu(n,r);break;case 30:El(n,n.return),Lu(n,r);break;case 7:El(n,n.return);default:Lu(n,r)}e=e.sibling}}function Ru(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Ru(i,a,n),xl(4,a);break;case 1:if(Ru(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){vf(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)So(l[i],c)}catch(e){vf(r,r.return,e)}}s&&o&64&&Cl(a),Tl(a,a.return);break;case 27:n&2&&Rl(a);case 5:a.tag!==5&&a.tag!==27||Ol(a),Ru(i,a,n),s&&r===null&&o&4&&Ml(a),Tl(a,a.return);break;case 6:Ol(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||iu||Xm(wm(c.ownerDocument),a.type,c),Ru(i,a,n),s&&r===null&&o&4&&Ml(a),Tl(a,a.return);break;case 12:Ru(i,a,n);break;case 31:Ru(i,a,n),s&&o&4&&Tu(i,a);break;case 13:Ru(i,a,n),s&&o&4&&Eu(i,a);break;case 22:a.memoizedState===null&&Ru(i,a,n),Tl(a,a.return);break;case 30:Ru(i,a,n),Tl(a,a.return);break;case 7:Tl(a,a.return);default:Ru(i,a,n)}t=t.sibling}}function zu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ja(n))}function Bu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ja(e))}function Vu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Hu(e,t,n,r),t=t.sibling;else i&&tu(t)}function Hu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&eu(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Vu(e,t,n,r),a&2048&&xl(9,t);break;case 1:Vu(e,t,n,r);break;case 3:Vu(e,t,n,r),i&&pu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&ja(a)));break;case 12:if(a&2048){Vu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){vf(t,t.return,e)}}else Vu(e,t,n,r);break;case 31:Vu(e,t,n,r);break;case 13:Vu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&eu(t),o._visibility&2?Vu(e,t,n,r):(o._visibility|=2,Uu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&eu(s),o._visibility&2?Vu(e,t,n,r):Wu(e,t)),a&2048&&zu(s,t);break;case 24:Vu(e,t,n,r),a&2048&&Bu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(ql(a.child,!0),ql(t.child,!0))),Vu(e,t,n,r);break;default:Vu(e,t,n,r)}}function Uu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Uu(a,o,s,c,i),xl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Uu(a,o,s,c,i)):u._visibility&2?Uu(a,o,s,c,i):Wu(a,o),i&&l&2048&&zu(o.alternate,o);break;case 24:Uu(a,o,s,c,i),i&&l&2048&&Bu(o.alternate,o);break;default:Uu(a,o,s,c,i)}t=t.sibling}}function Wu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Wu(n,r),i&2048&&zu(r.alternate,r);break;case 24:Wu(n,r),i&2048&&Bu(r.alternate,r);break;default:Wu(n,r)}t=t.sibling}}var Gu=8192;function Ku(e,t,n){if(e.subtreeFlags&Gu)for(e=e.child;e!==null;)qu(e,t,n),e=e.sibling}function qu(e,t,n){switch(e.tag){case 26:Ku(e,t,n),e.flags&Gu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&th(n,e)):nh(n,Au,e.memoizedState,e.memoizedProps));break;case 5:Ku(e,t,n),e.flags&Gu&&(e=e.stateNode,(t&335544128)===t&&th(n,e));break;case 3:case 4:var r=Au;Au=wm(e.stateNode.containerInfo),Ku(e,t,n),Au=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Gu,Gu=16777216,Ku(e,t,n),Gu=r):Ku(e,t,n));break;case 30:if((e.flags&Gu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Bl===null&&(Bl=new Map),Bl.set(r,i)}Ku(e,t,n);break;default:Ku(e,t,n)}}function Ju(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Yu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];lu=r,Qu(r,e)}Ju(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Xu(e),e=e.sibling}function Xu(e){switch(e.tag){case 0:case 11:case 15:Yu(e),e.flags&2048&&Sl(9,e,e.return);break;case 3:Yu(e);break;case 12:Yu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Zu(e)):Yu(e);break;default:Yu(e)}}function Zu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];lu=r,Qu(r,e)}Ju(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Sl(8,t,t.return),Zu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Zu(t));break;default:Zu(t)}e=e.sibling}}function Qu(e,t){for(;lu!==null;){var n=lu;switch(n.tag){case 0:case 11:case 15:Sl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ja(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,lu=r;else a:for(n=e;lu!==null;){r=lu;var i=r.sibling,a=r.return;if(bu(r),r===n){lu=null;break a}if(i!==null){i.return=a,lu=i;break a}lu=a}}}var $u={getCacheForType:function(e){var t=Ca(ka),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ca(ka).controller.signal}},ed=typeof WeakMap==`function`?WeakMap:Map,td=0,nd=null,G=null,K=0,rd=0,id=null,ad=!1,od=!1,sd=!1,cd=0,ld=0,ud=0,dd=0,fd=0,pd=0,md=0,hd=null,gd=null,_d=!1,vd=0,yd=0,bd=1/0,xd=null,Sd=null,Cd=0,wd=null,Td=null,Ed=0,Dd=0,Od=null,kd=null,Ad=null,jd=null,Md=null,Nd=0,Pd=null;function Fd(){return td&2&&K!==0?K&-K:I.T===null?yt():zf()}function Id(){if(pd===0){if(!(K&536870912)||H){var e=rt;rt<<=1,!(rt&3932160)&&(rt=262144),pd=e}else pd=536870912}return e=ko.current,e!==null&&(e.flags|=32),pd}function Ld(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Rp(hi(e.memoizedProps,n))),jd===null&&(jd=[]),jd.push(t.bind(null,r))}}function Rd(e,t,n){(e===nd&&(rd===2||rd===9)||e.cancelPendingCommit!==null)&&(Gd(e,0),Hd(e,K,pd,!1)),ft(e,n),td&2&&e===nd||(e===nd&&(!(td&2)&&(dd|=n),ld===4&&Hd(e,K,pd,!1)),jf(e))}function zd(e,t,n){if(td&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||st(e,t),a=r?$d(e,t):Zd(e,t,!0),o=r;do{if(a===0){od&&!r&&Hd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Vd(n))a=Zd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=hd;var l=c.current.memoizedState.isDehydrated;if(l&&(Gd(c,s).flags|=256),s=Zd(c,s,!1),s!==2&&s!==6){if(sd&&!l){c.errorRecoveryDisabledLanes|=o,dd|=o,a=4;break a}o=gd,gd=a,o!==null&&(gd===null?gd=o:gd.push.apply(gd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Gd(e,0),Hd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Hd(r,t,pd,!ad);break a;case 2:gd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=vd+300-Be(),10<a)){if(Hd(r,t,pd,!ad),ot(r,0,!0)!==0)break a;Ed=t,r.timeoutHandle=bp(Bd.bind(null,r,n,gd,xd,_d,t,pd,dd,md,ad,o,`Throttled`,-0,0),a);break a}Bd(r,n,gd,xd,_d,t,pd,dd,md,ad,o,null,-0,0)}break}}while(1);jf(e)}function Bd(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:gn},Bl=null,qu(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=oh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?vd-Be():(a&4194048)===a?yd-Be():0,m=ih(d,m),m!==null)?(Ed=a,e.cancelPendingCommit=m(sf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Hd(e,a,o,!l)):sf(e,t,a,n,r,i,o,s,c,l,u,d)}function Vd(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!zr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Hd(e,t,n,r){t=ct(e,t),t&=~fd,t&=~dd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Qe(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&mt(e,n,t)}function Ud(){return td&6?!0:(Mf(0,!1),!1)}function Wd(){if(G!==null){if(rd===0)var e=G.return;else e=G,ha=ma=null,is(e),ro=null,io=0,e=G;for(;e!==null;)bl(e.alternate,e),e=e.return;G=null}}function Gd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,xp(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Ed=0,Wd(),nd=e,G=n=Mi(e.current,null),K=t,rd=0,id=null,ad=!1,od=st(e,t),sd=!1,md=pd=fd=dd=ud=ld=0,gd=hd=null,_d=!1,cd=ct(e,t),Si(),n}function Kd(e,t){U=null,I.H=mc,t===qa||t===Ya?(t=to(),rd=3):t===Ja?(t=to(),rd=4):rd=t===jc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,id=t,G===null&&(ld=1,Tc(e,Bi(t,e.current)))}function qd(){var e=ko.current;return e===null?!0:(K&4194048)===K?Ao===null:(K&62914560)===K||K&536870912?e===Ao:!1}function Jd(){var e=I.H;return I.H=mc,e===null?mc:e}function Yd(){var e=I.A;return I.A=$u,e}function Xd(){ld=4,ad||(K&4194048)!==K&&ko.current!==null||(od=!0),!(ud&134217727)&&!(dd&134217727)||nd===null||Hd(nd,K,pd,!1)}function Zd(e,t,n){var r=td;td|=2;var i=Jd(),a=Yd();(nd!==e||K!==t)&&(xd=null,Gd(e,t)),t=!1;var o=ld;a:do try{if(rd!==0&&G!==null){var s=G,c=id;switch(rd){case 8:Wd(),o=6;break a;case 3:case 2:case 9:case 6:ko.current===null&&(t=!0);var l=rd;if(rd=0,id=null,rf(e,s,c,l),n&&od){o=0;break a}break;default:l=rd,rd=0,id=null,rf(e,s,c,l)}}Qd(),o=ld;break}catch(t){Kd(e,t)}while(1);return t&&e.shellSuspendCounter++,ha=ma=null,td=r,I.H=i,I.A=a,G===null&&(nd=null,K=0,Si()),o}function Qd(){for(;G!==null;)tf(G)}function $d(e,t){var n=td;td|=2;var r=Jd(),a=Yd();nd!==e||K!==t?(xd=null,bd=Be()+500,Gd(e,t)):od=st(e,t);a:do try{if(rd!==0&&G!==null){t=G;var o=id;b:switch(rd){case 1:rd=0,id=null,rf(e,t,o,1);break;case 2:case 9:if(Za(o)){rd=0,id=null,nf(t);break}t=function(){rd!==2&&rd!==9||nd!==e||(rd=7),jf(e)},o.then(t,t);break a;case 3:rd=7;break a;case 4:rd=5;break a;case 7:Za(o)?(rd=0,id=null,nf(t)):(rd=0,id=null,rf(e,t,o,7));break;case 5:var s=null;switch(G.tag){case 26:s=G.memoizedState;case 5:case 27:var c=G;if(s?$m(s):c.stateNode.complete){rd=0,id=null;var l=c.sibling;if(l!==null)G=l;else{var u=c.return;u===null?G=null:(G=u,af(u))}break b}}rd=0,id=null,rf(e,t,o,5);break;case 6:rd=0,id=null,rf(e,t,o,6);break;case 8:Wd(),ld=6;break a;default:throw Error(i(462))}}ef();break}catch(t){Kd(e,t)}while(1);return ha=ma=null,I.H=r,I.A=a,td=n,G===null?(nd=null,K=0,Si(),ld):0}function ef(){for(;G!==null&&!Re();)tf(G)}function tf(e){var t=dl(e.alternate,e,cd);e.memoizedProps=e.pendingProps,t===null?af(e):G=t}function nf(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Gc(n,t,t.pendingProps,t.type,void 0,K);break;case 11:t=Gc(n,t,t.pendingProps,t.type.render,t.ref,K);break;case 5:is(t);var r=t;r===ta&&(H?(ca(r),r.tag===5&&r.stateNode!=null&&(na=r.stateNode)):(ca(r),H=!0));default:bl(n,t),t=G=Ni(t,cd),t=dl(n,t,cd)}e.memoizedProps=e.pendingProps,t===null?af(e):G=t}function rf(e,t,n,r){ha=ma=null,is(t),ro=null,io=0;var i=t.return;try{if(Ac(e,i,t,n,K)){ld=1,Tc(e,Bi(n,e.current)),G=null;return}}catch(t){if(i!==null)throw G=i,t;ld=1,Tc(e,Bi(n,e.current)),G=null;return}t.flags&32768?(H||r===1?e=!0:od||K&536870912?e=!1:(ad=e=!0,(r===2||r===9||r===3||r===6)&&(r=ko.current,r!==null&&r.tag===13&&(r.flags|=16384))),of(t,e)):af(t)}function af(e){var t=e;do{if(t.flags&32768){of(t,ad);return}e=t.return;var n=vl(t.alternate,t,cd);if(n!==null){G=n;return}if(t=t.sibling,t!==null){G=t;return}G=t=e}while(t!==null);ld===0&&(ld=5)}function of(e,t){do{var n=yl(e.alternate,e);if(n!==null){n.flags&=32767,G=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){G=e;return}G=e=n}while(e!==null);ld=6,G=null}function sf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do hf();while(Cd!==0);if(td&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===nd&&(G=nd=null,K=0),Td=t,wd=e,Ed=n,Od=a,kd=r,cf(e,t,n,s,c,l,f)}}function cf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Dd=s,s|=xi,pt(e,n,s,r,i,a),jd=null,(n&335544064)===n?(Md=Pa(e),r=10262):(Md=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,wf(We,function(){return gf(),null})):(e.callbackNode=null,e.callbackPriority=0),zl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=I.T,I.T=null,i=L.p,L.p=2,a=td,td|=4;try{mu(e,t,n)}finally{td=a,L.p=i,I.T=r}}Cd=1,zl?Ad=Ip(o,e.containerInfo,Md,df,ff,uf,pf,gf,lf,null,null):(df(),ff(),pf())}function lf(e){if(Cd!==0){var t=wd.onRecoverableError;t(e,{componentStack:null})}}function uf(){Cd===3&&(Cd=0,Fu(Td,wd),Cd=4)}function df(){if(Cd===1){Cd=0;var e=wd,t=Td,n=Ed,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=I.T,I.T=null;var i=L.p;L.p=2;var a=td;td|=4;try{du=fu=!1,ju(t,e,n),n=fp;var o=Gr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Wr(s.ownerDocument.documentElement,s)){if(c!==null&&Kr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Ur(s,h),v=Ur(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}bh=!!dp,fp=dp=null}finally{td=a,L.p=i,I.T=r}}e.current=t,Cd=2}}function ff(){if(Cd===2){Cd=0;var e=wd,t=Td,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=I.T,I.T=null;var r=L.p;L.p=2;var i=td;td|=4;try{gu(e,t.alternate,t)}finally{td=i,L.p=r,I.T=n}}Cd=3}}function pf(){if(Cd===4||Cd===3){Cd=0;var e=Ad;Ad=null,ze();var t=wd,n=Td,r=Ed,i=kd,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?Cd=5:(Cd=0,Td=wd=null,mf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(Sd=null),vt(r),n=n.stateNode,Xe&&typeof Xe.onCommitFiberRoot==`function`)try{Xe.onCommitFiberRoot(Ye,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=I.T,a=L.p,L.p=2,I.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{I.T=n,L.p=a}}if(i=jd,o=Md,Md=null,i!==null&&(jd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Ed&3&&hf(),jf(t),a=t.pendingLanes,r&261930&&a&42?t===Pd?Nd++:(Nd=0,Pd=t):(Nd=0,Pd=null),Mf(0,!1)}}function mf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ja(t)))}function hf(){return Ad!==null&&(Ad.skipTransition(),Ad=null),df(),ff(),pf(),gf()}function gf(){if(Cd!==5)return!1;var e=wd,t=Dd;Dd=0;var n=vt(Ed),r=I.T,a=L.p;try{L.p=32>n?32:n,I.T=null,n=Od,Od=null;var o=wd,s=Ed;if(Cd=0,Td=wd=null,Ed=0,td&6)throw Error(i(331));var c=td;if(td|=4,Xu(o.current),Hu(o,o.current,s,n),td=c,Mf(0,!1),Xe&&typeof Xe.onPostCommitFiberRoot==`function`)try{Xe.onPostCommitFiberRoot(Ye,o)}catch{}return!0}finally{L.p=a,I.T=r,mf(e,t)}}function _f(e,t,n){t=Bi(n,t),t=Dc(e.stateNode,t,2),e=go(e,t,2),e!==null&&(ft(e,2),jf(e))}function vf(e,t,n){if(e.tag===3)_f(e,e,n);else for(;t!==null;){if(t.tag===3){_f(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(Sd===null||!Sd.has(r))){e=Bi(n,e),n=Oc(2),r=go(t,n,2),r!==null&&(kc(n,r,t,e),ft(r,2),jf(r));break}}t=t.return}}function yf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new ed;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(sd=!0,i.add(n),e=bf.bind(null,e,t,n),t.then(e,e))}function bf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,nd===e&&(K&n)===n&&(ld===4||ld===3&&(K&62914560)===K&&300>Be()-vd?td&2?fd|=n:Gd(e,0):fd|=n,md===K&&(md=0)),jf(e)}function xf(e,t){t===0&&(t=ut()),e=Ti(e,t),e!==null&&(ft(e,t),jf(e))}function Sf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),xf(e,n)}function Cf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),xf(e,n)}function wf(e,t){return Ie(e,t)}var Tf=null,Ef=null,Df=!1,Of=!1,kf=!1,Af=0;function jf(e){e!==Ef&&e.next===null&&(Ef===null?Tf=Ef=e:Ef=Ef.next=e),Of=!0,Df||(Df=!0,Rf())}function Mf(e,t){if(!kf&&Of){kf=!0;do for(var n=!1,r=Tf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Qe(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Lf(r,a))}else a=K,a=ot(r,r===nd?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||st(r,a)||(n=!0,Lf(r,a))}r=r.next}while(n);kf=!1}}function Nf(){Pf()}function Pf(){Of=Df=!1;var e=0;Af!==0&&yp()&&(e=Af);for(var t=Be(),n=null,r=Tf;r!==null;){var i=r.next,a=Ff(r,t);a===0?(r.next=null,n===null?Tf=i:n.next=i,i===null&&(Ef=n)):(n=r,(e!==0||a&3)&&(Of=!0)),r=i}Cd!==0&&Cd!==5||Mf(e,!1),Af!==0&&(Af=0)}function Ff(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Qe(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=lt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=nd,n=K,n=ot(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(rd===2||rd===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Le(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||st(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Le(r),vt(n)){case 2:case 8:n=Ue;break;case 32:n=We;break;case 268435456:n=Ke;break;default:n=We}return r=If.bind(null,e),n=Ie(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Le(r),e.callbackPriority=2,e.callbackNode=null,2}function If(e,t){if(Cd!==0&&Cd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(hf()&&e.callbackNode!==n)return null;var r=K;return r=ot(e,e===nd?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(zd(e,r,t),Ff(e,Be()),e.callbackNode!=null&&e.callbackNode===n?If.bind(null,e):null)}function Lf(e,t){if(hf())return null;zd(e,t,!0)}function Rf(){wp(function(){td&6?Ie(He,Nf):Pf()})}function zf(){if(Af===0){var e=La;e===0&&(e=nt,nt<<=1,!(nt&261888)&&(nt=256)),Af=e}return Af}function Bf(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:hn(e)}function q(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Bf((i[Ct]||null).action),o=r.submitter;o&&(t=(t=o[Ct]||null)?Bf(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Ln(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Af!==0){var e=new FormData(i,o);ec(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),ec(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Vf=0;Vf<fi.length;Vf++){var Hf=fi[Vf];pi(Hf.toLowerCase(),`on`+(Hf[0].toUpperCase()+Hf.slice(1)))}pi(ii,`onAnimationEnd`),pi(ai,`onAnimationIteration`),pi(oi,`onAnimationStart`),pi(`dblclick`,`onDoubleClick`),pi(`focusin`,`onFocus`),pi(`focusout`,`onBlur`),pi(si,`onTransitionRun`),pi(ci,`onTransitionStart`),pi(li,`onTransitionCancel`),pi(ui,`onTransitionEnd`),zt(`onMouseEnter`,[`mouseout`,`mouseover`]),zt(`onMouseLeave`,[`mouseout`,`mouseover`]),zt(`onPointerEnter`,[`pointerout`,`pointerover`]),zt(`onPointerLeave`,[`pointerout`,`pointerover`]),B(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),B(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),B(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),B(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),B(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),B(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var Uf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Wf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(Uf));function Gf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){vi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){vi(e)}i.currentTarget=null,a=c}}}}function J(e,t){var n=t[Tt];n===void 0&&(n=t[Tt]=new Set);var r=e+`__bubble`;n.has(r)||(Yf(t,e,2,!1),n.add(r))}function Kf(e,t,n){var r=0;t&&(r|=4),Yf(n,e,r,t)}var qf=`_reactListening`+Math.random().toString(36).slice(2);function Jf(e){if(!e[qf]){e[qf]=!0,Lt.forEach(function(t){t!==`selectionchange`&&(Wf.has(t)||Kf(t,!1,e),Kf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[qf]||(t[qf]=!0,Kf(`selectionchange`,!1,t))}}function Yf(e,t,n,r){switch(X(t)){case 2:var i=xh;break;case 8:i=Sh;break;default:i=Ch}n=i.bind(null,t,n,e),i=void 0,!En||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Xf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=jt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}Cn(function(){var r=a,i=vn(n),s=[];a:{var c=di.get(e);if(c!==void 0){var l=Ln,u=e;switch(e){case`keypress`:if(Mn(n)===0)break a;case`keydown`:case`keyup`:l=tr;break;case`focusin`:u=`focus`,l=Kn;break;case`focusout`:u=`blur`,l=Kn;break;case`beforeblur`:case`afterblur`:l=Kn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Wn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Gn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=ir;break;case ii:case ai:case oi:l=qn;break;case ui:l=ar;break;case`scroll`:case`scrollend`:l=zn;break;case`wheel`:l=or;break;case`copy`:case`cut`:case`paste`:l=Jn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=nr;break;case`submit`:l=rr;break;case`toggle`:case`beforetoggle`:l=sr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=wn(m,p),g!=null&&d.push(Zf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==_n&&(u=n.relatedTarget||n.fromElement)&&(jt(u)||u[wt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?jt(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Wn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=nr,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Nt(c),h=l==null?u:Nt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,jt(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?E(c,l,$f):null,c!==null&&ep(s,u,c,d,!1),l!==null&&f!==null&&ep(s,f,l,d,!0)))}a:{if(c=r?Nt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Dr;else if(xr(c)){if(Or)_=Lr;else{_=Fr;var v=Pr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&fn(r.elementType)&&(_=Dr):_=Ir;if(_&&=_(e,r)){Sr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Nt(r):window,e){case`focusin`:(xr(v)||v.contentEditable===`true`)&&(Jr=v,Yr=r,Xr=null);break;case`focusout`:Xr=Yr=Jr=null;break;case`mousedown`:Zr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Zr=!1,Qr(s,n,i);break;case`selectionchange`:if(qr)break;case`keydown`:case`keyup`:Qr(s,n,i)}var y;if(lr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else _r?hr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(fr&&n.locale!==`ko`&&(_r||b!==`onCompositionStart`?b===`onCompositionEnd`&&_r&&(y=jn()):(On=i,kn=`value`in On?On.value:On.textContent,_r=!0)),v=Qf(r,b),0<v.length&&(b=new Yn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=gr(n),y!==null&&(b.data=y)))),(y=dr?vr(e,n):yr(e,n))&&(b=Qf(r,`onBeforeInput`),0<b.length&&(v=new Yn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),q(s,e,r,n,i)}Gf(s,t)})}function Zf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Qf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=wn(e,n),i!=null&&r.unshift(Zf(e,i,a)),i=wn(e,t),i!=null&&r.push(Zf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function $f(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function ep(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=wn(n,a),l!=null&&o.unshift(Zf(n,l,c))):i||(l=wn(n,a),l!=null&&o.push(Zf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var tp=/\r\n?/g,np=/\u0000|\uFFFD/g;function rp(e){return(typeof e==`string`?e:``+e).replace(tp,`
`).replace(np,``)}function ip(e,t){return t=rp(t),rp(e)===t}function Y(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||cn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&cn(e,``+r);else return;break;case`className`:Kt(e,`class`,r);break;case`tabIndex`:Kt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Kt(e,n,r);break;case`style`:dn(e,r,o);return;case`data`:if(t!==`object`){Kt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=hn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&Y(e,t,`name`,a.name,a,null),Y(e,t,`formEncType`,a.formEncType,a,null),Y(e,t,`formMethod`,a.formMethod,a,null),Y(e,t,`formTarget`,a.formTarget,a,null)):(Y(e,t,`encType`,a.encType,a,null),Y(e,t,`method`,a.method,a,null),Y(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=hn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=gn);return;case`onScroll`:r!=null&&J(`scroll`,e);return;case`onScrollEnd`:r!=null&&J(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=hn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:J(`beforetoggle`,e),J(`toggle`,e),Gt(e,`popover`,r);break;case`xlinkActuate`:qt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:qt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:qt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:qt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:qt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:qt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:qt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:qt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:qt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Gt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=pn.get(n)||n,Gt(e,n,r);else return}V=!0}function ap(e,t,n,r,a,o){switch(n){case`style`:dn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)cn(e,r);else if(typeof r==`number`||typeof r==`bigint`)cn(e,``+r);else return;break;case`onScroll`:r!=null&&J(`scroll`,e);return;case`onScrollEnd`:r!=null&&J(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=gn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Rt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Ct]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}V=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Gt(e,n,r)}return}V=!0}function op(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:J(`error`,e),J(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Y(e,t,o,s,n,null)}}a&&Y(e,t,`srcSet`,n.srcSet,n,null),r&&Y(e,t,`src`,n.src,n,null);return;case`input`:J(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:Y(e,t,r,d,n,null)}}nn(e,o,c,l,u,s,a,!1);return;case`select`:for(a in J(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:Y(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&an(e,!!r,n,!0):an(e,!!r,t,!1);return;case`textarea`:for(s in J(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:Y(e,t,s,c,n,null)}sn(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:Y(e,t,l,r,n,null)}return;case`dialog`:J(`beforetoggle`,e),J(`toggle`,e),J(`cancel`,e),J(`close`,e);break;case`iframe`:case`object`:J(`load`,e);break;case`video`:case`audio`:for(r=0;r<Uf.length;r++)J(Uf[r],e);break;case`image`:J(`error`,e),J(`load`,e);break;case`details`:J(`toggle`,e);break;case`embed`:case`source`:case`link`:J(`error`,e),J(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Y(e,t,u,r,n,null)}return;default:if(fn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&ap(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&Y(e,t,c,r,n,null))}var sp={};function cp(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||Y(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(V=!0),o=m;break;case`name`:m!==f&&(V=!0),a=m;break;case`checked`:m!==f&&(V=!0),u=m;break;case`defaultChecked`:m!==f&&(V=!0),d=m;break;case`value`:m!==f&&(V=!0),s=m;break;case`defaultValue`:m!==f&&(V=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&Y(e,t,p,m,r,f)}}tn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||Y(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(V=!0),p=o;break;case`defaultValue`:o!==l&&(V=!0),c=o;break;case`multiple`:o!==l&&(V=!0),s=o;default:o!==l&&Y(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?an(e,!!n,n?[]:``,!1):an(e,!!n,t,!0)):an(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:Y(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(V=!0),p=a;break;case`defaultValue`:a!==o&&(V=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&Y(e,t,s,a,r,o)}on(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:Y(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(V=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:Y(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&Y(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:Y(e,t,u,p,r,m)}return;default:if(fn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&ap(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||ap(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&Y(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||Y(e,t,f,p,r,m)}function lp(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function up(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&lp(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&lp(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var dp=null,fp=null;function pp(e){return e.nodeType===9?e:e.ownerDocument}function mp(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function hp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function gp(e,t,n,r){return n=pp(n).createElement(e),n[St]=r,n[Ct]=t,op(n,e,t),Ft(n),n}function _p(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var vp=null;function yp(){var e=window.event;return e&&e.type===`popstate`?e!==vp&&(vp=e,!0):(vp=null,!1)}var bp=typeof setTimeout==`function`?setTimeout:void 0,xp=typeof clearTimeout==`function`?clearTimeout:void 0,Sp=typeof Promise==`function`?Promise:void 0,Cp=typeof requestAnimationFrame==`function`?requestAnimationFrame:bp,wp=typeof queueMicrotask==`function`?queueMicrotask:Sp===void 0?bp:function(e){return Sp.resolve(null).then(e).catch(Tp)};function Tp(e){setTimeout(function(){throw e})}function Ep(e){return e===`head`}function Dp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Wh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)xm(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,xm(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Ot]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&xm(e.ownerDocument.body)}n=i}while(n);Wh(t)}function Op(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function kp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ap(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function jp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Mp(e){return jp(e.getBoundingClientRect(),getComputedStyle(e),e)}function Np(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return jp(t,n,e)}function Pp(e){return e.documentElement.clientHeight}function Fp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Ip(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Pp(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=eh(f),u>rh){s.length=o;break}f=new Promise(Fp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Lp(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Lp.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:D({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Lp.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Lp.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Rp(e){return{name:e,group:new Lp(`group`,e),imagePair:new Lp(`image-pair`,e),old:new Lp(`old`,e),new:new Lp(`new`,e)}}function zp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}zp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Wp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Hp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),m(this._fragmentFiber.child,!1,Bp,e,s,r)}this._eventListeners=a}};function Bp(e,t,n,r){return b(e).addEventListener(t,n,r),!1}zp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Wp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Hp(i.optionsOrUseCapture),m(this._fragmentFiber.child,!1,Vp,e,n,i),r.splice(t,1),a!==null&&a()}};function Vp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Hp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function Up(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Wp(e,t,n,r){if(e.length===0)return-1;r=Up(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&Up(a.optionsOrUseCapture)===r)return i}return-1}zp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Hp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Hp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},zp.prototype.focus=function(e){m(this._fragmentFiber.child,!0,Gp,e,void 0,void 0)};function Gp(e,t){return e.tag!==6&&(e=b(e),_m(e,t))}zp.prototype.focusLast=function(e){var t=[];m(this._fragmentFiber.child,!0,Kp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Gp(t[n],e);n--);};function Kp(e,t){return t.push(e),!1}zp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=pp(e).activeElement,e!==null&&m(this._fragmentFiber.child,!1,qp,e,void 0,void 0))};function qp(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}zp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),m(this._fragmentFiber.child,!1,Jp,e,void 0,void 0)};function Jp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}zp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),m(this._fragmentFiber.child,!1,Yp,e,void 0,void 0);for(var n=t=0;n<Xp.length;n++){var r=Xp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Xp[t++]=r}Xp.length=t}};function Yp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Xp=[],Zp=!1;function Qp(e,t,n){Xp.push({fragmentInstance:e,observer:t,instance:n}),Zp||(Zp=!0,vm(function(){Zp=!1;var e=Xp;Xp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}zp.prototype.getClientRects=function(){var e=[];return m(this._fragmentFiber.child,!1,$p,e,void 0,void 0),e};function $p(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}zp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},zp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];m(this._fragmentFiber.child,!1,Kp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||em(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function em(e,t,n,r,i){var a=jt(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=E(n,a,T),t===null?t=!1:(m(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=E(r,a,T),t===null?t=!1:(m(t,!0,w,a,r),a=x,S=x=null,t=a!==null)),t):!1}function tm(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}zp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];m(this._fragmentFiber.child,!1,Kp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),tm(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),tm(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function nm(e,t){return e=b(e),rm(e,t),!1}function rm(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function im(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Hp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Xp.length;i++){var a=Xp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Xp[r++]=a)}Xp.length=r,n.observe(e)}),rm(e,t))}function am(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Hp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Qp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function om(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:om(n),At(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function sm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Ot])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=pm(e.nextSibling),e===null)break}return null}function cm(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=pm(e.nextSibling),e===null))return null;return e}function lm(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=pm(e.nextSibling),e===null))return null;return e}function um(e){return e.data===`$?`||e.data===`$~`}function dm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function fm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function pm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var mm=null;function hm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return pm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function gm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function _m(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function vm(e){Cp(function(){Cp(function(t){return e(t)})})}function ym(e,t,n){switch(t=pp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function bm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&Y(e,t,r,null,sp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===gn&&(e.onclick=null),At(e)}function xm(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);At(e)}var Sm=new Map,Cm=new Set;function wm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Tm=L.d;L.d={f:Em,r:Dm,D:Am,C:jm,L:Mm,m:Nm,X:Fm,S:Pm,M:Im};function Em(){var e=Tm.f(),t=Ud();return e||t}function Dm(e){var t=Mt(e);t!==null&&t.tag===5&&t.type===`form`?nc(t):Tm.r(e)}var Om=typeof document>`u`?null:document;function km(e,t,n){var r=Om;if(r&&typeof t==`string`&&t){var i=en(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),Cm.has(i)||(Cm.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),op(t,`link`,e),Ft(t),r.head.appendChild(t)))}}function Am(e){Tm.D(e),km(`dns-prefetch`,e,null)}function jm(e,t){Tm.C(e,t),km(`preconnect`,e,t)}function Mm(e,t,n){Tm.L(e,t,n);var r=Om;if(r&&e&&t){var i=`link[rel="preload"][as="`+en(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+en(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+en(n.imageSizes)+`"]`)):i+=`[href="`+en(e)+`"]`;var a=i;switch(t){case`style`:a=Rm(e);break;case`script`:a=Hm(e)}if(!(Sm.has(a)||(e=D({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),Sm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(zm(a))||t===`script`&&r.querySelector(Um(a))))){var o=r.createElement(`link`);op(o,`link`,e),t===`style`&&(o[kt]=!0,o.onload=o.onerror=function(){It(o)}),Ft(o),r.head.appendChild(o)}}}function Nm(e,t){Tm.m(e,t);var n=Om;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+en(r)+`"][href="`+en(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Hm(e)}if(!Sm.has(a)&&(e=D({rel:`modulepreload`,href:e},t),Sm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Um(a)))return}r=n.createElement(`link`),op(r,`link`,e),Ft(r),n.head.appendChild(r)}}}function Pm(e,t,n){Tm.S(e,t,n);var r=Om;if(r&&e){var i=Pt(r).hoistableStyles,a=Rm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(zm(a)))s.loading=5;else{e=D({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=Sm.get(a))&&Km(e,n);var c=o=r.createElement(`link`);Ft(c),op(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Gm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Fm(e,t){Tm.X(e,t);var n=Om;if(n&&e){var r=Pt(n).hoistableScripts,i=Hm(e),a=r.get(i);a||(a=n.querySelector(Um(i)),a||(e=D({src:e,async:!0},t),(t=Sm.get(i))&&qm(e,t),a=n.createElement(`script`),Ft(a),op(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Im(e,t){Tm.M(e,t);var n=Om;if(n&&e){var r=Pt(n).hoistableScripts,i=Hm(e),a=r.get(i);a||(a=n.querySelector(Um(i)),a||(e=D({src:e,async:!0,type:`module`},t),(t=Sm.get(i))&&qm(e,t),a=n.createElement(`script`),Ft(a),op(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Lm(e,t,n,r){var a=(a=Se.current)?wm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Rm(n.href),t=Pt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Rm(n.href);var o=Pt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(zm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=Sm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Sm.set(e,o)),Vm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Hm(n),t=Pt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Rm(e){return`href="`+en(e)+`"`}function zm(e){return`link[rel="stylesheet"][`+e+`]`}function Bm(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function Vm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[kt]){r.loading=1;return}}else t=e.createElement(`link`),t[kt]=!0,t.onload=t.onerror=It.bind(null,t),op(t,`link`,n),Ft(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Hm(e){return`[src="`+en(e)+`"]`}function Um(e){return`script[async]`+e}function Wm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+en(n.href)+`"]`);if(r)return t.instance=r,Ft(r),r;var a=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Ft(r),op(r,`style`,a),Gm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Rm(n.href);var o=e.querySelector(zm(a));if(o)return t.state.loading|=4,t.instance=o,Ft(o),o;r=Bm(n),(a=Sm.get(a))&&Km(r,a),o=(e.ownerDocument||e).createElement(`link`),Ft(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),op(o,`link`,r),t.state.loading|=4,Gm(o,n.precedence,e),t.instance=o;case`script`:return o=Hm(n.src),(a=e.querySelector(Um(o)))?(t.instance=a,Ft(a),a):(r=n,(a=Sm.get(o))&&(r=D({},n),qm(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Ft(a),op(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Gm(r,n.precedence,e));return t.instance}function Gm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Km(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function qm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Jm=null;function Ym(e,t,n){if(Jm===null){var r=new Map,i=Jm=new Map;i.set(n,r)}else i=Jm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Ot]||a[St]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Xm(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Zm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Qm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function $m(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function eh(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function th(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=eh(t),e.suspenseyImages.push(t)),e=sh.bind(e),t.decode().then(e,e))}function nh(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Rm(r.href),a=t.querySelector(zm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=oh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Ft(a);return}a=t.ownerDocument||t,r=Bm(r),(i=Sm.get(i))&&Km(r,i),a=a.createElement(`link`),Ft(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),op(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=oh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var rh=0;function ih(e,t){return e.stylesheets&&e.count===0&&lh(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&lh(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&rh===0&&(rh=62500*up());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&lh(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>rh?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function ah(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)lh(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function oh(){this.count--,ah(this)}function sh(){this.imgCount--,ah(this)}var ch=null;function lh(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ch=new Map,t.forEach(uh,e),ch=null,oh.call(e))}function uh(e,t){if(!(t.state.loading&4)){var n=ch.get(e);if(n)var r=n.get(null);else{n=new Map,ch.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=oh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var dh={$$typeof:N,Provider:null,Consumer:null,_currentValue:R,_currentValue2:R,_threadCount:0};function fh(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=dt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=dt(0),this.hiddenUpdates=dt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function ph(e,t,n,r,i,a,o,s,c,l,u,d){return e=new fh(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Ai(3,null,null,t),e.current=a,a.stateNode=e,t=Aa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},po(a),e}function mh(e){return e?(e=Oi,e):Oi}function hh(e,t,n,r,i,a){i=mh(i),r.context===null?r.context=i:r.pendingContext=i,r=ho(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=go(e,r,t),n!==null&&(Rd(n,e,t),_o(n,e,t))}function gh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function _h(e,t){gh(e,t),(e=e.alternate)&&gh(e,t)}function vh(e){if(e.tag===13||e.tag===31){var t=Ti(e,67108864);t!==null&&Rd(t,e,67108864),_h(e,67108864)}}function yh(e){if(e.tag===13||e.tag===31){var t=Fd();t=_t(t);var n=Ti(e,t);n!==null&&Rd(n,e,t),_h(e,t)}}var bh=!0;function xh(e,t,n,r){var i=I.T;I.T=null;var a=L.p;try{L.p=2,Ch(e,t,n,r)}finally{L.p=a,I.T=i}}function Sh(e,t,n,r){var i=I.T;I.T=null;var a=L.p;try{L.p=8,Ch(e,t,n,r)}finally{L.p=a,I.T=i}}function Ch(e,t,n,r){if(bh){var i=wh(r);if(i===null)Xf(e,t,r,Th,n),Ph(e,r);else if(Ih(i,e,t,n,r))r.stopPropagation();else if(Ph(e,r),t&4&&-1<Nh.indexOf(e)){for(;i!==null;){var a=Mt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=at(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Qe(o);s.entanglements[1]|=c,o&=~c}jf(a),!(td&6)&&(bd=Be()+500,Mf(0,!1))}}break;case 31:case 13:s=Ti(a,2),s!==null&&Rd(s,a,2),Ud(),_h(a,2)}if(a=wh(r),a===null&&Xf(e,t,r,Th,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Xf(e,t,r,null,n)}}function wh(e){return e=vn(e),Eh(e)}var Th=null;function Eh(e){if(Th=null,e=jt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Th=e,null}function X(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ve()){case He:return 2;case Ue:return 8;case We:case Ge:return 32;case Ke:return 268435456;default:return 32}default:return 32}}var Dh=!1,Oh=null,kh=null,Ah=null,jh=new Map,Mh=new Map,Z=[],Nh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Ph(e,t){switch(e){case`focusin`:case`focusout`:Oh=null;break;case`dragenter`:case`dragleave`:kh=null;break;case`mouseover`:case`mouseout`:Ah=null;break;case`pointerover`:case`pointerout`:jh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:Mh.delete(t.pointerId)}}function Fh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Mt(t),t!==null&&vh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ih(e,t,n,r,i){switch(t){case`focusin`:return Oh=Fh(Oh,e,t,n,r,i),!0;case`dragenter`:return kh=Fh(kh,e,t,n,r,i),!0;case`mouseover`:return Ah=Fh(Ah,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return jh.set(a,Fh(jh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,Mh.set(a,Fh(Mh.get(a)||null,e,t,n,r,i)),!0}return!1}function Lh(e){var t=jt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,bt(e.priority,function(){yh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,bt(e.priority,function(){yh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Rh(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=wh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);_n=r,n.target.dispatchEvent(r),_n=null}else return t=Mt(n),t!==null&&vh(t),e.blockedOn=n,!1;t.shift()}return!0}function zh(e,t,n){Rh(e)&&n.delete(t)}function Bh(){Dh=!1,Oh!==null&&Rh(Oh)&&(Oh=null),kh!==null&&Rh(kh)&&(kh=null),Ah!==null&&Rh(Ah)&&(Ah=null),jh.forEach(zh),Mh.forEach(zh)}function Vh(e,n){e.blockedOn===n&&(e.blockedOn=null,Dh||(Dh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Bh)))}var Hh=null;function Uh(e){Hh!==e&&(Hh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Hh===e&&(Hh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Eh(r||n)===null)continue;break}var a=Mt(n);a!==null&&(e.splice(t,3),t-=3,ec(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Wh(e){function t(t){return Vh(t,e)}Oh!==null&&Vh(Oh,e),kh!==null&&Vh(kh,e),Ah!==null&&Vh(Ah,e),jh.forEach(t),Mh.forEach(t);for(var n=0;n<Z.length;n++){var r=Z[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Z.length&&(n=Z[0],n.blockedOn===null);)Lh(n),n.blockedOn===null&&Z.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Ct]||null;if(typeof a==`function`)o||Uh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Ct]||null)s=o.formAction;else if(Eh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Uh(n)}}}function Gh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Kh(e){this._internalRoot=e}qh.prototype.render=Kh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;hh(n,Fd(),e,t,null,null)},qh.prototype.unmount=Kh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;hh(e.current,2,null,e,null,null),Ud(),t[wt]=null}};function qh(e){this._internalRoot=e}qh.prototype.unstable_scheduleHydration=function(e){if(e){var t=yt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Z.length&&t!==0&&t<Z[n].priority;n++);Z.splice(n,0,e),n===0&&Lh(e)}};var Jh=n.version;if(Jh!==`19.3.1`)throw Error(i(527,Jh,`19.3.1`));L.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Yh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:I,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Xh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xh.isDisabled&&Xh.supportsFiber)try{Ye=Xh.inject(Yh),Xe=Xh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Sc,s=Cc,c=wc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ph(e,1,!1,null,null,n,r,null,o,s,c,Gh),e[wt]=t.current,Jf(e),new Kh(t)}})),_=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=c(d()),y=_(),b=[{id:`tier01`,name:`Kilobytes`,symbol:`KB`,baseCost:1e3,costResourceId:`base`,producesResourceId:`bytes`,baseTickSpeedSeconds:1},{id:`tier02`,name:`Megabytes`,symbol:`MB`,baseCost:1e6,costResourceId:`base`,producesResourceId:`tier01`,baseTickSpeedSeconds:2},{id:`tier03`,name:`Gigabytes`,symbol:`GB`,baseCost:1e9,costResourceId:`base`,producesResourceId:`tier02`,baseTickSpeedSeconds:3},{id:`tier04`,name:`Terabytes`,symbol:`TB`,baseCost:0xe8d4a51000,costResourceId:`base`,producesResourceId:`tier03`,baseTickSpeedSeconds:4},{id:`tier05`,name:`Petabytes`,symbol:`PB`,baseCost:0x38d7ea4c68000,costResourceId:`base`,producesResourceId:`tier04`,baseTickSpeedSeconds:5},{id:`tier06`,name:`Exabytes`,symbol:`EB`,baseCost:0xde0b6b3a7640000,costResourceId:`base`,producesResourceId:`tier05`,baseTickSpeedSeconds:6},{id:`tier07`,name:`Zettabytes`,symbol:`ZB`,baseCost:1e21,costResourceId:`base`,producesResourceId:`tier06`,baseTickSpeedSeconds:7},{id:`tier08`,name:`Yottabytes`,symbol:`YB`,baseCost:1e24,costResourceId:`base`,producesResourceId:`tier07`,baseTickSpeedSeconds:8},{id:`tier09`,name:`Ronnabytes`,symbol:`RB`,baseCost:1e27,costResourceId:`base`,producesResourceId:`tier08`,baseTickSpeedSeconds:9},{id:`tier10`,name:`Quettabytes`,symbol:`QB`,baseCost:1e30,costResourceId:`base`,producesResourceId:`tier09`,baseTickSpeedSeconds:10}],x=Object.assign(Object.create(null),Object.fromEntries(b.map(e=>[e.id,e]))),S=Object.assign(Object.create(null),Object.fromEntries(b.map((e,t)=>[e.id,t]))),C=Object.fromEntries(b.map(e=>[e.id,e.symbol])),w=Object.fromEntries(b.map(e=>[e.id,e.baseTickSpeedSeconds])),T=`bytes`,E=e=>e===`bytes`?`B`:C[e]||`b`,D=e=>w[e]??1,O=`base`,k=1e100,A=k*8,ee=10**120*8,j=(e,t,n,r,i,a,o={})=>({id:t,layer:`F`,target:`${n===`tierTickspeed`?`⚙ `:``}${b[e].name}`,codename:r,automation:{kind:n,key:b[e].id},effect:i,rule:a,goal:A,levers:o}),te=[j(0,`F1`,`tierAutobuyer`,`Half Duplex`,`halfDuplex`,`Kilobytes produce at half speed.`,{clockSpeedPower:.85}),j(1,`F2`,`tierAutobuyer`,`Write Lock`,`writeLock`,`Buying Megabytes pauses production briefly.`,{scaleUpPower:.9}),j(2,`F3`,`tierAutobuyer`,`Cascade Delete`,`cascadeDelete`,`Buying Gigabytes resets lower tiers' owned counts.`,{costMultiplier:3}),j(3,`F4`,`tierAutobuyer`,`Premium Tier`,`premiumTier`,`Terabytes cost ×1000.`,{clockSpeedPower:.85}),j(4,`F5`,`tierAutobuyer`,`Hard Refresh`,`hardRefresh`,`Petabytes owned resets every 5 min.`),j(5,`F6`,`tierAutobuyer`,`Address Space`,`addressSpace`,`Exabytes is the top tier.`,{scaleUpPower:2,clockSpeedPower:1.5}),j(6,`F7`,`tierAutobuyer`,`Single Instance`,`singleInstance`,`Scale Up never doubles Zettabytes.`,{costMultiplier:3}),j(7,`F8`,`tierAutobuyer`,`Memory Leak`,`memoryLeak`,`Yottabytes lose 1% owned per second.`),j(8,`F9`,`tierAutobuyer`,`Bit Rot`,`bitRot`,`Corruption grows exponentially; if it passes your Bits, the cycle restarts.`,{scaleUpPower:.85}),j(9,`F10`,`tierAutobuyer`,`Flat Rate`,`flatRate`,`Quettabytes get no level multiplier.`),j(0,`F11`,`tierTickspeed`,`Clock Gated`,`clockGated`,`Kilobytes tickspeed disabled.`,{clockSpeedPower:.4}),j(1,`F12`,`tierTickspeed`,`Half Step`,`halfStep`,`Megabytes tickspeed gives 5% per level, not 10%.`,{scaleUpPower:.75}),j(2,`F13`,`tierTickspeed`,`Clock Skew`,`clockSkew`,`Gigabytes delivery period ×2.`,{costMultiplier:10}),j(3,`F14`,`tierTickspeed`,`Rate Limit`,`rateLimit`,`Terabytes tickspeed capped at +3 levels.`,{scaleUpPower:.65,costMultiplier:3}),j(4,`F15`,`tierTickspeed`,`Clock Drift`,`clockDrift`,`Petabytes tickspeed loses a level every 10 min.`,{clockSpeedPower:.75,costMultiplier:10}),j(5,`F16`,`tierTickspeed`,`Egress Fees`,`egressFees`,`Exabytes tickspeed levels cost one level more.`,{costMultiplier:20}),j(6,`F17`,`tierTickspeed`,`Noisy Neighbour`,`noisyNeighbour`,`Each Zettabytes tickspeed level slows other tiers 2%.`,{production:.5,clockSpeedPower:.75}),j(7,`F18`,`tierTickspeed`,`Daisy Chain`,`daisyChain`,`Yottabytes tickspeed capped at Zettabytes' level.`,{scaleUpPower:.6}),j(8,`F19`,`tierTickspeed`,`Duty Cycle`,`dutyCycle`,`Ronnabytes tickspeed alternates 30 s on, 30 s off.`,{clockSpeedPower:.25}),j(9,`F20`,`tierTickspeed`,`Burn Rate`,`burnRate`,`Quettabytes tickspeed spends its full requirement.`,{production:.5,scaleUpPower:.75,costMultiplier:3}),{id:`F21`,layer:`F`,target:`Accelerate`,codename:`Base Clock`,automation:{kind:`global`,key:`speedUp`},effect:`clockSpeedDisabled`,rule:`Accelerate is disabled.`,goal:A,levers:{costMultiplier:30}},{id:`F22`,layer:`F`,target:`Scale Up`,codename:`Scale Out`,automation:{kind:`global`,key:`scaleUp`},effect:`scaleUpNoDoubling`,rule:`Scale Up doubles nothing.`,goal:A},{id:`F23`,layer:`F`,target:`Restage`,codename:`Code Freeze`,automation:{kind:`global`,key:`restage`},effect:`restageDisabled`,rule:`Restage disabled.`,goal:A,levers:{costMultiplier:250}},{id:`F24`,layer:`F`,target:`Overclock`,codename:`Stock Cooling`,automation:{kind:`global`,key:`overclock`},effect:`overclockDisabled`,rule:`Overclock is disabled.`,goal:A,levers:{scaleUpPower:.5,clockSpeedPower:.5,costMultiplier:40}},{id:`F25`,layer:`F`,target:`Purge`,codename:`Scope Creep`,automation:{kind:`global`,key:`purge`},effect:`raisedGoal`,rule:`Higher Purge goal; no freeze at 1 Googol.`,goal:ee,levers:{clockSpeedPower:.5,costMultiplier:30}}],M=({production:e,clockSpeedPower:t,scaleUpPower:n,costMultiplier:r}={})=>[e!=null&&`Production ×${e}.`,t!=null&&`Accelerate ^${t}.`,n!=null&&`Scale Up ^${n}.`,r!=null&&`Costs ×${r}.`].filter(Boolean).join(` `),N=te.map(e=>({...e,rule:[e.rule,M(e.levers)].filter(Boolean).join(` `)})),ne=.5,P=1e3,re=.01,ie=1e3,F=1e6,ae=.05,oe=.02,se=Object.fromEntries(N.map(e=>[e.id,e])),ce=new Set(N.map(e=>e.id)),le={enabled:!0},ue={enabled:!0},de=.05,fe=.01,pe=e=>Math.max(5,e),me=[1,2,3,4,5,6,7,8,9,10],I=[{id:`firstSession`,name:`First session`,boostArea:`foundry`,reveal:null},{id:`foundry`,name:`Foundry`,boostArea:`foundry`,reveal:{kind:`storageUnlocked`}},{id:`power`,name:`Power`,boostArea:`power`,reveal:{kind:`anyOf`,conditions:[{kind:`powerPageUnlocked`},{kind:`achievementEarned`,id:`powerUser`}]}},{id:`tierLadder`,name:`Tier ladder`,boostArea:`factory`,reveal:{kind:`storageUnlocked`}},{id:`earlyFactory`,name:`Early Factory`,boostArea:`factory`,reveal:{kind:`storageUnlocked`}},{id:`levelPower`,name:`Level power`,boostArea:`factory`,reveal:{kind:`storageUnlocked`}},{id:`overclockStep`,name:`Overclock step`,boostArea:`factory`,reveal:{kind:`anyOf`,conditions:[{kind:`tierPurchased`,tierId:`tier10`},{kind:`achievementEarned`,id:`tier10Bought`}]}},{id:`firstPurge`,name:`First Purge and after`,boostArea:`purgePoints`,reveal:{kind:`googolReached`}},{id:`latePurge`,name:`Late Purge layer`,boostArea:`purgePoints`,reveal:{kind:`lifetimePurges`,min:1}},{id:`reboot`,name:`Reboot`,boostArea:`kernels`,reveal:{kind:`rebootReached`}}],L=[`Kilo-what?`,`Mega bite`,`Giga-what now`,`Tera-fying`,`Peta-fied`,`Exa-ggerated`,`Zetta slow`,`Yotta be kidding me`,`Ronna-way process`,`Quetta while`],R=[1,3,6,8,b.length],he=[{arrayStepGain:.02},{arrayStepGain:.03},{lakeSpeed:.05},{lakeSpeed:.05},{syncedBitrate:!0}],ge=e=>`${Math.round(e*1e3)/10}%`,_e=({arrayStepGain:e,lakeSpeed:t,syncedBitrate:n})=>{let r=[],i=[];return e&&(r.push(`Disk step ${ge(e)}`),i.push(`Disk-size steps without a Flush Pool upgrade close ${ge(e)} of the gap to 1.0 (was 1%)`)),t&&(r.push(`Lake speed +${ge(t)}`),i.push(`Every Data Lake fills at +${ge(t)} more of its pool's Bandwidth`)),n&&(r.push(`One Upgrade does both`),i.push(`Bitrate always matches Capacity: there is no separate Upgrade Bitrate, and every Upgrade raises both`)),{shortBonus:r.join(`, `),bonus:i.join(`. `)}},ve=`buyMaxRush`,ye=1e3,be=[{id:`helloWorld`,name:`Hello, World`,group:`firstSession`,trigger:`Ping for the first time`,short:`Ping`,condition:{kind:`counter`,key:`pings`,min:1}},{id:`itCompiles`,name:`It compiles, ship it`,group:`firstSession`,trigger:`Compile for the first time`,short:`Compile`,condition:{kind:`byteCreated`}},{id:`pingOfDeath`,details:`Counts every Ping you have ever made, across Purges and Reboots.`,name:`Ping of Death`,group:`firstSession`,trigger:`Ping 256 times`,short:`Ping ×256`,condition:{kind:`counter`,key:`pings`,min:256}},{id:`kibiNotKilo`,name:`Kibi, not Kilo`,group:`firstSession`,trigger:`Reach 1 KiB Capacity`,short:`1 KiB Capacity`,condition:{kind:`storageUnlocked`}},...R.map((e,t)=>({id:`reclaim${t+1}`,name:[`Flush with success`,`Garbage, collected`,`Marie Kondo'd`,`Swamp drained`,`The Great Flushening`][t],group:`foundry`,trigger:e===1?`Flush a Storage pool for the first time`:t===R.length-1?`Flush every Storage pool at least once`:`Flush ${e} different Storage pools`,short:e===1?`Flush a pool`:t===R.length-1?`Flush every pool`:`Flush ${e} pools`,..._e(he[t]),condition:{kind:`poolsCompacted`,min:e}})),...b.map((e,t)=>({id:`tier${String(t+1).padStart(2,`0`)}Bought`,name:L[t],group:`tierLadder`,trigger:`Buy your first ${e.name}`,short:`Buy ${e.symbol}`,condition:{kind:`tierPurchased`,tierId:e.id}})),{id:`quettaSpent`,details:`You must click Restage yourself; Auto Restage does not count.`,name:`Quetta broke`,group:`tierLadder`,trigger:`Restage while holding 0 Quettabytes`,short:`Restage at 0 QB`,reveal:{kind:`anyOf`,conditions:[{kind:`tierPurchased`,tierId:`tier10`},{kind:`achievementEarned`,id:`tier10Bought`}]},shortBonus:`QB credited without balance`,bonus:`Quettabytes are credited regardless of balance: 1 every 10 s at 1 completed level, every 5 s at 10, every 3.33 s at 100`,condition:{kind:`counter`,key:`emptyRestages`,min:1}},{id:`tickTock`,name:`Tick tock`,group:`earlyFactory`,trigger:`Buy your first Accelerate level`,short:`Accelerate 1`,condition:{kind:`clockSpeedLevel`,min:1}},{id:`megahertzMyth`,name:`Megahertz myth`,group:`earlyFactory`,trigger:`Reach Accelerate level 10`,short:`Accelerate 10`,condition:{kind:`clockSpeedLevel`,min:10}},{id:`warrantyVoid`,name:`Warranty void`,group:`earlyFactory`,trigger:`Overclock for the first time`,short:`Overclock`,reveal:{kind:`anyOf`,conditions:[{kind:`tierPurchased`,tierId:`tier10`},{kind:`achievementEarned`,id:`tier10Bought`}]},condition:{kind:`overclocked`}},{id:ve,details:`Manual clicks only: autobuyers do not count, a click that buys nothing, or on any other Buy or Accelerate button, starts the count over. Works on any Factory Buy or Accelerate button, as long as all ten are on the same one.`,name:`Click fast, buy max`,group:`earlyFactory`,trigger:`Click the same Factory Buy button 10 times within 1 second`,short:`Buy ×10 in 1 s`,shortBonus:`Unlocks Buy max`,bonus:`Unlocks Buy max mode on Firmware → Prestige: each purchase buys every affordable level`,condition:{kind:`anyOf`,conditions:[{kind:`counter`,key:`buyMaxRushes`,min:1},{kind:`legacyBuyMax`}]}},...me.map((e,t)=>({id:`levelPower${t+1}`,name:[`High five`,`Five alive`,`Take five`,`The Fifth Element`,`Jackson 5`,`Six pack`,`Lucky seven`,`Eight is enough`,`Cloud nine`,`Perfect ten`][t],group:`levelPower`,trigger:`Complete ${pe(e)} levels on ${b[e-1].name}`,short:`${b[e-1].symbol} level ${pe(e)}`,shortBonus:`+${de} per-level multiplier`,bonus:`The per-level production multiplier rises by ${de} (×1.0 → ×1.5 with all ten)`,condition:{kind:`tierLevel`,tierId:b[e-1].id,min:pe(e)+1}})),{id:`overclockStep1`,name:`Patient Overclock`,group:`overclockStep`,short:`First Overclock at 6+`,shortBonus:`Overclock step −1`,trigger:`Claim the first Overclock of a Purge at 6+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level than the one before (+4 → +3)`,condition:{kind:`counter`,key:`maxFirstOverclock`,min:6}},{id:`overclockStep2`,name:`Overclock fast`,group:`overclockStep`,short:`2 Overclocks/Purge, no Accelerate`,shortBonus:`Overclock step −1`,trigger:`After Patient Overclock, claim two Overclocks in one Purge without buying any Accelerate`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+3 → +2)`,condition:{kind:`counter`,key:`acceleratelessOverclocks`,min:1}},{id:`overclockStep3`,name:`Beyond Googol`,group:`overclockStep`,short:`DeGoogol, Overclock at 12+`,shortBonus:`Overclock step −1`,trigger:`After Overclock fast and DeGoogol, claim an Overclock at 12+ completed last-tier levels`,bonus:`Each later Overclock needs 1 fewer extra completed last-tier level (+2 → +1)`,condition:{kind:`counter`,key:`overflowDeepOverclock`,min:1}},{id:`powerUser`,selfExplanatory:!0,name:`Power user`,group:`power`,trigger:`Unlock the Power page`,short:`Unlock Power`,condition:{kind:`powerPageUnlocked`}},{id:`batteriesIncluded`,selfExplanatory:!0,name:`Batteries included`,group:`power`,trigger:`Build your first Battery`,short:`First Battery`,condition:{kind:`computeEntityBuilt`,fromIndex:1}},{id:`turboButton`,selfExplanatory:!0,name:`Turbo button`,group:`power`,trigger:`Activate your first Turbo Boost`,short:`First Turbo`,condition:{kind:`counter`,key:`turboBoosts`,min:1}},{id:`stackOverflow`,name:`Stack Overflow`,group:`power`,trigger:`Stack a Boost to its maximum`,short:`Max Boost stack`,condition:{kind:`counter`,key:`maxBoostStack`,min:1}},{id:`coldFusion`,name:`Cold fusion`,group:`power`,trigger:`Build your first Fusion`,short:`First Fusion`,condition:{kind:`computeEntityBuilt`,fromIndex:9}},{id:`justGoogolIt`,selfExplanatory:!0,name:`Just Googol it`,group:`firstPurge`,trigger:`Reach 1 Googol Bytes`,short:`1 Googol Bytes`,reveal:{kind:`storageUnlocked`},condition:{kind:`googolReached`}},{id:`remindMeLater`,details:`The timer only runs while a Purge is available and unclaimed, so Auto-Purge (which claims it for you) must be paused.`,name:`Remind me later`,group:`firstPurge`,trigger:`Leave a Purge available but unclaimed for 60 seconds (pause Auto-Purge if you own it)`,short:`Purge pending 1 min`,condition:{kind:`counter`,key:`purgeWaitSeconds`,min:60}},{id:`startAllOver`,name:`Wait, do I start all over?`,group:`firstPurge`,trigger:`Purge for the first time`,short:`Purge`,condition:{kind:`lifetimePurges`,min:1}},{id:`tenTypes`,name:`There are 10 types of people`,group:`firstPurge`,trigger:`Purge at least 2 times`,short:`Purge ×2`,condition:{kind:`lifetimePurges`,min:2}},{id:`scriptKiddie`,name:`Script kiddie`,group:`firstPurge`,trigger:`Unlock your first autobuyer`,short:`First autobuyer`,condition:{kind:`autobuyers`,mode:`any`}},{id:`hex10`,name:`0x10`,group:`firstPurge`,trigger:`Purge at least 16 times`,short:`Purge ×16`,condition:{kind:`lifetimePurges`,min:16}},{id:`cronJob`,name:`Cron job`,group:`firstPurge`,trigger:`Unlock every tier autobuyer`,short:`All autobuyers`,condition:{kind:`autobuyers`,mode:`all`}},{id:`noHands`,details:`Autobuyer purchases are fine; any manual tier Buy during the cycle spoils it. Scale Up and Overclock keep the cycle going.`,name:`Look ma, no hands`,group:`firstPurge`,trigger:`Purge in a cycle with no manual tier purchase`,short:`Hands-free Purge`,condition:{kind:`counter`,key:`handsFreePurges`,min:1}},{id:`stillClicker`,details:`Every tier autobuyer must already be unlocked when you Ping.`,name:`Oh, it's still a clicker game!`,group:`firstPurge`,trigger:`Ping while every tier autobuyer is unlocked`,short:`Ping, all automated`,condition:{kind:`counter`,key:`automatedPings`,min:1}},{id:`lossless`,name:`Lossless`,group:`latePurge`,trigger:`Buy your first Compression level`,short:`Compression 1`,condition:{kind:`doublePpLevel`,min:1}},{id:`middleOut`,name:`Middle-out`,group:`latePurge`,trigger:`Reach Compression level 5`,short:`Compression 5`,condition:{kind:`doublePpLevel`,min:5}},{id:`zipBomb`,name:`Zip bomb`,group:`latePurge`,trigger:`Compress until 1 power earns 1 PP`,short:`1 power per PP`,condition:{kind:`onePowerPerPp`}},{id:`whileTrue`,name:`while (true)`,group:`latePurge`,trigger:`Run Auto-Purge at a 1 second interval`,short:`Auto-Purge 1 s`,condition:{kind:`fastAutoPurge`}},{id:`notABug`,name:`It's not a bug, it's a feature`,group:`latePurge`,trigger:`Pass 1 Googol Bytes in Overflow mode`,short:`Googol in Overflow`,reveal:{kind:`fastAutoPurge`},condition:{kind:`overflowPastGoogol`}},{id:`bit64`,name:`64-bit upgrade`,group:`latePurge`,trigger:`Purge at least 64 times`,short:`Purge ×64`,condition:{kind:`lifetimePurges`,min:64}},{id:`someoneElsesComputer`,name:`The cloud is just someone else's computer`,group:`latePurge`,trigger:`Buy your first Supercloud`,short:`First Supercloud`,reveal:{kind:`computeFlopsPageUnlocked`},condition:{kind:`superCloudOwned`}},{id:`offAndOn`,name:`Have you tried turning it off and on again?`,group:`reboot`,trigger:`Reboot for the first time`,short:`Reboot`,condition:{kind:`eraCount`,min:1}},{id:`rmRf`,name:`rm -rf`,group:`reboot`,trigger:`Reformat the Byte Foundry`,short:`Reformat Foundry`,condition:{kind:`counter`,key:`reformats`,min:1}},{id:`kernelPanic`,details:`Measured in time actually played, not time away.`,name:`Kernel panic`,group:`reboot`,trigger:`Reboot twice within an hour of play`,short:`Reboot ×2 in 1 h`,condition:{kind:`counter`,key:`quickReboots`,min:1}},{id:`popcorn`,name:`Popcorn`,group:`reboot`,trigger:`Earn 100 Kernels in total`,short:`100 Kernels`,condition:{kind:`kernelsEarned`,min:100}}].map(e=>({secret:!1,platformDependent:!1,selfExplanatory:!1,details:null,bonus:null,short:null,shortBonus:null,reveal:void 0,...e})),xe=[{id:`ping`,name:`Ping`,members:[`helloWorld`,`pingOfDeath`]},{id:`poolReset`,name:`Reclamation`,members:R.map((e,t)=>`reclaim${t+1}`)},{id:`tierBought`,name:`First purchase`,members:b.map((e,t)=>`tier${String(t+1).padStart(2,`0`)}Bought`)},{id:`accelerate`,name:`Accelerate`,members:[`tickTock`,`megahertzMyth`]},{id:`levelPower`,name:`Level power`,members:me.map((e,t)=>`levelPower${t+1}`)},{id:`overclockStep`,name:`Overclock step`,members:[`overclockStep1`,`overclockStep2`,`overclockStep3`]}],Se=Object.fromEntries(xe.flatMap(e=>e.members.map((t,n)=>[t,{...e,level:n+1}]))),Ce=Object.fromEntries(be.map(e=>[e.id,e])),we=1024,Te=1e3,Ee=8*Te**2/10,De=(e=1)=>({startBits:8,endBits:8/10*Te**(Math.max(1,Math.floor(Number(e)||1))+1)}),Oe=.5,ke=.9,Ae=8e3,je=1e3,Me=8*we,Ne=8e3,Pe=Ee/2,Fe=[{inputField:`computeCores`,outputField:`computeNodes`,autoFlagField:`autoMergeCoresIntoNode`,timerField:`computeCoresMergeRemainingSeconds`,label:`Cells→Batteries`},{inputField:`computeNodes`,outputField:`computeClusters`,autoFlagField:`autoMergeNodesIntoCluster`,timerField:`computeNodesMergeRemainingSeconds`,label:`Batteries→Packs`},{inputField:`computeClusters`,outputField:`computeNetworks`,autoFlagField:`autoMergeClustersIntoNetwork`,timerField:`computeClustersMergeRemainingSeconds`,label:`Packs→Banks`},{inputField:`computeNetworks`,outputField:`computeGrids`,autoFlagField:`autoMergeNetworksIntoGrid`,timerField:`computeNetworksMergeRemainingSeconds`,label:`Banks→Generators`},{inputField:`computeGrids`,outputField:`computeFabrics`,autoFlagField:`autoMergeGridsIntoFabric`,timerField:`computeGridsMergeRemainingSeconds`,label:`Generators→Turbines`},{inputField:`computeFabrics`,outputField:`computeClouds`,autoFlagField:`autoMergeFabricsIntoCloud`,timerField:`computeFabricsMergeRemainingSeconds`,label:`Turbines→Plants`},{inputField:`computeClouds`,outputField:`computeDatacenters`,autoFlagField:`autoMergeCloudsIntoDatacenter`,timerField:`computeCloudsMergeRemainingSeconds`,label:`Plants→Grids`},{inputField:`computeDatacenters`,outputField:`computeSupercomputers`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,timerField:`computeDatacentersMergeRemainingSeconds`,label:`Grids→Reactors`},{inputField:`computeSupercomputers`,outputField:`computeMegacomputers`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,timerField:`computeSupercomputersMergeRemainingSeconds`,label:`Reactors→Fusions`}],Ie={burst:{multiplier:20,durationSeconds:600,poolBonusPercent:200},standard:{multiplier:5,durationSeconds:3600,poolBonusPercent:50},sustain:{multiplier:2,durationSeconds:36e3,poolBonusPercent:10}},Le=[`Cells`,`Batteries`,`Packs`,`Banks`,`Generators`,`Turbines`,`Plants`,`Grids`,`Reactors`,`Fusions`],Re=[`computeCores`,`computeNodes`,`computeClusters`,`computeNetworks`,`computeGrids`,`computeFabrics`,`computeClouds`,`computeDatacenters`,`computeSupercomputers`,`computeMegacomputers`],ze=[1,10,100],Be=[9,9,9],Ve=1e3,He=[1,10,100,Ve],Ue=[`KB`,`MB`,`GB`,`TB`,`PB`,`EB`,`ZB`,`YB`,`RB`,`QB`],We=10*ze.length,Ge=[1,10,100,1e3],Ke=.5,qe=86400,Je=14400,Ye=14400,Xe=[4,40,400,4e3,4e4],Ze=2e3,Qe=1024,$e=1.1,et=.01,tt=.1,nt=Math.floor(Math.log2(Qe)),rt=.9,it=.01,at={speedUp:8,scaleUp:16,restage:32,overclock:64,purge:128},ot={speedUp:{baseCost:8,baseSeconds:1},scaleUp:{baseCost:16,baseSeconds:64},restage:{baseCost:32,baseSeconds:128},overclock:{baseCost:32,baseSeconds:256},purge:{baseCost:64,baseSeconds:1024}},st={baseCost:100,baseSeconds:16},ct=.01,lt=.1,ut=.01,dt=.01,ft=.1,pt=1e3,mt=1e30,ht=1e-4,gt=[{id:`flop01`,name:`Cores`,outputLabel:`KFlops`,symbol:`KF`,baseCostPP:1e3,boostsTierId:`tier01`},{id:`flop02`,name:`Chips`,outputLabel:`MFlops`,symbol:`MF`,baseCostPP:1e6,boostsTierId:`tier02`},{id:`flop03`,name:`Servers`,outputLabel:`GFlops`,symbol:`GF`,baseCostPP:1e9,boostsTierId:`tier03`},{id:`flop04`,name:`Racks`,outputLabel:`TFlops`,symbol:`TF`,baseCostPP:0xe8d4a51000,boostsTierId:`tier04`},{id:`flop05`,name:`Pods`,outputLabel:`PFlops`,symbol:`PF`,baseCostPP:0x38d7ea4c68000,boostsTierId:`tier05`},{id:`flop06`,name:`Clusters`,outputLabel:`EFlops`,symbol:`EF`,baseCostPP:0xde0b6b3a7640000,boostsTierId:`tier06`},{id:`flop07`,name:`Datacenters`,outputLabel:`ZFlops`,symbol:`ZF`,baseCostPP:1e21,boostsTierId:`tier07`},{id:`flop08`,name:`Regions`,outputLabel:`YFlops`,symbol:`YF`,baseCostPP:1e24,boostsTierId:`tier08`},{id:`flop09`,name:`Clouds`,outputLabel:`RFlops`,symbol:`RF`,baseCostPP:1e27,boostsTierId:`tier09`},{id:`flop10`,name:`Superclouds`,outputLabel:`QFlops`,symbol:`QF`,baseCostPP:1e30,boostsTierId:`tier10`}],_t=Object.assign(Object.create(null),Object.fromEntries(gt.map(e=>[e.id,e]))),vt=Object.assign(Object.create(null),Object.fromEntries(gt.map((e,t)=>[e.id,t]))),yt=k,bt=[0,10,60,600,3600,21600,86400],xt=[0,1.5,2,5,10,100],St=1e-5,Ct=[{id:`hyperscalerEfficiency`,levelField:`hyperscalerEfficiencyLevel`,costBase:1,costGrowth:10,maxLevel:10},{id:`eonAmplifier`,levelField:`eonAmplifierLevel`,costBase:10,costGrowth:10,maxLevel:9}],wt=Object.assign(Object.create(null),Object.fromEntries(Ct.map(e=>[e.id,e]))),Tt=()=>b[b.length-1].id,z=e=>Math.max(0,Number.isFinite(e)?e:0),Et=()=>({cycleSeconds:0,refreshes:0,haltSeconds:0,leakRemainder:0}),Dt=1e-9,Ot=1e-9,kt=()=>{let e=new Set([O]);return b.forEach(t=>{e.add(t.costResourceId),t.producesResourceId!==`bytes`&&e.add(t.producesResourceId)}),[...e]},At=()=>({depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,purchased:0,boostersUnlocked:!1,autoConvertActive:!1,capacityLevel:0,boosterAuto:!1,resetCount:0,rebuilding:!1,bandwidthSteps:0}),jt=()=>{let e={};for(let t=1;t<=10;t+=1)e[t]=At();return e},Mt=()=>({resources:kt().reduce((e,t)=>({...e,[t]:+(t===`base`)}),{}),owned:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchased:b.reduce((e,t)=>({...e,[t.id]:0}),{}),purchaseLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),purchaseLevelProgress:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyers:b.reduce((e,t)=>({...e,[t.id]:null}),{}),autobuyersEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tickspeedLevels:b.reduce((e,t)=>({...e,[t.id]:1}),{}),autobuyerAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autobuyerIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationIntervalLevels:{speedUp:0,scaleUp:0,restage:0,overclock:0,purge:0},tierTickspeedIntervalLevels:b.reduce((e,t)=>({...e,[t.id]:0}),{}),automationAttemptBudgets:{speedUp:0,scaleUp:0,restage:0,overclock:0},tierTickspeedAttemptBudgets:b.reduce((e,t)=>({...e,[t.id]:0}),{}),autoOverclock:!1,autoOverclockEnabled:!0,computeAutoChargeEnabled:!0,tierTickspeedAutobuyer:b.reduce((e,t)=>({...e,[t.id]:!1}),{}),tierTickspeedAutobuyerEnabled:b.reduce((e,t)=>({...e,[t.id]:!0}),{}),tierProductionAccumulators:b.reduce((e,t)=>({...e,[t.id]:0}),{}),lastTierLevelCreditTimer:0,accelerateBoughtThisCycle:!1,manualPurchaseThisCycle:!1,autoPurge:null,autoPurgeEnabled:!0,autoPurgeSettings:{targetPpExponent:0,minSeconds:0,bestMultiplier:0},globalTickspeedMultiplier:null,autoPurgeAttemptBudget:0,challenges:{active:null,activeSeconds:0,completed:{},bestSeconds:{},enteredCount:0,exitedCount:0,bitRotLosses:0,run:Et()},achievements:{earned:{},counters:{pings:0}},daily:{runs:{},results:{}},prestigeDoublePpLevel:0,playtimeBonusUnlocked:!1,buyMaxUnlocked:!1,sleepModeCapLevel:0,cacheWarmUnlocked:!1,prestigeSpeedBonusUnlocked:!1,speedBonusGrandfathered:!0,activePlaySeconds:0,scaleUpCount:0,scaleUpTierCounts:Object.fromEntries(b.map(e=>[e.id,0])),scaleUpTargetTierIndex:0,overclockLastClaimCompletedLevels:null,autoScaleUp:!1,autoXpTickspeed:!1,autoXpTickspeedEnabled:!0,computeAutoBoostUnlocked:!1,autoScaleUpEnabled:!0,autoGlobalTickspeed:!1,autoGlobalTickspeedEnabled:!0,lastTierXpConsumed:0,everUnlockedTierIds:b.reduce((e,t,n)=>({...e,[t.id]:n===0}),{}),purge:{xp:0,points:0,count:0,highestMilestone:Si(1),cycleSeconds:0,highestAward:0,unboundedUnlocked:!1},era:{count:0},eons:{balance:0},hyperscalerCount:0,eonsUpgrades:{autoHyperscalerUnlocked:!1,autoHyperscalerEnabled:!0,eonAmplifierLevel:0,hyperscalerEfficiencyLevel:0},computeFlopsAutobuyers:gt.reduce((e,t)=>({...e,[t.id]:null}),{}),computeFlopsAutobuyersEnabled:gt.reduce((e,t)=>({...e,[t.id]:!0}),{}),computeFlopsAutobuyerAttemptBudgets:gt.reduce((e,t)=>({...e,[t.id]:0}),{}),prestigeMuseum:{history:[],pinnedIds:[]},computeFlops:{pageUnlocked:!1,owned:gt.reduce((e,t)=>({...e,[t.id]:0}),{}),cumulativeBoost:b.reduce((e,t)=>({...e,[t.id]:0}),{})},intro:{bits:0,capacity:8,byteCreated:!1,foundryResetCaps:null,lowerRebuild:null,mainGameUnlocked:!1,capacityUpgradeQueued:!1,capacityUpgradeProgress:0,speedUpgradeQueued:!1,speedUpgradeProgress:0,unlockedDiskSteps:1,poolExponentBonuses:{},disks:{},disksBuiltTotal:{},diskCache:{},diskReadCacheFlush:{},diskWriteCache:{},diskBuild:null,diskProvisionPasses:{},diskBuildQueued:!1,diskBuildQueuedByReplay:!1,poolBuffers:{},dataLakes:jt(),poolResetRebuildingCount:0,poolResetCount:0,computeCores:0,computeCoresEverEarned:0,computeNodes:0,computeClusters:0,computeNetworks:0,computeGrids:0,computeFabrics:0,computeClouds:0,computeDatacenters:0,computeSupercomputers:0,computeMegacomputers:0,computeMergePageUnlocked:!1,chargerUnlockProgress:{},autoMergeCoresIntoNode:!1,autoMergeNodesIntoCluster:!1,autoMergeClustersIntoNetwork:!1,autoMergeNetworksIntoGrid:!1,autoMergeGridsIntoFabric:!1,autoMergeFabricsIntoCloud:!1,autoMergeCloudsIntoDatacenter:!1,autoMergeDatacentersIntoSupercomputer:!1,autoMergeSupercomputersIntoMegacomputer:!1,computeCoresMergeRemainingSeconds:0,computeNodesMergeRemainingSeconds:0,computeClustersMergeRemainingSeconds:0,computeNetworksMergeRemainingSeconds:0,computeGridsMergeRemainingSeconds:0,computeFabricsMergeRemainingSeconds:0,computeCloudsMergeRemainingSeconds:0,computeDatacentersMergeRemainingSeconds:0,computeSupercomputersMergeRemainingSeconds:0,computeChargeSeconds:{},computeAutoBoostType:`standard`,computeAutoBoostEnabled:!0,computeBoosts:{},dataStreamTapBonusPercent:0,poolTapBonusPercents:{}}}),Nt=new Intl.NumberFormat(`en-US`),Pt=new Intl.NumberFormat(`en-US`,{maximumFractionDigits:0}),Ft=1e4,It=1e3,Lt=1+1e-12,Rt=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t*Lt;n>=10&&(n/=10,t+=1),n<1&&(n*=10,--t);let r=Math.floor(n*It)/It;return`${Number(r.toFixed(3))}e${t}`},B=e=>{let t=z(e);return t<Ft?Nt.format(t):Rt(t)},zt=1e-9,Bt=e=>{let t=Math.floor(Math.log10(e)),n=e/10**t;return Math.abs(n-8)>zt?null:`${Rt(10**t)} ${E(T)}`},Vt=e=>{let t=Math.floor(z(e)),n=E(O);return t<Ft?`${Pt.format(t)} ${n}`:Bt(t)??`${Rt(t)} ${n}`},Ht=e=>{let t=Math.floor(z(e)),n=E(T);return t<Ft?`${Pt.format(t)} ${n}`:`${Rt(t)} ${n}`},Ut=8e3,V=e=>{let t=Math.floor(z(e));if(t<Ut)return Vt(t);let n=Math.floor(t/8);return n<Ft?`${Pt.format(n)} B`:`${Rt(n)} B`},Wt=e=>{let t=z(e);return t===0?1:2+(t-1)*t/2},Gt=e=>{let t=e.purchaseLevels?.[Tt()]??1,n=Math.max(0,t-1);return 8+1*Math.floor(n/100)},Kt=(e,t)=>{let n=S[e?.id];if(n===void 0)return Wt(t);let r=z(t);if(r<=2)return r+1;let i=r-2,a=Math.floor(i/10),o=i-a*10,s=10*(a*(a-1))/2+a*o;return 3+(n+1)*i+s},qt=(e,t)=>{let n=Math.max(0,t-1);return e.baseCost*10**(Kt(e,n)-1)},Jt=(e,t,n)=>{let r=Math.max(0,z(e)-z(t));return Math.max(0,Math.min(z(n),r))},Yt=(e,t,n,r,i)=>qt(e,t)*Jt(n,r,i),Xt=(e,t,n,r,i,a)=>{let o=Jt(n,r,a),s=qt(e,t);return s<=0?o:Math.min(o,Math.floor(z(i)/s))},Zt=e=>10**(10-Math.min(b.length-1,Math.max(0,e))),Qt=(e,t)=>Zt(Math.max(0,S[e]??-1))**Math.max(0,z(t)-1),$t=(e,t)=>Qt(e,t),en=e=>1+Math.max(0,S[e]??-1)*1,tn=e=>11+Math.max(0,S[e]??-1)*1,nn=e=>{let t=z(e.purge?.count??0),n=!1,r={...e.autobuyers},i={...e.tierTickspeedAutobuyer};b.forEach(e=>{(r[e.id]??null)===null&&t>=en(e.id)&&(r[e.id]=1,n=!0),!i[e.id]&&t>=tn(e.id)&&(i[e.id]=!0,n=!0)});let a={};return!e.autoGlobalTickspeed&&t>=at.speedUp&&(a.autoGlobalTickspeed=!0),!e.autoXpTickspeed&&t>=at.restage&&(a.autoXpTickspeed=!0),!e.autoScaleUp&&t>=at.scaleUp&&(a.autoScaleUp=!0),!e.autoOverclock&&t>=at.overclock&&(a.autoOverclock=!0),(e.autoPurge??null)===null&&t>=at.purge&&(a.autoPurge=1),!n&&Object.keys(a).length===0?e:{...e,...a,autobuyers:r,tierTickspeedAutobuyer:i}},rn=(e,t=tt)=>(1+t)**z((e??1)-1),an=e=>10**(z(e)+1),on=e=>an(e)*8,sn=e=>(e.resources?.base??0)>=on(e.globalTickspeedMultiplier??0),cn=e=>(e.purchaseLevels?.[b[0].id]??1)>=2||(e.globalTickspeedMultiplier??null)!==null,ln=(e,t=0)=>{let n=z(e??0);return(1+ct*Br(t))**n},un=e=>(e.scaleUpTierCounts?.[ri(e).id]??0)>=1,dn=e=>(1+dt)**z(e),fn=e=>Math.max(1,Math.ceil(ft*z(e))),pn=(e,t=!0)=>{let n=z(e);return!t||n<1?1:n<2?$e:1+Math.log10(n)},mn=e=>!!e.prestigeSpeedBonusUnlocked,hn=e=>{if(e.prestigeSpeedBonusUnlocked||z(e.purge.points)<1)return e;let t=On(e);return{...t,purge:{...t.purge,points:t.purge.points-1},prestigeSpeedBonusUnlocked:!0}},gn=e=>e.playtimeBonusUnlocked?1+et*(z(e.activePlaySeconds??0)/3600):1,_n=e=>{if(e.playtimeBonusUnlocked||z(e.purge.points)<100)return e;let t=On(e);return{...t,purge:{...t.purge,points:t.purge.points-100},playtimeBonusUnlocked:!0}},vn=e=>{if(e.cacheWarmUnlocked||z(e.purge.points)<20)return e;let t=On(e);return bn({...t,purge:{...t.purge,points:t.purge.points-20},cacheWarmUnlocked:!0})},yn=e=>b[Math.min(b.length,Math.max(1,Ba(e)))-1],bn=e=>{if(!e.cacheWarmUnlocked||Jr(e))return e;let t=yn(e).id;if((e.purchaseLevels?.[t]??1)>1)return e;let n=Math.max(0,Gt(e)-(e.purchaseLevelProgress?.[t]??0));return{...e,resources:{...e.resources,[t]:(e.resources[t]??0)+n},owned:{...e.owned,[t]:(e.owned[t]??0)+n},purchased:{...e.purchased,[t]:Yi(e,t)+n},purchaseLevels:{...e.purchaseLevels,[t]:2},purchaseLevelProgress:{...e.purchaseLevelProgress,[t]:0}}},xn=Xe.length,Sn=e=>Math.min(xn,Math.floor(z(e?.sleepModeCapLevel??0))),Cn=e=>Math.min(qe,Je+Ye*Sn(e)),wn=e=>Xe[e]??null,Tn=e=>{let t=Sn(e),n=wn(t);if(n===null||z(e.purge.points)<n)return e;let r=On(e);return{...r,purge:{...r.purge,points:r.purge.points-n},sleepModeCapLevel:t+1}},En=e=>t=>({...t,activePlaySeconds:z(t.activePlaySeconds??0)+z(e)}),Dn=e=>!!e.computeFlops?.pageUnlocked||z(e.purge?.points??0)>=100,On=e=>e.computeFlops?.pageUnlocked||z(e.purge?.points??0)<100?e:{...e,computeFlops:{...e.computeFlops,pageUnlocked:!0}},kn=(e,t,n)=>{let r=_t[t];if(!r)return{affordable:0,totalCost:0};let i=z(e.computeFlops?.owned?.[t]??0),a=z(e.purge?.points??0);if(a===1/0)return{affordable:n,totalCost:0};let o=0,s=0,c=i;for(;o<n;){let e=jn(r,c);if(a<e)break;a-=e,s+=e,o++,c++}return{affordable:o,totalCost:s}},An=(e,t,n)=>r=>{if(t<=0)return r;let i=On(r),a=z(i.computeFlops?.owned?.[e]??0);return{...i,purge:{...i.purge,points:(i.purge?.points??0)-n},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:a+t}}}},jn=(e,t=0)=>{let n=t+1;return qt({baseCost:e.baseCostPP},n)},Mn=(e,t)=>{let n=_t[t];if(!n)return!1;let r=jn(n,z(e.computeFlops?.owned?.[t]??0));return z(e.purge?.points??0)>=r},Nn=(e,t,n,r)=>{if(n===1/0)return{affordable:r,totalCost:0};let i=0,a=n,o=t;for(;i<r;){let t=jn(e,o);if(a>=t)a-=t,i++,o++;else break}return{affordable:i,totalCost:n-a}},Pn=(e,t=1)=>n=>{let r=_t[e];if(!r)return n;let i=On(n),a=z(i.computeFlops?.owned?.[e]??0),{affordable:o,totalCost:s}=Nn(r,a,z(i.purge?.points??0),t);return o===0?n:{...i,purge:{...i.purge,points:i.purge.points-s},computeFlops:{...i.computeFlops,owned:{...i.computeFlops.owned,[e]:z(a+o)}}}},Fn=e=>10**z(e),In=e=>gt.reduce((t,n,r)=>t+z(e.computeFlops?.cumulativeBoost?.[n.boostsTierId]??0)*Fn(r),0),Ln=e=>{let t=z(e.hyperscalerCount??0);return t<=0?0:t*(ht+z(e.eonsUpgrades?.hyperscalerEfficiencyLevel??0)*St)},Rn=(e,t)=>1+z(e.computeFlops?.cumulativeBoost?.[t]??0),zn=e=>{let t=z(e);return t===0?`0 Flops`:`${B(t)} Flops`},Bn=e=>t=>{if(e<=0)return On(t);let n=On(t),r=n.computeFlops?.owned??{},i=!1,a={...n.computeFlops.cumulativeBoost},o=Ln(n)*e;return gt.forEach(t=>{let n=z(r[t.id]??0)*ht*e+o;if(n<=0)return;let s=t.boostsTierId;a[s]=z((a[s]??0)+n),i=!0}),i?{...n,computeFlops:{...n.computeFlops,cumulativeBoost:a}}:n},Vn=e=>z(e.purge?.points??0)>=yt,Hn=e=>10**z(e.eonsUpgrades?.eonAmplifierLevel??0),Un=e=>1*10**z(e),Wn=e=>z(e.eons?.balance??0)>=Un(e.hyperscalerCount??0),Gn=e=>{if(!Wn(e))return e;let t=Un(e.hyperscalerCount??0);return{...e,eons:{...e.eons,balance:z(e.eons.balance)-t},hyperscalerCount:z(e.hyperscalerCount??0)+1}},Kn=(e,t)=>{let n=wt[t];return n?z(e.eonsUpgrades?.[n.levelField]??0):0},qn=(e,t)=>{let n=wt[e];return n?n.costBase*n.costGrowth**z(t):1/0},Jn=(e,t)=>{let n=wt[t];return!n||n.maxLevel!=null&&Kn(e,t)>=n.maxLevel},Yn=(e,t)=>!Jn(e,t)&&z(e.eons?.balance??0)>=qn(t,Kn(e,t)),Xn=e=>t=>{if(!Yn(t,e))return t;let n=wt[e],r=Kn(t,e);return{...t,eons:{...t.eons,balance:z(t.eons.balance)-qn(e,r)},eonsUpgrades:{...t.eonsUpgrades,[n.levelField]:r+1}}},Zn=e=>!e.eonsUpgrades?.autoHyperscalerUnlocked&&z(e.eons?.balance??0)>=100,Qn=e=>Zn(e)?{...e,eons:{...e.eons,balance:z(e.eons.balance)-100},eonsUpgrades:{...e.eonsUpgrades,autoHyperscalerUnlocked:!0}}:e,$n=e=>t=>{let n=!!e;return(t.eonsUpgrades?.autoHyperscalerEnabled??!0)===n?t:{...t,eonsUpgrades:{...t.eonsUpgrades,autoHyperscalerEnabled:n}}},er=e=>{if(!e.eonsUpgrades?.autoHyperscalerUnlocked||!(e.eonsUpgrades.autoHyperscalerEnabled??!0))return e;let t=e;for(;Wn(t);)t=Gn(t);return t},tr=e=>1+Math.max(0,vt[e]??-1)*1,nr=e=>{let t=z(e.era?.count??0),n=!1,r={...e.computeFlopsAutobuyers};return gt.forEach(e=>{(r[e.id]??null)===null&&t>=tr(e.id)&&(r[e.id]=1,n=!0)}),n?{...e,computeFlopsAutobuyers:r}:e},rr=(e,t)=>n=>!gt.some(t=>t.id===e)||(n.computeFlopsAutobuyers?.[e]??null)===null?n:{...n,computeFlopsAutobuyersEnabled:{...n.computeFlopsAutobuyersEnabled,[e]:t}},ir=e=>t=>{if(e<=0)return t;let n=t;return gt.forEach(t=>{if((n.computeFlopsAutobuyers?.[t.id]??null)===null||!(n.computeFlopsAutobuyersEnabled?.[t.id]??!0))return;let r=(n.computeFlopsAutobuyerAttemptBudgets?.[t.id]??0)+e,i=Math.floor(r+Dt);if(i>=1){let{affordable:e,totalCost:a}=kn(n,t.id,i);e>0&&(n=An(t.id,e,a)(n),r-=e)}n={...n,computeFlopsAutobuyerAttemptBudgets:{...n.computeFlopsAutobuyerAttemptBudgets,[t.id]:r}}}),n},ar=(e,t)=>{let n=!!e.intro?.byteCreated;return{...t.intro,byteCreated:n,bits:0,mainGameUnlocked:e.intro?.mainGameUnlocked??t.intro.mainGameUnlocked,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},foundryResetCaps:{},chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??t.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??t.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??t.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??t.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??t.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??t.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??t.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??t.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??t.intro.autoMergeSupercomputersIntoMegacomputer,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??t.intro.computeMergePageUnlocked,computeAutoBoostType:e.intro?.computeAutoBoostType??t.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??t.intro.computeAutoBoostEnabled}},or=[`computeCores`,`computeNodes`,`computeClusters`,`computeNetworks`,`computeGrids`,`computeFabrics`,`computeClouds`,`computeDatacenters`,`computeSupercomputers`,`computeMegacomputers`],sr=e=>Math.max(e.achievements?.counters?.purges??0,e.purge?.count??0),cr=(e,t,n=1,r=`add`)=>{if(!le.enabled)return e;let i=e.achievements??Mt().achievements,a=i.counters?.[t]??0,o=r===`max`?Math.max(a,n):r===`set`?n:a+n;return o===a&&i.counters?.[t]!==void 0?e:Sr({...e,achievements:{...i,counters:{...i.counters,[t]:o}}})},lr=e=>b.every(t=>(e.autobuyers?.[t.id]??null)!==null),ur=e=>dr(e.intro),dr=e=>{let t=0;for(let n=1;n<=10;n+=1)Number(e?.poolExponentBonuses?.[n])>=1&&(t+=1);return t},fr=e=>{let t=dr(e);return R.filter(e=>t>=e).length},pr=(e,t)=>{let n=he.slice(0,fr(e)).filter(e=>e.arrayStepGain);return n.length?n.at(-1).arrayStepGain:t},mr=(e,t)=>{switch(t.kind){case`counter`:return(e.achievements?.counters?.[t.key]??0)>=t.min;case`byteCreated`:return!!e.intro?.byteCreated;case`storageUnlocked`:return!!e.intro?.mainGameUnlocked||jo(e);case`tierPurchased`:return(e.purchased?.[t.tierId]??0)>0||(e.purchaseLevels?.[t.tierId]??1)>1;case`clockSpeedLevel`:return(e.globalTickspeedMultiplier??0)>=t.min;case`overclocked`:return e.overclockLastClaimCompletedLevels!=null;case`tierLevel`:return(e.purchaseLevels?.[t.tierId]??1)>=t.min;case`poolsCompacted`:return ur(e)>=t.min;case`lifetimePurges`:return sr(e)>=t.min;case`kernelsEarned`:return Math.max(e.achievements?.counters?.kernelsEarned??0,e.eons?.balance??0)>=t.min;case`eraCount`:return(e.era?.count??0)>=t.min;case`doublePpLevel`:return(e.prestigeDoublePpLevel??0)>=t.min;case`onePowerPerPp`:return ji(e.prestigeDoublePpLevel??0)<=1;case`googolReached`:return(e.resources?.base??0)>=8e100||sr(e)>0||(e.era?.count??0)>0;case`fastAutoPurge`:return(e.autoPurge??null)!==null&&jd(e,`purge`)<=1;case`overflowPastGoogol`:return(e.achievements?.counters?.overflowPurges??0)>=1||Kr(e)&&(e.resources?.base??0)>=8e100;case`superCloudOwned`:return(e.computeFlops?.owned?.flop10??0)>=1;case`computeFlopsPageUnlocked`:return Dn(e);case`rebootReached`:return(e.era?.count??0)>0||Vn(e)||Kr(e);case`achievementEarned`:return br(e,t.id);case`legacyBuyMax`:return!!e.buyMaxUnlocked;case`anyOf`:return(t.conditions??[]).some(t=>mr(e,t));case`powerPageUnlocked`:return Ll(e)||!!e.intro?.computeMergePageUnlocked||(e.intro?.computeCoresEverEarned??0)>0||or.some(t=>(e.intro?.[t]??0)>0);case`computeEntityBuilt`:return or.slice(t.fromIndex).some(t=>(e.intro?.[t]??0)>0);case`autobuyers`:{let n=b.map(t=>(e.autobuyers?.[t.id]??null)!==null);return t.mode===`all`?n.every(Boolean):n.some(Boolean)}default:return!1}},hr=(e,t)=>{if(t.min<=1)return null;switch(t.kind){case`counter`:return t.key===`maxFirstOverclock`?null:{current:e.achievements?.counters?.[t.key]??0,target:t.min};case`kernelsEarned`:return{current:Math.max(e.achievements?.counters?.kernelsEarned??0,e.eons?.balance??0),target:t.min};case`lifetimePurges`:return{current:sr(e),target:t.min};case`clockSpeedLevel`:return{current:e.globalTickspeedMultiplier??0,target:t.min};case`tierLevel`:return{current:Math.max(0,(e.purchaseLevels?.[t.tierId]??1)-1),target:t.min-1};case`poolsCompacted`:return{current:ur(e),target:t.min};case`storageUnlocked`:{let t=e=>Math.log2(Math.max(e,8)/8);return{current:Math.floor(t(e.intro?.capacity??0)),target:t(Me)}}default:return null}},gr=e=>e.bonus??null,_r=e=>e.short??e.trigger,vr=e=>e.shortBonus??e.bonus??null,yr=e=>e>=1?Math.max(ut,10/(1+Math.log10(e))):1/0,br=(e,t)=>!!e.achievements?.earned?.[t],xr=(e,t)=>{if(!t||br(e,t.id))return!0;let n=Se[t.id];if(n&&n.level>1&&!br(e,n.members[n.level-2]))return!1;let r=t.reveal===void 0?I.find(e=>e.id===t.group)?.reveal:t.reveal;return!r||mr(e,r)},Sr=e=>{if(!le.enabled)return e;let t=be.filter(t=>!br(e,t.id)&&mr(e,t.condition));if(t.length===0)return e;let n={...e.achievements?.earned};for(let e of t)n[e.id]=!0;return{...e,achievements:{counters:{pings:0},...e.achievements,earned:n}}},Cr=e=>I.filter(t=>{let n=be.filter(e=>e.group===t.id);return n.length>0&&n.every(t=>br(e,t.id))}).map(e=>e.id),wr=.1,Tr=(e,t)=>{let n=be.filter(e=>e.group===t&&!e.platformDependent),r=n.filter(t=>br(e,t.id)).length,i=n.length>0&&r===n.length,a=Math.ceil(n.length*wr);return{earned:r,bonus:i?a:0,total:n.length+a,complete:i}},Er=e=>I.reduce((t,n)=>{let{earned:r,bonus:i}=Tr(e,n.id);return t+r+i},0),Dr=e=>le.enabled?Math.round((1+fe*Er(e))*1e6)/1e6:1,Or=e=>{if(!Vn(e))return e;let t=Mt(),n=Hn(e),r=z(e.era?.count??0)+1,i=Kr(e);return bn(nr({...t,prestigeMuseum:e.prestigeMuseum??t.prestigeMuseum,intro:ar(e,t),autobuyers:e.autobuyers??t.autobuyers,autobuyersEnabled:e.autobuyersEnabled??t.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??t.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??t.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??t.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??t.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??t.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??t.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??t.autoPurgeEnabled,autoPurgeSettings:e.autoPurgeSettings??t.autoPurgeSettings,autoScaleUp:e.autoScaleUp??t.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??t.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??t.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??t.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??t.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??t.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??t.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??t.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??t.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??t.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??t.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??t.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??t.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??t.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??t.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??t.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??t.autoGlobalTickspeedEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:t.computeFlops.owned,cumulativeBoost:t.computeFlops.cumulativeBoost},computeFlopsAutobuyers:e.computeFlopsAutobuyers??t.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??t.computeFlopsAutobuyersEnabled,computeFlopsAutobuyerAttemptBudgets:t.computeFlopsAutobuyerAttemptBudgets,challenges:{...t.challenges,...e.challenges,active:null,activeSeconds:0,run:Et()},achievements:e.achievements??t.achievements,daily:e.daily??t.daily,era:{count:r},eons:{balance:z(e.eons?.balance??0)+n},hyperscalerCount:z(e.hyperscalerCount??0),eonsUpgrades:e.eonsUpgrades??t.eonsUpgrades,purge:{...t.purge,unboundedUnlocked:i,points:0,count:0},prestigeDoublePpLevel:t.prestigeDoublePpLevel}))},kr=e=>{let t=e.prestigeDoublePpLevel??0,n=Ni(t);if(z(e.purge.points)<n)return e;let r=On(e);return{...r,purge:{...r.purge,points:r.purge.points-n},prestigeDoublePpLevel:t+1}},Ar=e=>{let t=be.filter(t=>t.group===`levelPower`&&br(e,t.id)).length;return Math.round((1+de*t)*1e6)/1e6},jr=(e,t=1)=>{let n=Math.max(0,z(e)-1),r=Math.floor(n/10);return t**(n-r)*10**r},Mr=e=>2**z(e),Nr=(e,t)=>Xr(e,`scaleUpNoDoubling`)||Zr(e,`singleInstance`)===t?1:Mr(e.scaleUpTierCounts?.[t]??e.scaleUpCount??0)**$r(e,`scaleUpPower`,1),Pr=e=>Math.min(z(e.scaleUpTargetTierIndex??0),ni(e)-1),Fr=e=>b[Pr(e)],Ir=e=>3*(Math.max(0,z(e.scaleUpCount??0)-(ni(e)-1))+1),Lr=e=>{let t=zr(e);return t===null?5:t+Rr(e)},Rr=e=>{let t=be.filter(t=>t.group===`overclockStep`&&br(e,t.id)).length;return Math.max(1,4-t)},zr=e=>{let t=e.overclockLastClaimCompletedLevels??(z(e.overclockCount??0)>0?e.overclockCount:null);return t==null?null:z(t)},Br=e=>(1+lt)**z(e),Vr=e=>at[e],Hr=e=>({...Mt().autoPurgeSettings,...e.autoPurgeSettings??{}}),Ur=e=>{let t=Hr(e);if(t.minSeconds>0&&z(e.purge?.cycleSeconds??0)<t.minSeconds-Dt)return!1;if(!Kr(e))return!0;let n=Pi(e.resources[O],e.prestigeDoublePpLevel??0,!0);if(t.targetPpExponent>0&&n<10**t.targetPpExponent)return!1;let r=z(e.purge?.highestAward??0);return!(t.bestMultiplier>0&&r>0&&n<t.bestMultiplier*r)},Wr=(e,t)=>n=>{if(!(e===`targetPpExponent`?Number.isInteger(t)&&t>=0&&t<=100:e===`minSeconds`?bt.includes(t):e===`bestMultiplier`&&xt.includes(t)))return n;let r=Hr(n);return r[e]===t?n:{...n,autoPurgeSettings:{...r,[e]:t}}},Gr=e=>1/jd(e,`purge`),Kr=e=>!!e.purge?.unboundedUnlocked||(e.autoPurge??null)!==null&&jd(e,`purge`)<=1,qr=e=>!!se[e]&&ce.has(e),Jr=e=>{let t=e.challenges?.active;return t&&qr(t)?se[t]:null},Yr=(e,t)=>!!e.challenges?.completed?.[t],Xr=(e,t)=>Jr(e)?.effect===t,Zr=(e,t)=>{let n=Jr(e);return n?.effect===t?n.automation.key:null},Qr=(e,t)=>({balance:Math.max(e.balance??0,z(t.resources?.[O])),clock:Math.max(e.clock??0,t.globalTickspeedMultiplier??0),owned:Object.fromEntries(b.map(n=>[n.id,Math.max(e.owned?.[n.id]??0,t.owned?.[n.id]??0)])),purchaseLevels:Object.fromEntries(b.map(n=>[n.id,Math.max(e.purchaseLevels?.[n.id]??1,t.purchaseLevels?.[n.id]??1)]))}),$r=(e,t,n)=>Jr(e)?.levers?.[t]??e.runLevers?.[t]??n,ei=(e,t)=>(Zr(e,`halfDuplex`)===t?ne:1)*$r(e,`production`,1),ti=(e,t)=>{let n=x[t];if(!n)return n;let r=(Zr(e,`premiumTier`)===t?P:1)*$r(e,`costMultiplier`,1);return r===1?n:{...n,baseCost:n.baseCost*r}},ni=e=>Xr(e,`addressSpace`)?6:b.length,ri=e=>b[ni(e)-1],ii=e=>Math.floor(z(e.challenges?.activeSeconds)/30+1e-9)%2==0,ai=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(!Jr(e))return n;if(Zr(e,`clockGated`)===t||Zr(e,`dutyCycle`)===t&&!ii(e))return 1;if(Zr(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];return Math.min(n,e.tickspeedLevels?.[r.id]??1)}return n},oi=e=>{if(!Xr(e,`bitRot`))return 0;let t=z(e.challenges?.run?.cycleSeconds)-120;return t<=0?0:Math.min(F,ie*2**(t/30))/10**(la(e.intro)-1)},si=e=>Jr(e)?.goal??8e100,ci=(e,{kind:t,key:n})=>t===`tierAutobuyer`?e.autobuyerIntervalLevels?.[n]??0:t===`tierTickspeed`?e.tierTickspeedIntervalLevels?.[n]??0:e.automationIntervalLevels?.[n]??0,li=e=>{let{kind:t,key:n}=e.automation;return 5*(t===`tierAutobuyer`?en(n):t===`tierTickspeed`?tn(n):Vr(n))},ui=(e,t)=>{let n=se[t];if(!n)return!1;if(e.challenges?.completed?.[t]||e.challenges?.active===t)return!0;let{kind:r,key:i}=n.automation;return(r===`tierAutobuyer`?e.autobuyers?.[i]!=null:r===`tierTickspeed`?!!e.tierTickspeedAutobuyer?.[i]:Nd(e,i))&&z(e.purge?.count??0)>=li(n)},di=(e,t)=>N.find(n=>n.automation.kind===e&&n.automation.key===t&&qr(n.id))??null,fi=(e,t,n)=>{let r=di(t,n);return!!r&&!Yr(e,r.id)},pi=e=>{let t=e.challenges?.completed??{},n=N.filter(n=>qr(n.id)&&!t[n.id]&&ci(e,n.automation)>0).map(e=>e.id);return n.length===0?e:{...e,challenges:{...Mt().challenges,...e.challenges,completed:{...t,...Object.fromEntries(n.map(e=>[e,!0]))}}}},mi=e=>t=>{if(!Jr(t))return t;let n=t.challenges.run??Et();return{...t,challenges:{...t.challenges,activeSeconds:z(t.challenges.activeSeconds)+e,run:{...n,cycleSeconds:z(n.cycleSeconds)+e}}}},hi=(e,t)=>({...e,challenges:{...e.challenges,run:{...e.challenges.run??Et(),...t}}}),gi=(e,t,n)=>{if(n===t)return n;let r=n;if(Zr(n,`cascadeDelete`)===e){let t=S[e],n={...r.owned},i={...r.resources};b.slice(0,t).forEach(e=>{n[e.id]=0,i[e.id]=0}),r={...r,owned:n,resources:i}}return Zr(n,`writeLock`)===e&&(r=hi(r,{haltSeconds:10})),r},_i={hardRefresh:{interval:300,apply:(e,t)=>hi({...e,owned:{...e.owned,[t]:0},resources:{...e.resources,[t]:0}},{refreshes:(e.challenges.run?.refreshes??0)+1})},clockDrift:{interval:600,apply:(e,t)=>({...e,tickspeedLevels:{...e.tickspeedLevels,[t]:Math.max(1,(e.tickspeedLevels?.[t]??1)-1)}})},dutyCycle:{interval:30,apply:e=>e}},vi=(e,t)=>{let n=t,r=Zr(n,`memoryLeak`);if(r){let t=n.owned[r]??0,i=t*(1-(1-re)**e)+(n.challenges.run?.leakRemainder??0),a=Math.min(t,Math.floor(i));n=hi({...n,owned:{...n.owned,[r]:t-a},resources:{...n.resources,[r]:Math.max(0,(n.resources[r]??0)-a)}},{leakRemainder:i-Math.floor(i)})}if(Xr(n,`bitRot`)&&oi(n)>z(n.resources.base)){let e=ef(n,!1);n={...e,challenges:{...e.challenges,run:{...Et(),refreshes:0},bitRotLosses:(e.challenges.bitRotLosses??0)+1}}}return n},yi=(e,t,n)=>{let r=n,i=e;for(let e=0;i>1e-12&&e<2e4;e++){let e=Jr(r);if(!e)return Bi(i,t,0)(r);let n=_i[e.effect],a=z(r.challenges.activeSeconds),o=e.effect===`bitRot`?Math.min(i,1):i,s=!1;if(n){let e=(Math.floor(a/n.interval+1e-9)+1)*n.interval-a;e<=o+1e-9&&(o=Math.max(e,1e-9),s=!0)}let c=z(r.challenges.run?.haltSeconds),l=c>0?hi(r,{haltSeconds:Math.max(0,c-o)}):r,u=(e=>Jr(e)?mi(o)(e):e)(Bi(o,t,c)(l)),d=!Jr(u)&&u.challenges.completed?.[e.id]?{...u,challenges:{...u.challenges,bestSeconds:{...u.challenges.bestSeconds,[e.id]:Math.min(r.challenges.bestSeconds?.[e.id]??1/0,a+o)}}}:u;r=Jr(d)?vi(o,d):d,s&&Jr(r)&&(r=n.apply(r,e.automation.key)),i-=o}return r},bi=e=>!Kr(e)&&z(e.resources.base)>=si(e),xi=e=>t=>{let n=S[t.id]??-1;if(n>=ni(e))return!1;if(n===0||(e.owned[t.id]??0)>0||(e.purchaseLevels?.[t.id]??1)>1)return!0;if(!e.everUnlockedTierIds?.[t.id])return!1;let r=b[n-1];return(e.purchaseLevels?.[r.id]??1)>=3},Si=e=>Ci(z(e)/8),Ci=e=>{let t=z(e);return t<1?0:Math.floor(Math.log10(t))},wi=(e,t=A)=>{let n=t===8e100?Math.floor(Math.log10(k)):Math.round(Math.log10(t/8)),r=Ci(e)/n*100;return Math.min(100,Math.max(0,Math.round(r)))},Ti=e=>{let t=z(e);if(t<=0)return 0;let n=t/8,r=10**(Math.floor(Math.log10(n))+1);return!Number.isFinite(r)||r<=0?0:Math.min(1,n/r)},Ei=e=>Xr(e,`clockSpeedDisabled`)?1:ln(e.globalTickspeedMultiplier??null,zr(e)??0)**$r(e,`clockSpeedPower`,1),Di=e=>Xr(e,`clockSpeedDisabled`)?0:(1+ct*Br(zr(e)??0))**$r(e,`clockSpeedPower`,1)-1,Oi=e=>Xr(e,`scaleUpNoDoubling`)?1:2**$r(e,`scaleUpPower`,1),ki=(e,t)=>{let n=rn(ai(e,t),Zr(e,`halfStep`)===t?ae:tt)*(t===ri(e).id?dn(e.lastTierXpConsumed??0):1),r=Ei(e),i=Zr(e,`noisyNeighbour`),a=(Zr(e,`clockSkew`)===t?2:1)*(i&&i!==t?(1+oe)**Math.max(0,(e.tickspeedLevels?.[i]??1)-1):1),o=D(t)*a/(n*r);return Number.isFinite(o)&&o>0?o:Ot},Ai=()=>Math.log2(64),ji=(e=0)=>{let t=z(e);return 64/2**Math.min(t,Ai())},Mi=(e=0)=>{let t=z(e),n=Ai();return t>n?2**(t-n):1},Ni=(e=0)=>10**(z(e)+1),Pi=(e,t=0,n=!1)=>{let r=z(e);if(r<8e100)return 0;let i=Math.floor(Math.log10(k)),a=n?Math.max(i,Ci(r/8)):i,o=ji(t),s=Mi(t);return Math.floor(a/o)*s},Fi=(e,t)=>{let n=Si(z(e[O]));return n<=0||n<=t.highestMilestone?t:{...t,xp:t.xp+(n-t.highestMilestone),highestMilestone:n}},Ii=200,Li=(e,t,n,r,i)=>{let a=e,o=r+t/n,s=0;for(;o>=.999999999&&s<Ii;){let e=i(a);if(e===a){o=Math.min(o,1);break}a=e,--o,s+=1}return s>=Ii&&(o=Math.min(o,1)),{state:a,budget:o}},Ri=(e,t,n,r)=>{let{state:i,budget:a}=Li(e,t,jd(e,n),e.automationAttemptBudgets?.[n]??0,r);return{...i,automationAttemptBudgets:{...i.automationAttemptBudgets,[n]:a}}},zi=`unit`,Bi=(e,t=1,n=0)=>r=>{let i=$o(r),a=ao(e)(i),o=po(js(e)(Co(e)(Eo(e)(es(e)(a))))),s=ic(e)(o),c=Qs(e)(s),l=Yd(ic(0)(c)),u=Bu.reduce((t,n)=>n(e)(t),l),d=al(e)(u),f=ts(cd(e)(d)),p=bl(jl(e,f)(oo(e)(f))),m=Dl(e)(p),h=er(ir(e)(Bn(e)(m))),g=(h.autoPurge??null)!==null&&(h.autoPurgeEnabled??!0),_=t=>{let n=pc(dc(t)),r=Es(e)(ks(e)(n));return r===t?t:ic(0)(r)};if(bi(h)){if(!g)return _(h);let t=(h.autoPurgeAttemptBudget??0)+Gr(h)*e;return t>=.999999999&&Ur(h)?_(_f(h)):_({...h,autoPurgeAttemptBudget:t})}let v=pn(h.purge.count,!!h.prestigeSpeedBonusUnlocked)*gn(h)*Dr(h),y=[...b].sort((e,t)=>Number((h.owned?.[e.id]??0)>0)-Number((h.owned?.[t.id]??0)>0)).reduce((n,r)=>{if((n.autobuyers[r.id]??null)===null||!xi(n)(r)||!(n.autobuyersEnabled?.[r.id]??!0))return n;let i=n,a=(n.autobuyerAttemptBudgets[r.id]??0)+e/xd(n,r.id);for(;a>=.999999999&&!(Math.floor(a+Dt)<=0);){let e=i.purchaseLevelProgress?.[r.id]??0;if(t===`unit`){let e=Zi(r.id,1)(i);if(e===i)break;i=e,--a;continue}let n=Cd(i,r.id);if(n>1&&e===0){let e=oa(r.id,n)(i);if(e!==i){i=e,--a;continue}}if(!na(i,r))break;let o=Zi(r.id,2**53-1)(i);if(o===i)break;i=o,--a}return{...i,autobuyerAttemptBudgets:{...i.autobuyerAttemptBudgets,[r.id]:a}}},h),C={...y.resources},w={...y.owned},T={...y.tierProductionAccumulators},E=Math.max(n,z(y.challenges?.run?.haltSeconds)),D=Math.max(0,e-E),k=E>0&&D<=0;b.forEach(e=>{if(!xi(y)(e)||k)return;let t=ki(y,e.id),n=(T[e.id]??0)+D,r=Math.floor((n+Dt)/t);if(T[e.id]=n-r*t,r<=0)return;let i=Zr(y,`flatRate`)===e.id?1:jr(y.purchaseLevels?.[e.id]??1,Ar(y)),a=ei(y,e.id),o=Xu(y.intro,S[e.id]+1),s=Rn(y,e.id),c=Nr(y,e.id),l=Math.floor((y.owned[e.id]??0)*r*v*c*i*a*o*s);e.producesResourceId===`bytes`?l>0&&(C[O]=z((C.base??0)+l*8)):C[e.producesResourceId]=z((C[e.producesResourceId]??0)+l),b.some(t=>t.id===e.producesResourceId)&&(w[e.producesResourceId]=z((w[e.producesResourceId]??0)+l))});let A=y.lastTierLevelCreditTimer??0,ee=x[Tt()],j=Math.max(0,(y.purchaseLevels?.[ee.id]??1)-1);if(j>0&&br(y,`quettaSpent`)&&xi(y)(ee)&&!k){let e=yr(j);A+=D;let t=Math.floor(A/e+Dt);t>0&&(A=Math.max(0,A-t*e),C[ee.id]=z((C[ee.id]??0)+t),w[ee.id]=z((w[ee.id]??0)+t))}let te={...y,lastTierLevelCreditTimer:A,resources:C,owned:w,tierProductionAccumulators:T,purge:Fi(C,y.purge),...g?{autoPurgeAttemptBudget:(y.autoPurgeAttemptBudget??0)+Gr(y)*e}:{}},M=te.runPeaks?Qr(te.runPeaks,te):null,N=Kr(te)&&z(te.resources.base)>=8e100?cr(te,`overflowPurges`,1,`max`):te;Kr(N)&&g&&z(N.resources.base)>=si(N)&&(N.autoPurgeAttemptBudget??0)>=.999999999&&Ur(N)&&(N=_f(N));let ne=N.autoOverclock&&(N.autoOverclockEnabled??!0)?Ri(N,e,`overclock`,sf):N,P=ne.autoScaleUp&&(ne.autoScaleUpEnabled??!0)?Ri(ne,e,`scaleUp`,of):ne,re=P.autoXpTickspeed&&(P.autoXpTickspeedEnabled??!0)?Ri(P,e,`restage`,e=>mf(e.purge.xp)(e)):P,ie=M?{...re,runPeaks:M}:re,F=b.reduce((t,n)=>{if(!t.tierTickspeedAutobuyer?.[n.id]||!(t.tierTickspeedAutobuyerEnabled?.[n.id]??!0))return t;let{state:r,budget:i}=Li(t,e,Ld(t,n.id),t.tierTickspeedAttemptBudgets?.[n.id]??0,e=>_d(n.id)(e));return{...r,tierTickspeedAttemptBudgets:{...r.tierTickspeedAttemptBudgets,[n.id]:i}}},ie);return _(F.autoGlobalTickspeed&&(F.autoGlobalTickspeedEnabled??!0)?Ri(F,e,`speedUp`,Wd):F)},Vi=(e,t)=>{if(!le.enabled||e<=0||br(t,`remindMeLater`))return t;let n=!Jr(t)&&z(t.resources?.base)>=8e100,r=t.achievements?.counters?.purgeWaitSeconds??0;return n?cr(t,`purgeWaitSeconds`,Math.min(60,r+e),`set`):r===0?t:cr(t,`purgeWaitSeconds`,0,`set`)},Hi=(e,t=1)=>n=>{let r=Sr(Vi(e,Jr(n)&&e>0?yi(e,t,n):Bi(e,t,0)(n)));return r===n||e<=0||r.purge?.count!==n.purge?.count?r:{...r,purge:{...r.purge,cycleSeconds:z(r.purge.cycleSeconds??0)+e}}},Ui=(e,t=qe)=>{let n=Math.min(z(e),t,qe);return Math.floor(n*(n>600?Ke:1))},Wi=(e,t=1)=>n=>{let r=Ui(e,Cn(n)),i=n;for(let e=0;e<r;e++)i=Hi(1,t)(i);return i},Gi=(e,t=qe)=>Math.floor(Math.min(z(e),t,qe))-Ui(e,t),Ki=(e,t=1,n)=>r=>{let i=Gi(e,n??Cn(r)),a=r;for(let e=0;e<i;e++)a=Hi(1,t)(a);return a},qi=e=>{let t=Math.max(0,Math.floor(z(e))),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},Ji=(e,t)=>e.resources[t.costResourceId]??0,Yi=(e,t)=>e.purchased?.[t]??0,Xi=(e,t)=>n=>{if(bi(n))return n;let r=ti(n,e);if(!r||!xi(n)(r))return n;let i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=Gt(n),s=Xt(r,i,o,a,Ji(n,r),t);if(s<=0)return n;let c=qt(r,i)*s,l=Yi(n,e)+s,u=a+s,d=u>=o;return{...n,resources:{...n.resources,[r.costResourceId]:z((n.resources[r.costResourceId]??0)-c),[e]:(n.resources[e]??0)+s},owned:{...n.owned,[e]:(n.owned[e]??0)+s},purchased:{...n.purchased,[e]:l},purchaseLevels:{...n.purchaseLevels,[e]:d?i+1:i},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:d?0:u}}},Zi=(e,t)=>n=>gi(e,n,Xi(e,t)(n)),Qi=e=>!!e.buyMaxUnlocked||br(e,`buyMaxRush`),$i=e=>z(e.purge?.count??0)>=1||z(e.era?.count??0)>=1||Fe.some(t=>!!e.intro?.[t.autoFlagField]),ea=e=>$i(e)||Qi(e),ta=e=>t=>{let n=t;for(let t=0;t<Qe;t++){let t=e(n);if(t===n)break;n=t}return n},na=(e,t)=>{let n=ti(e,t.id)??t,r=e.purchaseLevels?.[n.id]??1,i=Gt(e),a=e.purchaseLevelProgress?.[n.id]??0;return Xt(n,r,i,a,Ji(e,n),i)>=i-a},H=(e,t)=>{let n=ti(e,t.id)??t;if((e.purchaseLevelProgress?.[n.id]??0)>0)return!1;let r=e.purchaseLevels?.[n.id]??1,i=Gt(e);return Xt(n,r,i,0,Ji(e,n),i)>=i},ra=e=>t=>{if(bi(t))return t;let n=ti(t,e);if(!n||!xi(t)(n))return t;if(!H(t,n))return Zi(e,2**53-1)(t);let r=t;for(let t=0;t<1024&&H(r,n);t++){let t=Zi(e,2**53-1)(r);if(t===r)break;r=t}return r},ia=e=>t=>gi(e,t,ra(e)(t)),aa=(e,t)=>n=>{if(bi(n))return n;let r=ti(n,e);if(!r||!xi(n)(r))return n;let i=n;for(let n=0;n<Math.min(t,Qe)&&H(i,r);n++){let t=Zi(e,2**53-1)(i);if(t===i)break;i=t}return i},oa=(e,t)=>n=>gi(e,n,aa(e,t)(n)),sa=(e,t)=>{let n=ti(e,t);if(bi(e)||!n||!xi(e)(n)||!H(e,n))return{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0};let r=e,i=e;for(let e=0;e<1024&&H(r,n);e++){let e=Zi(t,2**53-1)(r);if(e===r)break;i=r,r=e}let a=Gt(r),o=r.purchaseLevels?.[t]??1,s=Math.min(a-1,Xt(n,o,a,0,Ji(r,n),a));return{levels:(r.purchaseLevels?.[t]??1)-(e.purchaseLevels?.[t]??1),cost:Ji(e,n)-Ji(r,n),lastLevelCost:Ji(i,n)-Ji(r,n),partialQuantity:s,partialCost:s>0?Yt(n,o,a,0,s):0}},ca=(e,t)=>n=>{if(!x[e]||t<=0)return n;let r=Gt(n),i=n.purchaseLevels?.[e]??1,a=n.purchaseLevelProgress?.[e]??0,o=Yi(n,e),s=a+t,c=Math.floor(s/r),l=s%r,u=i+c,d=o+t;return{...n,resources:{...n.resources,[e]:(n.resources[e]??0)+t},owned:{...n.owned,[e]:(n.owned[e]??0)+t},purchased:{...n.purchased,[e]:d},purchaseLevels:{...n.purchaseLevels,[e]:u},purchaseLevelProgress:{...n.purchaseLevelProgress,[e]:l}}},la=e=>{let t=Math.floor(Number(e?.unlockedDiskSteps));return Math.min(10*ze.length,Number.isFinite(t)&&t>=1?t:1)},ua=e=>{let t=la(e),n=Math.floor((t-1)/ze.length),r=t-1-n,i=0;for(let n=1;n<=10;n+=1){let r=Math.min(ze.length-1,Math.max(0,t-1-(n-1)*ze.length)),a=Number(e?.poolExponentBonuses?.[n]);i+=Math.min(r,Number.isFinite(a)?Math.min(2,Math.max(0,Math.floor(a))):0)}let a=ke,o=1-pr(e,(1-a)**2);return 1-(1-Oe)*a**(n+i)*o**(r-i)},da=(e,t=Oe)=>{let n=e/8;return!Number.isFinite(n)||n<=0?0:n**t},fa=e=>he.slice(0,fr(e)).some(e=>e.syncedBitrate),pa=e=>fa(e)?e.capacity??0:e.speedCapacity??e.capacity??0,ma=e=>da(pa(e),ua(e))*8,ha=e=>{let t=Math.min(1,Math.max(0,e)),n=Math.log10(je);return 10**(n-t*(n-Math.log10(10)))},ga=Math.log(je/100),_a=Math.log(je/10),va=(e,t,n,r)=>{if(!(n>0)||!(r>0))return null;let i=Math.max(0,e),a=Math.min(n,t);if(a<=i)return null;let o=i/n,s=a/n;return n/r*Math.exp(-ga)*(Math.exp(_a*s)-Math.exp(_a*o))/_a},ya=(e,t,n,r)=>{if(!(t>0)||!(n>0)||!(r>0))return 0;let i=Math.max(0,e);if(i>=t)return 0;let a=i/t,o=Math.exp(_a*a)+_a*n/t*Math.exp(ga)*r,s=t/_a*Math.log(o);return Math.min(t,s)-i},ba=e=>e.capacity>0?Math.min(1,e.bits/e.capacity):0,xa=e=>ha(ba(e)),Sa=e=>xa(e),Ca=e=>1+(e?.dataStreamTapBonusPercent??0)/100,wa=e=>Sa(e)/100,Ta=e=>ma(e)*Yu(e)*wa(e),Ea=100,Da=e=>{let t=!!e?.speedUpgradeQueued;if(!t&&!e?.capacityUpgradeQueued)return null;let n=t?yo(e):e.capacity,r=t?e.speedUpgradeProgress:e.capacityUpgradeProgress,i=Number.isFinite(r)&&r>0?r:0,a=Ca(e),o=Ea*a,s=ma(e)*a;return{kind:t?`speed`:`capacity`,cost:n,progress:i,multiplierPercent:o,rate:s}},Oa=e=>{if(jo(e)){let t=e.intro.dataStreamTapBonusPercent??0;return t>=100?e:{...e,intro:{...e.intro,dataStreamTapBonusPercent:Math.min(100,t+5)}}}if(e.intro.bits>=e.intro.capacity)return e;let t=Math.max(1,Math.floor(ma(e.intro)));return{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+t)}}},ka=e=>{let t=Oa(e);if(!le.enabled||t===e)return t;let n=t.achievements??Mt().achievements,r=Sr({...t,achievements:{...n,counters:{...n.counters,pings:(n.counters?.pings??0)+1}}});return lr(r)?cr(r,`automatedPings`,1,`max`):r},Aa=e=>e.intro.byteCreated||e.intro.bits<8?e:{...e,intro:{...e.intro,bits:e.intro.bits-8,byteCreated:!0,capacityUpgradeQueued:!1}},ja=()=>10,Ma=e=>{let t=mc(e);return t?Math.ceil(t/ze.length):null},Na=(e,t)=>{if(!Number.isInteger(t)||t<1||t>ja())return!1;let n=(t-1)*ze.length+1;return ze.every((t,r)=>{let i=ns(n+r);return(e.intro?.disksBuiltTotal?.[i]??0)>=9})},Pa=e=>{let t=(e-1)*ze.length+1;return ze.map((e,n)=>ns(t+n))},Fa=(e,t)=>Object.keys(e.intro?.dataLakes??{}).some(n=>{let r=Number(n);return r<t&&!!W(e,r)?.rebuilding}),Ia=(e,t)=>!!W(e,t)?.rebuilding,La=(e,t)=>!Number.isInteger(t)||t<1||t>ja()?!1:t===1||Na(e,t-1),Ra=e=>{let t=0;for(let n=1;n<=ja()&&La(e,n);n+=1)t=n;return t},za=e=>8*we**e,Ba=e=>{let t=1;for(let n=2;n<=ja()&&!((e.intro?.capacity??0)<za(n));n+=1)t=n;return t},Va=[1,2,4,8,16,32,64,125,250,500],Ha=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return Va[t%10]*1e3**Math.floor(t/10)*8},Ua=Math.log10(2),Wa=e=>{if(!Number.isFinite(e))return 0;if(e<8)return Math.max(0,e);let t=Math.max(0,Math.round(Math.log2(e/8)));return 10**Math.floor(t*Ua)*8},Ga=(e,t)=>{if(!Number.isInteger(t)||t<1||t>Ba(e))return 0;let n=(Ja(e,t)/8)**ua(e.intro),r=ma(e.intro??{})/8,i=Ha(Math.min(r,n)*8),a=Math.max(0,W(e,t)?.bandwidthSteps??0);if(a===0)return i;let o=i;for(let e=0;e<a;e+=1)o=Ha(o*Math.SQRT2);if(t>=ja())return o;let s=Ga(e,t+1);return Math.max(i,Math.min(o,s/2))},Ka=(e,t)=>{let n=Ga(e,t);if(n>0)return n;let r=Math.max(e.intro?.capacity??0,za(t)),i=Math.max(e.intro?.speedCapacity??e.intro?.capacity??0,r/2),a=Ga({...e,intro:{...e.intro,capacity:r,speedCapacity:i}},t);return a>0?a:Ha(ma(e.intro??{}))},qa=(e,t)=>{let n=Wa(e??0),r=t===1?De(1).startBits:De(t-1).endBits,i=De(t).endBits;return Math.min(Math.max(n,r),i)},Ja=(e,t)=>!Number.isInteger(t)||t<1||t>Ba(e)?0:qa(e.intro?.capacity??0,t),Ya=(e,t)=>Ja(e,t),Xa=(e,t)=>t<=Ba(e)?Ya(e,t):qa(za(t),t),Za=(e,t)=>e.intro?.poolBuffers?.[t]??0,Qa=(e,t)=>{let n=Ya(e,t);return n>0?Math.min(1,Za(e,t)/n):0},$a=(e,t)=>ha(Qa(e,t)),eo=(e,t)=>e.intro?.poolTapBonusPercents?.[t]??0,to=(e,t)=>$a(e,t),no=(e,t)=>1+eo(e,t)/100,ro=(e,t)=>{let n=ma(e.intro??{});for(let r=1;r<t;r+=1)n=Math.max(0,n-Ga(e,r));return Math.min(Ga(e,t),n)},io=e=>t=>{if(!Number.isInteger(e)||e<1||e>Ba(t))return t;let n=eo(t,e);return n>=100?t:{...t,intro:{...t.intro,poolTapBonusPercents:{...t.intro.poolTapBonusPercents??{},[e]:Math.min(100,n+5)}}}},ao=e=>t=>{let n=1*e,r=t.intro.dataStreamTapBonusPercent??0,i=n>0?Math.max(0,r-n):r,a=Math.min(i,100),o=t.intro.poolTapBonusPercents??{},s=!1,c={};return Object.keys(o).forEach(e=>{let t=o[e],r=n>0?Math.max(0,t-n):t,i=Math.min(r,100);i!==t&&(s=!0),c[e]=i}),a===r&&!s?t:{...t,intro:{...t.intro,dataStreamTapBonusPercent:a,poolTapBonusPercents:c}}},oo=e=>t=>{if(!jo(t))return t;let n=Ba(t);if(n<1)return t;let r=t.intro.bits,i={...t.intro.poolBuffers??{}},a={...t.intro.dataLakes},o=!1;for(let s=1;s<=n;s+=1){let n=ro(t,s);if(n<=0||r<=0)continue;let c=i[s]??0,l=Ya(t,s),u=Math.max(0,l-c),d=n*Qu(t.intro,s),f=e;if(u>0){let t=ya(c,l,d,e),n=Math.min(t,u,r);if(n>0&&(r-=n,i[s]=c+n,o=!0),n<u||r<=0)continue;let a=va(c,l,l,d)??e;f=Math.max(0,e-a)}if(f<=0||!Kc(t,s)||!Na(t,s)||Al(t,s))continue;let{lake:p,remainingBits:m,changed:h}=Tl(t,s,n*Gc(t,s),f,r);h&&(a[s]=p,r=m,o=!0)}return o?{...t,intro:{...t.intro,bits:r,poolBuffers:i,dataLakes:a}}:t},so=e=>{if(!e?.intro)return e;let t=!!e.intro.capacityUpgradeQueued&&(!e.intro.byteCreated||ho(e)),n=!!e.intro.speedUpgradeQueued&&(!e.intro.byteCreated||e.intro.capacityUpgradeQueued),r=t||n,i={...e.intro};t&&Object.assign(i,{capacityUpgradeQueued:!1,capacityUpgradeProgress:0}),n&&Object.assign(i,{speedUpgradeQueued:!1,speedUpgradeProgress:0});let a=Math.max(0,i.capacity??8);a!==i.capacity&&(r=!0,i.capacity=a);let o=1;for(let[e,t]of Object.entries(i.disksBuiltTotal??{}))t>0&&(o=Math.max(o,mc(Number(e))??1));for(let[e,t]of Object.entries(i.diskProvisionPasses??{}))t>0&&(o=Math.max(o,mc(Number(e))??1));i.diskBuild?.size>0&&(o=Math.max(o,mc(i.diskBuild.size)??1)),o>la(i)&&(r=!0,i.unlockedDiskSteps=o);let s={...i.poolExponentBonuses??{}};for(let t=1;t<=10;t+=1){let n=Number(i.dataLakes?.[t]?.resetCount),a=e.achievements?.earned??{},o=`pool${String(t).padStart(2,`0`)}Reset`,c=a[`${o}II`]?2:+!!a[`${o}I`],l=Number(s[t]),u=Number.isFinite(l)?Math.min(2,Math.max(0,Math.floor(l))):0,d=Math.max(u,Number.isFinite(n)?Math.min(2,Math.max(0,Math.floor(n))):0,c);d>u&&(s[t]=d,r=!0)}r&&(i.poolExponentBonuses=s);let c={...e,intro:i};if(i.poolBuffers){let e={...i.poolBuffers},t=!1;for(let n of Object.keys(e)){let r=Number(n);if(!Number.isInteger(r)||r<1||r>ja())continue;let i=e[r]??0,a=Xa(c,r),o=Math.min(Math.max(i,0),a);o!==i&&(e[r]=o,t=!0)}t&&(r=!0,i.poolBuffers=e)}if(i.diskProvisionPasses){let t=i.disksBuiltTotal??{},n={...i.diskProvisionPasses},a={...i.poolBuffers??{}},o=!1,s=!1;for(let r of Object.keys(n)){let c=Number(r),l=n[r]??0;if(!(l>0)||(t[c]??0)<9)continue;let u=Ma(c);if(u){let t=Xa({...e,intro:{...i,poolBuffers:a}},u),n=a[u]??0,r=Math.min(t,n+l*c);r!==n&&(a[u]=r,s=!0)}delete n[r],o=!0}o&&(r=!0,i.diskProvisionPasses=n),s&&(r=!0,i.poolBuffers=a)}if(i.dataLakes){let e={...i.dataLakes},t=!1;for(let n of Object.keys(e)){let r=e[n];if(!r)continue;let i=r.capacityLevel??0,a=Math.min(Math.max(Math.trunc(i)||0,0),3),o=Number(n);if(!(o>=1&&o<=10))continue;let s=Cl(o),c=Math.max(Sc(xc(a,r.resetCount??0)),Math.min(Math.max(Math.trunc(Number(r.depositedUnits))||0,0),Ge[a]+1e3*Math.max(0,Math.trunc(Number(r.resetCount))||0)-1)),l=Math.max(Math.trunc(Number(r.depositedUnits))||0,0),u=Math.max(Number(r.fillBits)||0,0);if(l>c&&(u+=(l-c)*s,l=c),u>s){let e=Math.min(Math.floor(u/s+1e-9),c-l);l+=e,u=Math.min(s,u-e*s)}let d=r.lakeTransfer??null;if(d){let e=Number(d.target),t=Number(d.movedBits);d=He.includes(e)&&Number.isFinite(t)?{target:e,movedBits:Math.min(Math.max(t,0),e*s)}:null}let f=JSON.stringify(d)===JSON.stringify(r.lakeTransfer??null);a===i&&l===(r.depositedUnits??0)&&u===(r.fillBits??0)&&f||(e[n]={...r,capacityLevel:a,depositedUnits:l,fillBits:u,lakeTransfer:d},t=!0)}t&&(r=!0,i.dataLakes=e)}if(!i.diskBuild&&!i.diskBuildQueued){let t={...e,intro:i},n=us(t),a=ps(t,n),o=ds(t,n),s=Jd(t,n);a>0&&a<o&&s>0&&(r=!0,i.diskBuildQueued=!0,i.diskBuildQueuedByReplay=Number.isFinite(s))}let l=Math.min(Math.max(i.dataStreamTapBonusPercent??0,0),100);if(l!==i.dataStreamTapBonusPercent&&(r=!0,i.dataStreamTapBonusPercent=l),i.poolTapBonusPercents){let e={...i.poolTapBonusPercents},t=!1;for(let n of Object.keys(e)){let r=e[n],i=Math.min(Math.max(r??0,0),100);i!==r&&(e[n]=i,t=!0)}t&&(r=!0,i.poolTapBonusPercents=e)}return r?{...e,intro:i}:e},co=(e,t)=>{if((e.intro?.disks?.[t]??0)<=0||e.intro?.diskBuild?.size===t)return!1;let n=oc(e,t);return!n||S[n.id]>=ni(e)?!1:(e.purchaseLevelProgress?.[n.id]??0)===0},lo=e=>Object.keys(e.intro?.disks??{}).map(Number).some(t=>co(e,t)),uo=(e,t)=>{if(!t||t>Ba(e))return 0;let n=Cl(t),r=e.intro?.diskCache?.[n]??0;return Math.max(0,n-r)},fo=e=>{if(e.intro.diskBuild||os(e)||ls(e))return!1;let t=us(e);if(ps(e,t)>=ds(e,t))return!0;let n=Ma(t);return Ia(e,n)||Fa(e,n)?!1:Ga(e,n)>0&&Ya(e,n)>=t},po=e=>{if(!(e.intro?.poolResetRebuildingCount>0))return e;let t=e;for(let e=1;e<=ja();e+=1){let n=W(t,e);if(!n?.rebuilding)continue;let r=Pa(e).find(e=>(t.intro.disksBuiltTotal?.[e]??0)<9);if(!r){t=pl(e,!1)({...t,intro:{...t.intro,poolResetRebuildingCount:Math.max(0,(t.intro.poolResetRebuildingCount??1)-1),dataLakes:{...t.intro.dataLakes,[e]:{...n,rebuilding:!1}}}});continue}if(Ya(t,e)<r)continue;let i=t.intro.disksBuiltTotal?.[r]??0,a=t.intro.disks?.[r]??0;i>0&&a<i||(t={...t,intro:{...t.intro,disksBuiltTotal:{...t.intro.disksBuiltTotal,[r]:i+1}}})}return t},mo=e=>e.intro.bits<e.intro.capacity||!e.intro.byteCreated&&e.intro.bits>=8?!1:!ho(e),ho=e=>{let t=ja(),{endBits:n}=De(t);return Ja(e,t)>=n},go=e=>mo(e),_o=e=>{let t=Ll(e)?ko(e):e,n=t.intro.capacity*2,r=fa(t.intro)?n:t.intro.speedCapacity??t.intro.capacity;return $o({...t,intro:{...t.intro,speedCapacity:r,capacity:n,capacityUpgradeQueued:!1,capacityUpgradeProgress:0}})},vo=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated?!1:!ho(e)},yo=e=>pa(e),bo=e=>{let t=e.intro??{};return t.capacityUpgradeQueued||t.speedUpgradeQueued||!t.byteCreated||fa(t)?!1:yo(t)*2<=t.capacity},xo=e=>bo(e)?{...e,intro:{...e.intro,speedUpgradeQueued:!0,speedUpgradeProgress:0}}:e,So=e=>{if(!e.intro?.speedUpgradeQueued||!fa(e.intro))return e;let t=Math.max(0,Number(e.intro.speedUpgradeProgress)||0);return{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+t),speedUpgradeQueued:!1,speedUpgradeProgress:0}}},Co=e=>t=>{if(!t.intro?.speedUpgradeQueued)return t;if(fa(t.intro))return So(t);let n=t.intro.speedUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=yo(t.intro),a=Math.min(t.intro.bits,ma(t.intro)*Ca(t.intro)*e,i-r),o={...t.intro,bits:t.intro.bits-a,speedUpgradeProgress:r+a};return o.speedUpgradeProgress>=i?{...t,intro:{...o,speedCapacity:(t.intro.speedCapacity??t.intro.capacity)*2,speedUpgradeQueued:!1,speedUpgradeProgress:0}}:{...t,intro:o}},wo=e=>To(e),To=e=>vo(e)?{...e,intro:{...e.intro,capacityUpgradeQueued:!0,capacityUpgradeProgress:0}}:e,Eo=e=>t=>{if(!t.intro?.capacityUpgradeQueued)return t;if(ho(t))return Do(t);let n=t.intro.capacityUpgradeProgress,r=Number.isFinite(n)&&n>0?n:0,i=Math.min(t.intro.bits,ma(t.intro)*Ca(t.intro)*e,t.intro.capacity-r),a={...t,intro:{...t.intro,bits:t.intro.bits-i,capacityUpgradeProgress:r+i}};return a.intro.capacityUpgradeProgress>=a.intro.capacity?_o(a):a},Do=e=>e.intro?.capacityUpgradeQueued??!1?{...e,intro:{...e.intro,bits:Math.min(e.intro.capacity,e.intro.bits+(e.intro.capacityUpgradeProgress??0)),capacityUpgradeQueued:!1,capacityUpgradeProgress:0}}:e,Oo=[`computeCoresMergeRemainingSeconds`,`computeNodesMergeRemainingSeconds`,`computeClustersMergeRemainingSeconds`,`computeNetworksMergeRemainingSeconds`,`computeGridsMergeRemainingSeconds`,`computeFabricsMergeRemainingSeconds`,`computeCloudsMergeRemainingSeconds`,`computeDatacentersMergeRemainingSeconds`,`computeSupercomputersMergeRemainingSeconds`],ko=e=>{let t=e.intro??{},n=!1,r={...t};for(let e of Re)(r[e]??0)!==0&&(r[e]=0,n=!0);for(let e of Oo)(r[e]??0)!==0&&(r[e]=0,n=!0);Object.keys(r.computeChargeSeconds??{}).length>0&&(r.computeChargeSeconds={},n=!0);let i=(r.computeBoostType??null)!==null||(r.computeBoostStacks??0)!==0||(r.computeBoostRemainingSeconds??0)!==0||r.computeBoostTierIndex!=null;return(Object.keys(r.computeBoosts??{}).length>0||i)&&(r.computeBoosts={},delete r.computeBoostType,delete r.computeBoostTierIndex,delete r.computeBoostStacks,delete r.computeBoostRemainingSeconds,n=!0),n?{...e,intro:r}:e},Ao=e=>(e.intro?.capacity??0)>=Ae,jo=e=>(e.intro?.capacity??0)>=Me,Mo=[`B`,...b.map(e=>e.symbol)],No=1e3,Po=[`b`,...Mo.slice(1).map(e=>e.replace(/B$/,`b`))],Fo=e=>{let t=1,n=0;for(;e/t>=No&&n<Po.length-1;)t*=No,n+=1;return{symbol:Po[n],divisor:t}},Io=e=>{let t=8,n=0;for(;e/t>=No&&n<Mo.length-1;)t*=No,n+=1;return{symbol:Mo[n],divisor:t}},Lo=[`B`,...b.map(e=>e.symbol.replace(/B$/,`iB`))],Ro=(e,t)=>{if(!t)return null;let n=8,r=0;for(;e/n>=1024&&r<Lo.length-1;)n*=we,r+=1;return{symbol:Lo[r],divisor:n}},zo=(e,t)=>Math.floor(e*10**t)/10**t,Bo=e=>{let t=Math.floor(e);return`${B(t)} bit${t===1?``:`s`}`},U=3,Vo=5,Ho=e=>e>=4?Vo:4,Uo=e=>{let t=e>=1?Math.floor(Math.log10(e))+1:1;return Math.min(U,Math.max(0,Ho(t)-t))},Wo=(e,t)=>{if(t){let n=e/t.divisor,r=zo(n,Uo(n));return r>0&&r<1?Bo(e):`${B(r)} ${t.symbol}`}return Bo(e)},Go=Array.from({length:4},(e,t)=>new Intl.NumberFormat(`en-US`,{minimumFractionDigits:t,maximumFractionDigits:t})),Ko=(e,t)=>{if(!t)return Bo(e);let n=e/t.divisor,r=Uo(n),i=zo(n,r);return i>0&&i<1?Bo(e):i===0?`${B(i)} ${t.symbol}`:`${Go[r].format(i)} ${t.symbol}`},qo=e=>{if(!(e>0))return`0`;let t=Math.min(1,10**(Math.floor(Math.log10(e))-2));return Number((Math.floor(e/t+1e-9)*t).toPrecision(12)).toLocaleString(`en-US`,{maximumFractionDigits:2})},Jo=e=>e.replace(/^[\d,]*\.?\d+/,e=>qo(Number(e.replace(/,/g,``)))),Yo=e=>Wo(e,Ro(e,!0)),Xo=e=>Wo(e,Io(e)),Zo=e=>qt(b[0],e.purchaseLevels?.[b[0].id]??1)*8,Qo=e=>{let t=Zo(e);if(e.intro.bits<t)return e;let n=b[0].id;return ca(n,1)({...e,intro:{...e.intro,bits:e.intro.bits-t}})},$o=e=>e.intro?.mainGameUnlocked||!jo(e)?e:{...e,intro:{...e.intro,mainGameUnlocked:!0}},es=e=>t=>{if(!t.intro.byteCreated)return t;let n=ma(t.intro)*Yu(t.intro),r=ya(t.intro.bits,t.intro.capacity,n,e);return r<=0?t:{...t,intro:{...t.intro,bits:Math.min(t.intro.capacity,t.intro.bits+r)}}},ts=e=>{let t=b[0].id,n=e.purchaseLevelProgress?.[t]??0,r=Jt(Gt(e),n,2**53-1),i=Zo(e),a=i>0?Math.floor(e.intro.bits/i):r,o=Math.min(r,a);if(o>0){let n=o*i;return ca(t,o)({...e,intro:{...e.intro,bits:e.intro.bits-n}})}return e},ns=e=>Ne*10**(Math.max(1,Number.isFinite(e)?Math.floor(e):1)-1),rs=e=>Ra(e)*ze.length,is=e=>Math.min(rs(e),la(e.intro)),as=e=>ns(la(e.intro)),os=e=>{let t=us(e);return t<as(e)&&!Ia(e,Ma(t))},ss=e=>e.intro?.diskBuild||!ls(e)?!1:la(e.intro)<rs(e),cs=e=>{if(!ss(e))return e;let t=la(e.intro)+1,n=yf(e);return{...n,intro:{...n.intro,unlockedDiskSteps:t}}},ls=e=>((e.intro?.disksBuiltTotal??{})[ns(is(e))]??0)>=9,us=e=>{let t=e.intro?.disksBuiltTotal??{},n=is(e),r=1,i=ns(r);for(;r<n&&(t[i]??0)>=9;)r+=1,i=ns(r);return i},ds=(e,t)=>Math.min(10,(e.intro?.disksBuiltTotal?.[t]??0)+1),fs=(e,t)=>t*ds(e,t),ps=(e,t)=>e.intro?.diskProvisionPasses?.[t]??0,ms=Xo,hs=e=>({symbol:Mo[e]??Mo[Mo.length-1],divisor:8*No**e}),gs=(e,t)=>Wo(e,hs(t)),_s=(e,t)=>{let n=hs(t);return e>0&&e<n.divisor?Io(e):n},vs=(e,t)=>Wo(e,_s(e,t)),ys=(e,t)=>Ko(e,_s(e,t)),bs=e=>Wo(e,Fo(e)),xs=e=>{let t=e.intro?.disksBuiltTotal??{},n=e.intro?.disks??{},r=us(e),i=[];for(let t=1;t<=Ba(e);t+=1)i.push(Cl(t));return[...new Set([...Object.keys(t).map(Number),...Object.keys(n).map(Number),r,...i])].filter(e=>(t[e]??0)>0||(n[e]??0)>0||e===r||i.includes(e)).sort((e,t)=>e-t)},Ss=e=>fo(e)&&!lo(e),Cs=e=>!Ss(e)||e.intro.diskBuildQueued?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},ws=e=>e.intro?.diskBuildQueued||os(e)||e.intro.diskBuild||ls(e)?e:{...e,intro:{...e.intro,diskBuildQueued:!0,diskBuildQueuedByReplay:!1}},Ts=e=>e.intro?.diskBuildQueued??!1?{...e,intro:{...e.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}:e,Es=(e=0)=>t=>{if(!(t.intro?.diskBuildQueued??!1)||!Ss(t))return t;let n=us(t),r=Ma(n),i=ps(t,n),a=ds(t,n),o=!!t.intro?.diskBuildQueuedByReplay,s=o?Jd(t,n):1/0;if(s<=0)return{...t,intro:{...t.intro,diskBuildQueued:!1,diskBuildQueuedByReplay:!1}};let c=i>=a,l=Za(t,r),u=Math.max(0,l-uo(t,r)),d=Ga(t,r)*no(t,r),f=Math.max(0,Math.min(a-i,s)),p=c?0:Math.min(Math.max(0,e)*d,u,f*n);if(!c&&!(p>0))return t;let m=i+p/n,h={...t.intro.poolBuffers,[r]:l-p};if(c||m>=a-Dt){let{[n]:e,...r}=t.intro.diskProvisionPasses??{};return{...t,intro:{...t.intro,poolBuffers:c?t.intro.poolBuffers:h,diskProvisionPasses:r,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n]:(t.intro.disksBuiltTotal?.[n]??0)+1},diskBuildQueued:!1,diskBuildQueuedByReplay:!1}}}let g=o&&Number.isFinite(s)&&m-i>=s-Dt;return{...t,intro:{...t.intro,poolBuffers:h,diskProvisionPasses:{...t.intro.diskProvisionPasses,[n]:m},...g?{diskBuildQueued:!1,diskBuildQueuedByReplay:!1}:null}}},Ds=200,Os=(e,t)=>{let n=Ma(t);return t/Math.max(Ka(e,n)*no(e,n),Number.MIN_VALUE)},ks=(e=0)=>t=>{if(!t.intro?.byteCreated)return t;if(!os(t))return t.intro.lowerRebuild?{...t,intro:{...t.intro,lowerRebuild:null}}:t;let n=t.intro,r=Math.max(0,e),i=!1;for(let e=0;e<Ds;e+=1){let e={...t,intro:n};if(!os(e))break;let a=us(e),o=Ma(a);if(Ia(e,o)||Fa(e,o)||Ya(e,o)<a||n.diskBuild)break;let s=n.disksBuiltTotal?.[a]??0,c=n.disks?.[a]??0;if(s>=9&&c>=s)break;let l=Ga(e,o)*no(e,o);if(!(l>0)||!Number.isFinite(l))break;let u=n.lowerRebuild?.size===a?n.lowerRebuild.progress:0,d=n.poolBuffers?.[o]??0,f=Math.max(0,d-uo(e,o)),p=Math.min(r*l,f,Math.max(0,1-u)*a);if(!(p>0))break;let m=u+p/a,h={...n.poolBuffers,[o]:d-p};if(r=Math.max(0,r-p/l),m<.999999999){n={...n,poolBuffers:h,lowerRebuild:{size:a,progress:m}},i=!0;break}n={...n,poolBuffers:h,disks:{...n.disks,[a]:c+1},disksBuiltTotal:{...n.disksBuiltTotal,[a]:Math.max(s,c+1)},lowerRebuild:null},i=!0}return i?{...t,intro:n}:t},As=e=>{let t={seconds:0,disksDone:0,disksTotal:0,projected:!1};if(!os(e))return t;let n=la(e.intro);for(let r=1;r<n;r+=1){let n=ns(r),i=e.intro.disksBuiltTotal?.[n]??0,a=Math.min(9,e.intro.disks?.[n]??0);if(t.disksTotal+=9,i>=9){t.disksDone+=9;continue}let o=e.intro.lowerRebuild?.size===n?e.intro.lowerRebuild.progress:0;t.disksDone+=a+o,Ga(e,Ma(n))<=0&&(t.projected=!0);let s=Os(e,n);t.seconds+=(9-a-o)*s}return t},js=e=>t=>{let n=t.intro.diskBuild;if(!n)return t;let r=n.remainingSeconds-e;return r>Dt?{...t,intro:{...t.intro,diskBuild:{...n,remainingSeconds:r}}}:{...t,intro:{...t.intro,diskBuild:null,disksBuiltTotal:{...t.intro.disksBuiltTotal,[n.size]:(t.intro.disksBuiltTotal?.[n.size]??0)+1}}}},Ms=e=>{let t=mc(e);return t?ns(t+1):e*10},Ns=e=>{let t=Ma(e);return!!t&&Ma(Ms(e))===t},Ps=(e,t)=>e.intro?.diskWriteCache?.[t]??null,Fs=e=>e?Number.isFinite(e.collectedBits)?Math.max(0,e.collectedBits):Math.max(0,e.segmentsCollected??0)*(e.sourceSize??0):0,Is=e=>e?Array.isArray(e.transfers)?e.transfers:e.transferSize?[{size:e.transferSize,remainingSeconds:e.segmentRemainingSeconds??0,totalSeconds:e.segmentTotalSeconds??0}]:[]:[],Ls=e=>e.totalSeconds>0?e.size*(1-e.remainingSeconds/e.totalSeconds):0,Rs=e=>{if(!e||e.segmentsCollected>=10)return 0;let t=e.sourceSize??0;if(!(t>0))return 0;let n=Math.max(0,Fs(e)-(e.segmentsCollected??0)*t),r=Is(e).reduce((e,t)=>e+Ls(t),0);return Math.min(1,Math.max(0,(n+r)/t))},zs=e=>!e||e.segmentsCollected<10||e.flushTotalSeconds<=0?0:1-e.flushRemainingSeconds/e.flushTotalSeconds,Bs=(e,t)=>{let n=Ps(e,t);if(!n||n.segmentsCollected>=10)return!1;let r=Is(n);return r.length>0&&r.every(t=>sc(e,t.size))},Vs=e=>{let t=mc(e);if(!t||t<=1)return null;let n=ns(t-1),r=Ma(e);return r&&Ma(n)===r?n:null},Hs=(e,t)=>!Vs(t)||e.intro.diskBuild?.size===t||e.intro.diskWriteCache?.[t]?!1:(e.intro.disksBuiltTotal?.[t]??0)>(e.intro.disks?.[t]??0),Us=(e,t,n=!1)=>({sourceSize:Vs(t),segmentsCollected:0,collectedBits:0,transfers:[],flushRemainingSeconds:0,flushTotalSeconds:0,expedite:n}),Ws=(e,t)=>{if(!Vs(t)||e.intro?.diskBuild?.size===t||(e.intro?.disksBuiltTotal?.[t]??0)<=(e.intro?.disks?.[t]??0))return!1;let n=Ps(e,t);return!n||!n.expedite&&n.segmentsCollected<10},Gs=(e,t)=>!!Ps(e,t)?.expedite,Ks=e=>t=>{if(!Ws(t,e))return t;let n=Ps(t,e);return{...t,intro:{...t.intro,diskWriteCache:{...t.intro.diskWriteCache??{},[e]:n?{...n,expedite:!0}:Us(t,e,!0)}}}},qs=(e,t)=>{let n=e[t]??0;if(n<=1){let{[t]:n,...r}=e;return r}return{...e,[t]:n-1}},Js=(e,t)=>{let n=Ga(e,Ma(t))*5;return t/Math.max(n,Number.MIN_VALUE)},Ys=(e,t,n,r)=>{let i=Ma(t),a={};for(let[n,r]of Object.entries(e.intro.diskWriteCache??{}))if(Number(n)!==t)for(let e of Is(r))a[e.size]=(a[e.size]??0)+1;for(let e of r)a[e.size]=(a[e.size]??0)+1;let o=[],s=n,c=Pa(i).filter(e=>e<t).sort((e,t)=>t-e);for(let t of c){if(e.intro.diskBuild?.size===t||sc(e,t))continue;let n=(e.intro.disks?.[t]??0)-(a[t]??0);for(;n>0&&t<=s*1.000000001;)o.push(t),s-=t,--n}return o},Xs=1-1e-9,Zs=(e,t)=>e.length===t.length&&e.every((e,n)=>e.size===t[n].size&&e.remainingSeconds===t[n].remainingSeconds),Qs=e=>t=>{let n=t.intro,r=n.disks??{},i={...n.diskWriteCache??{}},a=!1,o=null;for(let e of Object.keys(i).map(Number)){let s=i[e];if(!s)continue;let c=Ma(s.sourceSize);if(c===Ma(e)||(s.segmentsCollected??0)>=10)continue;let l=Math.max(0,s.segmentsCollected??0),u=r[s.sourceSize]??0,d=Math.max(0,(n.disksBuiltTotal?.[s.sourceSize]??0)-u),f=Math.min(d,l);f>0&&(r={...r,[s.sourceSize]:u+f});let p=(l-f)*s.sourceSize;p>0&&c&&(o??={...n.poolBuffers??{}},o[c]=Math.min((o[c]??0)+p,Xa(t,c)));let{[e]:m,...h}=i;i=h,a=!0}let s={...t,intro:{...n}};Object.defineProperties(s.intro,{disks:{get:()=>r,enumerable:!0},diskWriteCache:{get:()=>i,enumerable:!0},poolBuffers:{get:()=>o??n.poolBuffers,enumerable:!0}});let c=Object.keys(n.disksBuiltTotal??{}).map(Number).sort((e,t)=>e-t);for(let e of c){let t=s;Hs(t,e)&&(i[e]=Us(t,e),a=!0)}let l=Object.keys(i).map(Number).sort((e,t)=>+!!i[t]?.expedite-!!i[e]?.expedite||e-t);for(let c of l){let l=i[c];if(!l)continue;let u=Ma(c),d=no(t,u),f=(n.disksBuiltTotal?.[c]??0)>(r[c]??0);if((l.segmentsCollected??0)>=10){if(!f)continue;let t=l.flushRemainingSeconds-e*d;if(t>Dt){t!==l.flushRemainingSeconds&&(i[c]={...l,flushRemainingSeconds:t},a=!0);continue}r={...r,[c]:(r[c]??0)+1};let{[c]:n,...o}=i;i=o,a=!0;continue}if(!f)continue;let p=l.sourceSize??Vs(c);if(!(p>0))continue;let m=Is(l),h=Fs(l),g=[];for(let t of m){if(sc(s,t.size)){g.push(t);continue}let n=t.remainingSeconds-e*d;n>Dt?g.push({...t,remainingSeconds:n}):(r[t.size]??0)>0&&(r=qs(r,t.size),h+=t.size)}if(u){let e=(o??n.poolBuffers??{})[u]??0,t=Math.max(0,e-uo(s,u)),r=Math.max(0,c-h);g.length>0&&t>=r&&(g=[]);let i=g.reduce((e,t)=>e+t.size,0),a=Math.min(t,Math.max(0,r-i));a>0&&(o??={...n.poolBuffers??{}},o[u]=e-a,h+=a)}if(l.expedite&&h<c*Xs){let e=g.reduce((e,t)=>e+t.size,0);for(let n of Ys(s,c,c-h-e,g)){let e=Js(t,n);g.push({size:n,remainingSeconds:e,totalSeconds:e})}}let{transferSize:_,segmentRemainingSeconds:v,segmentTotalSeconds:y,...b}=l,x={...b,sourceSize:p,transfers:g};if(h>=c*Xs){r={...r,[c]:(r[c]??0)+1};let{[c]:e,...t}=i;i=t,a=!0}else x.collectedBits=h,x.segmentsCollected=Math.min(9,Math.floor(h/p+1e-9)),x.collectedBits===l.collectedBits&&x.segmentsCollected===l.segmentsCollected&&Array.isArray(l.transfers)&&Zs(x.transfers,l.transfers)&&x.flushRemainingSeconds===l.flushRemainingSeconds&&x.sourceSize===l.sourceSize||(i[c]=x,a=!0)}return a?{...t,intro:{...n,disks:r,diskWriteCache:i,...o?{poolBuffers:o}:null}}:t},$s=(e,t)=>e.intro?.diskReadCacheFlush?.[t]??null,ec=(e,t)=>{let n=t/8,r=Ga(e,Ma(t))*2;return n/Math.max(r,Number.MIN_VALUE)},tc=e=>!e||e.totalSeconds<=0?0:1-e.remainingSeconds/e.totalSeconds,nc=(e,t)=>$s(e,t)?sc(e,t):!1,rc=e=>gc(e)===ze[0],ic=(e=0)=>t=>{let n=t.intro?.disksBuiltTotal??{},r=t.intro.diskBuild?.size,i={...t.intro.poolBuffers??{}},a=e=>i[e]??0,o={...t.intro.disks??{}},s={...t.intro.diskCache??{}},c={...t.intro.diskReadCacheFlush??{}},l=!1,u=Ba(t),d=e=>{if(!rc(e))return!1;let t=Ma(e);return!!t&&t<=u};for(let e in s){let n=Number(e);if(d(n))continue;let r=Ma(n);r&&(i[r]=Math.min(a(r)+s[n],Xa(t,r))),delete s[n],l=!0}for(let e in c){let t=Number(e);d(t)||(delete c[t],l=!0)}let f=[];for(let e=1;e<=u;e+=1)f.push(Cl(e));let p=f.filter(e=>e!==r).sort((e,t)=>e-t);for(let e in c){let t=Number(e);(t===r||(n[t]??0)<=(o[t]??0))&&(delete c[t],l=!0)}for(let n of p){if(c[n])continue;let r=Ma(n),o=s[n]??0,u=a(r);if(o<n&&u>0&&e>0){let a=e*Ga(t,r)*5*no(t,r),c=Math.min(n-o,u,a);if(c>0){i[r]=u-c;let e=o+c;s[n]=n-e<=n*Dt?n:e,l=!0}}}for(let e of p){if(c[e]||Ps(t,e))continue;let r=(n[e]??0)>(o[e]??0),i=s[e]??0;if(!r||i<e||sc(t,e))continue;let a=ec(t,e);c[e]={remainingSeconds:a,totalSeconds:a},l=!0}let m=[];for(let e in c)m.push(Number(e));m.sort((e,t)=>e-t);let h={...t,intro:{...t.intro}};Object.defineProperties(h.intro,{poolBuffers:{get:()=>i,enumerable:!0},disks:{get:()=>o,enumerable:!0},diskCache:{get:()=>s,enumerable:!0},diskReadCacheFlush:{get:()=>c,enumerable:!0}});for(let r of m){let i=c[r];if(!i||sc(h,r))continue;let a=i.remainingSeconds-e*no(t,Ma(r));if(a>Dt){a!==i.remainingSeconds&&(c[r]={...i,remainingSeconds:a},l=!0);continue}let u=(n[r]??0)>(o[r]??0),d=s[r]??0;u&&d>=r&&(s[r]=d-r,o[r]=(o[r]??0)+1),delete c[r],l=!0}return l?{...t,intro:{...t.intro,poolBuffers:i,disks:o,diskCache:s,diskReadCacheFlush:c}}:t},ac=e=>{let t=gc(e);return t?ze.indexOf(t)+1:null},oc=(e,t)=>{let n=hc(t),r=ac(t);if(!n||!r)return;let i=b[n-1];if(i)return(e.purchaseLevels?.[i.id]??1)===r?i:void 0},sc=(e,t)=>oc(e,t)!==void 0,cc=(e,t)=>{let n=hc(t),r=ac(t);if(!n||!r)return!1;let i=b[n-1];return i?(e.purchaseLevels?.[i.id]??1)>r:!1},lc=(e,t)=>oc(e,t)?.name??null,uc=e=>t=>{if(!co(t,e))return t;let n=oc(t,e),r=t.intro.disks[e],{[e]:i,...a}=t.intro.disks,o=r>1?{...t.intro.disks,[e]:r-1}:a;return ca(n.id,Gt(t))({...t,intro:{...t.intro,disks:o}})},dc=e=>{let t=Object.keys(e.intro.disks??{}).map(Number).filter(t=>co(e,t)).sort((e,t)=>e-t)[0];return t===void 0?e:uc(t)(e)},fc=(e,t)=>{if(e<1||e>10)return null;let n=ze[t-1];return n===void 0?null:ns(Sl(e,n))},pc=e=>{let t=e,n=!1;for(let e of b){if(S[e.id]>=ni(t))continue;let r=t.purchaseLevels?.[e.id]??1;if(r!==1)continue;let i=fc(S[e.id]+1,1);if(i===null||co(t,i)||t.intro.diskBuild?.size===i)continue;let a=t.intro.diskCache?.[i]??0,o=qt(e,r);if(!(o>0)||a<o)continue;let s=t.purchaseLevelProgress?.[e.id]??0,c=Gt(t)-s,l=Math.min(c,Math.floor(a/o));if(l<=0)continue;let u=l*o,{[i]:d,...f}=t.intro.diskReadCacheFlush??{};t=ca(e.id,l)({...t,intro:{...t.intro,diskCache:{...t.intro.diskCache,[i]:a-u},diskReadCacheFlush:f}}),n=!0}return n?t:e},mc=e=>{if(!(e>0)||!Number.isFinite(e))return null;let t=e/Ne;if(t<1)return null;let n=Math.round(Math.log10(t))+1;return n<1||ns(n)!==e?null:n},hc=e=>{let t=mc(e);return!t||t>We?null:Math.floor((t-1)/ze.length)+1},gc=e=>{let t=mc(e);return!t||t>We?null:ze[(t-1)%ze.length]},_c=e=>Ue[e-1]??null,W=(e,t)=>t<1||t>10?null:e.intro?.dataLakes?.[t]??At(),vc=(e,t)=>W(e,t)?.capacityLevel??0,yc=(e,t)=>vc(e,t)>=3,bc=(e,t)=>Ge[Math.min(vc(e,t),3)]+Math.max(0,W(e,t)?.resetCount??0)*1e3,xc=(e,t)=>{let n={};return ze.forEach((t,r)=>{n[t]=r<e?Be[r]:0}),n[Ve]=e>=3?Math.max(0,Math.trunc(Number(t))||0):0,n},Sc=e=>He.reduce((t,n)=>t+n*(e[n]??0),0),Cc=e=>{let t=Math.max(0,Math.trunc(e)||0);return{disks:{1:t%10,10:Math.floor(t/10)%10,100:Math.floor(t/100)%10,1e3:Math.floor(t/1e3)}}},wc=(e,t)=>xc(vc(e,t),W(e,t)?.resetCount??0),Tc=(e,t)=>Sc(wc(e,t)),Ec=(e,t)=>Math.min(bc(e,t),Tc(e,t)+1),Dc=(e,t)=>Cc(W(e,t)?.depositedUnits??0).disks,Oc=(e,t)=>W(e,t)?.fillBits??0,kc=(e,t)=>{let n=Cl(t);return n>0&&Oc(e,t)>=n},Ac=(e,t)=>{let n=Cl(t);return n>0?Math.min(1,Math.max(0,Oc(e,t)/n)):0},jc=(e,t)=>W(e,t)?.lakeTransfer??null,Mc=(e,t)=>{let n=jc(e,t);if(!n)return 0;let r=n.target*Cl(t);return r>0?Math.min(1,Math.max(0,n.movedBits/r)):0},Nc=(e,t)=>(W(e,t)?.depositedUnits??0)+ +!!kc(e,t),Pc=(e,t)=>{let n=W(e,t),r=Cl(t);return!n||!(r>0)?0:(n.depositedUnits??0)+(n.fillBits??0)/r+(n.lakeTransfer?.target??0)},Fc=(e,t)=>{let n=Jc(t)(e);if(!(n>0)||!Number.isFinite(n))return 100;let r=Pc(e,t);return r>=n*(1-1e-9)&&ol(e,t,n)!==null?100:Math.max(0,Math.min(99,Math.floor(r/n*100)))},Ic=(e,t)=>Jc(t)(e)<=Ec(e,t),Lc=(e,t)=>!kc(e,t),Rc=(e,t)=>{let n=W(e,t);if(!n||n.lakeTransfer||!kc(e,t))return null;let r=wc(e,t),i=n.depositedUnits??0,a=Cc(i).disks;for(let e=He.length-1;e>=0;--e){let t=He[e];if(!((r[t]??0)<=(a[t]??0))&&i%t===t-1)return t}return null},zc=(e,t,n)=>Ga(e,t)*no(e,t)*(n===1?2:5),Bc=(e,t)=>{let n=Oc(e,t);return n>0&&n<Cl(t)},Vc=(e,t)=>{let n=Ya(e,t);return n>0&&Za(e,t)>=n},Hc=(e,t)=>!!W(e,t)?.acquiring,Uc=(e,t)=>Bc(e,t)?!0:Hc(e,t)?Ol(e,t)&&!kl(e,t,!0)&&Za(e,t)>uo(e,t):Vc(e,t),Wc=e=>he.slice(0,fr(e.intro)).reduce((e,t)=>e+(t.lakeSpeed??0),0),Gc=(e,t)=>Math.round((.1+.1*Math.max(0,W(e,t)?.resetCount??0)+Wc(e))*1e6)/1e6,Kc=(e,t)=>(e.intro?.disksBuiltTotal?.[Cl(t)]??0)>0,qc=(e,t)=>(W(e,t)?.boostersUnlocked??!1)||Kc(e,t),Jc=e=>t=>{let n=W(t,e);return n?(n.purchased??0)+1:0},Yc=(e,t)=>{let n=Fe[t-1];return!!n&&(e.intro?.[n.autoFlagField]??!1)},Xc=(e,t)=>Yc(e,t)?18:10,Zc=(e,t)=>Xc(e,Re.indexOf(t)+1),Qc=(e,t)=>{let n=Re[t-1];return n?Math.max(0,Xc(e,t)-(e.intro?.[n]??0)):0},$c=(e,t)=>{if(!Yc(e,t))return 0;let n=Fe[t-1];if((e.intro?.[n.timerField]??0)>0)return 8;let r=Re[t-1],i=e.intro?.[r]??0;return Math.min(8,Math.max(0,i-10)+nl(e,t-1))},el=(e,t)=>{let n=e.intro?.computeChargeSeconds?.[t];return Number.isFinite(n)&&n>=0?n:null},tl=(e,t)=>el(e,t)!==null,nl=(e,t)=>{let n=el(e,t);return n===null?0:Math.floor(n/1+Dt)},rl=(e,t)=>{let n=Fe[t];if(!n)return!1;let r=e.intro??{};return!!r[n.autoFlagField]&&!((r[n.timerField]??0)>0)&&!tl(e,t)&&(r[n.inputField]??0)>=8&&(r[n.outputField]??0)<Zc(e,n.outputField)},il=e=>t=>rl(t,e)?{...t,intro:{...t.intro,computeChargeSeconds:{...t.intro?.computeChargeSeconds??{},[e]:0}}}:t,al=e=>t=>{let n=t.intro?.computeChargeSeconds,r=n?Object.keys(n):[];if(r.length===0)return t;let i={...n},a={...t.intro};for(let n of r){let r=Number(n),o=Fe[r],s=el(t,r),c=o?a[o.inputField]??0:0;if(!o||s===null||c<8||(a[o.outputField]??0)>=Zc({...t,intro:a},o.outputField)){delete i[n];continue}let l=s+e;if(Math.max(0,c-10)+Math.floor(l/1+Dt)<8){i[n]=l;continue}delete i[n];let u=a[o.outputField]??0,d=Zc({...t,intro:a},o.outputField);u>=d||(a={...a,[o.inputField]:c-8,[o.outputField]:Math.max(u,Math.min(u+1,d))})}return{...t,intro:{...a,computeChargeSeconds:i}}},ol=(e,t,n)=>{if(!W(e,t)||!(n>0))return null;let r=Dc(e,t),i=[(r[1]??0)+ +!!kc(e,t),r[10]??0,r[100]??0,r[1e3]??0],a=(e,t)=>{if(t===0)return!0;if(e===i.length-1)return t<=i[e];for(let n=t%10;n<=Math.min(i[e],t);n+=10)if(a(e+1,(t-n)/10))return!0;return!1};for(let e=n%10;e<=Math.min(i[0],n);e+=10)if(a(1,(n-e)/10))return e;return null},sl=(e,t)=>qc(e,t)&&Qc(e,t)>0&&ol(e,t,Jc(t)(e))!==null,cl=(e,t)=>Qc(e,t)<=0,ll=(e,t=1)=>n=>{let r=W(n,e);if(!r||!qc(n,e))return n;let i=Re[e-1];if(!i)return n;let a=Qc(n,e);if(a<=0)return n;let o=r,s=0,c=n,l=Math.min(t,a);for(;s<l;){let t=(o.purchased??0)+1,n=ol(c,e,t);if(n===null)break;let r=o.depositedUnits??0,i=Dc(c,e)[1]??0,a=Math.max(0,n-i);o={...o,depositedUnits:r-(t-a),fillBits:a>0?0:o.fillBits??0,acquiring:!1,purchased:(o.purchased??0)+1},c={...c,intro:{...c.intro,dataLakes:{...c.intro.dataLakes,[e]:o}}},s+=1}if(s<=0)return n;let u=xl(n.intro,e,i,s),d=o;return{...n,intro:{...n.intro,...u,dataLakes:{...n.intro.dataLakes,[e]:d}}}},ul=(e,t)=>{let n=Jc(t)(e);if(ol(e,t,n)!==null)return 0;let r=Cl(t);return Math.max(r,(n-Pc(e,t))*r)},dl=(e,t)=>{if(Na(e,t)||!Kc(e,t))return!1;let n=Cl(t);return ul(e,t)<=n*1e-9||Jc(t)(e)>Ec(e,t)||!Lc(e,t)?!1:Za(e,t)>0&&Uc(e,t)},fl=e=>t=>{if(!dl(t,e))return t;let n=ul(t,e),r=Za(t,e),i=Cl(e)-Oc(t,e),a=Hc(t,e)&&!Bc(t,e)?Math.max(0,r-uo(t,e)):r,o=Math.min(n,a,i);if(!(o>0))return t;let{unconsumedBits:s,...c}=wl(t,t.intro.dataLakes,e,o),l=o-s;return{...t,intro:{...t.intro,poolBuffers:{...t.intro.poolBuffers,[e]:r-l},dataLakes:{...t.intro.dataLakes,[e]:c}}}},pl=(e,t)=>n=>{let r=W(n,e);return r?{...n,intro:{...n.intro,dataLakes:{...n.intro.dataLakes,[e]:{...r,autoConvertActive:t}}}}:n},ml=(e,t)=>W(e,t)?.autoConvertActive??!1,hl=(e,t)=>!!W(e,t)?.boosterAuto||Na(e,t),gl=(e,t)=>{let n=W(e,t);return!n||(n.autoConvertActive??!1)||n.boosterAuto||!qc(e,t)||!Kc(e,t)?!1:Qc(e,t)>0},_l=(e,t)=>{let n=W(e,t);return!n||n.rebuilding||!Na(e,t)?!1:!n.lakeTransfer&&Nc(e,t)>=bc(e,t)&&Jc(t)(e)>bc(e,t)},vl=e=>t=>{if(!_l(t,e))return t;let n=W(t,e),r=Pa(e),i=e=>Object.fromEntries(Object.entries(e??{}).filter(([e])=>!r.includes(Number(e)))),a=(n.resetCount??0)+1,o=Math.min(2,Math.max(0,Number(t.intro.poolExponentBonuses?.[e])||0)),s=Math.min(2,Math.max(o+1,a)),c=Ma(t.intro.diskBuild?.size)===e,l=Object.fromEntries(Object.entries(t.intro.diskWriteCache??{}).filter(([e,t])=>!r.includes(Number(e))&&!r.includes(Number(t?.sourceSize))));return Sr({...t,intro:{...t.intro,poolExponentBonuses:{...t.intro.poolExponentBonuses,[e]:s},disks:i(t.intro.disks),disksBuiltTotal:i(t.intro.disksBuiltTotal),diskCache:i(t.intro.diskCache),diskReadCacheFlush:i(t.intro.diskReadCacheFlush),diskWriteCache:l,diskProvisionPasses:i(t.intro.diskProvisionPasses),diskBuild:c?null:t.intro.diskBuild,diskBuildQueued:!c&&t.intro.diskBuildQueued,diskBuildQueuedByReplay:!c&&t.intro.diskBuildQueuedByReplay,poolBuffers:{...t.intro.poolBuffers,[e]:0},dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,autoConvertActive:!1,resetCount:a,rebuilding:!0}},poolResetRebuildingCount:(t.intro.poolResetRebuildingCount??0)+1,poolResetCount:(t.intro.poolResetCount??0)+1}})},yl=e=>t=>{let n=W(t,e);return n&&!n.autoConvertActive&&!n.boosterAuto&&sl(t,e)?ll(e,1)(t):gl(t,e)?pl(e,!0)(t):t},bl=e=>{let t=e;for(let e=1;e<=10;e+=1){if(Na(t,e)&&!W(t,e)?.boosterAuto){let n=W(t,e);t={...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,boosterAuto:!0}}}}}W(t,e)?.boosterAuto&&Jc(e)(t)<=bc(t,e)&&sl(t,e)&&(t=ll(e,1)(t)),ml(t,e)&&(Qc(t,e)<=0?t=pl(e,!1)(t):Kc(t,e)?sl(t,e)?(t=ll(e,1)(t),t=pl(e,!1)(t)):t=fl(e)(t):t=pl(e,!1)(t))}return t},xl=(e,t,n,r=1)=>{let i=(e[n]??0)+r,a={[n]:i};return t===1&&(a.computeCoresEverEarned=(e.computeCoresEverEarned??0)+r,a.computeMergePageUnlocked=(e.computeMergePageUnlocked??!1)||a.computeCoresEverEarned>=8),a},Sl=(e,t)=>(e-1)*ze.length+ze.indexOf(t)+1,Cl=e=>ns(Sl(e,ze[0])),wl=(e,t,n,r)=>{let i=t[n]??W(e,n),a=Cl(n),o=Math.min(a,Math.max(0,i.fillBits??0)),s=Math.max(0,a-o),c=Math.min(s,Math.max(0,r)),l=o+c,u=l>=a*(1-1e-12)?a:l;return{...i,fillBits:u,boostersUnlocked:(i.boostersUnlocked??!1)||u>=a,acquiring:(i.acquiring??!1)||c>0,unconsumedBits:Math.max(0,r-c)}},Tl=(e,t,n,r,i)=>{let a=W(e,t),o=Math.max(0,Cl(t)-(a.fillBits??0)),s=Math.min(i,Math.max(0,n*r),o);if(!(s>0))return{lake:a,remainingBits:i,changed:!1};let{unconsumedBits:c,...l}=wl(e,{[t]:a},t,s);return{lake:l,remainingBits:i-(s-c),changed:!0}},El=(e,t,n)=>{let r=W(e,t);if(!r||!Kc(e,t))return r;let i=Cl(t),a=r,o=Math.max(0,n);for(let n=0;n<8;n+=1){let n={...e,intro:{...e.intro,dataLakes:{...e.intro.dataLakes,[t]:a}}};if(!a.lakeTransfer){let e=Rc(n,t);if(e===null)break;a={...a,depositedUnits:(a.depositedUnits??0)-(e-1),fillBits:0,lakeTransfer:{target:e,movedBits:0}};continue}let{target:r,movedBits:s}=a.lakeTransfer,c=zc(n,t,r);if(!(c>0))break;let l=Math.max(0,r*i-s)/c;if(l<=o*1.000000001)o=Math.max(0,o-l),a={...a,depositedUnits:(a.depositedUnits??0)+r,lakeTransfer:null,boostersUnlocked:!0};else{a={...a,lakeTransfer:{target:r,movedBits:s+c*o}};break}}return a},Dl=e=>t=>{let n=null;for(let r=1;r<=10;r+=1){let i=W(t,r),a=El(t,r,e);a!==i&&t.intro?.dataLakes?.[r]&&(n??={...t.intro.dataLakes},n[r]=a)}return n?{...t,intro:{...t.intro,dataLakes:n}}:t},Ol=(e,t)=>Pa(t).every(t=>(e.intro?.disks?.[t]??0)>=(e.intro?.disksBuiltTotal?.[t]??0)),kl=(e,t,n=!1)=>{let r=e.intro??{};if(Ia(e,t))return!0;if(os(e)){let n=us(e);if(Ma(n)===t&&Ya(e,t)>=n)return!0}if(r.diskBuild&&Ma(r.diskBuild.size)===t)return!0;let i=Pa(t);return!n&&i.some(t=>ps(e,t)>0)?!0:!!r.diskBuildQueued&&i.includes(us(e))},Al=(e,t)=>!Kc(e,t)||!Lc(e,t)?!1:Bc(e,t)?Za(e,t)>0:(Hc(e,t)||Vc(e,t))&&Ol(e,t)&&!kl(e,t,Hc(e,t))&&Za(e,t)>uo(e,t),jl=(e,t=null)=>n=>{if(!(e>0))return n;let r=Ba(n),i=null,a=null;for(let o=1;o<=r;o+=1){if(t&&t.intro?.dataLakes?.[o]!==n.intro?.dataLakes?.[o]||!Al(n,o))continue;let r=Za(n,o),s=Bc(n,o)?r:Math.max(0,r-uo(n,o));if(s<=0)continue;let c=Ga(n,o)*no(n,o)*Gc(n,o),{lake:l,remainingBits:u,changed:d}=Tl(n,o,c,e,s);d&&(i??={...n.intro.poolBuffers??{}},a??={...n.intro.dataLakes},i[o]=r-(s-u),a[o]=l)}return i?{...n,intro:{...n.intro,poolBuffers:i,dataLakes:a}}:n},Ml=(e,t)=>Pc(e,t)*Cl(t),Nl=(e,t)=>ns(Sl(e,ze[t])),Pl=(e,t)=>{if(t<1||t>10||yc(e,t))return!1;let n=Nl(t,vc(e,t));return(e.intro?.disksBuiltTotal?.[n]??0)>=9},Fl=(e,t)=>Pl(e,t),Il=e=>t=>{if(!Fl(t,e))return t;let n=W(t,e);return{...t,intro:{...t.intro,dataLakes:{...t.intro.dataLakes,[e]:{...n,depositedUnits:0,fillBits:0,lakeTransfer:null,acquiring:!1,capacityLevel:vc(t,e)+1}}}}},Ll=e=>(e.intro?.capacity??0)>=Pe,Rl=(e,t)=>{let n=Number(e.intro?.chargerUnlockProgress?.[t]??0);return Number.isFinite(n)?Math.max(0,Math.min(10,Math.floor(n))):0},zl=(e,t,n)=>r=>{if(r.intro?.[n])return r;let i=r.intro?.[e]??0,a=Rl(r,n),o=Math.min(10-a,Math.floor(i/8));if(o>0){let t=a+o;return{...r,intro:{...r.intro,[e]:i-o*8,chargerUnlockProgress:{...r.intro?.chargerUnlockProgress??{},[n]:t},...t>=10?{[n]:!0}:{}}}}let s=r.intro?.[t]??0,c=Math.max(0,Zc(r,t)-s),l=Math.min(c,Math.floor(i/8));return l<=0?r:{...r,intro:{...r.intro,[e]:i-l*8,[t]:s+l}}},Bl=zl(`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`),Vl=zl(`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`),Hl=zl(`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`),Ul=zl(`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`),Wl=zl(`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`),Gl=zl(`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`),Kl=zl(`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),ql=zl(`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),Jl=zl(`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),Yl=(e,t,n,r,i,a)=>o=>!(o.intro?.[n]??!1)||(o.intro?.[r]??0)>0||(o.intro?.[e]??0)<a||(o.intro?.[t]??0)>=Zc(o,t)||!(i>0)?o:{...o,intro:{...o.intro,[e]:(o.intro?.[e]??0)-8,[r]:i}},Xl=(e,t,n)=>r=>{let i=r.intro?.[t]??0;if(i<=0)return r;let a=i-e;return a>0?{...r,intro:{...r.intro,[t]:a}}:{...r,intro:{...r.intro,[t]:0,[n]:Math.max(r.intro?.[n]??0,Math.min(Zc(r,n),(r.intro?.[n]??0)+1))}}},Zl=(e,t,n,r,i,a)=>o=>{let s=o.intro?.[i]??0,c=!!o.intro?.[r]&&(o.computeAutoChargeEnabled??!0)&&!tl(o,a)&&(o.intro?.[t]??0)>=18;if(!(s>0)&&!c)return o;let l=Ql(o,a),u=l>0&&s>l?{...o,intro:{...o.intro,[i]:l}}:o,d=c?Yl(t,n,r,i,l,18)(u):u,f=!(s>0)&&(d.intro?.[i]??0)>0?dd(d,a+1):d;return Xl(e,i,n)(f)},Ql=(e,t)=>{if(!Number.isInteger(t)||t<0||t>=Fe.length)return 0;let n=t+1,r=Ga(e,n);return!(r>0)||!Number.isFinite(r)?0:8*ec(e,ns((n-1)*ze.length+1))},$l=(e,t,n)=>!(e.intro?.[n]??!1)&&(e.intro?.[t]??0)>=10,eu=(e,t)=>n=>$l(n,e,t)?{...n,intro:{...n.intro,[e]:(n.intro?.[e]??0)-10,[t]:!0}}:n,tu=(e,t,n,r,i)=>(e.intro?.[r]??!1)&&(e.intro?.[t]??0)>=8&&(e.intro?.[n]??0)+ +((e.intro?.[i]??0)>0)<Zc(e,n),nu=(e,t)=>{let n=Fe[t];return n?tu(e,n.inputField,n.outputField,n.autoFlagField,n.timerField):!1},ru=e=>t=>{let{inputField:n,outputField:r,autoFlagField:i,timerField:a}=Fe[e];return tu(t,n,r,i,a)?{...t,intro:{...t.intro,[n]:t.intro[n]-8,[r]:(t.intro?.[r]??0)+1}}:t},iu=e=>Zl(e,`computeCores`,`computeNodes`,`autoMergeCoresIntoNode`,`computeCoresMergeRemainingSeconds`,0),au=eu(`computeNodes`,`autoMergeCoresIntoNode`),ou=e=>$l(e,`computeNodes`,`autoMergeCoresIntoNode`),su=ru(0),cu=e=>Zl(e,`computeNodes`,`computeClusters`,`autoMergeNodesIntoCluster`,`computeNodesMergeRemainingSeconds`,1),lu=eu(`computeClusters`,`autoMergeNodesIntoCluster`),uu=e=>$l(e,`computeClusters`,`autoMergeNodesIntoCluster`),du=ru(1),fu=e=>Zl(e,`computeClusters`,`computeNetworks`,`autoMergeClustersIntoNetwork`,`computeClustersMergeRemainingSeconds`,2),pu=eu(`computeNetworks`,`autoMergeClustersIntoNetwork`),mu=e=>$l(e,`computeNetworks`,`autoMergeClustersIntoNetwork`),hu=ru(2),gu=e=>Zl(e,`computeNetworks`,`computeGrids`,`autoMergeNetworksIntoGrid`,`computeNetworksMergeRemainingSeconds`,3),_u=eu(`computeGrids`,`autoMergeNetworksIntoGrid`),vu=e=>$l(e,`computeGrids`,`autoMergeNetworksIntoGrid`),yu=ru(3),bu=e=>Zl(e,`computeGrids`,`computeFabrics`,`autoMergeGridsIntoFabric`,`computeGridsMergeRemainingSeconds`,4),xu=eu(`computeFabrics`,`autoMergeGridsIntoFabric`),Su=e=>$l(e,`computeFabrics`,`autoMergeGridsIntoFabric`),Cu=ru(4),wu=e=>Zl(e,`computeFabrics`,`computeClouds`,`autoMergeFabricsIntoCloud`,`computeFabricsMergeRemainingSeconds`,5),Tu=eu(`computeClouds`,`autoMergeFabricsIntoCloud`),Eu=e=>$l(e,`computeClouds`,`autoMergeFabricsIntoCloud`),Du=ru(5),Ou=e=>Zl(e,`computeClouds`,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`,`computeCloudsMergeRemainingSeconds`,6),ku=eu(`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),Au=e=>$l(e,`computeDatacenters`,`autoMergeCloudsIntoDatacenter`),ju=ru(6),Mu=e=>Zl(e,`computeDatacenters`,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`,`computeDatacentersMergeRemainingSeconds`,7),Nu=eu(`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),Pu=e=>$l(e,`computeSupercomputers`,`autoMergeDatacentersIntoSupercomputer`),Fu=ru(7),Iu=e=>Zl(e,`computeSupercomputers`,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`,`computeSupercomputersMergeRemainingSeconds`,8),Lu=eu(`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),Ru=e=>$l(e,`computeMegacomputers`,`autoMergeSupercomputersIntoMegacomputer`),zu=ru(8),Bu=[iu,cu,fu,gu,bu,wu,Ou,Mu,Iu],Vu=e=>Number.isInteger(e)&&e>=1&&e<=Re.length,Hu=e=>Vu(e)?Re[e-1]:null,Uu=(e,t)=>{let n=Ie[e];return!n||!Vu(t)?0:n.multiplier},Wu=(e,t)=>{let n=Ie[e];return!n||!Vu(t)?0:n.durationSeconds},Gu=e=>{let t=e?.computeBoostType??null;if(!t||!Ie[t])return null;let n=e.computeBoostTierIndex??1,r=Vu(n)?n:1,i=Ie[t].durationSeconds,a=e.computeBoostRemainingSeconds??0,o=Math.max(1,Math.min(e.computeBoostStacks??1,Math.ceil(a/i)));return{type:t,queue:Array(o).fill(r),remainingSeconds:a-(o-1)*i}},Ku=e=>{let t=e?.computeBoosts??{},n=Gu(e),r=[];for(let e of Object.keys(Ie)){let i=t[e];Array.isArray(i?.queue)&&i.queue.length>0?r.push({type:e,queue:i.queue,remainingSeconds:i.remainingSeconds??0}):n?.type===e&&r.push(n)}return r},qu=(e,t)=>Ku(e).find(e=>e.type===t)??null,Ju=(e,t)=>{let n={};for(let e of t)e.queue.length>0&&(n[e.type]={queue:e.queue,remainingSeconds:e.remainingSeconds});let{computeBoostType:r,computeBoostTierIndex:i,computeBoostStacks:a,computeBoostRemainingSeconds:o,...s}=e.intro;return{...e,intro:{...s,computeBoosts:n}}},Yu=e=>Ku(e).reduce((e,t)=>e+Ie[t.type].multiplier,0)||1,Xu=(e,t)=>Ku(e).reduce((e,n)=>e+(n.queue[0]>=t?Ie[n.type].multiplier:0),0)||1,Zu=e=>Ku(e).reduce((e,t)=>Math.max(e,t.queue[0]),0),Qu=(e,t)=>1+Ku(e).reduce((e,n)=>e+(n.queue[0]>=t?Ie[n.type].poolBonusPercent??0:0),0)/100,$u=(e,t,n)=>{if(!Ie[t])return!1;let r=Hu(n);return!r||(qu(e.intro,t)?.queue.length??0)>=10?!1:(e.intro[r]??0)>=1},ed=(e,t,n)=>$u(e,t,n),td=(e,t)=>{let n=qu(e.intro,t);return!!n&&$u(e,t,n.queue[0])},nd=(e,t)=>td(e,t),G=(e,t)=>Math.max(0,(qu(e.intro,t)?.queue.length??0)-1),K=(e,t)=>G(e,t)>0,rd=e=>t=>{if(!K(t,e))return t;let n=Ku(t.intro),r=n.find(t=>t.type===e),i=r.queue[r.queue.length-1],a=Hu(i),o=Ju(t,n.map(e=>e===r?{...e,queue:e.queue.slice(0,-1)}:e));return{...o,intro:{...o.intro,[a]:(t.intro[a]??0)+1}}},id=(e,t)=>{let n=qu(e.intro,t);return!!n&&n.queue.length===1},ad=e=>t=>id(t,e)?Ju(t,Ku(t.intro).filter(t=>t.type!==e)):t,od=(e,t)=>n=>{if(!ed(n,e,t))return n;let r=Hu(t),i=Ku(n.intro),a=i.find(t=>t.type===e),o;if(a){let e=a.queue.slice(),n=e.length;for(;n>1&&e[n-1]<t;)--n;e.splice(n,0,t),o={...a,queue:e}}else o={type:e,queue:[t],remainingSeconds:Wu(e,t)};let s=Ju(n,[...i.filter(e=>e!==a),o]);return{...s,intro:{...s.intro,[r]:(n.intro[r]??0)-1}}},sd=e=>t=>nd(t,e)?bf(e,qu(t.intro,e).queue[0])(t):t,cd=e=>t=>{let n=Ku(t.intro);if(n.length===0)return t;let r=[];for(let t of n){let n=t.queue,i=t.remainingSeconds-e;for(;i<=0&&n.length>0&&(n=n.slice(1),n.length!==0);)i+=Wu(t.type,n[0]);n.length>0&&r.push({type:t.type,queue:n,remainingSeconds:i})}return Ju(t,r)},ld=e=>t=>(t.intro?.computeAutoBoostEnabled??!0)===!!e?t:{...t,intro:{...t.intro,computeAutoBoostEnabled:!!e}},ud=e=>t=>!Ie[e]||(t.intro?.computeAutoBoostType??`standard`)===e?t:{...t,intro:{...t.intro,computeAutoBoostType:e}},dd=(e,t)=>{if(!(e.intro?.computeAutoBoostEnabled??!0))return e;let n=Ie[e.intro?.computeAutoBoostType]?e.intro.computeAutoBoostType:`standard`;return ed(e,n,t)?bf(n,t)(e):e},fd=(e,t)=>n=>(n.autobuyers[e]??null)===null?n:{...n,autobuyersEnabled:{...n.autobuyersEnabled,[e]:!!t}},pd=(e,t,n)=>n+ +(Zr(e,`egressFees`)===t),md=(e,t,n)=>{let r=pd(e,t,n);return Zr(e,`burnRate`)===t?Qt(t,r):$t(t,r)},hd=(e,t,n)=>Math.max(Qt(t,pd(e,t,n)),md(e,t,n)+(t===Tt()?0:1)),gd=(e,t)=>{let n=e.tickspeedLevels?.[t]??1;if(Zr(e,`clockGated`)===t||Zr(e,`rateLimit`)===t&&n+1>4)return!0;if(Zr(e,`daisyChain`)===t){let r=b[(S[t]??1)-1];if(n+1>(e.tickspeedLevels?.[r.id]??1))return!0}return!1},_d=e=>t=>{if(bi(t))return t;let n=x[e];if(!n||!xi(t)(n))return t;let r=t.tickspeedLevels?.[e]??1;if(gd(t,e))return t;let i=md(t,e,r+1),a=t.resources[n.id]??0;return a<hd(t,e,r+1)?t:Sr({...t,resources:{...t.resources,[n.id]:z(a-i)},owned:{...t.owned,[n.id]:z(a-i)},tickspeedLevels:{...t.tickspeedLevels,[e]:r+1}})},vd=e=>1*((S[e]??0)+1),yd=e=>Math.max(0,Math.ceil(Math.log(it/vd(e))/Math.log(rt))),bd=(e,t)=>Math.max(it,vd(e)*rt**t),xd=(e,t)=>bd(t,e.autobuyerIntervalLevels?.[t]??0),Sd=(e,t)=>Math.min(nt,Math.max(0,(e.autobuyerIntervalLevels?.[t]??0)-yd(t))),Cd=(e,t)=>2**Sd(e,t),wd=e=>yd(e)+nt,Td=e=>Va[e%10]*1e3**Math.floor(e/10),Ed=(e,t)=>{let n=1,r=Va.indexOf(e);for(;r===-1&&n<e;)n*=10,r=Va.indexOf(e/n);if(r===-1)throw Error(`siCleanSeriesCost: base ${e} is not a series rung × 10^k`);return n*Td(r+t)},Dd=(e,t=b[0].id)=>((S[t]??0)+1)*Ed(10,e),Od=e=>t=>{if(bi(t)||fi(t,`tierAutobuyer`,e)||!x[e]||t.autobuyers[e]==null)return t;let n=t.autobuyerIntervalLevels?.[e]??0;if(n>=wd(e))return t;let r=Dd(n,e);if(z(t.purge.points)<r)return t;let i=On(t);return{...i,purge:{...i.purge,points:i.purge.points-r},autobuyerIntervalLevels:{...i.autobuyerIntervalLevels,[e]:n+1}}},kd=e=>Math.max(0,Math.ceil(Math.log(it/e)/Math.log(rt))),Ad=e=>kd(ot[e].baseSeconds),jd=(e,t)=>Math.max(it,ot[t].baseSeconds*rt**(e.automationIntervalLevels?.[t]??0)),Md=(e,t)=>Ed(ot[e].baseCost,t),Nd=(e,t)=>t===`speedUp`?!!e.autoGlobalTickspeed:t===`scaleUp`?!!e.autoScaleUp:t===`restage`?!!e.autoXpTickspeed:t===`overclock`?!!e.autoOverclock:t===`purge`&&(e.autoPurge??null)!==null,Pd=Nd,Fd=e=>t=>{if(!ot[e]||bi(t)||fi(t,`global`,e)||!Nd(t,e))return t;let n=t.automationIntervalLevels?.[e]??0;if(n>=Ad(e))return t;let r=Md(e,n);if(z(t.purge.points)<r)return t;let i=On(t);return{...i,purge:{...i.purge,points:i.purge.points-r},automationIntervalLevels:{...i.automationIntervalLevels,[e]:n+1}}},Id=()=>kd(st.baseSeconds),Ld=(e,t)=>Math.max(it,st.baseSeconds*rt**(e.tierTickspeedIntervalLevels?.[t]??0)),Rd=(e,t=b[0].id)=>((S[t]??0)+1)*Ed(st.baseCost,e),zd=e=>t=>{if(bi(t)||fi(t,`tierTickspeed`,e)||!x[e]||!t.tierTickspeedAutobuyer?.[e])return t;let n=t.tierTickspeedIntervalLevels?.[e]??0;if(n>=Id())return t;let r=Rd(n,e);if(z(t.purge.points)<r)return t;let i=On(t);return{...i,purge:{...i.purge,points:i.purge.points-r},tierTickspeedIntervalLevels:{...i.tierTickspeedIntervalLevels,[e]:n+1}}},Bd=e=>t=>({...t,computeAutoChargeEnabled:!!e}),Vd=e=>t=>t.autoOverclock?{...t,autoOverclockEnabled:!!e}:t,Hd=(e,t)=>n=>n.tierTickspeedAutobuyer?.[e]?{...n,tierTickspeedAutobuyerEnabled:{...n.tierTickspeedAutobuyerEnabled,[e]:!!t}}:n,Ud=e=>t=>(t.autoPurge??null)===null?t:{...t,autoPurgeEnabled:!!e},Wd=e=>{if(bi(e)||Xr(e,`clockSpeedDisabled`)||!cn(e))return e;let t=e.globalTickspeedMultiplier??null,n=on(t??0),r=e.resources.base??0;return r<n?e:{...e,resources:{...e.resources,[O]:r-n},globalTickspeedMultiplier:(t??0)+1,accelerateBoughtThisCycle:!0}},Gd=e=>{let t=e?.disksBuiltTotal??{},n={};for(let[e,r]of Object.entries(t)){let t=Math.max(0,Math.floor(z(r)));t>0&&(n[e]=t)}let r=e?.diskBuild?.size;if(r!=null){let e=String(r);n[e]=(n[e]??0)+1}let i=e?.diskProvisionPasses??{},a={};for(let[e,t]of Object.entries(i)){let n=Math.max(0,Math.floor(z(t)));n>0&&(a[e]=n)}let o={};for(let[t,n]of Object.entries(e?.dataLakes??{})){let e=Math.max(0,Math.floor(z(n?.capacityLevel??0))),r=Math.max(0,Math.floor(z(n?.purchased??0)));(e>0||r>0)&&(o[t]={capacityLevel:e,purchased:r})}return{lakes:o,byteCreated:e?.byteCreated===!0,disksBuiltTotal:n,diskProvisionPasses:a,capacity:Math.max(8,z(e?.capacity??8)),speedCapacity:Math.max(8,z(e?.speedCapacity??e?.capacity??8))}},Kd=(e,t)=>{let n=e??Gd(null),r=t??Gd(null),i={},a={},o=new Set([...Object.keys(n.disksBuiltTotal??{}),...Object.keys(r.disksBuiltTotal??{}),...Object.keys(n.diskProvisionPasses??{}),...Object.keys(r.diskProvisionPasses??{})]);for(let e of o){let t=n.disksBuiltTotal?.[e]??0,o=r.disksBuiltTotal?.[e]??0,s=n.diskProvisionPasses?.[e]??0,c=r.diskProvisionPasses?.[e]??0,l=t>o||t===o&&s>=c,u=l?t:o,d=l?s:c;u>0&&(i[e]=u),d>0&&(a[e]=d)}let s={};for(let e of new Set([...Object.keys(n.lakes??{}),...Object.keys(r.lakes??{})]))s[e]={capacityLevel:Math.max(n.lakes?.[e]?.capacityLevel??0,r.lakes?.[e]?.capacityLevel??0),purchased:Math.max(n.lakes?.[e]?.purchased??0,r.lakes?.[e]?.purchased??0)};return{lakes:s,byteCreated:n.byteCreated||r.byteCreated,disksBuiltTotal:i,diskProvisionPasses:a,capacity:Math.max(n.capacity??8,r.capacity??8),speedCapacity:Math.max(n.speedCapacity??8,r.speedCapacity??8)}},qd=(e,t)=>{let n=us(e),r=e.intro?.disksBuiltTotal?.[n]??0,i=t.disksBuiltTotal?.[String(n)]??t.disksBuiltTotal?.[n]??0;return r<i?!0:r>i?!1:ps(e,n)<(t.diskProvisionPasses?.[String(n)]??t.diskProvisionPasses?.[n]??0)},Jd=(e,t)=>{let n=e.intro?.foundryResetCaps;if(!n||(e.intro?.disksBuiltTotal?.[t]??0)!==(n.disksBuiltTotal?.[String(t)]??n.disksBuiltTotal?.[t]??0))return 1/0;let r=ps(e,t),i=n.diskProvisionPasses?.[String(t)]??n.diskProvisionPasses?.[t]??0;return Math.max(0,i-r)},Yd=e=>{let t=e.intro?.foundryResetCaps;if(!t)return e;let n=e,r=!1;if(t.byteCreated&&!n.intro.byteCreated){let e=Aa(n);e!==n&&(n=e,r=!0)}if(!os(n)&&qd(n,t)){let e=Cs(n);e!==n&&(n=e.intro?.diskBuildQueued?{...e,intro:{...e.intro,diskBuildQueuedByReplay:!0}}:e,r=!0)}if(!n.intro?.capacityUpgradeQueued&&!n.intro?.speedUpgradeQueued){let e=!fa(n.intro)&&(t.speedCapacity??t.capacity??0)>(n.intro?.speedCapacity??n.intro?.capacity??0),i=(t.capacity??0)>(n.intro?.capacity??0),a=n;e&&(a=xo(n)),a===n&&i&&(a=To(n)),a!==n&&(n=a,r=!0)}for(let[e,i]of Object.entries(t.lakes??{})){let t=Number(e);if((W(n,t)?.purchased??0)<(i.purchased??0)&&sl(n,t)){let e=ll(t,(i.purchased??0)-(W(n,t)?.purchased??0))(n);e!==n&&(n=e,r=!0)}if(((W(n,t)?.purchased??0)>=(i.purchased??0)||cl(n,t)||Jc(t)(n)>bc(n,t))&&vc(n,t)<(i.capacityLevel??0)){let e=Il(t)(n);e!==n&&(n=e,r=!0)}}return r?n:e},Xd=e=>{let t=Mt().intro,n=e.intro??{},r=n.mainGameUnlocked===!0,i=Kd(n.foundryResetCaps,Gd(n)),a={...t.dataLakes};for(let[e,t]of Object.entries(n.dataLakes??{}))t?.boosterAuto&&a[e]&&(a[e]={...a[e],boosterAuto:!0});return{...e,intro:{...t,dataLakes:a,mainGameUnlocked:r,foundryResetCaps:i,unlockedDiskSteps:la(n),poolExponentBonuses:{...n.poolExponentBonuses??{}}}}},Zd=e=>{if(z(e.resources.base)<si(e))return e;let t=Jr(e);if(!t)return bn(ef(e,!0));let n=Yr(e,t.id),r=z(e.challenges.activeSeconds),i=e.challenges.bestSeconds?.[t.id];return bn({...ef(e,!n),challenges:{...e.challenges,active:null,activeSeconds:0,run:Et(),completed:{...e.challenges.completed,[t.id]:!0},bestSeconds:{...e.challenges.bestSeconds,[t.id]:i===void 0?r:Math.min(i,r)}}})},Qd=e=>t=>{if(!qr(e)||Jr(t)||!ui(t,e))return t;let n={...Mt().challenges,...t.challenges};return{...ef(t,!1),challenges:{...n,active:e,activeSeconds:0,enteredCount:n.enteredCount+1,run:Et()}}},$d=e=>Jr(e)?bn({...ef(e,!1),challenges:{...e.challenges,active:null,activeSeconds:0,exitedCount:e.challenges.exitedCount+1,run:Et()}}):e,ef=(e,t)=>{let n=e.prestigeDoublePpLevel??0,r=Kr(e),i=t?Pi(e.resources[O],n,r):0,a=Mt(),o=e.purge.count+ +!!t,s={id:`p${o}-${Date.now()}`,at:Date.now(),purgeNumber:o,pointsAwarded:i,moneyBits:z(e.resources[O])},c=e.prestigeMuseum??a.prestigeMuseum,l=(t?[s,...c.history??[]]:c.history??[]).slice(0,20),u=new Set(l.map(e=>e.id)),d=(c.pinnedIds??[]).filter(e=>u.has(e));return nn({...a,challenges:e.challenges??a.challenges,achievements:e.achievements??a.achievements,daily:e.daily??a.daily,prestigeMuseum:{history:l,pinnedIds:d},intro:{...a.intro,mainGameUnlocked:e.intro?.mainGameUnlocked??a.intro.mainGameUnlocked,capacity:e.intro?.capacity??a.intro.capacity,byteCreated:e.intro?.byteCreated??a.intro.byteCreated,bits:e.intro?.bits??a.intro.bits,foundryResetCaps:e.intro?.foundryResetCaps??a.intro.foundryResetCaps,poolExponentBonuses:{...e.intro?.poolExponentBonuses??{}},disks:e.intro?.disks??a.intro.disks,disksBuiltTotal:e.intro?.disksBuiltTotal??a.intro.disksBuiltTotal,diskCache:e.intro?.diskCache??a.intro.diskCache,diskBuild:e.intro?.diskBuild??a.intro.diskBuild,diskProvisionPasses:e.intro?.diskProvisionPasses??a.intro.diskProvisionPasses,diskBuildQueued:e.intro?.diskBuildQueued??a.intro.diskBuildQueued,diskBuildQueuedByReplay:e.intro?.diskBuildQueuedByReplay??a.intro.diskBuildQueuedByReplay,capacityUpgradeQueued:e.intro?.capacityUpgradeQueued??a.intro.capacityUpgradeQueued,capacityUpgradeProgress:e.intro?.capacityUpgradeProgress??a.intro.capacityUpgradeProgress,speedCapacity:e.intro?.speedCapacity,unlockedDiskSteps:la(e.intro),speedUpgradeQueued:e.intro?.speedUpgradeQueued??a.intro.speedUpgradeQueued,speedUpgradeProgress:e.intro?.speedUpgradeProgress??a.intro.speedUpgradeProgress,poolBuffers:e.intro?.poolBuffers??a.intro.poolBuffers,diskReadCacheFlush:e.intro?.diskReadCacheFlush??a.intro.diskReadCacheFlush,diskWriteCache:e.intro?.diskWriteCache??a.intro.diskWriteCache,dataLakes:e.intro?.dataLakes??a.intro.dataLakes,poolResetCount:e.intro?.poolResetCount??a.intro.poolResetCount,poolResetRebuildingCount:e.intro?.poolResetRebuildingCount??a.intro.poolResetRebuildingCount,computeCores:e.intro?.computeCores??a.intro.computeCores,computeCoresEverEarned:e.intro?.computeCoresEverEarned??a.intro.computeCoresEverEarned,computeNodes:e.intro?.computeNodes??a.intro.computeNodes,computeClusters:e.intro?.computeClusters??a.intro.computeClusters,computeNetworks:e.intro?.computeNetworks??a.intro.computeNetworks,computeGrids:e.intro?.computeGrids??a.intro.computeGrids,computeFabrics:e.intro?.computeFabrics??a.intro.computeFabrics,computeClouds:e.intro?.computeClouds??a.intro.computeClouds,computeDatacenters:e.intro?.computeDatacenters??a.intro.computeDatacenters,computeSupercomputers:e.intro?.computeSupercomputers??a.intro.computeSupercomputers,computeMegacomputers:e.intro?.computeMegacomputers??a.intro.computeMegacomputers,computeMergePageUnlocked:e.intro?.computeMergePageUnlocked??a.intro.computeMergePageUnlocked,chargerUnlockProgress:{...e.intro?.chargerUnlockProgress??{}},autoMergeCoresIntoNode:e.intro?.autoMergeCoresIntoNode??a.intro.autoMergeCoresIntoNode,autoMergeNodesIntoCluster:e.intro?.autoMergeNodesIntoCluster??a.intro.autoMergeNodesIntoCluster,autoMergeClustersIntoNetwork:e.intro?.autoMergeClustersIntoNetwork??a.intro.autoMergeClustersIntoNetwork,autoMergeNetworksIntoGrid:e.intro?.autoMergeNetworksIntoGrid??a.intro.autoMergeNetworksIntoGrid,autoMergeGridsIntoFabric:e.intro?.autoMergeGridsIntoFabric??a.intro.autoMergeGridsIntoFabric,autoMergeFabricsIntoCloud:e.intro?.autoMergeFabricsIntoCloud??a.intro.autoMergeFabricsIntoCloud,autoMergeCloudsIntoDatacenter:e.intro?.autoMergeCloudsIntoDatacenter??a.intro.autoMergeCloudsIntoDatacenter,autoMergeDatacentersIntoSupercomputer:e.intro?.autoMergeDatacentersIntoSupercomputer??a.intro.autoMergeDatacentersIntoSupercomputer,autoMergeSupercomputersIntoMegacomputer:e.intro?.autoMergeSupercomputersIntoMegacomputer??a.intro.autoMergeSupercomputersIntoMegacomputer,computeAutoBoostType:e.intro?.computeAutoBoostType??a.intro.computeAutoBoostType,computeAutoBoostEnabled:e.intro?.computeAutoBoostEnabled??a.intro.computeAutoBoostEnabled,computeCoresMergeRemainingSeconds:e.intro?.computeCoresMergeRemainingSeconds??a.intro.computeCoresMergeRemainingSeconds,computeNodesMergeRemainingSeconds:e.intro?.computeNodesMergeRemainingSeconds??a.intro.computeNodesMergeRemainingSeconds,computeClustersMergeRemainingSeconds:e.intro?.computeClustersMergeRemainingSeconds??a.intro.computeClustersMergeRemainingSeconds,computeNetworksMergeRemainingSeconds:e.intro?.computeNetworksMergeRemainingSeconds??a.intro.computeNetworksMergeRemainingSeconds,computeGridsMergeRemainingSeconds:e.intro?.computeGridsMergeRemainingSeconds??a.intro.computeGridsMergeRemainingSeconds,computeFabricsMergeRemainingSeconds:e.intro?.computeFabricsMergeRemainingSeconds??a.intro.computeFabricsMergeRemainingSeconds,computeCloudsMergeRemainingSeconds:e.intro?.computeCloudsMergeRemainingSeconds??a.intro.computeCloudsMergeRemainingSeconds,computeDatacentersMergeRemainingSeconds:e.intro?.computeDatacentersMergeRemainingSeconds??a.intro.computeDatacentersMergeRemainingSeconds,computeSupercomputersMergeRemainingSeconds:e.intro?.computeSupercomputersMergeRemainingSeconds??a.intro.computeSupercomputersMergeRemainingSeconds},autobuyers:e.autobuyers??a.autobuyers,autobuyersEnabled:e.autobuyersEnabled??a.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??a.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??a.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??a.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??a.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??a.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??a.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??a.autoPurgeEnabled,autoPurgeSettings:e.autoPurgeSettings??a.autoPurgeSettings,prestigeDoublePpLevel:e.prestigeDoublePpLevel??a.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??a.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??a.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??a.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??a.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??a.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??a.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??a.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??a.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??a.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??a.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??a.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??a.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??a.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??a.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??a.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??a.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??a.autoGlobalTickspeedEnabled,era:e.era??a.era,eons:e.eons??a.eons,hyperscalerCount:e.hyperscalerCount??a.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??a.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??a.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??a.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked||z(e.purge.points)+i>=100,owned:e.computeFlops?.owned??a.computeFlops.owned,cumulativeBoost:a.computeFlops.cumulativeBoost},purge:{...a.purge,points:z(e.purge.points)+i,count:o,unboundedUnlocked:r,highestAward:Math.max(z(e.purge.highestAward??0),i)}})},tf=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return!(n.history??[]).some(t=>t.id===e)||(n.pinnedIds??[]).includes(e)||(n.pinnedIds??[]).length>=10?t:{...t,prestigeMuseum:{history:n.history??[],pinnedIds:[...n.pinnedIds??[],e]}}},nf=e=>t=>{let n=t.prestigeMuseum??{history:[],pinnedIds:[]};return(n.pinnedIds??[]).includes(e)?{...t,prestigeMuseum:{history:n.history??[],pinnedIds:(n.pinnedIds??[]).filter(t=>t!==e)}}:t},rf=(e,t)=>t!==e&&Xr(t,`bitRot`)?hi(t,{cycleSeconds:0}):t,af=(e,t)=>t===e?t:bn(t),of=e=>rf(e,af(e,cf(e))),sf=e=>{let t=uf(e);return t===e?rf(e,af(e,t)):Sr(lf(e,rf(e,af(e,t))))},cf=e=>{if(bi(e))return e;let t=Fr(e);if(Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)<Ir(e))return e;let n=Mt(),r=Pr(e),i=Object.fromEntries(b.map((t,n)=>[t.id,(e.scaleUpTierCounts?.[t.id]??0)+ +(n<=r)])),a={...e.everUnlockedTierIds??n.everUnlockedTierIds,[t.id]:!0,...b[r+1]&&r+1<ni(e)?{[b[r+1].id]:!0}:{}};return{...n,intro:e.intro??n.intro,autobuyers:e.autobuyers??n.autobuyers,autobuyersEnabled:e.autobuyersEnabled??n.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??n.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??n.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??n.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??n.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??n.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??n.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??n.autoPurgeEnabled,autoPurgeSettings:e.autoPurgeSettings??n.autoPurgeSettings,prestigeDoublePpLevel:e.prestigeDoublePpLevel??n.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??n.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??n.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??n.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??n.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??n.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??n.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??n.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??n.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??n.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??n.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??n.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??n.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??n.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??n.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??n.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??n.autoGlobalTickspeedEnabled,everUnlockedTierIds:a,prestigeMuseum:e.prestigeMuseum??n.prestigeMuseum,era:e.era??n.era,eons:e.eons??n.eons,hyperscalerCount:e.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??n.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??n.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??n.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??n.computeFlops.owned,cumulativeBoost:n.computeFlops.cumulativeBoost},challenges:e.challenges??n.challenges,achievements:e.achievements??n.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,manualPurchaseThisCycle:!!e.manualPurchaseThisCycle,daily:e.daily??n.daily,purge:{...e.purge,xp:n.purge.xp,highestMilestone:n.purge.highestMilestone},scaleUpCount:(e.scaleUpCount??0)+1,scaleUpTierCounts:i,scaleUpTargetTierIndex:z(e.scaleUpTargetTierIndex??0)+1,overclockLastClaimCompletedLevels:zr(e)??n.overclockLastClaimCompletedLevels}},lf=(e,t)=>{let n=Math.max(0,(e.purchaseLevels?.[ri(e).id]??1)-1),r={pings:0,...t.achievements?.counters},i=zr(e)===null,a={...r};return i?a.maxFirstOverclock=Math.max(r.maxFirstOverclock??0,n):!e.accelerateBoughtThisCycle&&br(e,`overclockStep1`)&&(a.acceleratelessOverclocks=1),Kr(e)&&n>=12&&br(e,`overclockStep2`)&&(a.overflowDeepOverclock=1),{...t,achievements:{earned:{},...t.achievements,counters:a}}},uf=e=>{if(bi(e)||Xr(e,`overclockDisabled`))return e;let t=ri(e),n=Math.max(0,(e.purchaseLevels?.[t.id]??1)-1);if(n<Lr(e))return e;let r=Mt();return{...r,intro:e.intro??r.intro,autobuyers:e.autobuyers??r.autobuyers,autobuyersEnabled:e.autobuyersEnabled??r.autobuyersEnabled,autobuyerIntervalLevels:e.autobuyerIntervalLevels??r.autobuyerIntervalLevels,automationIntervalLevels:e.automationIntervalLevels??r.automationIntervalLevels,tierTickspeedIntervalLevels:e.tierTickspeedIntervalLevels??r.tierTickspeedIntervalLevels,tierTickspeedAutobuyer:e.tierTickspeedAutobuyer??r.tierTickspeedAutobuyer,tierTickspeedAutobuyerEnabled:e.tierTickspeedAutobuyerEnabled??r.tierTickspeedAutobuyerEnabled,autoPurge:e.autoPurge??r.autoPurge,autoPurgeEnabled:e.autoPurgeEnabled??r.autoPurgeEnabled,autoPurgeSettings:e.autoPurgeSettings??r.autoPurgeSettings,prestigeDoublePpLevel:e.prestigeDoublePpLevel??r.prestigeDoublePpLevel,autoScaleUp:e.autoScaleUp??r.autoScaleUp,autoScaleUpEnabled:e.autoScaleUpEnabled??r.autoScaleUpEnabled,autoXpTickspeed:e.autoXpTickspeed??r.autoXpTickspeed,autoXpTickspeedEnabled:e.autoXpTickspeedEnabled??r.autoXpTickspeedEnabled,autoOverclock:e.autoOverclock??r.autoOverclock,autoOverclockEnabled:e.autoOverclockEnabled??r.autoOverclockEnabled,computeAutoChargeEnabled:e.computeAutoChargeEnabled??r.computeAutoChargeEnabled,computeAutoBoostUnlocked:e.computeAutoBoostUnlocked??r.computeAutoBoostUnlocked,playtimeBonusUnlocked:e.playtimeBonusUnlocked??r.playtimeBonusUnlocked,buyMaxUnlocked:e.buyMaxUnlocked??r.buyMaxUnlocked,sleepModeCapLevel:e.sleepModeCapLevel??r.sleepModeCapLevel,cacheWarmUnlocked:e.cacheWarmUnlocked??r.cacheWarmUnlocked,prestigeSpeedBonusUnlocked:e.prestigeSpeedBonusUnlocked??r.prestigeSpeedBonusUnlocked,speedBonusGrandfathered:e.speedBonusGrandfathered??r.speedBonusGrandfathered,activePlaySeconds:e.activePlaySeconds??r.activePlaySeconds,autoGlobalTickspeed:e.autoGlobalTickspeed??r.autoGlobalTickspeed,autoGlobalTickspeedEnabled:e.autoGlobalTickspeedEnabled??r.autoGlobalTickspeedEnabled,prestigeMuseum:e.prestigeMuseum??r.prestigeMuseum,era:e.era??r.era,eons:e.eons??r.eons,hyperscalerCount:e.hyperscalerCount??r.hyperscalerCount,eonsUpgrades:e.eonsUpgrades??r.eonsUpgrades,computeFlopsAutobuyers:e.computeFlopsAutobuyers??r.computeFlopsAutobuyers,computeFlopsAutobuyersEnabled:e.computeFlopsAutobuyersEnabled??r.computeFlopsAutobuyersEnabled,computeFlops:{pageUnlocked:!!e.computeFlops?.pageUnlocked,owned:e.computeFlops?.owned??r.computeFlops.owned,cumulativeBoost:r.computeFlops.cumulativeBoost},challenges:e.challenges??r.challenges,achievements:e.achievements??r.achievements,accelerateBoughtThisCycle:!!e.accelerateBoughtThisCycle,manualPurchaseThisCycle:!!e.manualPurchaseThisCycle,daily:e.daily??r.daily,purge:{...e.purge,xp:r.purge.xp,highestMilestone:r.purge.highestMilestone},scaleUpCount:r.scaleUpCount,overclockLastClaimCompletedLevels:n}},df=e=>t=>t.autoXpTickspeed?{...t,autoXpTickspeedEnabled:!!e}:t,ff=e=>t=>t.autoScaleUp?{...t,autoScaleUpEnabled:!!e}:t,pf=e=>t=>t.autoGlobalTickspeed?{...t,autoGlobalTickspeedEnabled:!!e}:t,mf=e=>t=>gf(e,!1)(t),hf=e=>t=>{let n=z(t.owned?.[ri(t).id])<=0,r=gf(e,!0)(t);if(!n||r===t||!le.enabled)return r;let i=r.achievements??Mt().achievements;return Sr({...r,achievements:{...i,counters:{...i.counters,emptyRestages:(i.counters?.emptyRestages??0)+1}}})},gf=(e,t)=>n=>{if(bi(n)||Xr(n,`restageDisabled`)||!un(n))return n;let r=ri(n).id;if(!t&&z(n.owned?.[r])<=0)return n;let i=Math.floor(z(e));if(i<=0)return n;let a=n.lastTierXpConsumed??0;if(i<fn(a))return n;let o=z(n.purge.xp);if(i>o)return n;let s=b.filter(e=>e.id!==r).map(e=>e.id);return{...n,purge:{...n.purge,xp:o-i},lastTierXpConsumed:a+i,owned:{...n.owned,...s.reduce((e,t)=>({...e,[t]:0}),{})},resources:{...n.resources,[O]:0,...s.reduce((e,t)=>({...e,[t]:0}),{})}}},_f=e=>{let t=Zd(e);if(t===e||!le.enabled)return t;let n=Kr(e)&&z(e.resources?.base)>=8e100?cr(t,`overflowPurges`,1,`max`):t;if(t.purge.count<=e.purge.count)return n;let r=cr(n,`purges`,sr(e)+1,`max`);return e.manualPurchaseThisCycle?r:cr(r,`handsFreePurges`,1,`max`)},vf=e=>{let t=Or(e);if(t===e||!le.enabled)return t;let n=Hn(e),r=z(t.activePlaySeconds??0),i=t.achievements?.counters?.lastRebootPlaySeconds,a=cr(t,`purges`,sr(e),`max`);return a=cr(a,`kernelsEarned`,Math.max(a.achievements.counters.kernelsEarned??0,z(e.eons?.balance??0))+n,`max`),i!=null&&r-i<=3600&&(a=cr(a,`quickReboots`,1,`max`)),cr(a,`lastRebootPlaySeconds`,r,`set`)},yf=e=>{let t=Xd(e);return t===e?t:cr(t,`reformats`,1)},bf=(e,t)=>n=>{let r=od(e,t)(n);if(r===n||!le.enabled)return r;let i=e===`burst`?cr(r,`turboBoosts`,1,`max`):r;return(qu(i.intro,e)?.queue.length??0)>=10?cr(i,`maxBoostStack`,1,`max`):i},xf=(e,t,n)=>{let r=[...e?.key===t?e.times:[],n].filter(e=>n-e<=ye),i=r.length>=10;return{rush:{key:t,times:i?[]:r},hit:i}},Sf=()=>({key:null,times:[]}),Cf=e=>cr(e,`buyMaxRushes`,1,`max`),wf=e=>t=>{let n=e(t);return n===t||n.manualPurchaseThisCycle?n:{...n,manualPurchaseThisCycle:!0}},Tf=`-ms-`,Ef=`-moz-`,Df=`-webkit-`,Of=`comm`,kf=`rule`,Af=`decl`,jf=`@import`,Mf=`@namespace`,Nf=`@keyframes`,Pf=`@layer`,Ff=Math.abs,If=String.fromCharCode,Lf=Object.assign;function Rf(e,t){return Hf(e,0)^45?(((t<<2^Hf(e,0))<<2^Hf(e,1))<<2^Hf(e,2))<<2^Hf(e,3):0}function zf(e){return e.trim()}function Bf(e,t){return(e=t.exec(e))?e[0]:e}function q(e,t,n){return e.replace(t,n)}function Vf(e,t,n){return e.indexOf(t,n)}function Hf(e,t){return e.charCodeAt(t)|0}function Uf(e,t,n){return e.slice(t,n)}function Wf(e){return e.length}function Gf(e){return e.length}function J(e,t){return t.push(e),e}function Kf(e,t){return e.map(t).join(``)}function qf(e,t){return e.filter(function(e){return!Bf(e,t)})}var Jf=1,Yf=1,Xf=0,Zf=0,Qf=0,$f=``;function ep(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:Jf,column:Yf,length:o,return:``,siblings:s}}function tp(e,t){return Lf(ep(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function np(e){for(;e.root;)e=tp(e.root,{children:[e]});J(e,e.siblings)}function rp(){return Qf}function ip(){return Qf=Zf>0?Hf($f,--Zf):0,Yf--,Qf===10&&(Yf=1,Jf--),Qf}function Y(){return Qf=Zf<Xf?Hf($f,Zf++):0,Yf++,Qf===10&&(Yf=1,Jf++),Qf}function ap(){return Hf($f,Zf)}function op(){return Zf}function sp(e,t){return Uf($f,e,t)}function cp(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function lp(e){return Jf=Yf=1,Xf=Wf($f=e),Zf=0,[]}function up(e){return $f=``,e}function dp(e){return zf(sp(Zf-1,mp(e===91?e+2:e===40?e+1:e)))}function fp(e){for(;(Qf=ap())&&Qf<33;)Y();return cp(e)>2||cp(Qf)>3?``:` `}function pp(e,t){for(;--t&&Y()&&!(Qf<48||Qf>102||Qf>57&&Qf<65||Qf>70&&Qf<97););return sp(e,op()+(t<6&&ap()==32&&Y()==32))}function mp(e){for(;Y();)switch(Qf){case e:return Zf;case 34:case 39:e!==34&&e!==39&&mp(Qf);break;case 40:e===41&&mp(e);break;case 92:Y()}return Zf}function hp(e,t){for(;Y()&&e+Qf!==57&&(e+Qf!==84||ap()!==47););return`/*`+sp(t,Zf-1)+`*`+If(e===47?e:Y())}function gp(e){for(;!cp(ap());)Y();return sp(e,Zf)}function _p(e){return up(vp(``,null,null,null,[``],e=lp(e),0,[0],e))}function vp(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=Y()){case 40:if(m!=108&&Hf(C,d-1)==58){Vf(C+=q(dp(v),`&`,`&\f`),`&\f`,Ff(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=dp(v);break;case 9:case 10:case 13:case 32:C+=fp(m);break;case 92:C+=pp(op()-1,7);continue;case 47:switch(ap()){case 42:case 47:J(bp(hp(Y(),op()),t,n,c),c),(cp(m||1)==5||cp(ap()||1)==5)&&Wf(C)&&Uf(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=Wf(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=q(C,/\f/g,``)),p>0&&(Wf(C)-d||h===0&&m===47)&&J(p>32?xp(C+`;`,r,n,d-1,c):xp(q(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(J(S=yp(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)vp(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(Hf(C,3)===110)break;case 108:if(Hf(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?vp(e,S,S,r&&J(yp(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):vp(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+Wf(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&ip()==125)continue}switch(C+=If(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(Wf(C)-1)*_,_=1;break;case 64:ap()===45&&(C+=dp(Y())),f=ap(),u=d=Wf(y=C+=gp(op())),v++;break;case 45:m===45&&Wf(C)==2&&(h=0)}}return a}function yp(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=Gf(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=Uf(e,f+1,f=Ff(g=o[h])),b=e;v<m;++v)(b=zf(g>0?p[v]+` `+y:q(y,/&\f/g,p[v])))&&(c[_++]=b);return ep(e,t,n,i===0?kf:s,c,l,u,d)}function bp(e,t,n,r){return ep(e,t,n,Of,If(rp()),Uf(e,2,-2),0,r)}function xp(e,t,n,r,i){return ep(e,t,n,Af,Uf(e,0,r),Uf(e,r+1,-1),r,i)}function Sp(e,t,n){switch(Rf(e,t)){case 5103:return Df+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return Df+e+e;case 4855:return Df+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return Ef+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Df+e+Ef+e+Tf+e+e;case 5936:switch(Hf(e,t+11)){case 114:return Df+e+Tf+q(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return Df+e+Tf+q(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return Df+e+Tf+q(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return Df+e+Tf+e+e;case 6165:return Df+e+Tf+`flex-`+e+e;case 5187:return Df+e+q(e,/(\w+).+(:[^]+)/,Df+`box-$1$2`+Tf+`flex-$1$2`)+e;case 5443:return Df+e+Tf+`flex-item-`+q(e,/flex-|-self/g,``)+(Bf(e,/flex-|baseline/)?``:Tf+`grid-row-`+q(e,/flex-|-self/g,``))+e;case 4675:return Df+e+Tf+`flex-line-pack`+q(e,/align-content|flex-|-self/g,``)+e;case 5548:return Df+e+Tf+q(e,`shrink`,`negative`)+e;case 5292:return Df+e+Tf+q(e,`basis`,`preferred-size`)+e;case 6060:return Df+`box-`+q(e,`-grow`,``)+Df+e+Tf+q(e,`grow`,`positive`)+e;case 4554:return Df+q(e,/([^-])(transform)/g,`$1`+Df+`$2`)+e;case 6187:return q(q(q(e,/(zoom-|grab)/,Df+`$1`),/(image-set)/,Df+`$1`),e,``)+e;case 5495:case 3959:return q(e,/(image-set\([^]*)/,Df+"$1$`$1");case 4968:return q(q(e,/(.+:)(flex-)?(.*)/,Df+`box-pack:$3`+Tf+`flex-pack:$3`),/space-between/,`justify`)+Df+e+e;case 4200:if(!Bf(e,/flex-|baseline/))return Tf+`grid-column-align`+Uf(e,t)+e;break;case 2592:case 3360:return Tf+q(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,Bf(e.props,/grid-\w+-end/)})?~Vf(e+(n=n[t].value),`span`,0)?e:Tf+q(e,`-start`,``)+e+Tf+`grid-row-span:`+(~Vf(n,`span`,0)?Bf(n,/\d+/):+Bf(n,/\d+/)-Bf(e,/\d+/))+`;`:Tf+q(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return Bf(e.props,/grid-\w+-start/)})?e:Tf+q(q(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return q(e,/(.+)-inline(.+)/,Df+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Wf(e)-1-t>6)switch(Hf(e,t+1)){case 109:if(Hf(e,t+4)!==45)break;case 102:return q(e,/(.+:)(.+)-([^]+)/,`$1`+Df+`$2-$3$1`+Ef+(Hf(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~Vf(e,`stretch`,0)?Sp(q(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return q(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return Tf+n+`:`+r+s+(i?Tf+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(Hf(e,t+6)===121)return q(e,`:`,`:`+Df)+e;break;case 6444:switch(Hf(e,Hf(e,14)===45?18:11)){case 120:return q(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+Df+(Hf(e,14)===45?`inline-`:``)+`box$3$1`+Df+`$2$3$1`+Tf+`$2box$3`)+e;case 100:return q(e,`:`,`:`+Tf)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return q(e,`scroll-`,`scroll-snap-`)+e}return e}function Cp(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function wp(e,t,n,r){switch(e.type){case Pf:if(e.children.length)break;case jf:case Mf:case Af:return e.return=e.return||e.value;case Of:return``;case Nf:return e.return=e.value+`{`+Cp(e.children,r)+`}`;case kf:if(!Wf(e.value=e.props.join(`,`)))return``}return Wf(n=Cp(e.children,r))?e.return=e.value+`{`+n+`}`:``}function Tp(e){var t=Gf(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function Ep(e){return function(t){t.root||(t=t.return)&&e(t)}}function Dp(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Af:e.return=Sp(e.value,e.length,n);return;case Nf:return Cp([tp(e,{value:q(e.value,`@`,`@`+Df)})],r);case kf:if(e.length)return Kf(n=e.props,function(t){switch(Bf(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:np(tp(e,{props:[q(t,/:(read-\w+)/,`:`+Ef+`$1`)]})),np(tp(e,{props:[t]})),Lf(e,{props:qf(n,r)});break;case`::placeholder`:np(tp(e,{props:[q(t,/:(plac\w+)/,`:`+Df+`input-$1`)]})),np(tp(e,{props:[q(t,/:(plac\w+)/,`:`+Ef+`$1`)]})),np(tp(e,{props:[q(t,/:(plac\w+)/,Tf+`input-$1`)]})),np(tp(e,{props:[t]})),Lf(e,{props:qf(n,r)})}return``})}}function Op(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var kp=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,Ap=`active`,jp=`data-styled-version`,Mp=`6.6.0`,Np=`/*!sc*/
`,Pp=typeof window<`u`&&typeof document<`u`;if(!v.createContext)throw Op(19);function Fp(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var Ip=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:Fp(`REACT_APP_SC_DISABLE_SPEEDY`)??Fp(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),Lp=`sc-keyframes-`,Rp={},zp=new Map,Bp=new Map,Vp=1,Hp=e=>{if(zp.has(e))return zp.get(e);for(;Bp.has(Vp);)Vp++;let t=Vp++;return zp.set(e,t),Bp.set(t,e),t},Up=e=>Bp.get(e),Wp=(e,t)=>{Vp=t+1,zp.set(e,t),Bp.set(t,e)},Gp=Object.freeze([]),Kp=Object.freeze({});function qp(e,t,n=Kp){return e.theme!==n.theme&&e.theme||t||n.theme}var Jp=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Yp=/(^-|-$)/g;function Xp(e){return e.replace(Jp,`-`).replace(Yp,``)}var Zp=/(a)(d)/gi,Qp=e=>String.fromCharCode(e+(e>25?39:97));function $p(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=Qp(t%52)+n;return(Qp(t%52)+n).replace(Zp,`$1-$2`)}var em=5381,tm=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},nm=e=>tm(em,e);function rm(e){return $p(nm(e)>>>0)}function im(e){return e.displayName||e.name||`Component`}function am(e){return typeof e==`string`&&!0}function om(e){return am(e)?`styled.${e}`:`Styled(${im(e)})`}var sm=Symbol.for(`react.memo`),cm=Symbol.for(`react.forward_ref`),lm={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},um={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},dm={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},fm={[cm]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[sm]:dm};function pm(e){return(`type`in(t=e)&&t.type.$$typeof)===sm?dm:`$$typeof`in e?fm[e.$$typeof]:lm;var t}var mm=Object.defineProperty,hm=Object.getOwnPropertyNames,gm=Object.getOwnPropertySymbols,_m=Object.getOwnPropertyDescriptor,vm=Object.getPrototypeOf,ym=Object.prototype;function bm(e,t,n){if(typeof t!=`string`){let r=vm(t);r&&r!==ym&&bm(e,r,n);let i=hm(t).concat(gm(t)),a=pm(e),o=pm(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in um||n&&n[s]||o&&s in o||a&&s in a)){let n=_m(t,s);try{mm(e,s,n)}catch{}}}}return e}function xm(e){return typeof e==`function`}var Sm=Symbol.for(`react.forward_ref`);function Cm(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===Sm&&`styledComponentId`in e}function wm(e,t){return e&&t?e+` `+t:e||t||``}function Tm(e,t){return e.join(t||``)}function Em(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function Dm(e,t,n=!1){if(!n&&!Em(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=Dm(e[n],t[n]);else if(Em(t))for(let n in t)e[n]=Dm(e[n],t[n]);return e}function Om(e,t){Object.defineProperty(e,"toString",{value:t})}var km=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw Op(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+Np;return t}},Am=`style[${kp}][${jp}="${Mp}"]`,jm=RegExp(`^${kp}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Mm=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,Nm=e=>{if(!e)return document;if(Mm(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(Mm(t))return t}return document},Pm=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},Fm=(e,t)=>{let n=(t.textContent??``).split(Np),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(jm);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(Wp(n,t),Pm(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},Im=e=>{let t=Nm(e.options.target).querySelectorAll(Am);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(kp)!==Ap&&(Fm(e,r),r.parentNode&&r.parentNode.removeChild(r))}},Lm=!1;function Rm(){if(!1!==Lm)return Lm;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return Lm=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return Lm=t.getAttribute(`content`)||void 0}return Lm=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var zm=(e,t)=>{if(typeof document>`u`)throw Op(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${kp}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(kp,Ap),i.setAttribute(jp,Mp);let s=t||Rm();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},Bm=class{constructor(e,t){this.element=zm(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw Op(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},Vm=class{constructor(e,t){this.element=zm(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},Hm=Pp,Um={isServer:!Pp,useCSSOMInjection:!Ip},Wm=class e{static registerId(e){return Hp(e)}constructor(e=Kp,t={},n){this.options=Object.assign(Object.assign({},Um),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Pp&&Hm&&(Hm=!1,Im(this)),Om(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=Up(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=kp+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&Pp&&Im(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&Pp&&t.target!==this.options.target&&Nm(this.options.target)!==Nm(t.target)&&Im(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new Bm(t,n):new Vm(t,n))(this.options),new km(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){Hp(e),e.startsWith(Lp)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(Hp(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(Hp(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},Gm=new WeakSet,Km={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function qm(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in Km||e.startsWith(`--`)?String(t).trim():t+`px`}var Jm=47;function Ym(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var Xm=Symbol.for(`sc-keyframes`);function Zm(e){return typeof e==`object`&&!!e&&Xm in e}function Qm(e){return xm(e)&&!(e.prototype&&e.prototype.isReactComponent)}var $m=e=>e==null||!1===e||e===``,eh=Symbol.for(`react.client.reference`);function th(e){return e.$$typeof===eh}function nh(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!$m(r)&&(Array.isArray(r)&&Gm.has(r)||xm(r)?t.push(Ym(n)+`:`,r,`;`):Em(r)?(t.push(n+` {`),nh(r,t),t.push(`}`)):t.push(Ym(n)+`: `+qm(n,r)+`;`))}}function rh(e,t,n,r,i=[]){if($m(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return th(e)?i:Qm(e)&&t?rh(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)rh(e[a],t,n,r,i);return i}return Cm(e)?(i.push(`.${e.styledComponentId}`),i):Zm(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):th(e)?i:Em(e)&&e.toString===Object.prototype.toString?(nh(e,i),i):(i.push(e.toString()),i)}var ih=nm(Mp),ah=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=tm(ih,t),this.baseStyle=n,Wm.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(Qm(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=Tm(rh(r,e,t,n)))}else i+=Tm(rh(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=$p(tm(tm(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=wm(r,a)}}return r}},oh=/&/g;function sh(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function ch(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==Jm||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===Jm&&(o=!1,c++);else if(l!==34&&l!==39||sh(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function lh(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&lh(a.children,t)}return e}function uh({options:e=Kp,plugins:t=Gp}=Kp){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(oh,r).replace(i,a))}),e.prefix&&o.push(Dp),o.push(wp);let s=[],c=Tp(o.concat(Ep(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return ch(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||sh(e,o)){if(s===0){if(t===Jm&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==Jm);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===Jm)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===Jm&&o+1<r&&e.charCodeAt(o+1)===Jm){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:ch(i)):l===0?e:ch(e)}(t),d=_p(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=lh(d,e.namespace)),s=[],Cp(d,c),s},u=e,d=em;for(let e=0;e<t.length;e++)t[e].name||Op(15),d=tm(d,t[e].name);return u!=null&&u.namespace&&(d=tm(d,u.namespace)),u!=null&&u.prefix&&(d=tm(d,`p`)),l.hash=d===em?``:d.toString(),l}var dh=new Wm,fh=uh(),ph=v.createContext({shouldForwardProp:void 0,styleSheet:dh,stylis:fh,stylisPlugins:void 0});ph.Consumer;function mh(){return v.useContext(ph)}var hh=v.createContext(void 0);hh.Consumer;function gh(){let e=v.useContext(hh);if(!e)throw Op(18);return e}function _h(e){let t=v.useContext(hh),n=v.useMemo(()=>function(e,t){if(!e)throw Op(14);if(xm(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw Op(8);return t?Object.assign(Object.assign({},t),e):e}(e.theme,t),[e.theme,t]);return e.children?v.createElement(hh.Provider,{value:n},e.children):null}var vh={};function yh(e,t){let n=typeof e==`string`?Xp(e):`sc`;vh[n]=(vh[n]||0)+1;let r=n+`-`+rm(Mp+n+vh[n]);return t?t+`-`+r:r}function bh(e,t,n){let r=Cm(e),i=e,a=!am(e),{attrs:o=Gp,componentId:s=yh(t.displayName,t.parentComponentId),displayName:c=om(e)}=t,l=t.displayName&&t.componentId?Xp(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new ah(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=v.useContext(hh),u=mh(),d=e.shouldForwardProp||u.shouldForwardProp,f=qp(t,l,a)||Kp,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=xm(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=wm(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=wm(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,_=am(g),y=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,_,m),b=wm(o,s);return h&&(b+=` `+h),p.className&&(b+=` `+p.className),y[_&&g.includes(`-`)?`class`:`className`]=b,n&&(y.ref=n),(0,v.createElement)(g,y)}(m,e,t)}p.displayName=c;let m=v.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?wm(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)Dm(e,n,!0);return e}({},i.defaultProps,e):e}}),Om(m,()=>`.${m.styledComponentId}`),a&&bm(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var xh=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function Sh(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var Ch=e=>(Gm.add(e),e);function wh(e,...t){if(xm(e)||Em(e))return Ch(rh(Sh(Gp,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?rh(n):Ch(rh(Sh(n,t)))}function Th(e,t,n=Kp){if(!t)throw Op(1,t);let r=(r,...i)=>e(t,n,wh(r,...i));return r.attrs=r=>Th(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>Th(e,t,Object.assign(Object.assign({},n),r)),r}var Eh=e=>Th(bh,e),X=Eh;xh.forEach(e=>{X[e]=Eh(e)});var Dh=class{constructor(e,t){this.instanceRules=new Map,this.rules=e,this.componentId=t,this.isStatic=function(e){for(let t=0;t<e.length;t+=1){let n=e[t];if(xm(n)&&!Cm(n))return!1}return!0}(e),Wm.registerId(this.componentId)}removeStyles(e,t){this.instanceRules.delete(e),this.rebuildGroup(t)}renderStyles(e,t,n,r){let i=this.componentId;if(this.isStatic){if(n.hasNameForId(i,i+e))this.instanceRules.has(e)||this.computeRules(e,t,n,r);else{let a=this.computeRules(e,t,n,r);n.insertRules(i,a.name,a.rules)}return}let a=this.instanceRules.get(e);if(this.computeRules(e,t,n,r),!n.server&&a){let t=a.rules,n=this.instanceRules.get(e).rules;if(t.length===n.length){let e=!0;for(let r=0;r<t.length;r++)if(t[r]!==n[r]){e=!1;break}if(e)return}}this.rebuildGroup(n)}computeRules(e,t,n,r){let i=Tm(rh(this.rules,t,n,r)),a={name:this.componentId+e,rules:r(i,``)};return this.instanceRules.set(e,a),a}rebuildGroup(e){let t=this.componentId;e.clearRules(t);for(let n of this.instanceRules.values())e.insertRules(t,n.name,n.rules)}};function Oh(e,...t){let n=wh(e,...t),r=`sc-global-${rm(JSON.stringify(n))}`,i=new Dh(n,r),a=e=>{let t=mh(),n=v.useContext(hh),a;{let e=v.useRef(null);e.current===null&&(e.current=t.styleSheet.allocateGSInstance(r)),a=e.current}t.styleSheet.server&&o(a,e,t.styleSheet,n,t.stylis);{let s=i.isStatic?[a,t.styleSheet,i]:[a,e,t.styleSheet,n,t.stylis,i],c=v.useRef(i);v.useLayoutEffect(()=>{t.styleSheet.server||(c.current!==i&&(t.styleSheet.clearRules(r),c.current=i),o(a,e,t.styleSheet,n,t.stylis))},s),v.useLayoutEffect(()=>()=>{t.styleSheet.server||i.removeStyles(a,t.styleSheet)},[a,t.styleSheet,i])}return t.styleSheet.server&&i.instanceRules.delete(a),null};function o(e,t,n,r,o){if(i.isStatic)i.renderStyles(e,Rp,n,o);else{let s=Object.assign(Object.assign({},t),{theme:qp(t,r,a.defaultProps)});i.renderStyles(e,s,n,o)}}return v.memo(a)}var kh,Ah=class{constructor(e,t){this[kh]=!0,this.inject=(e,t=fh)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=Lp+e,this.rules=t,Hp(this.id),Om(this,()=>{throw Op(12,String(this.name))})}getName(e=fh){return e.hash?this.name+$p(e.hash>>>0):this.name}};function jh(e,...t){let n=Tm(wh(e,...t));return new Ah(rm(n),n)}kh=Xm,`${kp}`,`${kp}`,`${kp}`;var Mh=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),Z=o(((e,t)=>{t.exports=Mh()}))(),Nh=5e3,Ph=X.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  left: 0;
  padding: calc(3.5rem + env(safe-area-inset-top)) 1rem 0;
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1010;
`,Fh=X.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border: 1px solid ${e=>e.theme.color.warn};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.md};
  color: ${e=>e.theme.color.text};
  max-width: 26rem;
  padding: ${e=>e.theme.space.sm} ${e=>e.theme.space.lg};
  text-align: center;
  width: 100%;
`,Ih=X.div`
  color: ${e=>e.theme.color.warn};
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`,Lh=X.div`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  margin-top: ${e=>e.theme.space.xs};
`,Rh=e=>Object.keys(e.achievements?.earned??{}).filter(t=>e.achievements.earned[t]),zh=()=>typeof document<`u`&&document.visibilityState===`hidden`,Bh=e=>{let t=[],n=[],r=0,i=0,a=null,o=!1,s=new Set,c=()=>e(n),l=e=>{let t=setTimeout(()=>{s.delete(t),n=n.filter(t=>t.key!==e.key),c(),u()},Math.max(0,e.hideAt-Date.now()));s.add(t)};function u(){if(!o||(clearTimeout(a),a=null,t.length===0||zh()||n.length>=5))return;let e=r+250-Date.now();if(e>0){a=setTimeout(u,e);return}let s=t.shift(),d=Date.now();i+=1;let f={key:`${s}-${i}`,id:s,hideAt:d+Nh};n=[...n,f],r=d,c(),l(f),u()}let d=()=>{zh()||u()};return{mount(){o=!0,n.forEach(l),document.addEventListener(`visibilitychange`,d),u()},unmount(){o=!1,s.forEach(clearTimeout),s.clear(),clearTimeout(a),a=null,document.removeEventListener(`visibilitychange`,d)},enqueue(e){t.push(...e),u()},clearQueue(){t=[]}}};function Vh({state:e,baseline:t}){let[n,r]=(0,v.useState)([]),i=(0,v.useRef)(null),a=(0,v.useRef)(null),o=(0,v.useRef)(null);o.current===null&&(o.current=Bh(r)),(0,v.useEffect)(()=>(o.current.mount(),()=>o.current.unmount()),[]);let s=le.enabled?Rh(e):[],c=s.join(`,`);return(0,v.useEffect)(()=>{let e=new Set(s);(i.current===null||a.current!==t.epoch)&&(i.current!==null&&o.current.clearQueue(),a.current=t.epoch,i.current=new Set(Object.keys(t.earned??{}).filter(e=>t.earned[e])));let n=s.filter(e=>!i.current.has(e)&&Ce[e]);i.current=e,o.current.enqueue(n)},[c,t.epoch]),(0,Z.jsx)(Ph,{"aria-atomic":`false`,"aria-label":`achievement notifications`,"aria-live":`polite`,"aria-relevant":`additions`,role:`status`,children:n.map(({key:e,id:t})=>(0,Z.jsxs)(Fh,{children:[(0,Z.jsx)(Ih,{children:`Achievement unlocked`}),Ce[t].name,vr(Ce[t])&&(0,Z.jsx)(Lh,{children:vr(Ce[t])})]},e))})}var Hh=X.div`
  background: rgba(0, 0, 0, 0.55);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 50;
`,Uh=X.div`
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
`,Wh=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0 0 ${e=>e.theme.space.xs};
  text-transform: uppercase;
`,Gh=X.button`
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
`,Kh=X.span`
  font-size: 1.1rem;
  line-height: 1;
  width: 1.4rem;
`,qh=({open:e,onClose:t,onNavigate:n})=>{if(!e)return null;let r=e=>{n(e),t()};return(0,Z.jsx)(Hh,{"aria-hidden":`false`,onClick:t,onKeyDown:e=>{e.key===`Escape`&&t()},role:`presentation`,children:(0,Z.jsxs)(Uh,{"aria-label":`more menu`,"aria-modal":`true`,onClick:e=>e.stopPropagation(),role:`dialog`,children:[(0,Z.jsx)(Wh,{children:`More`}),(0,Z.jsxs)(Gh,{"aria-label":`open manual`,onClick:()=>r(`info`),type:`button`,children:[(0,Z.jsx)(Kh,{"aria-hidden":`true`,children:`📖`}),`Manual`]}),(0,Z.jsxs)(Gh,{"aria-label":`open milestones`,onClick:()=>r(`milestones`),type:`button`,children:[(0,Z.jsx)(Kh,{"aria-hidden":`true`,children:`🏁`}),`Milestones`]}),(0,Z.jsxs)(Gh,{"aria-label":`open stats`,onClick:()=>r(`stats`),type:`button`,children:[(0,Z.jsx)(Kh,{"aria-hidden":`true`,children:`📊`}),`Stats`]}),le.enabled&&(0,Z.jsxs)(Gh,{"aria-label":`open achievements`,onClick:()=>r(`achievements`),type:`button`,children:[(0,Z.jsx)(Kh,{"aria-hidden":`true`,children:`🏆`}),`Achievements`]}),(0,Z.jsxs)(Gh,{"aria-label":`open settings`,onClick:()=>r(`settings`),type:`button`,children:[(0,Z.jsx)(Kh,{"aria-hidden":`true`,children:`⚙️`}),`Settings`]}),(0,Z.jsxs)(Gh,{"aria-label":`open dev mode`,onClick:()=>r(`dev`),type:`button`,children:[(0,Z.jsx)(Kh,{"aria-hidden":`true`,children:`🛠️`}),`Dev Mode`]})]})})},Jh=X.section`
  background: ${e=>e.$raised?e.theme.color.surfaceRaised:e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.md};
  box-shadow: ${e=>e.theme.shadow.sm};
  color: ${e=>e.theme.color.text};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
`,Yh=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Xh=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
  }
`,Zh=X.div`
  color: ${e=>e.theme.color.text};
  font-size: 1.1rem;
  margin-top: 0.25rem;
`,Qh=X.div`
  color: ${e=>e.theme.color.textMuted??e.theme.color.text};
  font-size: 0.9rem;
  margin-top: 0.15rem;
`,$h=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,eg=X(Jh)`
  gap: 0.4rem;
`,tg=X.h2`
  align-items: center;
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.85rem;
  gap: 0.5rem;
  justify-content: space-between;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,ng=X.button`
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
`,rg=X.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,ig=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  opacity: ${e=>e.$earned?1:.8};
`,ag=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
`,og=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`,sg=X.span`
  color: ${e=>e.$color};
  font-size: 0.82em;
  white-space: nowrap;
`,cg=(e,t,n)=>{let r=hr(e,t.condition);return r?`${n?r.target:Math.min(Math.floor(r.current),r.target)}/${r.target}`:null},lg=e=>{let t=[],n={};return e.forEach(e=>{let r=Se[e.id];r?(n[r.id]||(n[r.id]={key:r.id,name:r.name,levels:[]},t.push(n[r.id])),n[r.id].levels.push(e)):t.push({key:e.id,def:e})}),t},ug=({game:e})=>{let{state:t}=e,[n,r]=(0,v.useState)({}),[i,a]=(0,v.useState)({}),o=(e,t)=>e(e=>({...e,[t]:!e[t]})),s=gh(),c=new Set(Cr(t)),l=I.map(e=>({...e,members:be.filter(t=>t.group===e.id&&!t.platformDependent)})).filter(e=>e.members.length>0).filter(e=>!e.reveal||mr(t,e.reveal)||e.members.some(e=>xr(t,e))),u=Er(t),d=l.reduce((e,n)=>e+Tr(t,n.id).bonus,0),f=l.reduce((e,n)=>e+Tr(t,n.id).total,0);return(0,Z.jsxs)(Yh,{children:[(0,Z.jsxs)(Xh,{children:[(0,Z.jsx)(`h1`,{children:`Achievements`}),(0,Z.jsxs)(Zh,{"aria-label":`total stars ${u} of ${f}`,children:[`⭐ `,u,`/`,f,d>0?` (incl. ${d} bonus)`:``]}),(0,Z.jsxs)(Qh,{"aria-label":`star production bonus`,children:[`+`,Math.round((Dr(t)-1)*100),`% production`]})]}),(0,Z.jsx)($h,{"aria-label":`achievements page`,children:l.map(e=>{let l=e.members.filter(e=>br(t,e.id)).length,u=c.has(e.id),d=Tr(t,e.id);return(0,Z.jsxs)(eg,{"aria-label":`${e.name} achievement group`,children:[(0,Z.jsxs)(tg,{children:[(0,Z.jsxs)(ng,{"aria-expanded":!!n[e.id],"aria-label":`${e.name} group toggle`,onClick:()=>o(r,e.id),type:`button`,children:[n[e.id]?`▾`:`▸`,` `,e.name]}),(0,Z.jsxs)(sg,{$color:u?s.color.good:s.color.textMuted,"aria-label":`${e.name} ${l} of ${e.members.length} earned${u?`, group complete`:``}`,children:[u?`✅ `:``,l,`/`,e.members.length,u&&d.bonus>0?` · ⭐ +${d.bonus}`:``]})]}),n[e.id]&&lg(e.members).map(e=>{if(e.levels){let n=e.levels.filter(e=>br(t,e.id)).length,r=e.levels.length,c=n===r,l=e.levels.find(e=>!br(t,e.id)),u=xr(t,l),d=e.levels.filter(e=>xr(t,e)),f=d.length>0&&e.levels.every(t=>t.bonus===e.levels[0].bonus)?e.levels[0].bonus:null,p=e.levels.length>4,m=[...new Map(d.filter(e=>e.shortBonus&&e.bonus).map(e=>[e.shortBonus,e.bonus]))];return(0,Z.jsxs)(rg,{"aria-label":`${e.name} achievement level ${n} of ${r}`,style:{alignItems:`flex-start`},children:[(0,Z.jsxs)(ig,{$earned:n>0,children:[(0,Z.jsx)(ng,{"aria-expanded":!!i[e.key],"aria-label":`${e.name} details`,onClick:()=>o(a,e.key),type:`button`,children:(0,Z.jsx)(`strong`,{children:e.name})}),!i[e.key]&&l&&!u&&(0,Z.jsxs)(ag,{children:[`Next: `,l.name]}),!i[e.key]&&l&&u&&(0,Z.jsxs)(ag,{children:[`Next: `,_r(l),cg(t,l,!1)?` (${cg(t,l,!1)})`:``]}),!i[e.key]&&l&&u&&vr(l)&&(0,Z.jsxs)(ag,{"aria-label":`${e.name} next reward`,children:[`Reward: `,vr(l)]}),i[e.key]&&f&&(0,Z.jsxs)(ag,{children:[`Reward each level: `,f]}),i[e.key]&&p&&!f&&m.map(([e,t])=>(0,Z.jsxs)(ag,{children:[e,`: `,t]},e)),i[e.key]&&e.levels.map((n,r)=>{let i=br(t,n.id);if(!xr(t,n))return(0,Z.jsxs)(ag,{"aria-label":`${e.name} level ${r+1} not yet revealed`,children:[`🔒 `,r+1,`. `,n.name]},n.id);let a=cg(t,n,i);if(p){let t=f?null:vr(n);return(0,Z.jsxs)(ag,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,_r(n),a&&!i?` (${a})`:``,t?` · ${t}`:``]},n.id)}return(0,Z.jsxs)(og,{children:[(0,Z.jsxs)(ag,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,_r(n),a&&!i?` (${a})`:``]}),!f&&gr(n)&&(0,Z.jsxs)(ag,{"aria-label":`${e.name} level ${r+1} reward ${i?`earned`:`pending`}`,children:[i?`Reward earned`:`Reward`,`: `,gr(n)]})]},n.id)})]}),(0,Z.jsxs)(sg,{$color:c?s.color.good:s.color.textMuted,children:[c?`✅ `:n===0?`🔒 `:``,`Lv `,n,`/`,r]})]},e.key)}let{def:n}=e,r=br(t,n.id),c=n.secret&&!r,l=!c&&!xr(t,n),u=c||l?null:cg(t,n,r),d=c?`???`:n.name;return(0,Z.jsxs)(rg,{"aria-label":`${d} achievement ${r?`earned`:`not yet earned`}`,children:[(0,Z.jsxs)(ig,{$earned:r,children:[c||l?(0,Z.jsx)(`strong`,{children:d}):(0,Z.jsx)(ng,{"aria-expanded":!!i[n.id],"aria-label":`${n.name} details`,onClick:()=>o(a,n.id),type:`button`,children:(0,Z.jsx)(`strong`,{children:d})}),!c&&!l&&!i[n.id]&&(r?vr(n):!n.selfExplanatory)&&(0,Z.jsx)(ag,{"aria-label":`${n.name} summary`,children:r?`Reward earned: ${vr(n)}`:_r(n)}),!c&&!l&&i[n.id]&&(0,Z.jsx)(ag,{children:n.trigger}),!c&&!l&&i[n.id]&&gr(n)&&(0,Z.jsxs)(ag,{"aria-label":`${n.name} reward ${r?`earned`:`pending`}`,children:[r?`Reward earned`:`Reward`,`: `,gr(n)]})]}),(0,Z.jsxs)(sg,{$color:r?s.color.good:s.color.textMuted,children:[u&&!r?`${u} `:``,r?`✅`:`🔒`]})]},n.id)})]},e.id)})})]})},dg=`high`,fg=`normal`,pg=()=>b[b.length-1],mg=[{input:`computeCores`,output:`computeNodes`,auto:`autoMergeCoresIntoNode`},{input:`computeNodes`,output:`computeClusters`,auto:`autoMergeNodesIntoCluster`},{input:`computeClusters`,output:`computeNetworks`,auto:`autoMergeClustersIntoNetwork`},{input:`computeNetworks`,output:`computeGrids`,auto:`autoMergeNetworksIntoGrid`},{input:`computeGrids`,output:`computeFabrics`,auto:`autoMergeGridsIntoFabric`},{input:`computeFabrics`,output:`computeClouds`,auto:`autoMergeFabricsIntoCloud`},{input:`computeClouds`,output:`computeDatacenters`,auto:`autoMergeCloudsIntoDatacenter`},{input:`computeDatacenters`,output:`computeSupercomputers`,auto:`autoMergeDatacentersIntoSupercomputer`},{input:`computeSupercomputers`,output:`computeMegacomputers`,auto:`autoMergeSupercomputersIntoMegacomputer`}],hg=[ou,uu,mu,vu,Su,Eu,Au,Pu,Ru],gg=e=>mg.some((t,n)=>rl(e,n)),_g=e=>(e.intro?.bits??0)>=(e.intro?.capacity??0)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued,vg=e=>!(e.intro?.byteCreated??!1)&&(e.intro?.bits??0)>=8,yg=e=>Ao(e)&&(e.intro?.bits??0)>=Zo(e),bg=1,xg={speedUp:[`autoGlobalTickspeed`,`autoGlobalTickspeedEnabled`],scaleUp:[`autoScaleUp`,`autoScaleUpEnabled`],overclock:[`autoOverclock`,`autoOverclockEnabled`],purge:[`autoPurge`,`autoPurgeEnabled`]},Sg=(e,t)=>{let[n,r]=xg[t];return!!(t===`purge`?(e[n]??null)!==null:e[n]??!1)&&(e[r]??!0)&&jd(e,t)<bg},Cg=(e,t)=>(e.autobuyers?.[t]??null)!==null&&(e.autobuyersEnabled?.[t]??!0)&&xd(e,t)<bg,wg=(e,t)=>e?dg:t?fg:!1,Tg=e=>{if(bi(e))return!1;let t=Gt(e);return b.some(n=>{if(!xi(e)(n)||Cg(e,n.id))return!1;let r=e.purchaseLevels?.[n.id]??1,i=e.purchaseLevelProgress?.[n.id]??0,a=Math.max(0,t-i);return a<=0?!1:Xt(n,r,t,i,Ji(e,n),2**53-1)>=a})},Eg=e=>bi(e)||!cn(e)||Sg(e,`speedUp`)?!1:sn(e),Dg=e=>{if(bi(e)||Sg(e,`scaleUp`))return!1;let t=Fr(e);return Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=Ir(e)},Og=e=>{if(bi(e)||Sg(e,`overclock`))return!1;let t=pg();return xi(e)(t)?Math.max(0,(e.purchaseLevels?.[t.id]??1)-1)>=Lr(e):!1},kg=e=>bi(e)&&!Sg(e,`purge`),Ag=e=>kg(e)||Tg(e)||Eg(e)||Dg(e)||Og(e),jg=[`speedUp`,`scaleUp`,`restage`,`overclock`,`purge`],Mg=e=>{if((e.purge?.count??0)<1||bi(e))return!1;let t=e.purge?.points??0;return jg.some(n=>{if(!Pd(e,n))return!1;let r=di(`global`,n);if(r&&!Yr(e,r.id))return!1;let i=e.automationIntervalLevels?.[n]??0;return i<Ad(n)&&t>=Md(n,i)})},Ng=e=>{if((e.purge?.count??0)<1)return!1;let t=e.purge?.points??0;if(t>=Ni(e.prestigeDoublePpLevel??0)||!e.prestigeSpeedBonusUnlocked&&t>=1||!e.cacheWarmUnlocked&&t>=20)return!0;let n=wn(Sn(e));return n!==null&&t>=n||!e.playtimeBonusUnlocked&&t>=100},Pg=e=>Mg(e)||Ng(e),Fg=e=>Ag(e),Ig=e=>wg(kg(e)||Tg(e),Fg(e)),Lg=e=>_g(e)||vg(e)||go(e)&&!e.intro?.capacityUpgradeQueued&&!e.intro?.speedUpgradeQueued||bo(e)&&(e.intro?.bits??0)>=yo(e.intro)||Ss(e)&&!e.intro?.diskBuildQueued||ss(e)||yg(e),Rg=e=>wg(_g(e)||vg(e),Lg(e)),zg=e=>mg.some(({input:t,output:n,auto:r})=>{if(e.intro?.[r])return!1;let i=e.intro?.[t]??0,a=e.intro?.[n]??0;return i>=8&&(Rl(e,r)<10||a<Zc(e,n))}),Bg=e=>Ll(e)?zg(e)||hg.some(t=>t(e))||gg(e):!1,Vg=e=>Ll(e)?wg(zg(e),Bg(e)):!1,Hg=e=>Dn(e)?gt.some(t=>Mn(e,t.id)):!1,Ug=e=>Hg(e)?fg:!1,Wg=e=>({game:Ig(e),foundry:Rg(e),boosters:Vg(e),compute:Ug(e),perks:Pg(e)?fg:!1}),Gg=`3.25rem`,Kg=jh`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.85; }
`,qg=X.nav`
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
`,Jg=X.button`
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
`,Yg=X.span`
  font-size: 1.05rem;
  line-height: 1;
`,Xg=X.span`
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`,Zg=X.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  display: block;
  position: absolute;
  right: 0.22rem;
  top: 0.18rem;

  ${e=>e.$emphasis===`high`?wh`
    box-shadow: 0 0 0 2px ${e.theme.color.surfaceRaised};
    height: 0.7rem;
    width: 0.7rem;
    animation: ${Kg} 1.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `:wh`
    height: 0.4rem;
    width: 0.4rem;
  `}
`,Qg=({currentPage:e,onNavigate:t,onOpenMore:n,showTiers:r=!0,showBoosters:i=!1,showComputeFlops:a=!1,showPerks:o=!1,showChallenges:s=!1,moreOpen:c=!1,attention:l={}})=>{let u=[{id:`foundry`,ariaLabel:`open byte foundry`,icon:`🔥`,label:`Foundry`,title:`Byte Foundry — Data Stream and Storage`},i&&{id:`boosters`,ariaLabel:`open power`,icon:`⚡`,label:`Power`,title:`Power — Cells, charge chain, Boost`},a&&{id:`compute`,ariaLabel:`open compute`,icon:`🖥`,label:`Compute`,title:`Compute — PP Flops tiers boost Factory production`},r&&{id:`game`,ariaLabel:`open byte factory`,icon:`🏭`,label:`Factory`,title:`Byte Factory — buy and produce`},o&&{id:`perks`,ariaLabel:`open firmware`,icon:`🔧`,label:`Firmware`,title:`Firmware — automation and prestige upgrades`},s&&{id:`challenges`,ariaLabel:`open challenges`,icon:`🏁`,label:`Challenges`,title:`Challenges — Factory and Daily challenges`}].filter(Boolean),d=e===`info`||e===`milestones`||e===`settings`||e===`dev`||c;return(0,Z.jsxs)(qg,{"aria-label":`main navigation`,children:[u.map(n=>{let r=e===n.id,i=l[n.id]||!1;return(0,Z.jsxs)(Jg,{"aria-current":r?`page`:void 0,"aria-label":n.ariaLabel,$active:r,onClick:()=>t(n.id),title:n.title,type:`button`,children:[i&&(0,Z.jsx)(Zg,{$emphasis:i,"aria-label":i===`high`?`important action available`:`action available`}),(0,Z.jsx)(Yg,{"aria-hidden":`true`,children:n.icon}),(0,Z.jsx)(Xg,{children:n.label})]},n.id)}),(0,Z.jsxs)(Jg,{"aria-expanded":c,"aria-haspopup":`dialog`,"aria-label":`open more menu`,$active:d,onClick:n,title:`Manual, Milestones, Settings`,type:`button`,children:[(0,Z.jsx)(Yg,{"aria-hidden":`true`,children:`⋯`}),(0,Z.jsx)(Xg,{children:`More`})]})]})},$g=`calc(${Gg} + env(safe-area-inset-bottom))`,e_={primary:`accent`,success:`good`,prestige:`warn`,info:`info`,smart:`violet`,neutral:`textMuted`,ghost:`textMuted`,danger:`danger`,plain:`text`},t_=({variant:e,color:t,theme:n,disabled:r})=>{let i=e&&e_[e];return i?r?n.color.disabled:n.color[i]:t},n_={white:`255, 255, 255`,darkgrey:`169, 169, 169`},r_=e=>{let t=e.replace(`#`,``),n=t.length===3?t.split(``).map(e=>e+e).join(``):t,r=parseInt(n,16);return`${r>>16&255}, ${r>>8&255}, ${r&255}`},i_=e=>e?e.startsWith(`#`)?r_(e):n_[e]??`255, 255, 255`:`255, 255, 255`,a_=jh`
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--glow-rgb), 0); }
  50% { box-shadow: 0 0 8px 2px rgba(var(--glow-rgb), 0.55); }
`,o_=e=>Math.min(100,Math.max(0,e??0)),s_=({disabled:e,$progress:t,$secondaryProgress:n,$progressColor:r,$secondaryProgressColor:i,theme:a})=>{if(t==null&&n==null)return null;let o=r??a.color.good,s=i??a.color.warn,c=o_(t),l=o_(c+(n??0)),u=e?`20`:`61`,d=e?`20`:`52`;return wh`
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
  color: ${t_};
  border: 1.5px solid ${t_};
  background: ${e=>e.theme.color.surfaceSunken};
  ${s_}
  cursor: ${e=>e.disabled?`not-allowed`:`pointer`};
  --glow-rgb: ${e=>i_(t_(e))};
  animation: ${e=>e.$pulse&&!e.disabled?wh`${a_} 1.8s ease-in-out infinite`:`none`};
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${t_};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,c_=X.span.attrs({"aria-hidden":!0})`
  flex: 0 0 auto;
`,l_=X.span`
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,u_=/^[^\p{L}\p{N}$€£(\[{"'“‘…+\-−×]/u,$=({children:e})=>{let t=Array.isArray(e)?e:[e];if(!t.every(e=>typeof e==`string`||typeof e==`number`))return(0,Z.jsx)(l_,{children:e});let n=t.join(``),r=n.indexOf(` `);return r===-1||!u_.test(n)?(0,Z.jsx)(l_,{children:n}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(c_,{children:n.slice(0,r+1)}),(0,Z.jsx)(l_,{children:n.slice(r+1)})]})},d_=X.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`,f_=X.div`
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
`,p_=X(Jh)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,m_=X.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,h_=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
  text-align: left;
`,g_=({onDismiss:e})=>{let t=(0,v.useRef)(null),n=(0,v.useId)();return(0,v.useEffect)(()=>{t.current?.focus()},[]),(0,Z.jsx)(f_,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":n,children:(0,Z.jsxs)(p_,{$raised:!0,children:[(0,Z.jsx)(m_,{id:n,children:`Save not compatible`}),(0,Z.jsx)(h_,{children:`This save was written by an older version of Tens and can no longer be loaded. It has been cleared so you can start fresh from the Byte Foundry.`}),(0,Z.jsx)(Q,{ref:t,type:`button`,variant:`prestige`,"aria-label":`Start fresh with a new save`,onClick:e,children:`Start fresh`})]})})},__=1e80,v_=30,y_=20,b_=2**53-1,x_=[{id:`10m`,label:`10 minutes`,seconds:600,stepSeconds:1,botCeilingSeconds:540,style:`Hands-on: every second counts`,warmupSeconds:[14400,21600],startExponent:[3,9],modifierCount:[1,2],automations:`mix`,checkInSeconds:null},{id:`1h`,label:`1 hour`,seconds:3600,stepSeconds:5,botCeilingSeconds:3e3,style:`Steady: check in now and then`,warmupSeconds:[7200,14400],startExponent:[3,9],modifierCount:[1,2],automations:`buying`,checkInSeconds:null},{id:`10h`,label:`10 hours`,seconds:36e3,stepSeconds:120,botCeilingSeconds:28800,style:`Passive: a few well-timed decisions`,warmupSeconds:[0,3600],startExponent:[3,8],modifierCount:[1,2],automations:`all`,startPaused:[`scaleUp`,`restage`,`overclock`],checkInSeconds:12600}],S_=[1,2,5],C_=Object.fromEntries(x_.map(e=>[e.id,e])),w_=[{lever:`production`,values:[.25,.5,2,4],describe:e=>`Production ×${e}`},{lever:`clockSpeedPower`,values:[.5,.75,1.5,2],describe:e=>`Accelerate ^${e}`},{lever:`scaleUpPower`,values:[.5,.75,1.5,2],describe:e=>`Scale Up ^${e}`},{lever:`costMultiplier`,values:[.1,.5,5,25],describe:e=>`Costs ×${e}`}],T_=[...b.map(e=>({key:`buy:${e.id}`,group:`buy`,label:e.symbol,unlock:t=>({...t,autobuyers:{...t.autobuyers,[e.id]:1}}),set:t=>fd(e.id,t),isOn:t=>t.autobuyersEnabled?.[e.id]??!0})),...b.map(e=>({key:`tickspeed:${e.id}`,group:`tickspeed`,label:e.symbol,unlock:t=>({...t,tierTickspeedAutobuyer:{...t.tierTickspeedAutobuyer,[e.id]:!0}}),set:t=>Hd(e.id,t),isOn:t=>t.tierTickspeedAutobuyerEnabled?.[e.id]??!0})),{key:`speedUp`,group:`global`,label:`Accelerate`,unlock:e=>({...e,autoGlobalTickspeed:!0}),set:pf,isOn:e=>e.autoGlobalTickspeedEnabled??!0},{key:`scaleUp`,group:`global`,label:`Scale Up`,unlock:e=>({...e,autoScaleUp:!0}),set:ff,isOn:e=>e.autoScaleUpEnabled??!0},{key:`restage`,group:`global`,label:`Restage`,unlock:e=>({...e,autoXpTickspeed:!0}),set:df,isOn:e=>e.autoXpTickspeedEnabled??!0},{key:`overclock`,group:`global`,label:`Overclock`,unlock:e=>({...e,autoOverclock:!0}),set:Vd,isOn:e=>e.autoOverclockEnabled??!0}],E_=Object.fromEntries(T_.map(e=>[e.key,e])),D_=(e,t)=>!!E_[t]?.isOn(e),O_=e=>new Date(e).toISOString().slice(0,10),k_=e=>{let t=new Date(e);return Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()+1)-e},A_=e=>{let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0},j_=e=>{let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}},M_=(e,[t,n])=>t+Math.floor(e()*(n-t+1)),N_=(e,t)=>{let n=T_.map(e=>e.key);if(t===`all`)return n;if(t===`buying`)return n.filter(e=>e.startsWith(`buy:`)||e===`speedUp`);let r=e()<.5,i=n.filter(t=>t===`buy:${b[0].id}`?!0:t.startsWith(`buy:`)?e()<.65:t.startsWith(`tickspeed:`)?r:e()<.5);return i.length===n.length?i.filter(e=>e!==`scaleUp`):i},P_=(e,t)=>e.runLevers===t?e:{...e,runLevers:t},F_=e=>e.startBytes*8,I_=e=>`${e.scaleUpCount??0}|${e.overclockLastClaimCompletedLevels??``}|${e.lastTierXpConsumed??0}`,L_=(e,t,n)=>{let r=P_(t,n.levers);return I_(e)===I_(r)?r:{...r,resources:{...r.resources,[O]:F_(n)}}},R_={buyTier:{make:e=>Zi(e,b_)},tierTickspeed:{make:e=>_d(e)},clockSpeed:{make:()=>Wd},scaleUp:{make:()=>of},overclock:{make:()=>sf},restage:{make:e=>hf(e)},automation:{make:e=>Object.hasOwn(E_,e?.key??``)?E_[e.key].set(!!e.enabled):e=>e}},z_=b[b.length-1],B_=Object.entries({balance:{weight:2,amount:!0,describe:e=>`Reach a balance of ${B(e)} B`},own:{weight:1,amount:!0,wholeUnits:!0,perTier:!0,describe:(e,t)=>`Own ${B(e)} ${t.name}`},levels:{weight:1,perTier:!0,describe:(e,t)=>`Complete ${e} level${e===1?``:`s`} of ${t.name}`},clock:{weight:2,describe:e=>`Reach Accelerate level ${e}`},overclock:{weight:3,describe:e=>`Overclock at ${e} ${z_.symbol} levels`}}).flatMap(([e,t])=>t.perTier?b.map(n=>({key:`${e}:${n.id}`,kind:e,tier:n,...t})):[{key:e,kind:e,...t}]),V_=Object.fromEntries(B_.map(e=>[e.key,e])),H_=Object.fromEntries(B_.map(e=>[e.key,0])),U_={balance:0,clock:0,owned:{},purchaseLevels:{}},W_=(e,t=e)=>({...e,runPeaks:Qr(e.runPeaks??U_,t)}),G_=(e,t,n)=>{let r=t.runPeaks,i={...n,balance:Math.max(n.balance,r.balance/8),clock:Math.max(n.clock,r.clock)};for(let e of b)i[`own:${e.id}`]=Math.max(n[`own:${e.id}`],r.owned[e.id]??0),i[`levels:${e.id}`]=Math.max(n[`levels:${e.id}`],(r.purchaseLevels[e.id]??1)-1);let a=zr(t)??0;return a!==(zr(e)??0)&&(i.overclock=Math.max(n.overclock,a)),i},K_=(e,t,n,r)=>{let i=e.game,a=L_(i,W_(Hi(n,b_)(i)),t);return r&&I_(i)!==I_(a)&&r(a),{game:a,metrics:G_(i,a,e.metrics)}},q_=(e,t,n,r,i)=>{let a=e.game,o=R_[n].make(r)(a);if(o===a)return e;let s=L_(a,W_({...o,runPeaks:a.runPeaks},o),t);return i&&I_(a)!==I_(s)&&i(s),{game:s,metrics:G_(a,s,e.metrics)}},J_=[[`clockSpeed`],...b.map(e=>e.id).reverse().map(e=>[`buyTier`,e]),[`scaleUp`],[`overclock`]],Y_=(e,t,n)=>{let r=e;for(let e=0;e<y_;e++){let e=r;for(let[r,i]of J_)e=q_(e,t,r,i,n);if(e===r)break;r=e}return r},X_=e=>({...e,runPeaks:Qr(U_,e)}),Z_=e=>({game:e,metrics:G_(e,e,H_)}),Q_=(e,t,n,r,i)=>{let a=Y_(Z_(e),t,i),o=[a.metrics];for(let e=0;e<r;e++)a=Y_(K_(a,t,n,i),t,i),o.push(a.metrics);return o},$_=(e,t=0)=>e.map(e=>[t,e,!0]),ev=[$_([`scaleUp`,`restage`,`overclock`]),$_([`scaleUp`,`restage`]),[...$_([`scaleUp`,`restage`]),...$_([`overclock`],1)],[...$_([`scaleUp`,`restage`]),...$_([`overclock`],2)],[...$_([`scaleUp`,`restage`,`overclock`]),[1,`overclock`,!1]],[...$_([`scaleUp`,`restage`,`overclock`]),[2,`scaleUp`,!1],[2,`overclock`,!1]],$_([`overclock`,`restage`])],tv=(e,t)=>{let n=new Map;for(let[r,i,a]of e){let e=r*t;n.set(e,[...n.get(e)??[],[`automation`,{key:i,enabled:a}]])}return[...n].map(([e,t])=>({step:e,actions:t})).sort((e,t)=>e.step-t.step)},nv=(e,t,n,r,i)=>{let a=Z_(e),o=[];for(let e=0;e<=r;e++){e>0&&(a=K_(a,t,n));let r=i.find(t=>t.step===e);if(r)for(let[e,n]of r.actions)a=q_(a,t,e,n);o.push(a.metrics)}return o},rv=(e,t)=>{if(!(e>0))return 0;let n=10**(Math.floor(Math.log10(e))-t+1),r=Math.floor(e/n)*n;for(;r>e;)r-=n;return r},iv=e=>({scaleUps:Math.max(0,...Object.values(e.scaleUpTierCounts??{})),overclock:zr(e)??0}),av=(e,t,n,r)=>{let i=Math.max(t,r);if(!e.amount)return n>i?n:null;for(let e=1;e<=4;e++){let t=rv(n,e);if(t>i)return t}return null},ov=(e,t,n)=>{if(!e.amount){let e=Math.max(n+1,t-Math.max(1,Math.round(t*.2)));return e<t?e:null}let r=t=>e.wholeUnits?Math.ceil(t):t;for(let e of[10,4,2]){let i=r(rv(t/e,1));if(i>n&&i<t)return i}let i=r(rv(Math.sqrt(Math.max(1,n)*t),2));return i>n&&i<t?i:null},sv=(e,t)=>{let n=[...t],r=[];for(;n.length>0;){let t=e()*n.reduce((e,t)=>e+t.weight,0),i=n.findIndex(e=>(t-=e.weight)<0);i<0&&(i=n.length-1),r.push(...n.splice(i,1))}return r},cv=(e,t,n)=>{let r=C_[t],i=n===`fallback`,a=A_(`${e}|${t}|v10|${n}`),o=j_(a),s=i?1e6:S_[Math.floor(o()*S_.length)]*10**M_(o,r.startExponent),c=[];if(!i){let e=[...w_],t=M_(o,r.modifierCount);for(let n=0;n<t;n++){let[t]=e.splice(Math.floor(o()*e.length),1);c.push({lever:t.lever,value:t.values[Math.floor(o()*t.values.length)]})}}let l=Object.fromEntries(c.map(e=>[e.lever,e.value])),u=i?[]:N_(o,r.automations),d=!!r.checkInSeconds&&!i,f=i?0:M_(o,r.warmupSeconds.map(e=>e/v_))*v_,p=r.seconds/r.stepSeconds,m=p/2,h=r.botCeilingSeconds/r.stepSeconds,g=i?h:m+1+Math.floor(o()*(h-m)),_={dateId:e,formatId:t,seed:a,generatorVersion:10,limitSeconds:r.seconds,stepSeconds:r.stepSeconds,startBytes:s,levers:l,conditions:c.map(e=>w_.find(t=>t.lever===e.lever).describe(e.value)),automations:u},v=Mt();v.resources={...v.resources,[O]:F_(_)};for(let e of u)v=E_[e].unlock(v);v=X_(P_(v,l));let y=v;Q_(v,_,v_,f/v_,e=>{y=e});for(let e of i?[]:r.startPaused??[])y=L_(y,E_[e].set(!1)(y),_);y=X_(y);let b=[Z_(y).metrics];for(let e=Z_(y),t=0;t<p;t++)e=K_(e,_,r.stepSeconds),b.push(e.metrics);if(b[p].balance>1e80)return null;let x=b[p],S=i?B_:sv(o,B_),C=(e,t)=>{let n=av(e,t[m][e.key],t[g][e.key],x[e.key]);if(n===null)return null;let i=ov(e,n,x[e.key]);if(i===null)return null;let a=t.findIndex(t=>t[e.key]>=n)*r.stepSeconds;return a>=r.seconds/2&&a<=r.botCeilingSeconds?{objective:e,target:n,attemptMark:i,botSeconds:a}:null},w=null;if(d){let e=ev.map(e=>tv(e,r.checkInSeconds/r.stepSeconds)).map(e=>({plan:e,series:nv(y,_,r.stepSeconds,g,e)})).filter(e=>e.series[g].balance<=__);for(let t of S){let n=e.reduce((e,n)=>!e||n.series[g][t.key]>e.series[g][t.key]?n:e,null),r=n&&C(t,n.series);if(r){w={...r,plan:n.plan};break}}}else{let e=Q_(y,_,r.stepSeconds,g);if(e[g].balance>1e80)return null;for(let t of S)if(w=C(t,e),w){w={...w,plan:null};break}}if(!w)return null;let{objective:T,target:E,attemptMark:D,botSeconds:k,plan:A}=w;return{def:{..._,objective:{key:T.key,kind:T.kind,target:E,label:T.describe(E,T.tier),attemptMark:D,attemptLabel:T.describe(D,T.tier)},headStart:iv(y)},startGame:y,validation:{attempt:n,warmupSeconds:f,botSeconds:k,plan:A}}},lv=new Map,uv=(e,t)=>{let n=`${e}|${t}`,r=lv.get(n);if(!r){for(let n=0;n<8&&!r;n++)r=cv(e,t,n);r??=cv(e,t,`fallback`),lv.size>64&&lv.clear(),lv.set(n,r)}return r},dv=(e,t)=>uv(e,t).def,fv=e=>ue.enabled&&((e.purge?.count??0)>=1||(e.era?.count??0)>=1),pv=e=>e.metrics?.[e.def.objective?.key]??0,mv=e=>pv(e)>=e.def.objective?.target,hv=e=>{let t=e.def.objective;if(!t)return 0;let n=pv(e);if(n>=t.target)return 1;if(!V_[t.key]?.amount)return Math.max(0,n/t.target);let r=Math.log10(Math.max(1,t.target));return r>0?Math.min(1,Math.max(0,Math.log10(Math.max(1,n))/r)):0},gv=(e,t,n)=>({...e,daily:{...e.daily,runs:{...e.daily.runs,[t]:n}}}),_v=(e,t,n)=>{let r=e.daily.runs[t];if(!r)return e;let i=mv(r),a=r.simSeconds>=r.def.limitSeconds;if(!i&&!a)return e;let o=i||pv(r)>=r.def.objective.attemptMark,s=e.daily.results[r.def.dateId]?.[t]??{won:!1,completed:!1,bestSeconds:null,attempts:0},c=i?s.bestSeconds===null?r.simSeconds:Math.min(s.bestSeconds,r.simSeconds):s.bestSeconds,l={won:s.won||i,completed:s.completed||o,bestSeconds:c,attempts:s.attempts+1,lastOutcome:i?`won`:o?`completed`:`expired`,lastFinishedAt:n},u=gv(e,t,null);return{...u,daily:{...u.daily,results:{...u.daily.results,[r.def.dateId]:{...u.daily.results[r.def.dateId],[t]:l}}}}},vv=(e,t)=>n=>{if(!fv(n)||!C_[e]||n.daily.runs[e])return n;let{def:r,startGame:i}=uv(O_(t),e);return gv(n,e,{def:r,game:i,startedAt:t,lastTickAt:t,simSeconds:0,metrics:Z_(i).metrics})},yv=e=>t=>t.daily.runs[e]?gv(t,e,null):t,bv=(e,t,n)=>{let r=e.daily.runs[t];return!!r&&r.def.dateId===O_(n)},xv=(e,t)=>n=>bv(n,e,t)?vv(e,t)(yv(e)(n)):n,Sv=e=>t=>{let n=t;for(let t of x_){let r=n.daily?.runs?.[t.id];if(!r)continue;if(r.def.generatorVersion!==10){n=gv(n,t.id,null);continue}let{stepSeconds:i,limitSeconds:a}=r.def,o=Math.max(0,Math.round((a-r.simSeconds)/i)),s=Math.min(o,Math.max(0,Math.floor((e-r.lastTickAt)/1e3/i))),c=e<r.lastTickAt?e:r.lastTickAt+s*i*1e3;if(s===0&&c===r.lastTickAt&&o>0)continue;let l={game:r.game,metrics:r.metrics},u=0;for(;u<s&&(l=K_(l,r.def,i),u++,!(l.metrics[r.def.objective.key]>=r.def.objective.target)););n=_v(gv(n,t.id,{...r,...l,lastTickAt:c,simSeconds:r.simSeconds+u*i}),t.id,e)}return n},Cv=(e,t,n,r)=>i=>{if(!Object.hasOwn(R_,t))return i;let a=Sv(r)(i),o=a.daily.runs[e];if(!o)return a;let s={game:o.game,metrics:o.metrics},c=q_(s,o.def,t,n);return c===s?a:_v(gv(a,e,{...o,...c}),e,r)},wv=(e,t)=>{let n=Object.values(e.daily?.results?.[t]??{}),r=n.filter(e=>e.won).length,i=+!!n.some(e=>e.won||e.completed);return{wins:r,participation:i,total:r+i}},Tv=X.div`
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
`,Ev=X(Jh)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`,Dv=X.h2`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  margin: 0;
`,Ov=X.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  margin: 0;
  text-align: left;

  p {
    margin: 0;
  }
`,kv=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.space.sm};
  justify-content: center;
  width: 100%;

  > button {
    flex: 1 1 8rem;
    min-width: 0;
  }
`,Av=({open:e,title:t,children:n,confirmLabel:r=`Confirm`,cancelLabel:i=`Cancel`,confirmVariant:a=`prestige`,onConfirm:o,confirmDisabled:s=!1,onCancel:c,ariaLabel:l})=>{let u=(0,v.useRef)(null),d=(0,v.useId)(),f=(0,v.useRef)(c);return f.current=c,(0,v.useEffect)(()=>{if(!e)return;u.current?.focus();let t=e=>{e.key===`Escape`&&(e.preventDefault(),f.current())};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e]),e?(0,Z.jsx)(Tv,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":d,"aria-label":l??t,onClick:e=>{e.target===e.currentTarget&&c()},children:(0,Z.jsxs)(Ev,{$raised:!0,children:[(0,Z.jsx)(Dv,{id:d,children:t}),(0,Z.jsx)(Ov,{children:n}),(0,Z.jsxs)(kv,{children:[(0,Z.jsx)(Q,{ref:u,type:`button`,variant:`neutral`,"aria-label":i,onClick:c,children:i}),(0,Z.jsx)(Q,{type:`button`,variant:a,"aria-label":r,disabled:s,onClick:o,children:r})]})]})}):null},jv={burst:`Turbo`,standard:`Balanced`,sustain:`Eco`},Mv=e=>Zu(e)>0,Nv=e=>Mv(e),Pv=(e,t)=>t<Zu(e),Fv=(e,t)=>t<=Zu(e),Iv=(e,t=0)=>{let n=Ku(e).filter(e=>e.queue[0]>t);if(n.length===0)return null;let r=n.map(e=>{let t=e.queue.length-1,n=e.remainingSeconds+t*Ie[e.type].durationSeconds;return`${jv[e.type]??e.type} ×${Ie[e.type].multiplier} (${qi(n)} left${t>0?`, ${t} queued`:``})`});return`Boosted ×${Xu(e,t+1)} production by Compute Boosts — ${r.join(` + `)}`},Lv=wh`
  --boost-glow: ${e=>e.theme.color.warn};
  box-shadow: 0 0 0 1px var(--boost-glow), 0 0 10px 1px var(--boost-glow);
  animation: ${jh`
  0%, 100% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 6px 0 var(--boost-glow); }
  50% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 14px 2px var(--boost-glow); }
`} 2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Rv={burst:{icon:`💥`,label:`Turbo`},standard:{icon:`⏱️`,label:`Balanced`},sustain:{icon:`🔋`,label:`Eco`}},zv=e=>qi(e).replace(/ 0[ms]$/,``),Bv=(e,t=`symbol`)=>e<=1?b[0][t]:`${b[0][t]}–${b[Math.min(e,b.length)-1][t]}`,Vv=X(Q)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,Hv=X.div`
  display: flex;
  align-items: stretch;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,Uv=`2.8em`,Wv=X(Vv)`
  flex: 0 0 ${Uv};
  width: ${Uv};
  min-width: 0;
  padding-left: 0;
  padding-right: 0;
`,Gv=X.span`
  font-size: 0.78em; /* same em as CompactButton, so the widths match */
  flex: 0 0 ${Uv};
  width: ${Uv};
`,Kv=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,qv=X.div`
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
`,Jv=X.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: left;
  white-space: nowrap;
`,Yv=X.span`
  font-weight: 700;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Xv=X.span`
  color: ${e=>e.theme.color.textMuted};
  text-align: right;
  white-space: nowrap;
`,Zv=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,Qv=e=>{let t=[];for(let n of e){let e=t[t.length-1];e&&e.tierIndex===n?e.count+=1:t.push({tierIndex:n,count:1})}return t},$v=({lane:e,state:t,actions:n})=>{let{type:r,queue:i,remainingSeconds:a}=e,o=Rv[r]??{icon:`⚡`,label:r},s=Wu(r,i[0]),c=Uu(r,i[0]),l=Qv(i),u=l.length-1;return(0,Z.jsx)(Kv,{role:`group`,"aria-label":`${o.label} boost controls`,children:l.map((e,i)=>{let l=i>0,d=e.count*s,f=l?d:a+(e.count-1)*s,p=d>0?Math.min(100,f/d*100):0,m=Bv(e.tierIndex);return(0,Z.jsxs)(Hv,{children:[i===u?K(t,r)?(0,Z.jsx)(Wv,{"aria-label":`pop one queued ${o.label} compute boost`,onClick:()=>n.reclaimComputeBoost(r),title:`Pop: refund the last queued boost`,type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`↩`})}):(0,Z.jsx)(Wv,{"aria-label":`forfeit the ${o.label} compute boost with no refund`,disabled:!id(t,r),onClick:()=>{window.confirm(`Forfeit the ${o.label} boost with no refund?`)&&n.forfeitComputeBoost(r)},title:`Forfeit: end the boost now with no refund — asks for confirmation`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`✕`})}):(0,Z.jsx)(Gv,{"aria-hidden":`true`}),(0,Z.jsxs)(qv,{"aria-label":l?`queued ${o.label} compute boost ${m}`:`active ${o.label} compute boost`,$fill:p,$waiting:l,title:`${o.label} boost ${l?`queued`:`active`}: ×${c} production on ${Bv(e.tierIndex,`name`)}, ${qi(f)}${l?` once it starts`:` left`}`,children:[(0,Z.jsx)(Jv,{children:`${e.count}x`}),(0,Z.jsx)(Yv,{children:`${m} ${o.icon} ×${c}`}),(0,Z.jsx)(Xv,{children:qi(f)})]}),i===0?(0,Z.jsx)(Wv,{"aria-label":`stack the ${o.label} compute boost`,disabled:!nd(t,r),onClick:()=>n.stackComputeBoost(r),title:`Queue another ${zv(s)} ${o.label} boost — up to 10x`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`+`})}):(0,Z.jsx)(Gv,{"aria-hidden":`true`})]},`${e.tierIndex}-${i}`)})})},ey=({state:e,actions:t})=>{let n=Ku(e.intro??{});return n.length===0?null:(0,Z.jsx)(Zv,{role:`group`,"aria-label":`active boost controls`,children:n.map(n=>(0,Z.jsx)($v,{lane:n,state:e,actions:t},n.type))})},ty=({challenge:e,onExit:t})=>{let[n,r]=(0,v.useState)(!1);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Q,{"aria-label":`Exit challenge ${e.id} ${e.codename}`,onClick:()=>r(!0),title:`Abandon this challenge and restart the Factory cycle with no reward`,type:`button`,variant:`prestige`,children:`Exit`}),(0,Z.jsx)(Av,{confirmLabel:`Exit challenge`,onCancel:()=>r(!1),onConfirm:()=>{r(!1),t()},open:n,title:`Exit ${e.id}?`,children:(0,Z.jsx)(`p`,{children:`Exiting restarts the current Factory cycle with no reward (no PP, no Purge count). Your progress in this run is lost.`})})]})},ny=e=>{let t=Math.max(0,Math.floor(Number.isFinite(e)?e:0)),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),i=Math.floor(t%3600/60);return n>0?`${n}d ${r}h`:r>0?`${r}h ${i}m`:i>0?`${i}m ${t%60}s`:`${t}s`},ry=e=>e===8e100?`1 Googol Bytes`:`10^${Math.round(Math.log10(e/8))} Bytes`,iy=e=>`Unlocks at Purge ${li(e)}`,ay=e=>`${e.id} · ${e.target} · ${e.codename}`,oy=(e,t)=>t-e%t,sy=e=>{let t=Jr(e);if(!t)return[];let n=e.challenges.activeSeconds??0,r=e.challenges.run??{};switch(t.effect){case`writeLock`:return[(r.haltSeconds??0)>0?`Production halted: ${ny(Math.ceil(r.haltSeconds))} left`:`Production running`];case`hardRefresh`:return[`Next refresh in ${ny(oy(n,300))} · ${r.refreshes??0} survived`];case`clockDrift`:return[`Next tickspeed loss in ${ny(oy(n,600))}`];case`dutyCycle`:return[`Tickspeed bonus ${Math.floor(n/30)%2==0?`ON`:`OFF`} for ${ny(Math.ceil(oy(n,30)))}`];case`bitRot`:return[`Corruption ${Vt(oi(e))} vs ${Vt(e.resources.base??0)} · ${e.challenges.bitRotLosses??0} cycles lost`];default:return[]}},cy=X.section`
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
`,ly=X.button`
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
`,uy=X.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`,dy=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
`,fy=({state:e,onExit:t,children:n})=>{let[r,i]=(0,v.useState)(!1),a=Jr(e);if(!a)return null;let o=ny(e.challenges.activeSeconds);return(0,Z.jsxs)(cy,{"aria-label":`active challenge banner`,children:[(0,Z.jsxs)(uy,{children:[(0,Z.jsxs)(ly,{"aria-expanded":r,"aria-label":`${a.id} ${a.codename}, ${r?`hide`:`show`} exit`,onClick:()=>i(e=>!e),type:`button`,children:[a.id,` · `,a.codename,` `,(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:r?`▴`:`▾`})]}),(0,Z.jsx)(dy,{children:a.rule}),(0,Z.jsxs)(dy,{"aria-label":`challenge elapsed time ${o}`,children:[`⏱ `,o,` · goal `,ry(a.goal)]}),sy(e).map(e=>(0,Z.jsx)(dy,{"aria-label":`challenge status: ${e}`,children:e},e)),n]}),r&&(0,Z.jsx)(ty,{challenge:a,onExit:t})]})},py=X.b`
  color: ${e=>e.theme.color.text};
  font-size: 1.25em;
  padding: 0.25em 0;
  font-variant-numeric: tabular-nums;
`,my=Object.freeze({removeAds:!1}),hy=()=>({adsAvailable:!1,iapAvailable:!1,init:async()=>{},showRewarded:async()=>({shown:!1,rewarded:!1,reason:`ads_disabled`}),purchase:async()=>({ok:!1,reason:`iap_disabled`}),restore:async()=>({ok:!1,reason:`iap_disabled`}),getEntitlements:async()=>my}),gy=({loadAds:e=null,loadIap:t=null}={})=>{if(!e&&!t)return hy();let n=null,r=null,i=null,a=my,o=()=>(n??=(async()=>{let[n,o]=await Promise.all([e?e().catch(()=>null):null,t?t().catch(()=>null):null]);if(o)try{await o.init(),i=o,a=await i.getEntitlements()}catch{i=null}if(n)try{await n.init(),r=n}catch{r=null}})(),n),s=e=>(e?.entitlements&&(a=e.entitlements),e);return{adsAvailable:!!e,iapAvailable:!!t,init:o,showRewarded:async e=>(await o(),a.removeAds?{shown:!1,rewarded:!0,reason:`ad_free`}:r?r.showRewarded(e):{shown:!1,rewarded:!1,reason:`ads_unavailable`}),purchase:async e=>(await o(),i?s(await i.purchase(e)):{ok:!1,reason:`iap_unavailable`}),restore:async()=>(await o(),i?s(await i.restore()):{ok:!1,reason:`iap_unavailable`}),getEntitlements:async()=>(await o(),a)}},_y=null,vy=()=>(_y??=gy({loadAds:null,loadIap:null}),_y),yy=1e4,by=400,xy=100,Sy=X.div`
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
`,Cy=X(Jh).attrs({role:`status`,"aria-live":`polite`})`
  align-items: center;
  max-width: 26rem;
  opacity: ${e=>+!e.$fading};
  pointer-events: auto;
  text-align: center;
  transition: opacity ${by}ms ease;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,wy=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,Ty=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`,Ey=({offlineProgress:e,dismissOfflineProgress:t,claimOfflineAdReward:n,monetization:r=vy()})=>{let[i,a]=(0,v.useState)(!1),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(!1),[u,d]=(0,v.useState)(100);if((0,v.useEffect)(()=>{if(!e)return;let t=Date.now();s({start:t,end:t+yy}),l(!1),d(100)},[e]),(0,v.useEffect)(()=>{if(i||!e)return;let t=Date.now();s(e=>e&&{start:t,end:t+yy})},[i,e]),(0,v.useEffect)(()=>{if(!e||!o||c||i)return;let{start:t,end:n}=o,r=n-t,a=()=>{let e=n-Date.now();e<=0?(d(0),l(!0)):d(Math.round(e/r*100))};a();let s=setInterval(a,xy);return()=>clearInterval(s)},[e,o,c,i]),(0,v.useEffect)(()=>{if(!c||i)return;let e=setTimeout(t,by);return()=>clearTimeout(e)},[c,i,t]),!e)return null;let f=!!n&&r.adsAvailable&&!e.rewardClaimed&&Gi(e.elapsedRealSeconds,e.capSeconds)>0;return(0,Z.jsx)(Sy,{children:(0,Z.jsxs)(Cy,{"aria-label":`offline progress notice`,$fading:c,children:[(0,Z.jsxs)(wy,{children:[`Resumed from sleep! You were away for `,qi(e.elapsedRealSeconds),` — simulated `,qi(e.effectiveSeconds),` of progress at`,` `,e.rewardClaimed?`100% speed (video bonus).`:`50% speed.`]}),(0,Z.jsxs)(Ty,{children:[f&&(0,Z.jsx)(Q,{"aria-label":`Watch a video to simulate your time away at 100% speed`,disabled:i,onClick:async()=>{let t=e;l(!1),a(!0);try{(await r.showRewarded(`offline_full_speed`)).rewarded&&n(t)}finally{a(!1)}},title:`Watch a short video to double your offline progress to 100% speed`,type:`button`,variant:`primary`,children:i?`Loading video…`:`▶ 100% speed`}),(0,Z.jsxs)(Q,{"aria-label":`Dismiss offline progress notice`,variant:`neutral`,onClick:t,title:`Dismiss this notice`,type:`button`,$progress:u,$progressColor:`#525252`,children:[`Dismiss`,(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`Time until this notice auto-dismisses`,"aria-valuenow":u,"aria-valuemin":0,"aria-valuemax":100})]})]})]})})},Dy=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom) + ${`2.5rem`});
  font-variant-numeric: tabular-nums;
`,Oy=wh`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,ky=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
`,Ay=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,jy=jh`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`,My=X(Jh)`
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
  animation: ${e=>e.$animateReveal?wh`${jy} 0.4s ease-out`:`none`};
  ${e=>e.$boosted&&Lv}

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
`,Ny=e=>wh`
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
`,Py=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: auto;
  white-space: nowrap;
`,Fy=X.div`
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
`,Iy=X(Jh)`
  ${Ny(`#0e7490`)}
`,Ly=X(Jh)`
  ${Ny(`#1d4ed8`)}
`,Ry=X(Jh)`
  ${Ny(`#8b5cf6`)}
`,zy=X(Jh)`
  ${Ny(`#c2410c`)}
`,By=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  > * {
    min-width: 0;
  }
`,Vy=X(Jh)`
  align-items: center;
  text-align: center;

  ${e=>e.$actionable&&wh`
    cursor: pointer;

    &:hover {
      filter: brightness(1.15);
    }
  `}

  ${e=>e.$actionable&&wh`
    &:focus-visible {
      outline: 2px solid ${e.theme.color.warn};
      outline-offset: 2px;
    }
  `}

`,Hy=X.div`
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.sm};

  &:hover {
    filter: brightness(1.15);
  }

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,Uy=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,Wy=X.b`
  color: ${e=>e.theme.color.warn};
  font-size: 1.25em;
`,Gy=X(py)`
  font-family: ${e=>e.theme.font.body};
  font-size: ${e=>e.theme.type.scale.hero.size};
  line-height: ${e=>e.theme.type.scale.hero.lineHeight};
  padding: 0;
`,Ky=X(Uy)`
  text-align: center;
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 0.1rem;
  pointer-events: none;
`,qy=X.div`
  position: relative;
`,Jy=X.div`
  display: flex;
  gap: 3px;
  margin-top: 0.5rem;
  width: 100%;
`,Yy=X.span`
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: 2px;
  flex: 1;
  height: 0.4rem;
  min-width: 0;
  overflow: hidden;
`,Xy=X.span`
  background: ${e=>e.theme.color.accent};
  display: block;
  height: 100%;
  transition: width ${e=>e.theme.motion.duration.slow} ${e=>e.theme.motion.easing.out};
  width: ${e=>e.$fraction*100}%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,Zy=X.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border-top: 1px solid ${e=>e.theme.color.border};
  bottom: ${$g};
  left: 0;
  padding: 0.5rem calc(0.75rem + env(safe-area-inset-left)) 0.5rem calc(0.75rem + env(safe-area-inset-right));
  position: fixed;
  right: 0;
  z-index: 39;
`,Qy=X.div`
  ${e=>s_({$progress:e.$percent,$progressColor:e.theme.color.accent,theme:e.theme})}
  align-items: center;
  border-radius: ${e=>e.theme.radius.pill};
  display: flex;
  height: 1.5rem;
  justify-content: center;
  margin: 0 auto;
  max-width: min(880px, calc(100vw - 2rem));
  width: 100%;
`,$y=X.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
`,eb=X(Vy)`
  box-shadow: none;
  padding: 0.5rem 1rem;
`,tb=X.ul`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.8em;
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
  text-align: left;

  li {
    margin: 0.15rem 0;
  }
`,nb=X.div`
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

  ${e=>e.$compressed&&wh`
    box-shadow: ${e.theme.shadow.md};
    padding: 0.25rem 0;

    ${Vy} {
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
    ${py} {
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
`,rb=X.div`
  height: 1px;
  margin-top: calc(-0.85rem - 1px);
`,ib=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
  width: 100%;
`,ab=X.div`
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
`,ob=X.div`
  align-items: center;
  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.78);
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
`,sb=X.div`
  background: ${e=>e.theme.color.surfaceRaised};
  border: 1px solid ${e=>e.theme.color.borderStrong};
  border-radius: ${e=>e.theme.radius.lg};
  border-top: 4px solid ${e=>e.theme.color.warn};
  box-shadow: ${e=>e.theme.shadow.md};
  color: ${e=>e.theme.color.text};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.lg};
  max-width: 24rem;
  padding: ${e=>e.theme.space.xl} ${e=>e.theme.space.lg} ${e=>e.theme.space.lg};
  text-align: center;
  width: 100%;

  h2 {
    color: ${e=>e.theme.color.warn};
    font-family: ${e=>e.theme.font.display};
    font-size: ${e=>e.theme.type.scale.xl.size};
    font-weight: 700;
    line-height: ${e=>e.theme.type.scale.xl.lineHeight};
    margin: 0;
  }

  > button {
    justify-content: center;
    width: 100%;
  }
`,cb=X.div`
  font-size: ${e=>e.theme.type.scale.hero.size};
  line-height: 1;
`,lb=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,ub=X.div`
  color: ${e=>e.theme.color.warn};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.lg.size};
  font-variant-numeric: ${e=>e.theme.type.numeric};
  font-weight: 700;
  line-height: ${e=>e.theme.type.scale.lg.lineHeight};
`,db=X.dl`
  border-top: 1px solid ${e=>e.theme.color.border};
  display: grid;
  font-size: ${e=>e.theme.type.scale.sm.size};
  grid-template-columns: 1fr 1fr;
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  margin: 0;
  padding-top: ${e=>e.theme.space.md};

  > div + div {
    border-left: 1px solid ${e=>e.theme.color.border};
  }

  dt {
    color: ${e=>e.theme.color.textMuted};
    font-size: ${e=>e.theme.type.scale.xs.size};
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  dd {
    margin: 0;
  }
`,fb=X.div`
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
`,pb=X.div`
  height: ${e=>e.$height}px;
`,mb=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  margin: 0;
`,hb=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0;
`,gb=X.h3`
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
`,_b=X.span`
  cursor: pointer;
  flex-shrink: 0;
  min-width: 2.2rem;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
    border-radius: ${e=>e.theme.radius.sm};
  }
`,vb=X.details`
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
  summary:has(${Fy}) {
    pointer-events: none;
    width: 100%;
  }

  summary:has(${Fy}) h2 {
    pointer-events: auto;
  }

  p {
    margin-top: 0.3rem;
  }
`,yb=X.span`
  color: ${e=>e.theme.color.text};
  font-size: ${e=>e.theme.type.scale.sm.size};
  line-height: ${e=>e.theme.type.scale.sm.lineHeight};
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  margin: 0;
  ${Oy}

  @media (max-width: 24.5rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    line-height: 1.15;
  }
`,bb=X(Q)`
  grid-area: buy;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  min-height: 2rem;
  padding: 0 0.6em;
  ${Oy}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,xb=X(c_)`
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 0.5em;
  font-variant-numeric: tabular-nums;
`,Sb=X.span`
  font-weight: 800;
`,Cb=X(l_)`
  flex: 1 0 auto;
  text-align: right;
`,wb=X(Q)`
  grid-area: upgrade;
  width: 100%;
  font-size: ${e=>e.theme.type.scale.sm.size};
  min-height: 2rem;
  padding: 0 0.5em;
  ${Oy}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.4em;
  }
`,Tb=(e,t)=>t===`base`?Vt(e):t===`bytes`?Ht(e):`${B(e)} ${E(t)}`,Eb=(e,t)=>Math.min(100,Math.round(e/t*100)),Db=e=>(Math.round(e*100)/100).toFixed(2).replace(/\.?0+$/,``),Ob=e=>Math.round((e-1)*100),kb=e=>(Math.round((e-1)*100*100)/100).toFixed(2).replace(/\.?0+$/,``),Ab=(e,{precise:t=!1}={})=>e>=2?`${Db(e)}x`:`+${t?kb(e):Ob(e)}%`,jb=({game:e})=>{let{actions:t,claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i,state:a}=e,o=gh(),{purge:s}=a,c=a.resources[O]>=si(a),l=Kr(a),u=a.prestigeDoublePpLevel??0,d=mn(a),f=pn(s.count,d),p=Dr(a),m=Pi(a.resources[O],u,Kr(a)),h=wi(a.resources[O],si(a)),g=Ti(a.resources[O]),_=Math.round(g*100),y=a.resources[O],x=V(y),S=Vt(y),C=!!Jr(a)&&Yr(a,Jr(a).id),w=ry(si(a)),T=C?0:Math.max(1,m),k=l&&c?`Purge (optional — claim accumulated PP)`:`Purge (requires ${w})`,A=C?`${k} — completes the challenge repeat, awards no Purge Points`:`${k} — awards +${B(T)} Purge Point${T===1?``:`s`}`,[ee]=(0,v.useState)(()=>new Set(b.filter(e=>xi(a)(e)).map(e=>e.id))),[j,te]=(0,v.useState)(()=>new Set),M=e=>te(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}),N=(0,v.useRef)(null),ne=(0,v.useRef)(new Map),P=(0,v.useRef)(new Map);(0,v.useEffect)(()=>{if(typeof IntersectionObserver>`u`)return;let e=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting)return;let t=e.target.dataset.tierId;te(e=>{if(!e.has(t))return e;let n=new Set(e);return n.delete(t),n})})});return N.current=e,()=>e.disconnect()},[]);let re=e=>(P.current.has(e)||P.current.set(e,t=>{let n=N.current,r=ne.current.get(e);n&&r&&r!==t&&n.unobserve(r),t?(ne.current.set(e,t),n&&n.observe(t)):ne.current.delete(e)}),P.current.get(e)),[ie,F]=(0,v.useState)(!1),ae=()=>F(e=>!e),oe=bi(a),se=Jr(a),ce=e=>se?.effect===e,le=se?` — disabled by challenge ${se.id} ${se.codename}`:``,ue=s.count===0,de=!!e.buyUnitMode,fe=!!e.buyMaxMode&&Qi(a)&&!de,pe=Gt(a),me=oe&&ue,I=oe&&!ue,L=!!se||I||!!e.goal||Ku(a.intro??{}).length>0,R=ri(a),he=a.purchaseLevels?.[R.id]??1,ge=xi(a)(R),_e=Fr(a),ve=a.purchaseLevels?.[_e.id]??1,ye=a.scaleUpCount??0,be=Ir(a),xe=Math.max(0,he-1),Se=Math.max(0,ve-1),Ce=be,we=Eb(Se,Ce),Te=!oe&&Se>=be,Ee=b[b.indexOf(_e)+1]??null,De=Ee?.symbol===`TB`,Oe=Oi(a),ke=Number.isInteger(Oe)?String(Oe):Oe.toFixed(2),Ae=Oe===2?`doubles`:`multiplies by ${ke}`,[je,Me]=(0,v.useState)(ge);(0,v.useEffect)(()=>{ge&&Me(!0)},[ge]);let Ne=zr(a)??0,Pe=Lr(a),Fe=Pe,Ie=1+Di(a),Le=1+Di({...a,overclockLastClaimCompletedLevels:null,overclockCount:0}),Re=1+lt,ze=Eb(xe,Fe),Be=!oe&&!ce(`overclockDisabled`)&&xe>=Pe,Ve=a.globalTickspeedMultiplier??null,He=Ve!==null,Ue=Ei(a),We=an(Ve??0),Ge=cn(a),Ke=!oe&&!ce(`clockSpeedDisabled`)&&Ge&&sn(a),qe=un(a),Je=a.owned[R.id]??0,Ye=a.lastTierXpConsumed??0,Xe=Math.floor(a.purge.xp??0),Ze=fn(Ye),Qe=Eb(Xe,Ze),$e=qe&&!oe&&!ce(`restageDisabled`)&&Xe>=Ze,et=Ab(dn(Xe)),tt=()=>{$e&&window.confirm(`Restage: consume ${B(Xe)} XP for ${et} faster ${R.name} ticks? This resets every other tier's owned quantity (not their level) and your Bits balance back to 0.${Je>0?``:` You own no ${R.name}, so nothing will be left producing.`}`)&&t.consumeXpForLastTierTickspeed(Xe)},nt=Eb(a.resources.base??0,on(Ve??0)),[rt,it]=(0,v.useState)(Ge);(0,v.useEffect)(()=>{Ge&&it(!0)},[Ge]);let at=(0,v.useRef)(null);(0,v.useEffect)(()=>{me&&at.current?.focus()},[me]);let ot=(0,v.useRef)(null),[st,ct]=(0,v.useState)(!1);(0,v.useEffect)(()=>{let e=ot.current;if(!e||typeof IntersectionObserver>`u`)return;let t=null,n=new IntersectionObserver(([e])=>{clearTimeout(t),t=setTimeout(()=>ct(!e.isIntersecting),60)});return n.observe(e),()=>{clearTimeout(t),n.disconnect()}},[me]);let ut=(0,v.useRef)(null),[dt,ft]=(0,v.useState)(60);return(0,v.useEffect)(()=>{let e=ut.current;if(!e||typeof ResizeObserver>`u`)return;let t=new ResizeObserver(()=>ft(e.offsetHeight));return t.observe(e),()=>t.disconnect()},[I]),me?(0,Z.jsx)(ob,{role:`dialog`,"aria-modal":`true`,"aria-label":`Purge required`,children:(0,Z.jsxs)(sb,{children:[(0,Z.jsxs)(lb,{children:[(0,Z.jsx)(cb,{"aria-hidden":`true`,children:`💾`}),(0,Z.jsx)(`h2`,{children:`Disk full`}),(0,Z.jsx)(mb,{children:`Production stopped`})]}),(0,Z.jsxs)(ub,{role:`group`,"aria-label":`purge reward`,children:[`+`,B(T),` Purge Point`,T===1?``:`s`]}),(0,Z.jsxs)(db,{children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`dt`,{children:`Resets`}),(0,Z.jsx)(`dd`,{children:`Bits, tiers, Accelerate`})]}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`dt`,{children:`Keeps`}),(0,Z.jsx)(`dd`,{children:`Purge Points, Foundry`})]})]}),(0,Z.jsx)(Q,{ref:at,"aria-label":`Purge now`,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:`✦ Purge now`})]})}):(0,Z.jsxs)(Dy,{children:[(0,Z.jsx)(fy,{onExit:t.exitChallenge,state:a}),I&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(fb,{ref:ut,"aria-label":`purge available banner`,children:[(0,Z.jsxs)(mb,{children:[w,` reached — production has stopped.`]}),(0,Z.jsxs)(Q,{"aria-label":A,variant:`prestige`,onClick:t.purge,title:`Awards Purge Points and resets your resources`,type:`button`,$pulse:!0,children:[(0,Z.jsx)(c_,{children:`✦ `}),(0,Z.jsx)(l_,{children:C?`Complete challenge`:`Purge +${B(T)} PP`})]})]}),(0,Z.jsx)(pb,{$height:dt})]}),(0,Z.jsx)(Zy,{"aria-label":e.goal?`goal progress`:`purge progress`,children:(0,Z.jsxs)(Qy,{$percent:e.goal?e.goal.percent:h,children:[(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":e.goal?e.goal.ariaLabel:`progress toward ${w}, when Purge becomes available`,"aria-valuenow":e.goal?e.goal.percent:h,"aria-valuemin":0,"aria-valuemax":100}),(0,Z.jsx)($y,{children:e.goal?e.goal.label:`${h}% to Purge`})]})}),L?(0,Z.jsx)(d_,{as:`h1`,children:`Byte Factory`}):(0,Z.jsx)(ky,{children:(0,Z.jsx)(`h1`,{children:`Byte Factory`})}),(0,Z.jsx)(ey,{actions:t,state:a}),(0,Z.jsx)(Ey,{claimOfflineAdReward:n,dismissOfflineProgress:r,offlineProgress:i}),(0,Z.jsx)(rb,{ref:ot,"aria-hidden":`true`}),(0,Z.jsxs)(nb,{$compressed:st,$belowBar:I,$belowBarHeight:dt,children:[(0,Z.jsxs)(Vy,{$raised:!0,children:[(0,Z.jsxs)(qy,{children:[(0,Z.jsx)(Hy,{"aria-controls":`global-multipliers-details`,"aria-expanded":ie,"aria-label":`money display`,onClick:ae,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),ae())},role:`button`,tabIndex:0,title:`Show or hide the global production multipliers currently in effect`,children:(0,Z.jsx)(Gy,{children:x})}),!st&&x!==S&&(0,Z.jsx)(Ky,{"aria-label":`balance in bits: ${S}`,children:S})]}),!st&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Jy,{"aria-hidden":`true`,children:Array.from({length:8},(e,t)=>{let n=t/8,r=Math.min(1,Math.max(0,(g-n)/.125));return(0,Z.jsx)(Yy,{children:(0,Z.jsx)(Xy,{$fraction:r})},t)})}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`progress toward the next power of ten Bytes`,"aria-valuenow":_,"aria-valuemin":0,"aria-valuemax":100})]}),ie&&!st&&(0,Z.jsxs)(tb,{id:`global-multipliers-details`,"aria-label":`global production multipliers`,children:[!ue&&(0,Z.jsxs)(`li`,{children:[`Playtime bonus: `,a.playtimeBonusUnlocked?`${Ab(gn(a))} production speed from ${B(Math.floor((a.activePlaySeconds??0)/3600))}h active play`:`not yet unlocked (${B(100)} PP on Firmware → Prestige)`]}),!ue&&(0,Z.jsxs)(`li`,{children:[`Prestige speed bonus: `,d?`${Ab(f)} production speed from ${B(s.count)} Purge${s.count===1?``:`s`}`:`not yet unlocked (${B(1)} PP on Firmware → Prestige)`]}),p>1&&(0,Z.jsxs)(`li`,{children:[`Achievement stars: `,Ab(p),` production speed`]}),(0,Z.jsxs)(`li`,{children:[`Scale Up: `,ye>0?`${ye} activation${ye===1?``:`s`}; multiplier varies by tier`:`not yet activated (reach ${B(Ce)} completed levels on ${_e.name})`]}),rt&&(0,Z.jsxs)(`li`,{children:[`Accelerate: `,He?`${Ab(Ue,{precise:!0})} faster ticks on every tier`:`not yet active`]}),je&&(0,Z.jsxs)(`li`,{children:[`Overclock: `,Ne>0?`The per-level speed bonus is now ${kb(Ie)}% (was ${kb(Le)}%)`:`not yet claimed (reach ${B(Fe)} completed levels on ${R.name})`]})]})]}),!ue&&(0,Z.jsx)(eb,{"aria-label":`purge points display`,$actionable:c,onClick:c?t.purge:void 0,onKeyDown:e=>{!c||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),t.purge())},role:c?`button`:void 0,tabIndex:c?0:void 0,title:c?`Awards Purge Points and resets your resources`:void 0,children:(0,Z.jsxs)(Uy,{children:[(0,Z.jsxs)(Wy,{children:[B(s.points),` PP`]}),d&&` · ${Ab(f)} production speed`]})})]}),(rt||qe)&&(0,Z.jsxs)(By,{children:[rt&&(0,Z.jsxs)(Ly,{"aria-label":`global accelerate panel`,children:[(0,Z.jsxs)(vb,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(Fy,{children:[(0,Z.jsx)(`h2`,{children:`Accelerate`}),(0,Z.jsxs)(Py,{title:`Each Accelerate level makes every tier's production ticks faster by this factor (this is the live rate: Overclock raises it and some challenges weaken it)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 +`,kb(Ie),`%/lvl`]})]})}),(0,Z.jsx)(hb,{children:He?`${Ab(Ue,{precise:!0})} faster ticks on every tier.`:`Not active yet — spend Bytes to make every tier's production ticks faster, one level at a time.`})]}),(0,Z.jsxs)(Q,{"aria-label":He?`Upgrade Accelerate for ${Ht(We)} (currently ${Ab(Ue,{precise:!0})} faster ticks on every tier)`:`Enable Accelerate for ${Ht(We)}`,color:Ke?`#3b82f6`:`darkgrey`,disabled:!Ke,onClick:t.buyGlobalTickspeedMultiplier,title:`Spend Bytes to make every tier's production ticks faster (more frequent deliveries, not bigger ones) — each level costs the next power of ten${ce(`clockSpeedDisabled`)?le:``}`,type:`button`,$progress:nt,$progressColor:`#3b82f6`,$pulse:Ke,children:[(0,Z.jsx)(c_,{children:`🌐 `}),(0,Z.jsx)(l_,{children:Ht(We)}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`Accelerate progress`,"aria-valuenow":nt,"aria-valuemin":0,"aria-valuemax":100})]})]}),qe&&(0,Z.jsxs)(Ry,{"aria-label":`restage panel`,children:[(0,Z.jsxs)(vb,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(Fy,{children:[(0,Z.jsx)(`h2`,{children:`Restage`}),(0,Z.jsxs)(Py,{title:`Each XP consumed makes ${R.name} ticks faster by this factor (compounding)`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[R.symbol,` +`,Ob(dn(1)),`%/XP`]})]})}),(0,Z.jsxs)(hb,{children:[Ab(dn(Ye),{precise:!0}),` faster `,R.name,` ticks`,` `,`from `,B(Ye),` XP consumed. Next consumption needs at least `,B(Ze),` XP.`]})]}),(0,Z.jsxs)(Q,{"aria-label":`Restage: consume ${B(Xe)} XP for ${et} ${R.name} tickspeed (resets every other tier's owned quantity and Bits to 0)${ce(`restageDisabled`)?le:``}`,variant:`smart`,disabled:!$e,onClick:tt,title:Je>0?`Consume XP for a compounding +1% ${R.name} tickspeed per XP (min ${B(Ze)} XP right now) — resets every other tier's owned quantity and Bits to 0`:`No ${R.name} owned right now — Restaging now resets everything with nothing left producing`,type:`button`,$progress:Qe,$pulse:$e,children:[(0,Z.jsx)(c_,{children:`🧬 `}),(0,Z.jsxs)(l_,{children:[B(Xe),` XP`]}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`${R.name} Restage progress`,"aria-valuenow":Qe,"aria-valuemin":0,"aria-valuemax":100})]})]})]}),(0,Z.jsx)(Ay,{children:b.map((e,n)=>{if(!xi(a)(e))return null;let r=a.resources[e.id]??0,i=a.owned[e.id]??0,s=Yi(a,e.id),c=Ji(a,e),l=a.purchaseLevels?.[e.id]??1,u=Math.max(0,l-1),d=a.purchaseLevelProgress?.[e.id]??0,m=ti(a,e.id)??e,h=Xt(m,l,pe,d,c,2**53-1),g=de?Math.min(1,h):h,_=Yt(m,l,pe,d,1),v=g>0?Yt(m,l,pe,d,g):_,y=h>0&&!oe,b=d/pe*100,x=g/pe*100,S=a.tickspeedLevels?.[e.id]??1,C=rn(S)*(e.id===R.id?dn(a.lastTierXpConsumed??0):1),w=Ab(C),T=jr(l,Ar(a)),O=Nr(a,e.id),k=Math.floor(i*f*p*O*T*ei(a,e.id)),A=e.producesResourceId===`base`?Vt(k):e.producesResourceId===`bytes`?Ht(k):`${B(k)} ${E(e.producesResourceId)}`,te=D(e.id),N=ki(a,e.id),ne=md(a,e.id,S+1),P=hd(a,e.id,S+1),ie=r>=P&&!oe&&!gd(a,e.id),F=fe?sa(a,e.id):{levels:0,cost:0,lastLevelCost:0,partialQuantity:0,partialCost:0},ae=F.levels>0?`Buy ${B(F.levels)} full level${F.levels===1?``:`s`} for ${Vt(F.cost)} total; highest level costs ${Vt(F.partialQuantity>0?F.partialCost:F.lastLevelCost)}${F.partialQuantity>0?` (${F.partialQuantity} of ${pe} purchases toward the next level)`:``} (${B(u)} completed levels)`:`Buy${g>1?` ×${g}`:``} for ${Vt(v)} (${B(u)} completed levels, ${B(d)} of ${pe} purchased toward the next)`,se=`Tickspeed multiplier (+10% faster ticks) for ${Tb(ne,e.id)}${P>ne+1?` (requires ${Tb(P,e.id)} owned)`:``}`,ce=F.levels>0?`+${B(F.levels)}`:``,le=`⚙ ${Tb(ne,e.id)}`,ue=Eb(r,P),me=o.tierAccents[n%o.tierAccents.length],I=j.has(e.id),L=`${e.id}-details`,he=Pv(a.intro,n);return(0,Z.jsxs)(My,{ref:re(e.id),"data-tier-id":e.id,"aria-label":`${e.name} layer`,$accent:me,$animateReveal:!ee.has(e.id),$boosted:he,children:[(0,Z.jsxs)(ib,{children:[(0,Z.jsx)(gb,{children:(0,Z.jsxs)(_b,{title:e.name,role:`button`,tabIndex:0,"aria-expanded":I,"aria-controls":L,onClick:()=>M(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),M(e.id))},children:[(0,Z.jsx)(d_,{children:e.name}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]})}),(0,Z.jsxs)(yb,{title:`Owned`,children:[(0,Z.jsx)(d_,{children:`Owned: `}),B(i)]})]}),I&&(0,Z.jsx)(ab,{id:L,children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Production: +`,A,` per delivery`]}),(0,Z.jsxs)(`li`,{children:[`Base tickspeed: delivers every `,Db(te),`s`]}),(0,Z.jsxs)(`li`,{children:[`Effective tickspeed: every `,Db(N),`s (tier ×`,Db(C),`, global ×`,Db(Ue),`)`]}),(0,Z.jsxs)(`li`,{children:[`Completed levels: `,B(u),` (`,B(d),`/`,pe,` purchased toward the next) — purchase milestone bonus: ×`,Db(T),` from `,B(s),` lifetime purchases`]}),O>1&&(0,Z.jsxs)(`li`,{children:[`Scale Up bonus: ×`,Db(O)]}),he&&(0,Z.jsx)(`li`,{children:Iv(a.intro,n)}),(0,Z.jsxs)(`li`,{children:[`Costs `,E(e.costResourceId),`, produces `,E(e.producesResourceId)]})]})}),(0,Z.jsxs)(wb,{"aria-label":se,variant:`success`,disabled:!ie,onClick:()=>t.buyTickspeedMultiplier(e.id),title:`Tickspeed multiplier level ${S} (${w} faster ticks) — the next level makes it 10% more`,$progress:ue,$pulse:ie,children:[(0,Z.jsx)($,{children:le}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`${e.name} tickspeed multiplier progress`,"aria-valuenow":ue,"aria-valuemin":0,"aria-valuemax":100})]}),(0,Z.jsxs)(bb,{"aria-label":ae,variant:`plain`,disabled:!y,onClick:()=>t.buyTierQuantity(e.id),title:`Buy ${e.name} to increase your ${E(e.producesResourceId)} production — completing every level (${pe} purchases) also multiplies it by ×${Ar(a)}`,$progress:b,$secondaryProgress:x,$pulse:y,children:[(0,Z.jsxs)(xb,{children:[`🛒 `,B(u),ce&&(0,Z.jsx)(Sb,{children:ce})]}),(0,Z.jsx)(Cb,{children:Vt(F.levels>0?F.partialQuantity>0?F.partialCost:F.lastLevelCost:v)}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`${e.name} cost-block progress`,"aria-valuenow":d,"aria-valuemin":0,"aria-valuemax":pe})]})]},e.id)})}),(0,Z.jsxs)(By,{children:[(0,Z.jsxs)(Iy,{"aria-label":`scale up panel`,children:[(0,Z.jsxs)(vb,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(Fy,{children:[(0,Z.jsx)(`h2`,{children:`Scale Up`}),(0,Z.jsxs)(Py,{title:`${Oe===2?`Doubles`:`Multiplies`} production for tiers unlocked so far`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🏭 ×`,ke,De?` · 🔓 TB`:``]})]})}),(0,Z.jsxs)(hb,{children:[`Resets tiers and `,Ae,` production of every tier unlocked so far`,Ee?`, and unlocks ${Ee.name}`:``,`. Needs `,B(Ce),` completed `,_e.name,` levels.`]})]}),(0,Z.jsxs)(Q,{"aria-label":`Scale Up (requires ${Ce} completed ${_e.name} levels) — ${Ae} production for tiers unlocked so far${De?` and unlocks TB`:``}`,color:Te?`#22d3ee`:`darkgrey`,disabled:!Te,onClick:t.scaleUp,title:`Resets tiers, ${Ae} production for tiers unlocked so far${Ee?`, and unlocks ${Ee.name}`:``} — requires ${Ce} completed ${_e.name} levels`,type:`button`,$progress:we,$progressColor:`#22d3ee`,$pulse:Te,children:[(0,Z.jsx)(c_,{children:`⏩ `}),(0,Z.jsxs)(l_,{children:[_e.symbol,` `,B(Se),`/`,B(Ce)]}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`Scale Up progress`,"aria-valuenow":we,"aria-valuemin":0,"aria-valuemax":100})]})]}),je&&(0,Z.jsxs)(zy,{"aria-label":`overclock panel`,children:[(0,Z.jsxs)(vb,{children:[(0,Z.jsx)(`summary`,{children:(0,Z.jsxs)(Fy,{children:[(0,Z.jsx)(`h2`,{children:`Overclock`}),(0,Z.jsxs)(Py,{title:`Each completed level multiplies the per-level speed bonus`,onClick:e=>{e.preventDefault(),e.stopPropagation()},children:[`🌐 +`,Db(10),`%/lvl`]})]})}),(0,Z.jsx)(hb,{children:Ne>0?`The per-level speed bonus is now ${kb(Ie)}% (was ${kb(Le)}%).`:`Not claimed yet — reach ${B(Fe)} completed ${R.name} levels. Each completed level then multiplies the per-level speed bonus by ×${Re}.`})]}),(0,Z.jsxs)(Q,{"aria-label":`Overclock (requires ${Fe} completed ${R.name} levels) — resets Scale Up's bonus; each completed ${R.name} level (${B(xe)} now) multiplies the per-level speed bonus by ×${Re}`,color:Be?`#fb923c`:`darkgrey`,disabled:!Be,onClick:t.overclock,title:`Resets tiers (and Scale Up's bonus); each completed ${R.name} level multiplies the per-level speed bonus by ×${Re} — requires ${Fe} completed levels${ce(`overclockDisabled`)?le:``}`,type:`button`,$progress:ze,$progressColor:`#fb923c`,$pulse:Be,children:[(0,Z.jsx)(c_,{children:`⚡ `}),(0,Z.jsxs)(l_,{children:[R.symbol,` `,B(xe),`/`,B(Fe)]}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`Overclock progress`,"aria-valuenow":ze,"aria-valuemin":0,"aria-valuemax":100})]})]})]})]})},Mb=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,Nb=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  margin: 0.1rem 0 0.5rem;
  text-align: center;
`,Pb={"10m":`good`,"1h":`info`,"10h":`violet`},Fb=X(Jh)`
  align-items: center;
  border-left: 3px solid ${e=>e.theme.color[Pb[e.$formatId]]??e.theme.color.accent};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-areas:
    'label text action'
    'bar bar bar'
    'details details details';
  grid-template-columns: 2.6rem minmax(0, 1fr) 6.5rem;
  padding: 3px 3px 3px ${e=>e.theme.space.sm};
  row-gap: 0;
`,Ib=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
`,Lb=X.span`
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
`,Rb=X.span`
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
`,zb=X(Q)`
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: action;
  min-height: 2rem;
  padding: 0 0.5em;
  width: 100%;
`,Bb=X.div`
  background: ${e=>e.theme.color.border};
  border-radius: 999px;
  grid-area: bar;
  height: 4px;
  margin: 3px 0 2px;
  overflow: hidden;

  > span {
    background: ${e=>e.theme.color[Pb[e.$formatId]]??e.theme.color.good};
    display: block;
    height: 100%;
    width: ${e=>e.$percent}%;
  }
`,Vb=X.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,Hb=X.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
  margin-top: 0.3rem;
`,Ub=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,Wb=X.div`
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
`,Gb=X.div`
  align-items: center;
  display: flex;
  gap: 0.6rem;
  justify-content: space-between;
`,Kb=e=>{let t=Math.max(0,Math.ceil(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}h ${r}m`:r>0?`${r}m ${i}s`:`${i}s`},qb=[{id:`buy`,title:`Auto-buy`,manual:e=>`${e.join(` `)} buying`},{id:`tickspeed`,title:`Auto-tickspeed`,manual:()=>`tickspeed`},{id:`global`,title:`Auto`,manual:e=>e.join(`, `)}],Jb=e=>{if(!e.automations)return``;let t=new Set(e.automations),n=qb.map(e=>({group:e,missing:T_.filter(n=>n.group===e.id&&!t.has(n.key))})).filter(({missing:e})=>e.length>0).map(({group:e,missing:t})=>e.manual(t.map(e=>e.label)));return n.length>0?`Manual: ${n.join(`, `)}`:``},Yb=X.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.4rem;
`,Xb=X.button`
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
`,Zb=({run:e,onToggle:t})=>{let n=new Set(e.def.automations??[]);return qb.map(r=>{let i=T_.filter(e=>e.group===r.id&&n.has(e.key));return i.length===0?null:(0,Z.jsxs)(Yb,{"aria-label":`${r.title} switches`,role:`group`,children:[(0,Z.jsx)(Ub,{as:`span`,children:r.title}),i.map(n=>{let i=D_(e.game,n.key),a=`${r.title} ${n.label}`;return(0,Z.jsx)(Xb,{"aria-label":`${a}: ${i?`on`:`paused`}`,"aria-pressed":i,onClick:()=>t(n.key,!i),title:`${a} is ${i?`on — tap to pause`:`paused — tap to resume`}`,type:`button`,$on:i,children:n.label},n.key)})]},r.id)})},Qb=e=>[...e.conditions??[],e.startBytes>0&&`starts with ${B(e.startBytes)} B`,e.headStart?.scaleUps>0&&`${e.headStart.scaleUps} Scale Up${e.headStart.scaleUps===1?``:`s`}`,e.headStart?.overclock>0&&`Overclock ${e.headStart.overclock}`,Jb(e)].filter(Boolean).join(` · `),$b={won:`✓ Won`,completed:`Attempted (no win)`,expired:`Expired`},ex=({format:e,run:t,actions:n,onBack:r})=>{let i=(t,r)=>n.dailyPlay(e.id,t,r),a=Math.round(hv(t)*100),o=t.def.objective??{label:``,target:0},s=t.metrics?.[o.key]??0,c={state:t.game,goal:{percent:a,label:`${a}% · ${o.label}`,ariaLabel:`progress toward the daily objective: ${o.label}`},offlineProgress:null,buyMaxMode:!1,buyUnitMode:!1,actions:{buyTierQuantity:e=>i(`buyTier`,e),buyTickspeedMultiplier:e=>i(`tierTickspeed`,e),buyGlobalTickspeedMultiplier:()=>i(`clockSpeed`),scaleUp:()=>i(`scaleUp`),overclock:()=>i(`overclock`),consumeXpForLastTierTickspeed:e=>i(`restage`,e),purge:()=>{},exitChallenge:()=>{}}};return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(Jh,{"aria-label":`daily run ${e.id}`,children:[(0,Z.jsxs)(Gb,{children:[(0,Z.jsxs)(Mb,{children:[`Daily `,e.label]}),(0,Z.jsx)(Q,{"aria-label":`back to daily challenges`,onClick:r,type:`button`,variant:`prestige`,children:`Back`})]}),(0,Z.jsxs)(Ub,{children:[o.label,` · now `,B(s),` · `,Kb(t.def.limitSeconds-t.simSeconds),` left`]}),o.attemptLabel&&(0,Z.jsxs)(Ub,{"aria-label":`daily run attempt mark`,children:[`Counts as attempted from: `,o.attemptLabel]}),Qb(t.def)&&(0,Z.jsx)(Ub,{"aria-label":`daily run conditions`,children:Qb(t.def)}),(0,Z.jsx)(Wb,{$percent:a,children:(0,Z.jsx)(`span`,{})}),(0,Z.jsx)(Zb,{onToggle:(e,t)=>i(`automation`,{key:e,enabled:t}),run:t})]}),(0,Z.jsx)(jb,{game:c})]})},tx=({state:e,actions:t})=>{let[n,r]=(0,v.useState)(()=>Date.now()),[i,a]=(0,v.useState)(null),[o,s]=(0,v.useState)(null),[c,l]=(0,v.useState)(()=>new Set),u=e=>l(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});(0,v.useEffect)(()=>{let e=window.setInterval(()=>r(Date.now()),1e3);return()=>window.clearInterval(e)},[]);let d=O_(n),f=wv(e,d),p=i?e.daily.runs[i]:null;return p?(0,Z.jsx)(`div`,{"aria-label":`daily firmware page`,children:(0,Z.jsx)(ex,{actions:t,format:x_.find(e=>e.id===i),onBack:()=>a(null),run:p})}):(0,Z.jsxs)(`div`,{"aria-label":`daily firmware page`,children:[(0,Z.jsxs)(Nb,{children:[d,` · `,(0,Z.jsxs)(`span`,{"aria-label":`daily credits`,children:[`Credits `,f.total,`/`,4,` · new in `,Kb(k_(n)/1e3)]})]}),(0,Z.jsx)(Ib,{children:x_.map(n=>{let r=e.daily.runs[n.id],i=e.daily.results[d]?.[n.id],o=r&&r.def.dateId!==d,l=r?r.def:dv(d,n.id),f=c.has(n.id),p=Qb(l),m=r?`${o?`from ${r.def.dateId} · `:``}${Kb(r.def.limitSeconds-r.simSeconds)} left · ${Math.round(hv(r)*100)}%`:[i&&$b[i.lastOutcome],i?.bestSeconds!=null&&`best ${Kb(i.bestSeconds)}`].filter(Boolean).join(` · `);return(0,Z.jsxs)(Fb,{$formatId:n.id,"aria-label":`daily ${n.id}`,children:[(0,Z.jsx)(Lb,{"aria-expanded":f,"aria-label":`${n.id} ${n.label} details`,onClick:()=>u(n.id),onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u(n.id))},role:`button`,tabIndex:0,title:n.label,children:n.id}),(0,Z.jsxs)(Rb,{title:`${l.objective.label} · ${m}`,children:[(0,Z.jsx)(`strong`,{children:l.objective.label}),m&&(0,Z.jsxs)(`span`,{children:[` · `,m]})]}),r?(0,Z.jsx)(zb,{"aria-label":`open daily ${n.id}`,onClick:()=>a(n.id),type:`button`,variant:`primary`,children:`▶ Resume`}):(0,Z.jsx)(zb,{"aria-label":`${i?`replay`:`start`} daily ${n.id}`,onClick:()=>{t.dailyStart(n.id),a(n.id)},type:`button`,variant:`prestige`,children:i?`↻ Replay`:`🏁 Start`}),r&&(0,Z.jsx)(Bb,{$formatId:n.id,$percent:Math.round(hv(r)*100),"aria-label":`daily ${n.id} progress`,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":Math.round(hv(r)*100),role:`progressbar`,children:(0,Z.jsx)(`span`,{})}),f&&(0,Z.jsxs)(Vb,{children:[p&&(0,Z.jsx)(Ub,{"aria-label":`daily ${n.id} conditions`,children:p}),r&&(0,Z.jsxs)(Hb,{children:[!o&&(0,Z.jsx)(Q,{"aria-label":`restart daily ${n.id}`,onClick:()=>s({kind:`restart`,formatId:n.id}),type:`button`,children:`Restart`}),(0,Z.jsx)(Q,{"aria-label":`forfeit daily ${n.id}`,onClick:()=>s({kind:`forfeit`,formatId:n.id}),type:`button`,variant:`danger`,children:`Forfeit`})]})]})]},n.id)})}),(0,Z.jsx)(Av,{confirmLabel:o?.kind===`restart`?`Restart`:`Forfeit`,onCancel:()=>s(null),onConfirm:()=>{o.kind===`restart`?bv(e,o.formatId,Date.now())&&t.dailyRestart(o.formatId):t.dailyForfeit(o.formatId),s(null)},open:!!o,title:o?.kind===`restart`?`Restart this challenge?`:`Forfeit this challenge?`,children:(0,Z.jsxs)(`p`,{children:[`This run's progress is lost`,o?.kind===`restart`?` and a fresh run starts.`:`.`]})})]})},nx=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,rx=X.p`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: ${e=>e.theme.type.scale.xs.size};
  gap: ${e=>e.theme.space.md};
  justify-content: center;
  margin: ${e=>e.theme.space.xs} 0 ${e=>e.theme.space.sm};
`,ix=X.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,ax={completed:wh`
    background: color-mix(in srgb, ${e=>e.theme.color.good} 14%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.good};
  `,available:wh`
    border-color: ${e=>e.theme.color.warn};
  `,active:wh`
    background: color-mix(in srgb, ${e=>e.theme.color.warn} 18%, ${e=>e.theme.color.surface});
    border-color: ${e=>e.theme.color.warn};
    border-width: 2px;
  `,locked:wh``},ox=(e,t)=>t===`completed`?e.color.good:t===`locked`?e.color.textFaint:e.color.warn,sx=X.button`
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
  ${e=>ax[e.$status]}
  ${e=>e.$selected&&wh`
    outline: 2px solid ${e.theme.color.text};
    outline-offset: 1px;
  `}

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,cx=X.span`
  color: ${e=>e.$status===`locked`?e.theme.color.textFaint:e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.md.size};
  font-weight: 700;
  line-height: 1.1;
`,lx=X.span`
  color: ${e=>ox(e.theme,e.$status)};
  font-size: 0.68rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,ux=X.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  margin-top: ${e=>e.theme.space.sm};
  padding-top: ${e=>e.theme.space.sm};
  row-gap: 2px;
`,dx=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`,fx=Object.fromEntries(b.map(e=>[e.name,e.symbol])),px={speedUp:`🌐`,scaleUp:`⏩`,restage:`🧬`,overclock:`🚀`,purge:`✦`},mx=e=>{if(e.automation?.kind===`global`)return px[e.automation.key]??e.target;let t=e.target.startsWith(`⚙ `),n=t?e.target.slice(2):e.target;return`${t?`⚙`:``}${fx[n]??n}`},hx={active:`active`,completed:`completed`,available:`ready`,locked:`locked`},gx=(e,t)=>Jr(e)?.id===t.id?`active`:Yr(e,t.id)?`completed`:`available`,_x=({def:e,state:t,onCancel:n,onConfirm:r})=>{if(!e)return null;let i=Yr(t,e.id);return(0,Z.jsxs)(Av,{confirmLabel:i?`Start repeat`:`Start challenge`,onCancel:n,onConfirm:r,open:!0,title:`Start ${ay(e)}?`,children:[(0,Z.jsx)(`p`,{children:e.rule}),(0,Z.jsxs)(`p`,{children:[`Goal: `,ry(e.goal),`, then Purge.`]}),(0,Z.jsxs)(`p`,{children:[`Your current Factory cycle is lost and awards no PP.`,i?` Repeats award no PP.`:``]})]})},vx=({state:e,onStart:t,onExit:n})=>{let r=Jr(e),i=N.filter(e=>ce.has(e.id)).map(t=>{let n=ui(e,t.id);return{def:t,unlocked:n,status:n?gx(e,t):`locked`}}),[a,o]=(0,v.useState)(null),s=i.find(e=>e.status===`active`)??i.find(e=>e.status===`available`),c=i.find(e=>e.def.id===a)??s,l=i.reduce((e,t)=>({...e,[t.status]:(e[t.status]??0)+1}),{}),u=({def:t,unlocked:n,status:r})=>{if(!n)return`🔒 P${li(t)}`;if(r===`active`)return`active`;let i=e.challenges?.bestSeconds?.[t.id];return r===`completed`?i===void 0?`✓`:`✓${ny(i).replace(` `,``)}`:mx(t)};return(0,Z.jsx)(`div`,{"aria-label":`challenges firmware page`,children:(0,Z.jsxs)(Jh,{children:[(0,Z.jsx)(nx,{children:`Factory challenges`}),(0,Z.jsxs)(rx,{"aria-label":`challenge counts`,children:[(0,Z.jsxs)(lx,{$status:`completed`,children:[`● done `,l.completed??0]}),(0,Z.jsxs)(lx,{$status:`available`,children:[`● ready `,(l.available??0)+(l.active??0)]}),(0,Z.jsxs)(lx,{$status:`locked`,children:[`● locked `,l.locked??0]})]}),(0,Z.jsx)(ix,{role:`group`,"aria-label":`factory challenge tiles`,children:i.map(e=>{let{def:t,unlocked:n,status:r}=e;return(0,Z.jsxs)(sx,{$selected:c?.def.id===t.id,$status:r,"aria-label":`${t.id}${n?` ${t.codename}`:``}, ${hx[r]}`,"aria-pressed":c?.def.id===t.id,onClick:()=>o(t.id),title:n?ay(t):`${t.id} · ${t.target} · ${iy(t)}`,type:`button`,children:[(0,Z.jsx)(cx,{$status:r,children:t.id}),(0,Z.jsx)(lx,{$status:r,children:u(e)})]},t.id)})}),c&&(0,Z.jsxs)(ux,{"aria-label":`challenge ${c.def.id}`,children:[(0,Z.jsxs)(`span`,{children:[c.unlocked?(0,Z.jsx)(`strong`,{children:ay(c.def)}):(0,Z.jsxs)(`strong`,{children:[c.def.id,` · `,c.def.target]}),c.unlocked?(0,Z.jsx)(dx,{children:c.def.rule}):(0,Z.jsxs)(dx,{children:[`🔒 `,iy(c.def)]})]}),c.unlocked&&c.status===`active`&&n&&(0,Z.jsx)(ty,{challenge:c.def,onExit:n}),c.unlocked&&c.status!==`active`&&(0,Z.jsx)(Q,{"aria-label":`${c.status===`completed`?`Repeat`:`Start`} challenge ${ay(c.def)}${r?` (disabled: another challenge is active)`:``}`,disabled:!!r,onClick:()=>t(c.def.id),title:r?`Finish or exit ${r.id} first`:`Start this challenge`,type:`button`,variant:`prestige`,children:c.status===`completed`?`↻ Repeat`:`🏁 Start`})]})]})})},yx=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,bx=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,xx=X.div`
  display: flex;
  gap: 0.5rem;
`,Sx=X(Q)`
  flex: 1;
  font-size: 0.95rem;
  gap: 0.4rem;
`,Cx=[{id:`factory`,icon:`🏁`,label:`Factory`,ariaLabel:`open factory challenges`,title:`Factory — beat a nerfed run to unlock each automation's speed upgrades`},{id:`daily`,icon:`📅`,label:`Daily`,ariaLabel:`open daily challenges`,title:`Daily — three timed Factory challenges every UTC day`}],wx=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=gh(),[a,o]=(0,v.useState)(`factory`),[s,c]=(0,v.useState)(null);(0,v.useEffect)(()=>{o(`factory`)},[t]);let l=fv(n),u=a===`daily`&&!l?`factory`:a;return(0,Z.jsxs)(yx,{children:[(0,Z.jsx)(bx,{children:(0,Z.jsx)(`h1`,{children:`Challenges`})}),(0,Z.jsx)(xx,{role:`tablist`,"aria-label":`challenge types`,children:Cx.filter(e=>e.id!==`daily`||l).map(e=>(0,Z.jsxs)(Sx,{"aria-label":e.ariaLabel,"aria-selected":u===e.id,color:u===e.id?i.color.text:i.color.textMuted,onClick:()=>o(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),` `,e.label]},e.id))}),u===`factory`&&(0,Z.jsx)(vx,{onExit:r.exitChallenge,onStart:c,state:n}),u===`daily`&&(0,Z.jsx)(tx,{actions:r,state:n}),(0,Z.jsx)(_x,{def:s?N.find(e=>e.id===s):null,onCancel:()=>c(null),onConfirm:()=>{r.enterChallenge(s),c(null)},state:n})]})},Tx=`🏷️`,Ex=X.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  width: 100%;
`,Dx=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,Ox=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,kx=X.p`
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.accent};
`,Ax=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,jx=jh`
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.25); }
`,Mx=e=>e.$activeKind===`rebuild`?e.theme.color.warn:e.theme.color.violet,Nx=jh`
  0%, 100% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 6px 1px var(--disk-glow); }
  50% { box-shadow: 0 0 0 1px var(--disk-glow), 0 0 14px 4px var(--disk-glow); }
`,Px=X.div.attrs(e=>({style:e.$activeKind?{background:`conic-gradient(from 0deg, color-mix(in srgb, ${Mx(e)} 70%, transparent) ${Math.round((e.$progress??0)*360)}deg, ${e.theme.color.surfaceSunken} 0deg)`}:void 0}))`
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
  border: 1.5px solid ${e=>e.$activeKind?Mx(e):e.$full?e.theme.color.accent:e.$empty?e.theme.color.textMuted:e.theme.color.surfaceSunken};
  background: ${e=>e.$full?e.$pullEligible?e.theme.color.good:`color-mix(in srgb, ${e.theme.color.accent} 40%, transparent)`:e.$empty?e.theme.color.surfaceSunken:`transparent`};
  ${e=>e.$activeKind?`--disk-glow: ${Mx(e)}; box-shadow: 0 0 0 1px var(--disk-glow), 0 0 10px 2px var(--disk-glow);`:``}
  ${e=>e.$queued?`border-style: dashed; border-color: ${e.theme.color.info};`:``}
  animation: ${e=>e.$activeKind&&!e.$paused?Nx:e.$pullEligible?jx:`none`} 1.4s ease-in-out infinite;
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
`,Fx=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,Ix=X.div`
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
`,Lx=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.$flushing?e.theme.color.info:e.theme.color.accent};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
  opacity: 0.85;
  pointer-events: none;
`,Rx=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`,zx=X.div`
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
`,Bx=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.info};
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,Vx=({actions:e,size:t,state:n})=>{let{intro:r}=n,i=r.disks?.[t]??0,a=r.disksBuiltTotal??{},o=Math.max(a[t]??0,i),s=Math.max(0,o-i),c=lc(n,t),l=c!==null,u=co(n,t),d=cc(n,t),f=r.diskBuild?.size===t,p=r.diskCache?.[t]??0,m=t/8,h=ms(t),g=bs(m),_=f?(r.disksBuiltTotal?.[t]??0)+1:null,v=f?Math.ceil(r.diskBuild.remainingSeconds):null,y=us(n),b=os(n),x=t===y?ps(n,t):0,S=t===y&&!b&&o<9&&(!!r.diskBuildQueued||x>0),C=t===y&&b&&i<9&&o<9,w=S?`provision`:C?`rebuild`:null,T=S?o:C?i:-1,E=S?Math.min(1,x/ds(n,t)):C&&r.lowerRebuild?.size===t?Math.min(1,r.lowerRebuild.progress??0):0,D=S&&(!r.diskBuildQueued||!Ss(n)||Math.max(0,(Za(n,Ma(t))??0)-uo(n,Ma(t)))<=0),O=Math.round(E*100),k=Ps(n,t),A=k?Bs(n,t):!1,ee=k?Rs(k):0,j=k?zs(k):0,te=k&&k.segmentsCollected<10,M=k&&k.segmentsCollected>=10,N=Ws(n,t)&&typeof e?.expediteDiskFill==`function`,ne=Gs(n,t),P=Is(k).length>0,re=$s(n,t),ie=!!re,F=ie&&nc(n,t),ae=ie?Math.max(0,1-tc(re)):1,oe=ie?t*ae:p,se=rc(t);return(0,Z.jsxs)(Ex,{children:[f?(0,Z.jsx)(kx,{children:`Rebuilding ${h} x ${_} array - Ready in ${v}s`}):se?(0,Z.jsxs)(Dx,{children:[(0,Z.jsx)(Ox,{"aria-hidden":`true`,title:`${g} read-cache blocks`,children:g}),(0,Z.jsx)(Fx,{role:`group`,"aria-label":ie?`${h} read cache flushing to disk${F?` paused for tier match`:``}`:`${h} read cache`,children:Array.from({length:8},(e,r)=>{let i=Math.min(m,Math.max(0,oe-r*m)),a=i>=m,o=!a&&i>0?i/m:0;return(0,Z.jsx)(Ix,{"aria-label":ie?`${h} cache block ${r+1} flushing to disk`:`${h} cache block ${r+1}`,title:ie?F?`Flush paused — matching tier claims this size first`:`Flushing read cache to disk (${Math.ceil(re.remainingSeconds/no(n,Ma(t)))}s)`:a?`${g} banked toward ${c??`the matching tier`}`:o>0?`Filling from Staging (${Math.round(o*100)}%)`:`Filling from Staging`,$full:a,$flushing:ie&&(a||o>0),children:o>0?(0,Z.jsx)(Lx,{$fill:o,$flushing:ie}):null},r)})})]}):null,k&&!f?(0,Z.jsxs)(Dx,{children:[(0,Z.jsxs)(Ox,{"aria-hidden":`true`,title:`${h} write cache`,children:[`→ `,h]}),(0,Z.jsx)(Rx,{role:`progressbar`,"aria-label":M?`${h} write cache flushing to disk`:`${h} write cache collecting${A?` paused for tier match`:``}`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round((M?j:ee)*100),children:te?Array.from({length:10},(e,t)=>{let n=k.segmentsCollected,r=Rs(k),i=t<n,a=t===n&&r>0;return(0,Z.jsx)(zx,{$filled:i||a,$active:a||t===n&&!A,title:A?`Collect paused — matching tier claims those smaller disks first`:i?`Collected`:a?P?`Collecting from smaller disks and Staging`:`Filling from Staging`:ne?`Filling from smaller disks and Staging`:`Waiting for Staging`},t)}):(0,Z.jsx)(zx,{$filled:!0,$active:!0,$flushBar:!0,style:{flex:`1 1 100%`},children:(0,Z.jsx)(Bx,{$fill:j})})})]}):null,(0,Z.jsxs)(Dx,{children:[(0,Z.jsx)(Ox,{"aria-hidden":`true`,title:`${h} disks`,children:h}),(0,Z.jsx)(Ax,{role:`group`,"aria-label":`${h} disks`,children:Array.from({length:9},(n,r)=>{let a=r<i,o=!a&&r<i+s,p=w!==null&&r===T,m=o&&!p&&N,g=o&&!p&&ne&&r===i;return(0,Z.jsx)(Px,{...p?{role:`progressbar`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":O}:null,...m?{as:`button`,type:`button`,onClick:()=>e.expediteDiskFill(t)}:null,"aria-label":p?`${w===`provision`?`provisioning`:`rebuilding`} ${h} disk`:a?u?`${h} disk pulling into ${c}`:`full ${h} disk`:o?g?`empty ${h} disk queued for filling`:m?`empty ${h} disk — fill sooner from smaller disks`:`empty ${h} disk`:`not yet built ${h} disk`,title:p?`${w===`provision`?`Provisioning`:`Rebuilding`} this disk — ${O}%${D?` (paused)`:``}`:f?`This array is offline while it rebuilds`:a?u?`Pulling into 1 free ${c} — empties it, ready to fill again from Staging`:d?`${c??`Its matching tier`} has already moved past this size — can't fund that tier again until the next Purge${Ns(t)?`, but can still fill a queued larger disk`:``}`:l?`Waiting its turn — the matching tier already has progress toward this level`:`Pulls automatically once ${h}'s own fixed corresponding tier reaches its matching level`:o?se?`Built, waiting to fill from read cache`:g?`Queued — filling from smaller disks and Staging at once`:m?`Filling from Staging — click to also fill it from smaller disks`:`Built, filling from Staging`:`Not yet built`,$full:a,$empty:o,$pullEligible:a&&u,$activeKind:p?w:null,$progress:p?E:0,$paused:p&&D,$clickable:m,$queued:g},r)})})]})]})},Hx=X.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  width: 1rem;
  margin-right: 0.25rem;
  font-size: 0.75rem;
  line-height: 1;
  text-align: center;
  font-weight: 400;
`,Ux=X.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${e=>e.theme.space.md};
  width: 100%;
`,Wx=X.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,Gx=X.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${e=>e.theme.space.sm};
`,Kx=X.h4`
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
`,qx=X.span`
  flex-shrink: 0;
`,Jx=X.div`
  position: relative;
  width: 100%;
  /* Insets the text to the same left/right edges as the pool tile above; a header-only render's
     container (a collapsed pool card's lake row) supplies its own padding instead. */
  padding: ${e=>e.$flush?`0`:`0 0.25rem`};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`,Yx=X.div`
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
`,Xx=X.span`
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
`,Zx=X.div`
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
`,Qx=X.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  font-weight: 600;
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,$x=X.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,eS=e=>{let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:qi(t)},tS=X.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
  font-variant-numeric: tabular-nums;
`,nS=X.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`,rS=X.div`
  align-items: center;
  column-gap: ${e=>e.theme.space.sm};
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  width: 100%;
`,iS=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`,aS=X.div`
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  justify-content: space-between;
  margin-top: 0.15rem;
`,oS=X.div`
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
`,sS=X.div`
  position: absolute;
  inset: 0;
  background: ${e=>e.theme.color.accent};
  opacity: 0.8;
  transform-origin: left center;
  transform: scaleX(${e=>e.$fill});
`,cS=X(Q)`
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
`,lS=X.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${e=>e.theme.color.border};
  margin: 0;
`,uS=e=>{let t=[];for(let n=1;n<=10;n+=1){let r=getDataLakeDepositedUnits(n)(e),i=W(e,n),a=vc(e,n)>0;(r>0||(i?.purchased??0)>0||(i?.boostersUnlocked??!1)||a)&&t.push(n)}return t},dS=({actions:e,state:t,bare:n=!1,tierIndex:r,section:i})=>{let a=i!==`body`,o=i!==`header`,s=i===`header`,c=r==null?uS(t):[r];if(c.length===0)return null;let l=(0,Z.jsx)(Ux,{children:c.map(n=>{let r=_c(n),i=Jc(n)(t),c=Le[n-1]??`Cell`,l=Cl(n),u=bc(t,n),d=!yc(t,n)&&Ge[vc(t,n)+1],f=gs(u*l,n),p=gs(i*l,n),m=wc(t,n),h=Dc(t,n),g=Oc(t,n),_=jc(t,n),v=Fc(t,n),y=Ic(t,n),b=Pl(t,n),x=Ml(t,n),S=Kc(t,n),C=Na(t,n),w=hl(t,n),T=sl(t,n),E=!T&&cl(t,n),D=ml(t,n),O=_l(t,n),k=Pc(t,n)*l,A=Lc(t,n),ee=A&&Al(t,n),j=ee||A&&C&&Za(t,n)>=Ya(t,n)?Ga(t,n)*(ee?no(t,n):1)*Gc(t,n):0,te=O||b&&!D&&!E&&!T,M=i*l,N=!te&&S&&!E&&j>0&&i<=u&&k<M?eS((M-k)/j):null,ne=S?v/100:0,P=(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Hx,{children:Tx}),p]}),re=`${S?v:0}%`;return(0,Z.jsxs)(Wx,{"aria-label":a?`${r} lake`:void 0,children:[a&&(0,Z.jsxs)(Jx,{$flush:s,children:[(0,Z.jsxs)(Gx,{children:[(0,Z.jsxs)(Kx,{title:`${r} Data Lake — funds ${c}`,children:[(0,Z.jsxs)(qx,{"aria-hidden":`true`,children:[(0,Z.jsx)(Hx,{children:`🏞️`}),r]}),(0,Z.jsx)(`span`,{children:`Lake`})]}),(0,Z.jsxs)(Qx,{title:`Current fill speed`,children:[`⚡ `,ms(j),`/s`]})]}),(0,Z.jsxs)(Yx,{children:[D?(0,Z.jsx)(tS,{title:`Auto-converting toward the next ${c} — drawing from this pool's own staging until ${p} is banked, then buys 1 and stops`,children:P}):E?(0,Z.jsx)(tS,{title:`${c} is already at the max — spend or charge it up first`,children:P}):w?(0,Z.jsx)(tS,{title:`Automatically buys the next ${c} for ${p} whenever this lake has enough stored`,children:P}):T?(0,Z.jsx)(cS,{"aria-label":`buy 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Buy 1 ${c} for ${p}`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:P})}):S?(0,Z.jsx)(cS,{"aria-label":`start converting toward 1 ${c} from the ${r} Data Lake`,onClick:()=>e.startDataLakeAutoConvert(n),title:`Draws from this pool's own staging automatically until ${p} is banked, then buys 1 ${c} and stops — automatic overflow fill takes over once this entire pool is built`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:P})}):(0,Z.jsx)(tS,{title:`Build a ${ms(l)} disk in Storage to unlock ${c} here`,children:P}),O?(0,Z.jsx)(cS,{"aria-label":`flush the ${r} Storage Pool`,onClick:()=>e.flushStoragePool(n),title:`Empty this pool and lake, add 1000 ${r} of permanent lake capacity, and begin free automatic disk rebuilding`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`🗜 Flush Pool`})}):b&&!D&&!E&&!T?(0,Z.jsx)(cS,{"aria-label":`increase the ${r} Data Lake's capacity ×10`,onClick:()=>e.doubleDataLakeCapacity(n),title:`Empties the lake (${ms(x)} banked) to grow its capacity from ${f} to ${gs(d*l,n)} — unlocked by completing that array in Storage`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`⚡ Scale Out`})}):N?(0,Z.jsxs)($x,{title:`Time until the next Cell's cost is banked at the current fill speed`,children:[`⏳ `,N]}):null]}),s?(0,Z.jsx)(Xx,{$withBar:!0,title:y?`Banked toward the next ${c} (${p})`:`The next ${c} costs more than this lake can hold (${p}) — Scale Out or Flush Pool`,children:re}):(0,Z.jsx)(Xx,{$withBar:!0,title:`Currently filled`,children:Jo(vs(k,n))}),(0,Z.jsx)(Zx,{role:`progressbar`,"aria-label":`${r} lake fill progress`,"aria-valuenow":S?v:0,"aria-valuemin":0,"aria-valuemax":100,$fill:ne})]}),o&&(()=>{let e=S?Ac(t,n):0,i=ms(l);return(0,Z.jsxs)(`div`,{title:S?`${r} Lake buffer — pool input fills this permanent ${i} buffer first; each full buffer is then moved into a ${i} disk (or consolidated with 9 disks of every smaller size into a larger one)`:`${r} Lake pool — waiting on a ${i} disk to be built in Storage before this can start filling`,children:[(0,Z.jsxs)(aS,{children:[(0,Z.jsx)(`span`,{children:`buffer`}),(0,Z.jsx)(`span`,{children:S?`${ms(g)} / ${i}`:`Locked · 0 / ${i}`})]}),(0,Z.jsx)(Zx,{role:`progressbar`,"aria-label":`${r} lake pool — fills its ${i} buffer`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&_&&(()=>{let e=Mc(t,n),i=gs(l*_.target,n);return(0,Z.jsxs)(`div`,{title:`Moving the full buffer${_.target>1?` and every smaller disk`:``} into one ${i} disk`,children:[(0,Z.jsxs)(aS,{children:[(0,Z.jsxs)(`span`,{children:[`→ `,i,` disk`]}),(0,Z.jsxs)(`span`,{children:[Math.round(e*100),`%`]})]}),(0,Z.jsx)(Zx,{role:`progressbar`,"aria-label":`${r} lake transfer — building a ${i} disk`,"aria-valuenow":Math.round(e*100),"aria-valuemin":0,"aria-valuemax":100,$fill:e,style:{marginTop:`0.2rem`}})]})})(),o&&He.filter(e=>(m[e]??0)>0).map(e=>{let i=h[e]??0,a=m[e],o=S&&_?.target===e,s=l*e,c=o?Mc(t,n):0,u=gs(s,n);return(0,Z.jsxs)(rS,{children:[(0,Z.jsx)(iS,{"aria-hidden":`true`,children:u}),(0,Z.jsx)(nS,{role:`group`,"aria-label":`${r} lake ${u} disks`,children:Array.from({length:a},(e,t)=>{let n=t<i,r=!n&&t===i&&o;return(0,Z.jsx)(oS,{$full:n,"aria-label":n?`full ${u} lake disk`:r?`filling ${u} lake disk, ${Math.round(c*100)}%`:`empty ${u} lake disk`,children:r&&(0,Z.jsx)(sS,{$fill:c})},t)})})]},e)}),o&&(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`${r} lake deposits`,"aria-valuenow":Math.round((u>0?Math.min(1,Pc(t,n)/u):0)*100),"aria-valuemin":0,"aria-valuemax":100})]},n)})});return n?(0,Z.jsxs)(Z.Fragment,{children:[a&&!s&&(0,Z.jsx)(lS,{}),l]}):(0,Z.jsx)(Jh,{"aria-label":`Data Lakes`,children:l})},fS=h(),pS=X.div`
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
`,mS=X.h4`
  margin: 0 0 ${e=>e.theme.space.xs};
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.sm.size};
`,hS=X.dl`
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
`,gS=X.p`
  margin: ${e=>e.theme.space.xs} 0 0;
  color: ${e=>e.theme.color.textMuted};
`,_S=8,vS=6,yS=({anchorRef:e,id:t,onClose:n,title:r,rows:i,note:a})=>{let o=(0,v.useRef)(null),[s,c]=(0,v.useState)(null);return(0,v.useLayoutEffect)(()=>{let t=e.current?.getBoundingClientRect();if(!t)return;let n=o.current?.offsetHeight??0,r=window.innerHeight-_S-n,i=t.bottom+vS,a=t.top-vS-n,s=i<=r||a<_S?Math.max(_S,Math.min(i,r)):a,l=Math.max(_S,window.innerWidth-t.right);c(e=>e?.top===s&&e?.right===l?e:{top:s,right:l})}),(0,v.useLayoutEffect)(()=>{let t=o.current,n=e.current;return t?.focus({preventScroll:!0}),()=>{t?.contains(document.activeElement)&&n?.focus({preventScroll:!0})}},[e]),(0,v.useEffect)(()=>{let t=e=>o.current?.contains(e),r=r=>{!t(r.target)&&!e.current?.contains(r.target)&&n()},i=e=>{t(e.target)||n()},a=e=>{e.key===`Escape`&&n()};return document.addEventListener(`pointerdown`,r,!0),document.addEventListener(`wheel`,i,{capture:!0,passive:!0}),document.addEventListener(`touchmove`,i,{capture:!0,passive:!0}),document.addEventListener(`scroll`,i,!0),document.addEventListener(`keydown`,a),window.addEventListener(`resize`,n),()=>{document.removeEventListener(`pointerdown`,r,!0),document.removeEventListener(`wheel`,i,{capture:!0}),document.removeEventListener(`touchmove`,i,{capture:!0}),document.removeEventListener(`scroll`,i,!0),document.removeEventListener(`keydown`,a),window.removeEventListener(`resize`,n)}},[e,n]),(0,fS.createPortal)((0,Z.jsxs)(pS,{ref:o,id:t,role:`dialog`,"aria-label":r,tabIndex:-1,style:s??{top:0,right:_S,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,Z.jsx)(mS,{children:r}),(0,Z.jsx)(hS,{children:i.map(({label:e,value:t})=>(0,Z.jsxs)(`div`,{style:{display:`contents`},children:[(0,Z.jsx)(`dt`,{children:e}),(0,Z.jsx)(`dd`,{children:t})]},e))}),a&&(0,Z.jsx)(gS,{children:a})]}),document.body)},bS=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.md};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.lg} + env(safe-area-inset-top))
    ${e=>e.theme.space.md} ${e=>e.theme.space.lg};
  color: ${e=>e.theme.color.text};
`,xS=X.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,SS=X.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,CS=X.p`
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
`,wS=X.button`
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
`,TS=({theme:e})=>wh`
  border: 1.5px solid color-mix(in srgb, ${e.color.borderStrong} 65%, ${e.color.text});
  box-shadow: ${e.shadow.md};
`,ES=({theme:e})=>`color-mix(in srgb, ${e.color.surfaceSunken} 45%, ${e.color.surface})`,DS=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;

  ${e=>wh`
  button {
    background-color: ${ES(e)};
    border-width: 1px;
    border-color: color-mix(in srgb, currentColor 45%, transparent);
  }
`}
`,OS=X(Jh)`
  width: 100%;
  padding: 0;
  overflow: hidden;
  ${TS}

  button {
    background-color: ${ES};
    border: 0;
    border-radius: 0;
  }
`,kS=e=>{if(!Number.isFinite(e))return`—`;let t=Math.max(1,Math.ceil(e)),n=Math.floor(t/86400);return n>0?`${n}d ${Math.floor(t%86400/3600)}h`:qi(t)},AS=(e,t,n)=>va(e,t,t,n),jS=(e,t,n)=>{let r=AS(e,t,n);return r===null?null:kS(r)},MS=X.div`
  display: flex;
  gap: ${e=>e.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`,NS=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
`,PS=jh`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`,FS=X.span`
  display: inline-block;
  animation: ${PS} 1.2s steps(4, jump-none) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,IS=X.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: ${e=>e.theme.space.md};
  width: 100%;
  min-width: 0;
  text-align: left;
`,LS=X.span`
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
`,RS=X.span`
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
`,zS=X.span`
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
`,BS=X.span`
  grid-column: 3;
  grid-row: 2;
  align-self: end;
  justify-self: end;
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.85;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,VS=X.span`
  grid-column: 3;
  grid-row: 1;
  justify-self: end;
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`,HS=X(Zx)`
  margin-top: 0;
`,US=X.span`
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.85;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,WS=X(Jh)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${TS}
  ${e=>e.$boosted&&Lv}
`,GS=X.div`
  padding: calc(0.6rem - 1px) 0.75rem 0.6rem;
  border-top: 1px solid ${e=>e.theme.color.border};
  &:empty {
    display: none;
  }
`,KS=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.sm};
  padding: ${e=>e.theme.space.sm} 0.5rem 0.5rem;
`,qS=X(Jh)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${TS}
  ${e=>e.$boosted&&Lv}

  > :first-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`,JS=X.button`
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
`,YS=X.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  pointer-events: none;
`,XS=X.button`
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
`,ZS=X.div`
  position: relative;
  width: 100%;
`,QS=X.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0 ${e=>e.theme.space.sm};
  width: 100%;
`,$S=X.h3`
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
`,eC=X.span`
  flex-shrink: 0;
`,tC=X(X.span`
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
`,nC=X.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem 0.75rem;
  border: 0;
  border-radius: ${e=>e.theme.radius.sm};
  color: ${e=>e.theme.color.text};
  ${s_}
  background-color: ${ES};
`,rC=X(nC)`
  position: relative;
`,iC=X(nC)`
  align-items: stretch;
  padding-top: calc(0.6rem - 1px);
  border-top: 1px solid ${e=>e.theme.color.border};
  border-radius: 0;
`,aC=X(nC)`
  position: relative;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`,oC=(e,t,n,r=!0)=>{let i=Ro(t,n),a=i&&e>0&&e<i.divisor?Ro(e,n):i;return r?Ko(e,a):Wo(e,a)},sC=(e,t,n=``)=>{let r=Ro(e,!0);return`${qo(e/r.divisor)} → ${qo(t/r.divisor)} ${r.symbol}${n}`},cC=(e,t)=>Wo(e,Ro(e,t)),lC=5e3,uC=e=>/^[\d,]+(\.0+)?(\s|$)/.test(e),dC=e=>{let[t,n]=(0,v.useState)(null),[r,i]=(0,v.useState)(0);return(0,v.useEffect)(()=>{let e=()=>i(e=>e+1);return window.addEventListener(`pointerdown`,e),window.addEventListener(`keydown`,e),()=>{window.removeEventListener(`pointerdown`,e),window.removeEventListener(`keydown`,e)}},[]),(0,v.useEffect)(()=>{if(n(null),!uC(e))return;let t=setTimeout(()=>n(e),lC);return()=>clearTimeout(t)},[e,r]),t===e},fC=({bits:e,poolIndex:t,large:n})=>{let r=dC(ys(e,t))?vs(e,t):ys(e,t);return(0,Z.jsx)(CS,{$large:n,children:r})},pC=e=>Math.min(100,Math.max(0,e)),mC=8,hC=X.div`
  display: grid;
  grid-template-columns: 1fr 40% 1fr;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
`,gC=X.span`
  justify-self: start;
  text-align: left;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,_C=X.span`
  justify-self: end;
  font-weight: 600;
  color: ${e=>e.theme.color.warn};
  white-space: nowrap;
`,vC=X.span`
  grid-column: 3;
  justify-self: end;
  color: ${e=>e.theme.color.textMuted};
  white-space: nowrap;
`,yC=X.div`
  position: relative;
  min-width: 0;
  height: ${mC}px;
  border-radius: ${e=>e.theme.radius.pill};
  background: transparent;
  overflow: hidden;
`,bC=X(X.div`
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
`,xC=X.span`
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.85));
`,SC=({capacityText:e,bonusPercent:t=0,ariaLabel:n,timeLeftText:r=null,bufferNoun:i=`buffer`})=>{let a=Math.min(100,Math.max(0,t)),o=a>0;return(0,Z.jsxs)(hC,{children:[(0,Z.jsxs)(gC,{children:[(0,Z.jsx)(Hx,{children:`📦`}),e]}),o&&(0,Z.jsx)(yC,{role:`progressbar`,"aria-label":`${n} ping bonus`,"aria-valuenow":Math.round(a),"aria-valuetext":`+${Math.round(a)}%`,"aria-valuemin":0,"aria-valuemax":100,children:(0,Z.jsx)(bC,{$widthPercent:a/100*100})}),o&&(0,Z.jsxs)(_C,{children:[`+`,Math.round(a),`% `,(0,Z.jsx)(xC,{children:`👆`})]}),!o&&r&&(0,Z.jsxs)(vC,{title:`Estimated time until this ${i} is full, following the fill multiplier and assuming nothing else draws from it`,children:[`⏳ `,r]})]})},CC=[[10,[229,72,77]],[100,[59,130,246]],[je,[48,164,108]]],wC=e=>{let t=CC.length-1;if(e<=CC[0][0])return`rgb(${CC[0][1].join(`,`)})`;if(e>=CC[t][0])return`rgb(${CC[t][1].join(`,`)})`;let n=CC.findIndex(([t])=>e<=t),[r,i]=CC[n-1],[a,o]=CC[n],s=Math.log(e/r)/Math.log(a/r);return`rgb(${i.map((e,t)=>Math.round(e+(o[t]-e)*s)).join(`,`)})`},TC=({game:e,focusNonce:t=0})=>{let{actions:n,claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a,state:o}=e,{intro:s}=o,c=s.bits>=s.capacity,l=dC(oC(s.bits,s.capacity,s.byteCreated,!0)),u=!s.byteCreated&&s.bits>=8,d=jo(o),f=Ba(o),[p,m]=(0,v.useState)(null);(0,v.useEffect)(()=>{m(null)},[f]);let h=p===0?null:p??f,[g,_]=(0,v.useState)(null),y=(0,v.useRef)(null),x=(0,v.useCallback)(()=>_(null),[]),S=e=>_(t=>t===e?null:e),C=e=>`${Jo(Yo(e))}/s`,w=ma(s),T=Yu(s),E=s.byteCreated?C(Ta(s)):null,D=Sa(s),O=jS(s.bits,s.capacity,w*T),k=f>=1&&(s.dataStreamTapBonusPercent??0)>=100,A=os(o),ee=us(o),j=as(o),te=fs(o,j),M=ds(o,j),N=Ma(j),ne=Math.max(0,Za(o,N)-uo(o,N)),P=ls(o),re=ss(o),ie=ua(s).toFixed(3),F=ua({...s,unlockedDiskSteps:la(s)+1}).toFixed(3),ae=ms(ns(la(s)+1)),oe=()=>{(typeof window>`u`||typeof window.confirm!=`function`||window.confirm(`Reformat to unlock ${ae} disks? The Foundry restarts from scratch (Capacity, Disks, Data Lakes, pool compactions and Compute entities); Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are then auto-rebuilt up to your prior highs. Bitrate exponent ${ie} → ${F}.`))&&n.unlockNextDiskSize()},se=d?xs(o):[],ce=!A&&Ss(o),le=s.diskBuild,ue=!A&&!P&&fo(o)&&!ce&&!le,de=Math.min(M,ps(o,j)),fe=Math.floor(de+1e-9),pe=de>0||s.diskBuildQueued,me=le?pC(100-le.remainingSeconds/le.totalSeconds*100):P?100:pe?pC(de/M*100):0,I=lc(o,j),L=vo(o),R=bo(o),he=!!s.capacityUpgradeQueued,ge=!!s.speedUpgradeQueued,_e=he||ge,ve=s.capacity,ye=yo(s),be=s.capacity*2,xe=cC(be,!0),Se=fa(s),Ce=ma(Se?{...s,capacity:be}:{...s,speedCapacity:ye*2}),we=`${Yo(Ce)}/s`,Te=w>0?`×${Number((Ce/w).toFixed(2))}`:``,Ee=pC(s.bits/8*100),De=pC((s.capacityUpgradeProgress??0)/ve*100),Oe=pC((s.speedUpgradeProgress??0)/ye*100),ke=ge?Oe:De,Ae=Da(s),je=Ae?.cost??0,Me=Ae?.progress??0,Ne=Ae?.multiplierPercent??100,Pe=C(Ae?.rate??0),Fe=Ae?.rate??0,Ie=kS(Fe>0&&je>0?Math.max(0,je-Me)/Fe:1/0),Le=pC(s.bits/s.capacity*100),Re=()=>{ce?n.provisionDisk():n.queueDiskBuild()},ze=s.diskBuildQueued,Be=`${fe}/${M}`,Ve=M>1||fe>0?` · ${Be}`:``,He=`Provision ${ms(j)} Disk`,Ue=!!ze&&!le&&!P&&!A,We=Ma(ee),Ge=A?s.diskBuild?`waiting for build`:Fa(o,We)?`waiting for earlier pool`:Ga(o,We)<=0?`waiting for pool`:Za(o,We)<=uo(o,We)?`waiting for staging`:null:null,Ke=le?{icon:`🏗`,label:`Provisioning ${ms(le.size)} Disk`,status:`${Math.ceil(le.remainingSeconds)}s left`}:P?{icon:`✅`,label:`All Pools Complete (${ms(j)})`,status:null}:A?{icon:`🔁`,label:He,status:`Rebuilding ${ms(ee)} first · ${Ge??`automatic`}`}:ze?{icon:`⏳`,label:`Provisioning ${ms(j)} Disk`,status:`${fe>0?Be:`Queued`} · ${ce?ne>0?`building`:`waiting for staging`:ue?`after disk fill`:`waiting for pool`}`}:ce?{icon:`🏦`,label:He,status:`Ready · ${Tx} ${ms(te)}${Ve}`}:{icon:`🏦`,label:He,status:`${Tx} ${ms(te)}${Ve} · tap to queue`,reason:ue?`disk fill comes first`:`pool not ready (offline, rebuilding or too small)`},qe=no(o,A?We:N),Je=100*qe,Ye=(A?Ka(o,We):Ga(o,N))*qe,Xe=`${Jo(ms(Ye))}/s`,Ze=A&&Ga(o,We)<=0,Qe=As(o),$e=Qe.disksTotal>0?pC(Qe.disksDone/Qe.disksTotal*100):0,et=Qe.seconds,tt=A?$e:me,nt=Math.max(0,(M-de)*j),rt=ro(o,N)*to(o,N)/100*Qu(s,N),it=Math.min(nt,ne),at=Ye>0?it/Ye+(nt-it)/Math.max(Math.min(Ye,rt),Number.MIN_VALUE):1/0,ot=A?kS(et):ue?`—`:kS(at),st=d&&!P&&!le&&Ye>0&&(A||ze),ct=(0,Z.jsx)(Q,{"aria-label":`reformat to unlock disk size`,onClick:oe,title:`Reformat the Byte Foundry to unlock ${ae} disks. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are auto-rebuilt up to your prior highs; Compute entities and pool compactions are not. The bitrate exponent rises ${ie} → ${F}.`,type:`button`,variant:`prestige`,children:(0,Z.jsxs)(NS,{children:[(0,Z.jsxs)(`span`,{children:[`🔁 Reformat: unlock `,ae,` Disks`]}),(0,Z.jsx)(US,{children:`Bitrate exponent ${ie} → ${F} · auto-rebuilds to your highs`})]})}),lt=re?ct:(0,Z.jsxs)(Q,{"aria-label":le?`disk array rebuilding`:P?`disk ladder complete`:`provision disk`,"aria-description":Ke.reason?`${Ke.status} (${Ke.reason})`:Ke.status??void 0,disabled:!!le||P||A,onClick:Re,title:le?`Provisioning ${ms(le.size)} — ${Math.ceil(le.remainingSeconds)}s (array offline)`:P?`All ${ja()} storage pools are complete through ${ms(j)}`:A?`Smaller sizes are rebuilt first (one staging fill per disk, no provisioning cost) (${ms(ee)} now); ${ms(j)} unlocks for provisioning once they are done`:ze?`Armed — draws from the pool staging at the pool's fixed bandwidth${ue?` once Disk Fill is done`:``} (${fe}/${M} passes so far)`:ce?I?`Costs ${ms(te)}, paid in ${M} pass${M===1?``:`es`} of ${ms(j)} each (${fe}/${M} collected) — creates an empty ${ms(j)} container; its cache fills it automatically, and once full it is pulled right away to complete a ${I} level`:`Costs ${ms(te)}, paid in ${M} pass${M===1?``:`es`} of ${ms(j)} each (${fe}/${M} collected) — creates an empty ${ms(j)} container; its cache fills it automatically; it is pulled once its matching tier reaches the matching level`:ue?`Disk Fill comes first — click to arm this build so it starts the instant it is your turn`:`The pool isn't ready yet (offline, rebuilding or too small) — click to arm this build so it starts as soon as it is (${fe}/${M} passes so far)`,type:`button`,variant:P||A?`neutral`:ze?`smart`:ce?`info`:`neutral`,$progress:tt,$pulse:Ue,children:[st?(0,Z.jsxs)(IS,{children:[(0,Z.jsxs)(LS,{children:[Ke.icon,` `,A?`Rebuilding`:`${ms(j)} Disk…`]}),(0,Z.jsx)(RS,{children:A?(()=>{let e=ns(la(s)-1);return e>ee?`${ms(ee)} → ${ms(e)}`:`${ms(ee)} disks`})():fe>0?Be:`Queued`}),(0,Z.jsxs)(zS,{children:[Math.floor(tt),`%`]}),(0,Z.jsxs)(VS,{style:{color:wC(Je),...A&&Qe.projected?{opacity:.55}:null},title:Ze?`Projected bandwidth — this rebuild waits for the pool's Capacity`:A&&Qe.projected?`Pool bandwidth — a later pool is not live yet, so the total time is an estimate`:`Pool fill bandwidth funding this disk`,children:[`⚡ `,A&&Qe.projected?`~`:``,Xe]}),ot!==`—`&&(0,Z.jsxs)(BS,{style:Qe.projected?{opacity:.5,fontStyle:`italic`}:void 0,title:Qe.projected?`Estimate — part of this rebuild waits for a pool's Capacity`:void 0,children:[`⏳ `,Qe.projected?`~`:``,ot]})]}):(0,Z.jsxs)(NS,{children:[(0,Z.jsxs)(`span`,{children:[Ke.icon,` `,Ke.label,Ue?`…`:``]}),Ke.status&&(0,Z.jsx)(US,{children:Ke.status})]}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`byte foundry disk build progress`,"aria-valuenow":Math.round(tt),"aria-valuemin":0,"aria-valuemax":100})]}),ut=g===null||g===`stream`&&!!E||g===`upgrade`&&s.byteCreated&&_e&&!!Ae||d&&Array.from({length:f},(e,t)=>`pool-${t+1}`).includes(g);(0,v.useEffect)(()=>{ut||_(null)},[ut]);let dt=g===`stream`,ft=null;if(dt){let e=xa(s),t=s.dataStreamTapBonusPercent??0,n=0;for(let e=1;e<=f;e+=1)n+=Ga(o,e);ft=[{label:`Bitrate now`,value:E},{label:`Base Bitrate`,value:C(w)},...T===1?[]:[{label:`Compute Boost`,value:`×${T}`}],{label:`Fill multiplier`,value:`${Math.round(e)}%`},{label:`Ping bonus (upgrades)`,value:`+${Math.round(t)}%`},{label:`Bitrate exponent`,value:ie},...d&&f>0?[{label:`Reserved by pools`,value:C(Math.min(w,n))}]:[],...Ae?[{label:`Upgrade bar drawing`,value:Pe}]:[],{label:`Buffer`,value:`${Math.floor(Le*10)/10}% full`},{label:`Time to full`,value:O??(c?`Full`:`—`)},...R&&!_e?[{label:`After Upgrade Bitrate`,value:`${we} (${Te})`}]:[]]}let pt=g===`upgrade`&&!!Ae,mt=pt?[{label:`Draw now`,value:Pe},{label:`Base Bitrate`,value:C(w)},{label:`Data Stream delivers`,value:E},{label:`Progress`,value:`${Yo(Me)} / ${Yo(je)}`},{label:`Time left`,value:Ie},...Ae.kind===`speed`?[{label:`Bitrate after`,value:sC(w,Ce,`/s`)}]:[{label:`Capacity after`,value:sC(s.capacity,be)},...Se?[{label:`Bitrate after`,value:sC(w,Ce,`/s`)}]:[]]]:null;return(0,Z.jsxs)(bS,{children:[(0,Z.jsx)(Ey,{claimOfflineAdReward:r,dismissOfflineProgress:i,offlineProgress:a}),(0,Z.jsx)(SS,{children:(0,Z.jsx)(xS,{children:`🔥 Byte Foundry`})}),(0,Z.jsxs)(qS,{"aria-label":`Data Stream`,$boosted:Nv(s),children:[(0,Z.jsxs)(rC,{as:s.mainGameUnlocked?`div`:`section`,"aria-label":s.mainGameUnlocked?void 0:`data stream balance`,$progress:Le,children:[s.mainGameUnlocked&&(0,Z.jsx)(JS,{type:`button`,onClick:n.tapIntroBit,disabled:k,"aria-label":`ping to generate a bit`,title:k?`Ping bonus already at the 100% cap`:void 0}),(0,Z.jsxs)(YS,{children:[(0,Z.jsxs)(ZS,{children:[(0,Z.jsxs)(QS,{children:[(0,Z.jsx)($S,{children:(0,Z.jsxs)(`span`,{children:[(0,Z.jsx)(Hx,{children:`🌊`}),`Data Stream`]})}),(0,Z.jsx)(CS,{$large:!(s.byteCreated&&(s.dataStreamTapBonusPercent??0)>0),children:oC(s.bits,s.capacity,s.byteCreated,!l)}),E&&(0,Z.jsxs)(tC,{ref:dt?y:void 0,$centered:!(s.dataStreamTapBonusPercent>0)&&!O,$color:wC(D),title:`Delivered bitrate at ${Math.round(D)}% fill multiplier`,"aria-label":`data stream bitrate ${E}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":dt,"aria-controls":dt?`data-stream-speed-details`:void 0,onClick:()=>S(`stream`),children:[`⚡ `,E]}),dt&&(0,Z.jsx)(yS,{anchorRef:y,id:`data-stream-speed-details`,onClose:x,title:`Data Stream bitrate`,rows:ft})]}),(0,Z.jsx)(SC,{capacityText:cC(s.capacity,s.byteCreated),bonusPercent:s.dataStreamTapBonusPercent??0,timeLeftText:O,ariaLabel:`data stream fill-based bitrate multiplier`})]}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`data stream bit balance`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":s.capacity})]})]}),s.byteCreated&&_e&&(0,Z.jsxs)(iC,{"aria-label":ge?`upgrade bitrate`:`upgrade capacity`,as:`section`,title:ge?`Upgrading Bitrate — pulling the Data Stream's Bitrate into the bar`:`Upgrading to ${xe} — pulling the Data Stream's base Bitrate into the bar`,children:[(0,Z.jsxs)(IS,{children:[(0,Z.jsxs)(LS,{children:[(0,Z.jsx)(Hx,{children:`⏫`}),`Upgrading`,(0,Z.jsx)(FS,{children:`…`})]}),(0,Z.jsxs)(RS,{children:[(0,Z.jsx)(Hx,{children:ge?`⚡`:`📦`}),ge?sC(w,Ce,`/s`):sC(s.capacity,be)]}),(0,Z.jsxs)(zS,{children:[Math.floor(ke),`%`]}),(0,Z.jsxs)(tC,{ref:pt?y:void 0,$color:wC(Ne),style:{gridColumn:3,gridRow:1,alignSelf:`start`,justifySelf:`end`},title:`Upgrade draw at a constant 1x Bitrate`,"aria-label":`upgrade draw bitrate ${Pe}, show bitrate details`,"aria-haspopup":`dialog`,"aria-expanded":pt,"aria-controls":pt?`upgrade-speed-details`:void 0,onClick:()=>S(`upgrade`),children:[`⚡ `,Pe]}),pt&&(0,Z.jsx)(yS,{anchorRef:y,id:`upgrade-speed-details`,onClose:x,title:Ae.kind===`speed`?`Upgrade Bitrate draw`:`Upgrade Capacity draw`,rows:mt}),(0,Z.jsxs)(BS,{children:[`⏳ `,Ie]})]}),(0,Z.jsx)(HS,{$fill:Math.min(1,Math.max(0,ke/100)),"aria-hidden":`true`}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`data stream upgrade progress`,"aria-valuenow":Math.round(ke),"aria-valuemin":0,"aria-valuemax":100})]}),(u||s.byteCreated&&!_e)&&(0,Z.jsxs)(DS,{children:[u&&(0,Z.jsxs)(Q,{"aria-label":`compile 8 bits into a Byte`,onClick:n.combineIntroByte,type:`button`,variant:`primary`,$progress:Ee,children:[(0,Z.jsx)($,{children:`🔗 Compile into a Byte`}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`byte foundry compile progress`,"aria-valuenow":s.bits,"aria-valuemin":0,"aria-valuemax":8})]}),s.byteCreated&&!_e&&(0,Z.jsx)(MS,{children:!_e&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Q,{"aria-label":`upgrade data stream capacity`,disabled:!L,onClick:n.pickIntroCapacityMilestone,title:L?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling doubles Capacity${Se?` and raises Bitrate with it`:``}`:`Capacity is already at its maximum`,"aria-description":L?`Costs ${Yo(ve)}; capacity ${xe}${Se?` and bitrate ${we}`:``} after upgrading`:void 0,type:`button`,variant:L?`prestige`:`neutral`,children:(0,Z.jsxs)(NS,{children:[(0,Z.jsx)(`span`,{children:Se?`Upgrade`:`Upgrade Capacity`}),(0,Z.jsx)(US,{children:L?`🏷️ ${Yo(ve)} · 📦 ×2${Se?` · ⚡ ${Te}`:``}`:`📦 Max capacity`})]})}),!Se&&(0,Z.jsx)(Q,{"aria-label":`upgrade data stream bitrate`,disabled:!R,onClick:n.queueIntroSpeedUpgrade,title:R?`Pull the Data Stream's base Bitrate into the upgrade; its bar filling raises Bitrate`:`Base Bitrate cannot exceed Capacity^${ie} — upgrade Capacity first`,"aria-description":R?`Costs ${Yo(ye)}; bitrate ${we} after upgrading`:void 0,type:`button`,variant:R?`prestige`:`neutral`,children:(0,Z.jsxs)(NS,{children:[(0,Z.jsx)(`span`,{children:`Upgrade Bitrate`}),(0,Z.jsx)(US,{children:R?`🏷️ ${Yo(ye)} · ⚡ ${Te}`:`⚡ Needs Capacity`})]})})]})})]})]}),s.byteCreated&&(0,Z.jsx)(OS,{"aria-label":`Provision Disk`,children:lt}),d&&Array.from({length:f},(e,t)=>{let r=t+1,i=ro(o,r),a=Za(o,r),c=Ya(o,r),l=c>0?pC(a/c*100):0,u=a>=c,d=to(o,r),f=eo(o,r),p=jS(a,c,i),_=Al(o,r),v=se.filter(e=>Ma(e)===r),C=h===r,T=b[r-1]?.symbol??`#${r}`,E=e=>`${Jo(ms(e))}/s`,D=E(i*d/100*Qu(s,r)),O=g===`pool-${r}`,k=null,A=Ga(o,r);if(O){let e=0;for(let t=1;t<r;t+=1)e+=Ga(o,t);let t=$a(o,r);k=[{label:`Fill bandwidth now`,value:D},{label:`Available (before multiplier)`,value:E(i)},{label:`Bandwidth (theoretical)`,value:E(A)},{label:`Data Stream bitrate`,value:E(w)},...r>1?[{label:`Taken by earlier pools`,value:E(Math.min(w,e))}]:[],{label:`Fill multiplier`,value:`${Math.round(t)}%`},{label:`Ping bonus (disks, merges, provisioning, lake)`,value:`+${Math.round(f)}%`},{label:`Staging`,value:`${Math.floor(l*10)/10}% full`},{label:`Time to full`,value:p??(u?`Full`:`—`)},..._?[{label:`Draining to Data Lake`,value:E(A*no(o,r))}]:[]]}return(0,Z.jsxs)(WS,{"aria-label":`pool ${r}`,$boosted:Fv(s,r),children:[(0,Z.jsxs)(aC,{$progress:l,children:[(0,Z.jsx)(JS,{type:`button`,onClick:()=>n.tapPoolBuffer(r),"aria-label":`ping pool ${r} staging`}),(0,Z.jsxs)(YS,{children:[(0,Z.jsxs)(ZS,{children:[(0,Z.jsxs)(QS,{children:[(0,Z.jsx)($S,{children:(0,Z.jsxs)(XS,{type:`button`,"aria-expanded":C,"aria-label":`${C?`collapse`:`expand`} pool ${r}`,onClick:()=>m(C?0:r),children:[(0,Z.jsxs)(eC,{"aria-hidden":`true`,children:[(0,Z.jsx)(Hx,{children:`💧`}),T]}),(0,Z.jsx)(`span`,{children:`Pool`})]})}),(0,Z.jsx)(fC,{bits:a,poolIndex:r,large:f<=0}),(0,Z.jsxs)(tC,{ref:O?y:void 0,$centered:f<=0&&!p,$color:wC(d),title:`Available fill bandwidth at ${Math.round(d)}% fill multiplier`,"aria-label":`pool ${r} bandwidth ${D}, show bandwidth details`,"aria-haspopup":`dialog`,"aria-expanded":O,"aria-controls":O?`pool-${r}-speed-details`:void 0,onClick:()=>S(`pool-${r}`),children:[`⚡ `,D]}),O&&(0,Z.jsx)(yS,{anchorRef:y,id:`pool-${r}-speed-details`,onClose:x,title:`${T} Pool bandwidth`,rows:k,note:i>=A?void 0:r>1?`Limited by the Data Stream: earlier pools take their Bandwidth first.`:`Limited by the Data Stream's own bitrate.`})]}),(0,Z.jsx)(SC,{capacityText:gs(c,r),bonusPercent:f,timeLeftText:p,bufferNoun:`staging`,ariaLabel:`pool ${r} fill-based bandwidth multiplier`})]}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":`pool ${r} staging`,"aria-valuenow":Math.round(l),"aria-valuemin":0,"aria-valuemax":100})]})]}),!C&&(0,Z.jsx)(GS,{children:(0,Z.jsx)(dS,{actions:n,state:o,bare:!0,section:`header`,tierIndex:r})}),C&&(0,Z.jsxs)(KS,{children:[v.map(e=>(0,Z.jsx)(Vx,{actions:n,size:e,state:o},e)),(0,Z.jsx)(dS,{actions:n,state:o,bare:!0,tierIndex:r})]})]},r)}),!s.mainGameUnlocked&&(0,Z.jsx)(wS,{"aria-label":`ping to generate a bit`,disabled:c||k,title:!c&&k?`Ping bonus already at the 100% cap`:void 0,onClick:n.tapIntroBit,type:`button`,children:`👆 Ping`})]})},EC=X.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  max-width: 520px;
  margin: 0 auto;
  padding: calc(1.25rem + env(safe-area-inset-top)) 1rem calc(1.25rem + env(safe-area-inset-bottom));
  color: ${e=>e.theme.color.text};
  font-variant-numeric: tabular-nums;
`,DC=X.header`
  text-align: center;
  width: 100%;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.75rem;
    margin: 0 0 0.35rem;
  }
`,OC=X.p`
  color: ${e=>e.theme.color.accent};
  font-family: ${e=>e.theme.font.display};
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
`,kC=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  text-align: center;
`,AC=X.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.xs};
  width: 100%;
`,jC=X(Jh)`
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
`,MC=wh`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,NC=X.div`
  align-items: baseline;
  column-gap: ${e=>e.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
`,PC=X.span`
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
`,FC=X.span`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 500;
  ${MC}
`,IC=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: boost;
  text-align: right;
  ${MC}
`,LC=X(Q)`
  font-size: ${e=>e.theme.type.scale.sm.size};
  font-weight: 700;
  grid-area: buy;
  min-height: 2rem;
  padding: 0 0.6em;
  width: 100%;
  ${MC}

  @media (max-width: 40rem) {
    font-size: ${e=>e.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`,RC=X.div`
  border-top: 1px solid ${e=>e.theme.color.border};
  color: ${e=>e.theme.color.textMuted};
  font-size: ${e=>e.theme.type.scale.xs.size};
  grid-area: details;
  margin-top: ${e=>e.theme.space.xs};
  padding: ${e=>e.theme.space.xs} 0 2px;
`,zC=Object.fromEntries(b.map(e=>[e.id,e])),BC=({game:e})=>{let{actions:t,state:n}=e,r=n.purge?.points??0,i=In(n),a=Dn(n),o=gh(),[s,c]=(0,v.useState)(()=>new Set),l=e=>c(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}),u=gt.reduce((e,t,r)=>(n.computeFlops?.owned?.[t.id]??0)>0||Mn(n,t.id)?r:e,-1),d=gt.slice(0,Math.max(1,u+2));return(0,Z.jsxs)(EC,{"aria-label":`compute flops screen`,children:[(0,Z.jsxs)(DC,{children:[(0,Z.jsx)(`h1`,{children:`🖥 Compute`}),(0,Z.jsx)(OC,{"aria-label":`cumulative flops boost`,children:zn(i)})]}),!a&&(0,Z.jsxs)(kC,{children:[`Unlocks at `,100,` PP — you have `,B(r),` PP.`]}),(0,Z.jsx)(AC,{"aria-label":`compute flops tiers`,children:d.map((e,i)=>{let c=n.computeFlops?.owned?.[e.id]??0,u=Rn(n,e.boostsTierId),d=jn(e,c),f=Mn(n,e.id),p=zC[e.boostsTierId],m=p?.name??e.boostsTierId,h=s.has(e.id),g=(ht*100).toFixed(2);return(0,Z.jsxs)(jC,{$accent:o.tierAccents[i%o.tierAccents.length],"aria-label":`${e.name} · ${e.outputLabel} compute tier`,children:[(0,Z.jsxs)(NC,{children:[(0,Z.jsx)(PC,{"aria-expanded":h,"aria-label":`${e.name} (${e.outputLabel}) details`,onClick:()=>l(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),l(e.id))},role:`button`,tabIndex:0,title:`${e.name} · ${e.outputLabel}`,children:e.symbol}),(0,Z.jsxs)(FC,{title:`Owned`,children:[(0,Z.jsx)(d_,{children:`Owned: `}),B(c)]})]}),(0,Z.jsxs)(IC,{title:`${m} production multiplier`,children:[p?.symbol??m,` ×`,u.toFixed(2)]}),(0,Z.jsx)(LC,{"aria-label":`buy ${e.name} (${e.outputLabel}) for ${B(d)} Purge Points`,disabled:!a||!f,onClick:()=>t.buyComputeFlopsTier(e.id),title:a?f?`Spend ${B(d)} PP for +${g}%/s on ${m}`:`Costs ${B(d)} PP — you have ${B(r)} PP`:`Reach 100 PP to reveal Compute`,type:`button`,variant:`success`,children:(0,Z.jsxs)($,{children:[B(d),` PP`]})}),h&&(0,Z.jsxs)(RC,{children:[e.name,` · `,e.outputLabel,` · +`,g,`%/s `,m,` production each ·`,` `,m,` ×`,u.toFixed(4)]})]},e.id)})})]})},VC=X.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.lg};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${e=>e.theme.space.xl} + env(safe-area-inset-top))
    ${e=>e.theme.space.lg} ${e=>e.theme.space.xl};
  color: ${e=>e.theme.color.text};
`,HC=X.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`,UC=X.h1`
  font-family: ${e=>e.theme.font.display};
  font-size: ${e=>e.theme.type.scale.xl.size};
  margin: 0;
`,WC=X.p`
  margin: 0;
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,GC=X.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`,KC=X.div`
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
`,qC=X.div`
  height: 0.6rem;
`,JC=X.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  margin-left: auto;
  gap: 4px;
`,YC=X.span`
  color: ${e=>e.theme.color.textMuted};
  flex: 0 0 auto;
  font-size: 0.78em;
  font-weight: 400;
  white-space: nowrap;
`,XC=X.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 0.45rem 0.6rem;
  border-radius: ${e=>e.theme.radius.lg};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.$selected?e.theme.color.warn:e.theme.color.border};
`,ZC=X.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.sm};
  width: 100%;
  padding: ${e=>e.theme.space.md};
  border-radius: ${e=>e.theme.radius.md};
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
`,QC=X.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px ${e=>e.theme.space.xs};
  width: 100%;
`,$C=X.button`
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
`,ew=X.span`
  flex: 0 0 auto;
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
`,tw=X.span`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 5px;
`,nw=X.span`
  align-items: baseline;
  display: flex;
  gap: 0.35rem;
  min-width: 0;
`,rw=X.span`
  flex: 0 0 auto;
  width: 1.6rem;
  font-size: 1.15rem;
  text-align: center;
`,iw=X.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 3px;
`,aw=X.span`
  flex: 0 0 auto;
  width: 0.62rem;
  height: 0.62rem;
  border-radius: 50%;
  border: 1.2px solid ${e=>e.$filled?e.theme.color.good:e.theme.color.borderStrong};
  background: ${e=>e.$filled?e.theme.color.good:`transparent`};
`,ow=X(Q)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`,sw=X(ow)`
  border-radius: 999px;
  font-size: 0.72rem;
  min-height: 1.45rem;
  min-width: 4.5rem;
  padding: 0.1em 0.75em;
`,cw=X(ow)`
  min-height: 1.9rem;
  min-width: 3.9rem;
`,lw=X.span`
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
`,uw=X.p`
  margin: 0;
  font-size: ${e=>e.theme.type.scale.xs.size};
  color: ${e=>e.theme.color.textMuted};
  text-align: center;
`,dw=X.div`
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
`,fw=[{key:`core`,label:`Cells`,symbol:`⬡`,countField:`computeCores`,mergeOutputLabel:`Battery`,mergeOutputField:`computeNodes`,mergeAction:`mergeComputeCoresIntoNode`,autoFlagField:`autoMergeCoresIntoNode`,autoCostLabel:`Batteries`,autoCostField:`computeNodes`,enableAutoAction:`enableAutoMergeCoresIntoNode`,autoAriaLabel:`unlock the Charger for Cells into Batteries`,startAction:`startComputeCoresMerge`,timerField:`computeCoresMergeRemainingSeconds`},{key:`nodesIntoCluster`,label:`Batteries`,symbol:`🔗`,countField:`computeNodes`,mergeOutputLabel:`Pack`,mergeOutputField:`computeClusters`,mergeAction:`mergeComputeNodesIntoCluster`,autoFlagField:`autoMergeNodesIntoCluster`,autoCostLabel:`Packs`,autoCostField:`computeClusters`,enableAutoAction:`enableAutoMergeNodesIntoCluster`,autoAriaLabel:`unlock the Charger for Batteries into Packs`,startAction:`startComputeNodesMerge`,timerField:`computeNodesMergeRemainingSeconds`},{key:`clustersIntoNetwork`,label:`Packs`,symbol:`🧩`,countField:`computeClusters`,mergeOutputLabel:`Bank`,mergeOutputField:`computeNetworks`,mergeAction:`mergeComputeClustersIntoNetwork`,autoFlagField:`autoMergeClustersIntoNetwork`,autoCostLabel:`Banks`,autoCostField:`computeNetworks`,enableAutoAction:`enableAutoMergeClustersIntoNetwork`,autoAriaLabel:`unlock the Charger for Packs into Banks`,startAction:`startComputeClustersMerge`,timerField:`computeClustersMergeRemainingSeconds`},{key:`networksIntoGrid`,label:`Banks`,symbol:`🕸️`,countField:`computeNetworks`,mergeOutputLabel:`Generator`,mergeOutputField:`computeGrids`,mergeAction:`mergeComputeNetworksIntoGrid`,autoFlagField:`autoMergeNetworksIntoGrid`,autoCostLabel:`Generators`,autoCostField:`computeGrids`,enableAutoAction:`enableAutoMergeNetworksIntoGrid`,autoAriaLabel:`unlock the Charger for Banks into Generators`,startAction:`startComputeNetworksMerge`,timerField:`computeNetworksMergeRemainingSeconds`},{key:`gridsIntoFabric`,label:`Generators`,symbol:`▦`,countField:`computeGrids`,mergeOutputLabel:`Turbine`,mergeOutputField:`computeFabrics`,mergeAction:`mergeComputeGridsIntoFabric`,autoFlagField:`autoMergeGridsIntoFabric`,autoCostLabel:`Turbines`,autoCostField:`computeFabrics`,enableAutoAction:`enableAutoMergeGridsIntoFabric`,autoAriaLabel:`unlock the Charger for Generators into Turbines`,startAction:`startComputeGridsMerge`,timerField:`computeGridsMergeRemainingSeconds`},{key:`fabricsIntoCloud`,label:`Turbines`,symbol:`🧵`,countField:`computeFabrics`,mergeOutputLabel:`Plant`,mergeOutputField:`computeClouds`,mergeAction:`mergeComputeFabricsIntoCloud`,autoFlagField:`autoMergeFabricsIntoCloud`,autoCostLabel:`Plants`,autoCostField:`computeClouds`,enableAutoAction:`enableAutoMergeFabricsIntoCloud`,autoAriaLabel:`unlock the Charger for Turbines into Plants`,startAction:`startComputeFabricsMerge`,timerField:`computeFabricsMergeRemainingSeconds`},{key:`cloudsIntoDatacenter`,label:`Plants`,symbol:`☁️`,countField:`computeClouds`,mergeOutputLabel:`Grid`,mergeOutputField:`computeDatacenters`,mergeAction:`mergeComputeCloudsIntoDatacenter`,autoFlagField:`autoMergeCloudsIntoDatacenter`,autoCostLabel:`Grids`,autoCostField:`computeDatacenters`,enableAutoAction:`enableAutoMergeCloudsIntoDatacenter`,autoAriaLabel:`unlock the Charger for Plants into Grids`,startAction:`startComputeCloudsMerge`,timerField:`computeCloudsMergeRemainingSeconds`},{key:`datacentersIntoSupercomputer`,label:`Grids`,symbol:`🏢`,countField:`computeDatacenters`,mergeOutputLabel:`Reactor`,mergeOutputField:`computeSupercomputers`,mergeAction:`mergeComputeDatacentersIntoSupercomputer`,autoFlagField:`autoMergeDatacentersIntoSupercomputer`,autoCostLabel:`Reactors`,autoCostField:`computeSupercomputers`,enableAutoAction:`enableAutoMergeDatacentersIntoSupercomputer`,autoAriaLabel:`unlock the Charger for Grids into Reactors`,startAction:`startComputeDatacentersMerge`,timerField:`computeDatacentersMergeRemainingSeconds`},{key:`supercomputersIntoMegacomputer`,label:`Reactors`,symbol:`🖥️`,countField:`computeSupercomputers`,mergeOutputLabel:`Fusion`,mergeOutputField:`computeMegacomputers`,mergeAction:`mergeComputeSupercomputersIntoMegacomputer`,autoFlagField:`autoMergeSupercomputersIntoMegacomputer`,autoCostLabel:`Fusions`,autoCostField:`computeMegacomputers`,enableAutoAction:`enableAutoMergeSupercomputersIntoMegacomputer`,autoAriaLabel:`unlock the Charger for Reactors into Fusions`,startAction:`startComputeSupercomputersMerge`,timerField:`computeSupercomputersMergeRemainingSeconds`},{key:`megacomputer`,label:`Fusions`,symbol:`👑`,countField:`computeMegacomputers`}],pw=(e,t,n)=>e>=8&&t<n,mw=({game:e})=>{let{actions:t,state:n}=e,{intro:r}=n,[i,a]=(0,v.useState)(()=>{let e=fw.reduce((e,t,n)=>t.autoFlagField&&r[t.autoFlagField]?n+1:e,0);return e>0?e:Ku(r)[0]?.queue[0]??1}),o=Ku(r),s=o.length>0,c=o.map(e=>e.queue[0]),l=fw.reduce((e,t,i)=>(r[t.countField]??0)>0?i:t.autoFlagField&&(r[t.autoFlagField]||Rl(n,t.autoFlagField)>0)?Math.max(e,i+1):e,0),u=Math.min(fw.length,l+2),d=r.computeMergePageUnlocked?i:1,f=(d?fw[d-1]:null)&&(0,Z.jsxs)(Z.Fragment,{children:[!r.computeMergePageUnlocked&&(0,Z.jsx)(uw,{title:`Boosts ${Bv(d,`name`)}`,children:`Boosts ${Bv(d)}`}),(0,Z.jsx)(dw,{role:`group`,"aria-label":`compute boost`,children:Object.keys(Ie).map(e=>{let i=Uu(e,d),a=Wu(e,d),o=Rv[e].label,s=!!qu(r,e),c=`×${i} production, ${zv(a)}`;return(0,Z.jsx)(ow,{"aria-label":s?`queue ${o.toLowerCase()} compute boost`:`activate ${o.toLowerCase()} compute boost`,disabled:!ed(n,e,d),onClick:()=>t.activateComputeBoost(e,d),title:s?`Queue ${o}: runs after the current one, ${c} — up to 10x`:`${o}: ${c} — runs alongside other boosts and adds up`,type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`${Rv[e].icon} ×${i} · ${zv(a)}`})},e)})})]});return(0,Z.jsxs)(VC,{children:[s?(0,Z.jsx)(d_,{as:`h1`,children:`⚡ Power`}):(0,Z.jsx)(HC,{children:(0,Z.jsx)(UC,{children:`⚡ Power`})}),s&&(0,Z.jsx)(ey,{actions:t,state:n}),!s&&(0,Z.jsx)(uw,{children:`No boost running`}),!r.computeMergePageUnlocked&&(0,Z.jsx)(ZC,{"aria-label":`boost`,children:f}),r.computeMergePageUnlocked?(0,Z.jsx)(GC,{"aria-label":`compute entities`,children:fw.slice(0,u).map((e,i)=>{let o=i+1,s=r[e.countField]??0,l=!!e.autoFlagField,u=l?!!r[e.autoFlagField]:!1,p=e.autoCostField?r[e.autoCostField]??0:0,m=l&&!u&&p>=10,h=l?Rl(n,e.autoFlagField):0,g=l&&!u&&h<10,_=Math.min(100,p/10*100),y=e.timerField?r[e.timerField]??0:0,b=y>0,x=l?Zc(n,e.mergeOutputField):10,S=l&&nu(n,i),C=l?$c(n,o):0,w=l&&tl(n,i),T=l&&rl(n,i),E=w?Math.min(10,Math.max(0,s-C)):Math.min(s,10),D=u?S:pw(s,r[e.mergeOutputField]??0,x),O=l&&(!u||d===o||b||w||D||C>0),k=i>0?fw[i-1]:null,A=fw.some((e,t)=>t>=i&&(r[e.countField]??0)>0);if(!(i===0||A||u||b||d===o||c.includes(o)||k&&((r[k.countField]??0)>=8||r[k.autoFlagField])))return null;let ee=fw[i+1]?.symbol??`⬆`,j=l&&(u?(0,Z.jsx)(sw,{"aria-label":`charge ${e.label.toLowerCase()}: move units down one per second, then merge 8 into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:!T,onClick:()=>t.startComputeCharge(i),title:w?`Charging — one unit moves into the Charger each second, then it merges`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge: move units from the top row into the Charger one per second, then merge 8 into 1 ${e.mergeOutputLabel} (needs 8 ${e.label} held)`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:w?`⏳ ${C}/8`:`⚡ Charge`})}):(0,Z.jsx)(sw,{"aria-label":`charge up 8 ${e.label.toLowerCase()} into 1 ${e.mergeOutputLabel.toLowerCase()}`,disabled:g?s<8:!pw(s,r[e.mergeOutputField]??0,x),onClick:()=>t[e.mergeAction](),title:g?`Charge up: spend 8 ${e.label} into this tier's Charger (${h}/10) — the first 10 charges unlock Auto-charge, then charges make ${e.mergeOutputLabel}`:(r[e.mergeOutputField]??0)>=x?`${e.mergeOutputLabel} is already at the max of ${x}`:`Charge up: spend 8 ${e.label} for 1 ${e.mergeOutputLabel}`,type:`button`,variant:`success`,children:(0,Z.jsx)($,{children:`${e.symbol} 8→1 ${g?`🔌`:ee}`})})),te=l&&(u?(0,Z.jsx)(lw,{$fill:C/8,$running:b,"aria-label":b?`${e.label} charger, auto-charge in progress, ${qi(y)} left`:`${e.label} charger, ${C}/8 filled`,role:`img`,title:b?`Auto-charging: ${qi(y)} left`:`Charger: ${C}/8 — fills past 10 held and charges on its own when full, or press Charge to move units into it one per second`,children:b?`⏳ ${qi(y)}`:`🔌 ${C}/8`}):m?(0,Z.jsx)(cw,{"aria-label":e.autoAriaLabel,onClick:()=>t[e.enableAutoAction](),title:`Unlock this tier's Charger now: sacrifice 10 of your ${B(p)} ${e.autoCostLabel}`,type:`button`,variant:`info`,$progress:_,children:(0,Z.jsx)($,{children:`🔓 10/10`})}):(0,Z.jsx)(lw,{$fill:h/10,"aria-label":`${e.label} charger unlock, ${h}/10 charges`,role:`img`,title:`Charger: ${h}/10 — this tier's first 10 charges build it, then it charges on its own whenever ${e.label} is completely full`,children:`🔓 ${h}/10`})),M=l&&O;return(0,Z.jsxs)(v.Fragment,{children:[(0,Z.jsxs)(XC,{"data-boost-tier":!0,"aria-label":`${e.label} tier`,$selected:d===o,children:[(0,Z.jsxs)(QC,{children:[(0,Z.jsxs)($C,{type:`button`,onClick:()=>a(o),"aria-pressed":d===o,"aria-label":`select ${e.label} to fund a compute boost`,title:`Select ${e.label} to show its Boost presets — they'll boost ${Bv(o,`name`)}`,$selected:d===o,children:[(0,Z.jsx)(rw,{"aria-hidden":`true`,children:e.symbol}),(0,Z.jsxs)(tw,{children:[(0,Z.jsxs)(nw,{children:[(0,Z.jsxs)(ew,{children:[e.label,(0,Z.jsx)(d_,{children:` ${B(E)}/10`})]}),(0,Z.jsxs)(YC,{"aria-hidden":`true`,children:[`→ `,Bv(o)]})]}),(0,Z.jsx)(iw,{role:`group`,"aria-label":`${e.label} slots`,children:Array.from({length:10},(e,t)=>(0,Z.jsx)(aw,{$filled:t<E,"aria-hidden":`true`},t))})]})]}),te&&(0,Z.jsx)(JC,{children:te})]}),d===o&&f]}),M?(0,Z.jsx)(KC,{children:j}):(0,Z.jsx)(qC,{})]},e.key)})}):(0,Z.jsx)(WC,{children:`⬡ ${B(r.computeCores??0)}/10 · 🔗 ${B(r.computeNodes??0)}/10`})]})},hw=X.button.attrs({type:`button`})`
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
`,gw=b.reduce((e,t)=>({...e,[t.id]:t.name}),{}),_w=gt.reduce((e,t)=>({...e,[t.id]:`${t.name} · ${t.outputLabel}`}),{}),vw=e=>gw[e]??_w[e]??e,yw=e=>typeof e==`number`||typeof e==`boolean`||typeof e==`string`,bw=(e,t,n)=>{let[r,...i]=t;return r===`__proto__`||r===`constructor`||r===`prototype`?e:i.length===0?{...e,[r]:n}:{...e,[r]:bw(e[r]??{},i,n)}},xw=[{id:`foundry`,icon:`🔥`,label:`Foundry`,match:e=>/^intro$|^computeAutoBoost/.test(e)},{id:`compute`,icon:`🖥`,label:`Compute`,match:e=>/^computeFlops/.test(e)},{id:`era`,icon:`⏻`,label:`Reboot`,match:e=>/^(era|eons|eonsUpgrades|hyperscaler)/i.test(e)},{id:`purge`,icon:`🏆`,label:`Prestige`,match:e=>/^purge|^autoPurge|^prestige/.test(e)},{id:`perks`,icon:`🔧`,label:`Firmware`,match:e=>/autobuyer|^auto|IntervalLevels$|AttemptBudgets?$|BonusUnlocked$/i.test(e)},{id:`factory`,icon:`📶`,label:`Factory`,match:()=>!0}],Sw=e=>xw.find(t=>t.match(e)).id,Cw=e=>{if(typeof e!=`string`)return null;let t=e.trim().replace(/[,_\s]/g,``);if(t===``)return null;let n=/^10\^(-?\d+(?:\.\d+)?)$/.exec(t);if(!n&&!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t))return null;let r=n?10**Number(n[1]):Number(t);return Number.isFinite(r)?r:null},ww=(e,t=[])=>e!==null&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype)?Object.entries(e).flatMap(([e,n])=>ww(n,[...t,e])):t.length===0?[]:[{path:t,value:e}],Tw=e=>e.map(vw).join(` › `),Ew=(e,t)=>{let n=t.trim().toLowerCase();return n===``||e.join(`.`).toLowerCase().includes(n)||Tw(e).toLowerCase().includes(n)},Dw=X.main`
  width: min(560px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,Ow=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,kw=X(Jh)`
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
`,Aw=X.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
`,jw=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  strong {
    color: ${e=>e.theme.color.text};
  }
`,Mw=X.dl`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
  margin: 0;
`,Nw=X.div`
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
`,Pw=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`,Fw=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`,Iw=X(Q)`
  flex: 1 1 4.5rem;
  font-size: 0.8rem;
`,Lw=X.input`
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
`,Rw=X.div`
  align-items: center;
  border-top: 1px solid ${e=>e.theme.color.border};
  display: grid;
  gap: 0.3rem 0.5rem;
  grid-template-columns: minmax(6rem, 2fr) minmax(0, 3fr);
  padding: 0.35rem 0;

  &:first-of-type {
    border-top: none;
  }
`,zw=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82rem;
  overflow-wrap: anywhere;
`,Bw=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`,Vw=X.div`
  display: flex;
  gap: 0.3rem;
`,Hw=X.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`,Uw=X(Q)`
  font-size: 0.75rem;
  min-width: 2.4rem;
  padding: 0.2rem 0.4rem;
`,Ww=X.span`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
`,Gw=X.details`
  border-left: 2px solid ${e=>e.theme.color.border};
  padding-left: 0.6rem;
`,Kw=X.summary`
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
`,qw=X.textarea`
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
`,Jw=X.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.good} !important;
  font-size: 0.8rem;
`,Yw=e=>Number.isInteger(e)&&Math.abs(e)<1e4?null:B(e),Xw=e=>{let t=Number.isInteger(e),n=[{id:`div10`,label:`÷10`,apply:e=>t?Math.floor(e/10):e/10},{id:`mul10`,label:`×10`,apply:e=>e===0?10:e*10}];return t&&Math.abs(e)<2**53-1&&(n.unshift({id:`minus1`,label:`−1`,apply:e=>Math.max(0,e-1)}),n.push({id:`plus1`,label:`+1`,apply:e=>e+1})),n},Zw=({path:e,value:t,label:n,onCommit:r})=>{let[i,a]=(0,v.useState)(null),o=e.join(`.`),s=typeof t==`number`,c=s&&i!==null?Cw(i):null,l=s&&i!==null&&c===null,u=i!==null&&!l,d=()=>{u&&(r(e,s?c:i),a(null))},f=s?l?`Not a number (try 1e100, 1,000 or 10^6)`:Yw(c??t):null;return(0,Z.jsxs)(Rw,{children:[(0,Z.jsx)(zw,{title:o,children:n}),(0,Z.jsxs)(Bw,{children:[(0,Z.jsxs)(Vw,{children:[(0,Z.jsx)(Lw,{"aria-invalid":l||void 0,"aria-label":o,autoComplete:`off`,enterKeyHint:`done`,inputMode:s?`decimal`:`text`,onBlur:()=>i!==null&&i===String(t)&&a(null),onChange:e=>a(e.target.value),onKeyDown:e=>{e.key===`Enter`&&d(),e.key===`Escape`&&a(null)},spellCheck:!1,type:`text`,value:i??String(t)}),(0,Z.jsx)(Uw,{"aria-label":`set ${o}`,disabled:!u,onClick:d,title:`Set (Enter) — Escape reverts`,type:`button`,variant:u?`primary`:`neutral`,children:(0,Z.jsx)($,{children:`✓`})})]}),s&&(0,Z.jsx)(Hw,{children:Xw(t).map(n=>{let i=n.apply(t);return(0,Z.jsx)(Uw,{"aria-label":`${o} ${n.label}`,disabled:!Number.isFinite(i),onClick:()=>{a(null),r(e,i)},type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:n.label})},n.id)})}),f&&(0,Z.jsx)(Ww,{$error:l,children:l?f:`= ${f}`})]})]})},Qw=({path:e,value:t,label:n,onCommit:r})=>{let i=e.join(`.`);return typeof t==`boolean`?(0,Z.jsxs)(Rw,{children:[(0,Z.jsx)(zw,{title:i,children:n}),(0,Z.jsx)(Bw,{children:(0,Z.jsxs)(Vw,{children:[(0,Z.jsx)(hw,{$on:t,"aria-label":i,"aria-pressed":t,onClick:()=>r(e,!t)}),(0,Z.jsx)(Ww,{children:t?`On`:`Off`})]})})]}):yw(t)?(0,Z.jsx)(Zw,{label:n,onCommit:r,path:e,value:t}):(0,Z.jsxs)(Rw,{children:[(0,Z.jsx)(zw,{title:i,children:n}),(0,Z.jsxs)(Ww,{children:[Array.isArray(t)?`[${t.length} item${t.length===1?``:`s`}]`:`not set`,` · edit in raw JSON`]})]})},$w=({path:e,value:t,onCommit:n})=>{let r=vw(e[e.length-1]);if(typeof t!=`object`||!t||Array.isArray(t))return(0,Z.jsx)(Qw,{label:r,onCommit:n,path:e,value:t});let i=Object.entries(t);return i.length===0?null:(0,Z.jsxs)(Gw,{children:[(0,Z.jsxs)(Kw,{children:[r,` (`,i.length,`)`]}),i.map(([t,r])=>(0,Z.jsx)($w,{onCommit:n,path:[...e,t],value:r},t))]})},eT=[{id:`foundry`,label:`🔥 Foundry`,presets:[{id:`unlock-factory`,label:`🏭 Unlock Byte Factory`,apply:e=>({...e,intro:{...e.intro,mainGameUnlocked:!0}})},{id:`unlock-boosters`,label:`🔧 Unlock Power (Cells)`,apply:e=>({...e,intro:{...e.intro,capacity:Math.max(e.intro?.capacity??0,Pe)}})}]},{id:`factory`,label:`📶 Factory`,presets:[{id:`near-prestige`,label:`💰 Bits → 99% to Purge`,apply:e=>({...e,resources:{...e.resources,base:A*.99}})},{id:`prestige-ready`,label:`💰 Bits → Purge threshold`,apply:e=>({...e,resources:{...e.resources,base:A}})}]},{id:`purge`,label:`🏆 Purge`,presets:[{id:`grant-1000-pp`,label:`🏆 +1,000 PP`,apply:e=>({...e,purge:{...e.purge,points:(e.purge?.points??0)+1e3}})},{id:`add-prestige`,label:`🏆 +1 Purge count`,apply:e=>nn({...e,purge:{...e.purge,count:(e.purge?.count??0)+1}})},{id:`unlock-flops`,label:`🖥️ Unlock Compute (Flops)`,apply:e=>({...e,purge:{...e.purge,points:Math.max(e.purge?.points??0,100)},computeFlops:{...e.computeFlops,pageUnlocked:!0}})}]},{id:`era`,label:`⏻ Reboot`,presets:[{id:`era-ready`,label:`🏆 PP → Reboot-ready (1 Googol)`,apply:e=>({...e,purge:{...e.purge,points:yt}})}]}],tT=[`foundry`,`compute`,`factory`,`perks`,`purge`,`era`].map(e=>xw.find(t=>t.id===e)),nT=e=>JSON.stringify(e,null,2),rT=e=>{try{let t=JSON.parse(e);return t!==null&&Object.prototype.toString.call(t)===`[object Object]`&&(Object.getPrototypeOf(t)===null||Object.getPrototypeOf(t)===Object.prototype)?null:`Must be a JSON object`}catch(e){return e.message}},iT=({game:e})=>{let t=e.devModeActive,[n,r]=(0,v.useState)(tT[0].id),[i,a]=(0,v.useState)(``),[o,s]=(0,v.useState)(()=>nT(e.state)),[c,l]=(0,v.useState)(null),[u,d]=(0,v.useState)(0);(0,v.useEffect)(()=>{s(nT(e.state)),l(null)},[t]);let f=(0,v.useMemo)(()=>rT(o),[o]),p=(0,v.useMemo)(()=>Object.keys(e.state).filter(e=>Sw(e)===n),[e.state,n]),m=(0,v.useMemo)(()=>i.trim()===``?null:ww(e.state).filter(e=>Ew(e.path,i)),[e.state,i]),h=()=>{window.confirm(`Wipe the dev save back to a fresh state?`)&&(e.resetDevState(),l(null),d(e=>e+1))},g=(t,n)=>{e.setDevState(e=>bw(e,t,n))},_=()=>{let t=e.applyDevStateJson(o);t.ok?(l({error:!1,text:`Applied.`}),s(nT(t.state)),d(e=>e+1)):l({error:!0,text:`Could not apply (${t.reason}).`})},y=async()=>{try{await navigator.clipboard.writeText(nT(e.state)),l({error:!1,text:`Copied live state.`})}catch{l({error:!0,text:`Clipboard unavailable.`})}},{state:b}=e,x=[[`Bits`,Vt(b.resources?.base??0)],[`Purge Points`,`✦ ${B(b.purge?.points??0)}`],[`Purges`,B(b.purge?.count??0)],[`Reboot · Kernels`,`${B(b.era?.count??0)} · ${B(b.eons?.balance??0)}`],[`Capacity`,Yo(b.intro?.capacity??0)]];return(0,Z.jsxs)(Dw,{children:[(0,Z.jsx)(Ow,{children:(0,Z.jsx)(`h1`,{children:`Dev Mode`})}),(0,Z.jsxs)(kw,{"aria-label":`dev save section`,children:[(0,Z.jsxs)(Aw,{children:[(0,Z.jsxs)(jw,{children:[(0,Z.jsx)(`strong`,{children:t?`Playing the dev save`:`Playing your real save`}),(0,Z.jsx)(`p`,{children:`A separate sandbox save — enabling never touches real progress; disabling resumes it exactly where you left it.`})]}),(0,Z.jsx)(hw,{$on:t,"aria-label":`dev mode`,"aria-pressed":t,onClick:e.toggleDevMode})]}),t&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Mw,{"aria-label":`dev save readouts`,role:`group`,children:x.map(([e,t])=>(0,Z.jsxs)(Nw,{children:[(0,Z.jsx)(`dt`,{children:e}),(0,Z.jsx)(`dd`,{children:t})]},e))}),(0,Z.jsx)(Pw,{children:(0,Z.jsx)(Q,{"aria-label":`reset dev save`,onClick:h,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`↺ Reset dev save`})})})]})]}),t&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(kw,{"aria-label":`quick seed section`,children:[(0,Z.jsx)(`h2`,{children:`Quick seed`}),(0,Z.jsx)(`p`,{children:`Jump straight to a milestone — applied on top of the current dev save.`}),eT.map(t=>(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`h3`,{children:t.label}),(0,Z.jsx)(Pw,{children:t.presets.map(t=>(0,Z.jsx)(Q,{"aria-label":t.label,onClick:()=>{e.setDevState(t.apply),d(e=>e+1)},type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:t.label})},t.id))})]},t.id))]}),(0,Z.jsxs)(kw,{"aria-label":`variables section`,children:[(0,Z.jsx)(`h2`,{children:`Variables`}),(0,Z.jsxs)(`p`,{children:[`Every field of the live save, grouped like the game's own screens. Switches apply instantly; numbers take `,(0,Z.jsx)(`code`,{children:`1e100`}),`, `,(0,Z.jsx)(`code`,{children:`1,000`}),` or `,(0,Z.jsx)(`code`,{children:`10^6`}),` — press Enter or ✓ to set, or step by powers of ten.`]}),(0,Z.jsx)(Lw,{"aria-label":`search variables`,autoComplete:`off`,onChange:e=>a(e.target.value),placeholder:`🔍 Search every field (e.g. Kilobytes, capacity)`,spellCheck:!1,type:`search`,value:i}),m?(0,Z.jsxs)(`div`,{"aria-label":`variable search results`,role:`region`,children:[m.length===0&&(0,Z.jsxs)(Ww,{children:[`No field matches “`,i.trim(),`”.`]}),m.slice(0,60).map(e=>(0,Z.jsx)(Qw,{label:Tw(e.path),onCommit:g,path:e.path,value:e.value},e.path.join(`.`))),m.length>60&&(0,Z.jsxs)(Ww,{children:[`+`,m.length-60,` more — refine the search.`]})]},u):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Fw,{role:`tablist`,"aria-label":`variable areas`,children:tT.map(e=>(0,Z.jsx)(Iw,{"aria-controls":`dev-variables-panel`,"aria-label":`show ${e.label} variables`,"aria-selected":n===e.id,onClick:()=>r(e.id),role:`tab`,type:`button`,variant:n===e.id?`primary`:`neutral`,children:(0,Z.jsxs)($,{children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),` `,e.label]})},e.id))}),(0,Z.jsx)(`div`,{"aria-label":`${n} variables`,id:`dev-variables-panel`,role:`tabpanel`,children:p.map(e=>(0,Z.jsx)($w,{onCommit:g,path:[e],value:b[e]},e))},u)]})]}),(0,Z.jsx)(kw,{"aria-label":`raw state json section`,children:(0,Z.jsxs)(Gw,{children:[(0,Z.jsx)(Kw,{children:`Advanced: raw state (JSON)`}),(0,Z.jsxs)(`p`,{children:[`Paste a partial object (e.g. `,(0,Z.jsx)(`code`,{children:`{ "resources": { "base": 1e50 } }`}),`) — missing fields keep their current values. The only way to edit null fields and arrays.`]}),(0,Z.jsx)(qw,{"aria-invalid":!!f||void 0,"aria-label":`dev save state json`,onChange:e=>{s(e.target.value),l(null)},spellCheck:!1,value:o}),f&&(0,Z.jsxs)(Jw,{$error:!0,children:[`✕ `,f]}),(0,Z.jsxs)(Pw,{children:[(0,Z.jsx)(Q,{"aria-label":`apply json to dev save`,disabled:!!f,onClick:_,type:`button`,variant:`primary`,children:(0,Z.jsx)($,{children:`Apply`})}),(0,Z.jsx)(Q,{"aria-label":`refresh json from live state`,onClick:()=>{s(nT(e.state)),l(null)},type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`↻ Load live state`})}),(0,Z.jsx)(Q,{"aria-label":`copy live state json`,onClick:y,type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`⧉ Copy`})})]}),c&&(0,Z.jsx)(Jw,{$error:c.error,children:c.text})]})})]})]})},aT=`0.5.0`,oT=X.main`
  width: min(720px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,sT=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`,cT=X.span`
  color: ${e=>e.theme.color.textMuted};
  display: block;
  font-size: 0.7rem;
  margin-top: 0.15rem;
`,lT=X(Jh)`
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
`,uT={"overview section":null,"byte foundry section":null,"sleep mode section":null,"milestones section":{kind:`googolReached`},"storage section":{kind:`storageUnlocked`},"scale up section":{kind:`storageUnlocked`},"accelerate section":{kind:`anyOf`,conditions:[{kind:`tierPurchased`,tierId:`tier01`},{kind:`achievementEarned`,id:`tier01Bought`},{kind:`lifetimePurges`,min:1}]},"overclock section":{kind:`anyOf`,conditions:[{kind:`tierPurchased`,tierId:`tier10`},{kind:`achievementEarned`,id:`tier10Bought`}]},"power section":{kind:`anyOf`,conditions:[{kind:`powerPageUnlocked`},{kind:`achievementEarned`,id:`powerUser`}]},"prestige section":{kind:`googolReached`},"prestige ladder section":{kind:`googolReached`},"tier autobuyers section":{kind:`lifetimePurges`,min:1},"compute flops section":{kind:`computeFlopsPageUnlocked`},"reboot section":{kind:`rebootReached`},"achievements section":{kind:`storageUnlocked`}},dT=(e,t)=>{let n=uT[t];return!n||mr(e??{},n)},fT=X.button`
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: 0;
  text-align: left;
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,pT=({title:e,children:t})=>{let[n,r]=(0,v.useState)(!1);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`h3`,{children:(0,Z.jsxs)(fT,{"aria-expanded":n,"aria-label":`${e} subtopic`,onClick:()=>r(e=>!e),type:`button`,children:[n?`▾`:`▸`,` `,e]})}),n&&t]})},mT=({label:e,title:t,revealed:n,open:r,onToggle:i,children:a})=>n?(0,Z.jsxs)(lT,{"aria-label":e,children:[(0,Z.jsx)(`h2`,{style:{marginBottom:r?void 0:0},children:(0,Z.jsxs)(fT,{"aria-expanded":r,"aria-label":`${t} topic`,onClick:i,type:`button`,children:[r?`▾`:`▸`,` `,t]})}),r&&a]}):null,hT=({game:e})=>{let t=e?.state??{},[n,r]=(0,v.useState)({}),i=e=>mr(t,e),a=i({kind:`anyOf`,conditions:[{kind:`powerPageUnlocked`},{kind:`achievementEarned`,id:`powerUser`}]}),o=i({kind:`computeFlopsPageUnlocked`}),s=i({kind:`rebootReached`}),c=i({kind:`lifetimePurges`,min:1}),l=(e,i)=>({label:e,title:i,revealed:dT(t,e),open:!!n[e],onToggle:()=>r(t=>({...t,[e]:!t[e]}))}),u=en(b[0].id),d=en(b[b.length-1].id),f=tn(b[0].id),p=Lr({}),m=b[b.length-1].name,h=b[0].name;return(0,Z.jsxs)(oT,{children:[(0,Z.jsxs)(sT,{children:[(0,Z.jsx)(`h1`,{children:`Tens — Manual`}),(0,Z.jsxs)(cT,{children:[`v`,aT]})]}),(0,Z.jsx)(mT,{...l(`overview section`,`Overview`),children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Everything scales by powers of ten — costs, production, and most upgrades.`}),(0,Z.jsxs)(`li`,{children:[`Buy every tier with `,(0,Z.jsx)(`strong`,{children:`Bits`}),` (the base currency; 8 Bits = 1 Byte).`]}),(0,Z.jsxs)(`li`,{children:[`Each owned tier produces the tier below it, so production cascades down the ladder;`,` `,h,` produce Bytes, which are added to your Bits.`]}),(0,Z.jsx)(`li`,{children:`The main balance switches from Bits to whole Bytes once you reach 8,000 Bits (1,000 Bytes). Costs and production rates still show in Bits.`}),(0,Z.jsxs)(`li`,{children:[`Reaching `,(0,Z.jsx)(`strong`,{children:`1 Googol Bytes`}),` (8×10^100 Bits) freezes production until you Purge`,c?` — unless you have unlocked Overflow mode (see Purge)`:``,`.`]}),(c||i({kind:`legacyBuyMax`})||i({kind:`achievementEarned`,id:`buyMaxRush`}))&&(0,Z.jsxs)(`li`,{children:[`Once you earn the `,(0,Z.jsx)(`strong`,{children:`Click fast, buy max`}),` achievement (click one Factory Buy button 10 times within a second), the `,(0,Z.jsx)(`strong`,{children:`Buy max`}),` toggle on Firmware → ✦ Prestige makes each purchase buy as many levels as you can afford. Tiers buy full levels only — a partly bought level takes its own click.`]})]})}),(0,Z.jsxs)(mT,{...l(`prestige ladder section`,`Prestige ladder`),children:[(0,Z.jsx)(`p`,{children:`Each layer resets everything the layer below it resets, plus more — so a higher layer keeps less, but awards a longer-lasting currency.`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Purge`}),` — at 1 Googol Bytes. `,(0,Z.jsx)(`em`,{children:`Resets:`}),` Bits and resources, owned Factory tiers, Scale Ups, Overclocks, Accelerate, Restage XP`,o?`, the per-cycle Compute (Flops) boost`:``,`.`,` `,(0,Z.jsx)(`em`,{children:`Keeps:`}),` the Data Stream balance, Purge Points, Compression levels, automation unlocks, `,c?`Overflow mode, `:``,`the Byte generator, Capacity, Disks, Data Lakes`,a?`, Compute entities`:``,o?`, owned Compute (Flops) units`:``,` `,`and the System log.`]}),s&&(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reboot`}),` — at 1 Googol unspent PP. `,(0,Z.jsx)(`em`,{children:`Resets:`}),` everything Purge resets, plus unspent PP, the Purge count, Compression levels, owned Compute (Flops) units, and the whole Foundry (Capacity, Disks, Data Lakes, Compute entities).`,` `,(0,Z.jsx)(`em`,{children:`Keeps:`}),` automation unlocks, Overflow mode, the main-game unlock, the System log, Flops autobuyer unlocks, Kernels and hyperscalers. Awards Kernels.`]})]})]}),(0,Z.jsxs)(mT,{...l(`byte foundry section`,`Byte Foundry`),children:[(0,Z.jsxs)(`p`,{children:[`Every new save starts here, before any `,h,` exist. Unlocking the main game is permanent — no Purge`,s?` or Reboot`:``,` sends you back through this gate. Reopen the Foundry any time from the bottom nav. The Data Stream’s Capacity uses binary units (KiB, MiB, …; 1 KiB = 1,024 Bytes); Storage pools, Disks and Data Lakes use decimal units (KB, MB, …; 1 KB = 1,000 Bytes).`]}),(0,Z.jsx)(pT,{title:`The loop`,children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Ping`}),` the Data Stream to add one second of its production. Once Storage appears (at `,Yo(Me),` Capacity), a ping instead adds a temporary ping bonus to what it feeds (below).`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Compile`}),` the first `,8,` bits into a permanent Byte generator that produces on its own from then on. Capacity starts at`,` `,Yo(De(1).startBits),` and doubles with each Capacity upgrade, up to the last storage pool’s limit.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Fill multiplier`}),` — the Data Stream’s Bitrate and each pool’s Bandwidth are shown as the rate actually delivered: the base rate times a multiplier that depends on how full that buffer is. (A pool’s buffer is called its Staging.) It is `,je/100,`× when empty, 1× at half full and`,` `,10/100,`× when full; the color runs red (slow) → blue → green (fast). Pinging the Data Stream (once Storage appears) or a pool’s Staging tile adds a +`,5,`% ping bonus (up to `,100,`%), which fades by `,1,`% per second and shows as a thin bar and “+x% 👆”. A ping never speeds the fill itself (it already reaches`,` `,je/100,`×); it speeds what that buffer feeds — on the Data Stream, Upgrade Capacity / Bitrate; on a pool, disk provisioning, disk fills and merges, rebuilds and the Data Lake.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Upgrade Capacity`}),` costs your current Capacity and doubles it.`,` `,(0,Z.jsx)(`strong`,{children:`Upgrade Bitrate`}),` costs your current Bitrate level. Only one runs at a time: it becomes a progress bar that draws the Data Stream’s base Bitrate from the Buffer, ahead of everything else, and applies when full. Base Bitrate is (Bitrate level in Bytes)`,(0,Z.jsx)(`sup`,{children:`exponent`}),` per second and can never exceed Capacity`,(0,Z.jsx)(`sup`,{children:`exponent`}),`, so raise Capacity to unlock more Bitrate. The exponent starts at `,Oe,` (a square root); pool Bandwidth is capped by the same exponent.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Reformat`}),` — when every unlocked disk size is complete, this button replaces Provision Disk. It unlocks the next disk size. Each new pool closes`,` `,Math.round((1-ke)*100),`% of the exponent’s remaining gap to 1.0; within a pool, new disk sizes initially close 10% of the gap to the next pool’s exponent. The Foundry restarts from scratch, then Compile, Capacity, Bitrate, Disks and Data Lake upgrades/Cells are replayed automatically up to your previous highs.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Auto-convert`}),` turns Data Stream bits into free `,h,` at their current per-unit cost, automatically, every cycle. The main game itself unlocks (permanently) once Upgrade Capacity raises Capacity to Storage’s`,` `,Yo(Me),` threshold.`]})]})}),(0,Z.jsx)(pT,{title:`What resets vs. what stays`,children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Resets each Purge:`}),` any partly bought`,` `,h,` level.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Kept through Purge:`}),` the Byte generator, Capacity/Bitrate upgrades, Disks, Data Lakes, `,a?`every Compute entity, `:``,`and the main-game unlock.`,s?` Reboot resets most of this (see Reboot).`:``]}),(0,Z.jsx)(`li`,{children:`Later cycles are a quick pit stop, not a full replay.`})]})}),(0,Z.jsxs)(pT,{title:`Forced priority`,children:[(0,Z.jsx)(`p`,{children:`When more than one of these is available, only the highest-ranked one can be used:`}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Disk Fill → Provision Disk`,a?` → Compute Boost`:``]}),(0,Z.jsx)(`li`,{children:`Upgrade Capacity / Upgrade Bitrate, Data Lake Cell purchases and Data Lake capacity upgrades are outside this order — they are never blocked by it.`})]})]})]}),(0,Z.jsxs)(mT,{...l(`storage section`,`Storage`),children:[(0,Z.jsxs)(`p`,{children:[`Appears on the Foundry screen once the Data Stream’s Capacity reaches`,` `,Yo(Me),`. There are ten pools (KB … QB), all fed by the shared Data Stream — earlier pools take their share of its bitrate first. Pool N appears once Capacity reaches 1024`,(0,Z.jsx)(`sup`,{children:`N`}),` Bytes (1 KiB, 1 MiB, …), whatever disks you have built.`]}),(0,Z.jsx)(pT,{title:`Provisioning Disks`,children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Click Provision Disk once to start a build; it draws its cost from the pool’s Staging at the pool’s base Bandwidth and pauses (losing nothing) whenever the Staging is empty. The Nth disk of an array costs N× the disk’s size.`}),(0,Z.jsxs)(`li`,{children:[`Up to `,9,` disks can be built at each size before the next size opens, stepping through every power of ten (1 KB → 10 KB → 100 KB → 1 MB …). Each pool holds three sizes; to build in a pool, every array in the earlier pools must be complete. Sizes beyond those already unlocked need a Reformat.`]})]})}),(0,Z.jsx)(pT,{title:`Cache and automatic pulling`,children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Each pool’s smallest array keeps a read Cache of `,8,` blocks that together hold one disk’s worth of bits (e.g. a 1 MB array → 8 × 1 Mb). Whenever the Cache has room, it fills from the pool’s Staging at `,5,`× the pool’s Bandwidth.`]}),(0,Z.jsxs)(`li`,{children:[`That array’s empty disks fill from its read Cache, taking as long as one cache block would at `,2,`× your Foundry production rate. Every larger size fills through its own write Cache straight from Staging (after the smaller sizes’ caches), then is written at `,2,`×. Click an empty disk to fill it sooner: it takes Staging ahead of the other larger disks, pulls in every full smaller disk it needs from the same pool at once (each at`,` `,5,`× your rate) while Staging keeps filling it, and is written at `,5,`× instead of`,` `,2,`×. Nothing ever crosses from one pool into another.`]}),(0,Z.jsxs)(`li`,{children:[`Every disk size matches one tier and level (KB sizes → Kilobytes, MB sizes → Megabytes, …; the 1st/2nd/3rd size in a pool → that tier’s level 1/2/3). A full, clean-slate disk is`,` `,(0,Z.jsx)(`strong`,{children:`pulled`}),` automatically — no click or autobuyer needed — the moment its tier is at exactly that level with no purchases toward it yet, completing the whole level at once. A level you have already started buying is never topped off by a disk; the disk waits for that tier’s next fresh level.`]}),(0,Z.jsx)(`li`,{children:`A tier still on its level 1 with no disk to pull draws from its pool’s Cache directly instead. Later levels only ever come from whole disks.`}),(0,Z.jsx)(`li`,{children:`Disks are permanent across Purges; a full disk stays full.`})]})}),(0,Z.jsx)(pT,{title:`Data Lakes`,children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Each pool has its own Data Lake (KB … QB), shown in its pool card. A lake unlocks once its pool has built at least one disk, and turns stored data into Cells.`}),(0,Z.jsxs)(`li`,{children:[`A lake fills from its own pool’s Staging into a permanent 1-unit buffer, which moves into lake disks and consolidates into bigger ones. Filling toward a Cell only waits for Staging to be full to `,(0,Z.jsx)(`em`,{children:`start`}),`; after that it no longer waits for Staging to refill — it only needs every built disk in that pool full, nothing being provisioned there, and Staging holding more than the read cache’s share — until the Cell is bought. A Cell is paid with whole disks that add up to exactly its cost; disks are never broken, so the lake keeps filling until exact change exists. Clicking its 🏷️ cost control fills the same way until the next Cell is affordable, buys one, then stops. Once all of the pool’s disks are built, its overflow also pours into the lake.`]}),(0,Z.jsxs)(`li`,{children:[`A lake shows its contents as disk squares, filled smallest first: up to`,` `,Be.join(`/`),` disks of ×1/×10/×100 its unit. The last unit of each capacity level sits in the lake’s own buffer instead of a square, just as a Storage array’s Cache stands in for a 10th disk.`]}),(0,Z.jsxs)(`li`,{children:[`Lake capacity starts at 1 unit and can be raised ×10 per level (`,Ge.map(e=>e.toLocaleString()).join(`, `),`). Each level unlocks once the matching Storage array is fully built, and buying it empties the lake.`]}),(0,Z.jsxs)(`li`,{children:[`The nth Cell bought from a lake costs n units and instantly grants 1 compute entity of that lake’s tier (KB → Cell, MB → Battery, …). Once a pool has all of its disks built, its lake buys every affordable Cell automatically for the rest of the `,s?`Reboot cycle`:`game`,` — through pool flushes, Reformats and Purges.`]})]})}),(0,Z.jsx)(pT,{title:`Flushing`,children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`When a pool has every disk built, its lake is completely full, and the next Cell costs more than the lake can hold, a `,(0,Z.jsx)(`strong`,{children:`🗜 Flush Pool`}),` button appears. It never fires on its own.`]}),(0,Z.jsxs)(`li`,{children:[`A flush empties that pool’s disks, Staging and lake (Cells bought and earlier flush rewards stay) and permanently adds 1,000 units of lake capacity. A pool’s first two flushes also each upgrade one of its two disk-size exponent steps to close 10% of the gap to 1.0. These upgrades survive Reformat, Purge`,s?`, and Reboot`:``,`. Lakes fill at 10% of their pool’s Bandwidth, plus 10% (additive) per flush.`]}),(0,Z.jsx)(`li`,{children:`Afterwards the pool rebuilds its disks for free, one at a time, smallest first. Until it is complete again, later pools can’t start new disk builds.`})]})})]}),(0,Z.jsxs)(mT,{...l(`power section`,`Power`),children:[(0,Z.jsxs)(`p`,{children:[`Unlocks once the Data Stream’s Capacity reaches`,` `,Yo(Pe),`. Open it from the bottom nav’s Power item. Cells come from the Data Lakes described under Storage.`]}),(0,Z.jsx)(pT,{title:`Cells and the charge chain`,children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Chain: Cell → Battery → Pack → Bank → Generator → Turbine → Plant → Grid → Reactor → Fusion. Cells only come from KB Data Lake purchases.`}),(0,Z.jsxs)(`li`,{children:[`Each entity caps at `,10,` held; Cell purchases pause at the cap until you spend some (a charge-up or a Boost).`]}),(0,Z.jsxs)(`li`,{children:[`Charge up: turn `,8,` of one entity into 1 of the next (needs`,` `,8,` held). It is instant.`]}),(0,Z.jsxs)(`li`,{children:[`A step's first `,10,` charges go into its Charger instead of the next entity (🔓 n/`,10,`); the `,10,`th unlocks it, with nothing sacrificed. The Charger holds `,8,` more (`,18,` held in total) that fills as the entity keeps growing past `,10,`. Press ⚡ Charge to move units from the top row into the Charger one per second, then `,8,` → 1 merges instantly.`]}),(0,Z.jsxs)(`li`,{children:[`An automatic charge starts only when all `,18,` slots are full and runs on a timer: the time `,8,` of the smallest disks in that entity’s own pool take to fill from its read Cache (Cells use the KB pool, Batteries the MB pool, …). It waits until that pool is visible and speeds up as the pool gets faster.`]})]})}),(0,Z.jsx)(pT,{title:`Compute Boost`,children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Select a tier on Power to show its Turbo / Balanced / Eco presets; activating one spends 1 of that entity. Every tier gives the same multiplier and duration — higher tiers boost more Factory tiers (Cell: Kilobytes only, Battery: Kilobytes and Megabytes, Pack: the first three, …).`}),(0,Z.jsxs)(`li`,{children:[`Turbo ×`,Ie.burst.multiplier,` for`,` `,qi(Ie.burst.durationSeconds),`; Balanced ×`,Ie.standard.multiplier,` for`,` `,qi(Ie.standard.durationSeconds),`; Eco ×`,Ie.sustain.multiplier,` for`,` `,qi(Ie.sustain.durationSeconds),`.`]}),(0,Z.jsxs)(`li`,{children:[`A boost also multiplies the Byte generator’s production and speeds up the matching Storage pools’ Staging (pool N for Factory tier N) by +`,Ie.burst.poolBonusPercent,`% / +`,Ie.standard.poolBonusPercent,`% / +`,Ie.sustain.poolBonusPercent,`% for Turbo / Balanced / Eco.`]}),(0,Z.jsxs)(`li`,{children:[`Boosts of different multipliers (Turbo, Balanced, Eco) run `,(0,Z.jsx)(`strong`,{children:`in parallel`}),` and their multipliers add up. Boosts of the same multiplier `,(0,Z.jsx)(`strong`,{children:`queue`}),` (up to`,` `,10,`): the running one is never interrupted, and the waiting ones run afterwards, strongest (broadest tier) first.`]}),(0,Z.jsxs)(`li`,{children:[`Each running multiplier has its own timer bar showing the time left. `,(0,Z.jsx)(`strong`,{children:`+`}),` on its right queues another. `,(0,Z.jsx)(`strong`,{children:`Pop`}),` (↩) on its left refunds the last queued boost; once none are queued it becomes `,(0,Z.jsx)(`strong`,{children:`Forfeit`}),` (✕), which ends that boost with no refund after a confirmation.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Auto Boost`}),` is automatic for every tier whose charge is automated: each time that automatic charge starts, one of the tier's remaining tokens starts (or queues) your preferred preset. Choose the preset on Power (default Balanced).`]}),(0,Z.jsx)(`li`,{children:`Fusions are used only to fund Boosts.`})]})})]}),(0,Z.jsxs)(mT,{...l(`compute flops section`,`Compute`),children:[(0,Z.jsxs)(`p`,{children:[`A separate screen (nav `,(0,Z.jsx)(`strong`,{children:`Compute`}),`) with ten tiers,`,` `,(0,Z.jsx)(`strong`,{children:`Cores → Superclouds`}),` (outputting KFlops → QFlops), bought with Purge Points; each boosts the matching Factory tier. It appears once you hold `,100,` PP; the first tier costs`,` `,pt.toLocaleString(),` PP.`]}),(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Base costs climb ×1,000 per tier like Factory tiers (`,pt.toLocaleString(),` –`,` `,mt.toExponential(0).replace(`+`,``),` PP), and the price rises with `,(0,Z.jsx)(`strong`,{children:`every`}),` purchase rather than every 8.`]}),(0,Z.jsxs)(`li`,{children:[`Each owned unit adds `,(ht*100).toFixed(2),`% per second to its Factory tier’s boost, which multiplies production by`,` `,(0,Z.jsx)(`strong`,{children:`(1 + boost)`}),`.`]}),(0,Z.jsxs)(`li`,{children:[`The header’s `,(0,Z.jsx)(`strong`,{children:`Flops`}),` total weights each tier’s boost by 10`,(0,Z.jsx)(`sup`,{children:`n`}),` `,`(`,(0,Z.jsx)(`strong`,{children:`K + 10·M + 100·G + … + 10⁹·Q`}),`); production uses each tier’s own boost. Boosts reset each Purge; owned units are kept.`]})]})]}),(0,Z.jsx)(mT,{...l(`accelerate section`,`Accelerate`),children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Spend Bytes to make every tier’s production ticks 1% faster per level, compounding — more frequent deliveries, not bigger ones.`}),(0,Z.jsx)(`li`,{children:`Each level costs the next power of ten (10 B, 100 B, 1,000 B, …).`}),(0,Z.jsxs)(`li`,{children:[`Unlocks once `,h,` complete their first level.`]}),(0,Z.jsx)(`li`,{children:`Each tier row also has its own tickspeed upgrade, paid for with units of that tier itself — buying one lowers that tier’s owned count.`}),(0,Z.jsxs)(`li`,{children:[m,`’ tickspeed upgrade may spend your last unit (other tiers always keep one). Restage while holding 0 `,m,` (nothing is left producing) to earn Quetta broke — then 1 is credited regardless of balance, more often with more completed levels.`]}),(0,Z.jsxs)(`li`,{children:[`After `,b.length,` Scale Ups in a run (the first onto `,m,`), the Restage upgrade appears beside Accelerate (above the tier list): spend XP for +1% faster `,m,` ticks per XP (compounding). Each Restage must add at least 10% to the XP already restaged (minimum 1). It resets every other tier’s owned quantity and your Bits. Auto Restage (Firmware → Automation, unlocked at Purge `,at.restage,`) spends it for you, every `,ot.restage.baseSeconds,` s at first — faster with its speed upgrades.`]})]})}),(0,Z.jsx)(mT,{...l(`scale up section`,`Scale Up`),children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Reach 3 completed levels on the tier Scale Up is currently working through — starting with `,h,` — to claim a Scale Up.`]}),(0,Z.jsxs)(`li`,{children:[`Resets tiers and resources and unlocks the next tier. After a later reset, an already-unlocked tier reappears once the tier before it reaches`,` `,2,` completed levels.`]}),(0,Z.jsx)(`li`,{children:`Doubles production for every tier unlocked so far; the bonuses stack (×2, ×4, ×8, …) and a newly unlocked tier starts at ×1. They last until the next Overclock or Purge.`}),(0,Z.jsx)(`li`,{children:`Each of the first ten claims needs 3 completed levels on the last unlocked tier. After that, repeated claims on the final tier need 6, 9, 12, and so on.`}),(0,Z.jsx)(`li`,{children:`Byte Foundry progress is untouched.`})]})}),(0,Z.jsx)(mT,{...l(`overclock section`,`Overclock`),children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`Reach the required number of completed `,m,` levels to claim an Overclock.`]}),(0,Z.jsx)(`li`,{children:`Resets tiers and resources like Scale Up and also clears Scale Up’s bonuses. Autobuyers and Purge Points are kept.`}),(0,Z.jsx)(`li`,{children:`In exchange, multiplies the per-level speed bonus by ×1.1 for each completed level you had when you claimed (1% → 1.1% → 1.21% → …).`}),(0,Z.jsxs)(`li`,{children:[`The first claim needs `,p,` completed levels — a minimum; you can keep climbing first. Each later claim needs `,4,` more completed levels than the previous claim was taken at (fewer with the Overclock step achievements).`]}),(0,Z.jsx)(`li`,{children:`Nothing is banked — each claim replaces the previous one, so only the completed level reached at your latest claim sets the boost. Waiting to claim at a higher level gives a bigger boost.`})]})}),(0,Z.jsx)(mT,{...l(`tier autobuyers section`,`Tier Autobuyers`),children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`Each tier’s autobuyer and its tickspeed autobuyer unlock automatically as your Purge count grows — see Firmware → 🤖 Automation for the exact thresholds.`}),(0,Z.jsx)(`li`,{children:`Once unlocked, the same row pauses or resumes it without losing it.`}),(0,Z.jsxs)(`li`,{children:[`An autobuyer buys `,(0,Z.jsx)(`strong`,{children:`one full level per attempt`}),`, only when that whole level (or the rest of a partly bought one) is affordable; Buy max never applies to it. Speed upgrades on that same row shorten its interval down to 10 ms; each level after that doubles how many levels one attempt can buy, up to 1024. In Buy mode `,(0,Z.jsx)(`strong`,{children:`Bits`}),` `,`(Firmware → Prestige) an attempt buys one unit instead, at the same interval, and those extra levels pause. A tier autobuyer’s speed upgrades start at `,10,` PP × the tier’s number (10, 20, 30 …); its tickspeed autobuyer’s at `,st.baseCost,` PP × the same.`]})]})}),(0,Z.jsx)(mT,{...l(`milestones section`,`Milestones`),children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Tier autobuyers:`}),` one tier every`,` `,`Purge`,`, from Purge`,` `,u,` (`,h,`) through Purge`,` `,d,` (`,m,`).`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Tier tickspeed autobuyers:`}),` start at Purge`,` `,f,`, then every`,` `,`Purge`,` after that.`]}),(0,Z.jsxs)(`li`,{children:[`More → Milestones tracks your story milestones`,s?` and Reboot progress`:``,`.`]})]})}),(0,Z.jsx)(mT,{...l(`prestige section`,`Purge`),children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Prestige`}),` is the umbrella term for every reset-for-rewards: Purge,`,s?` Reboot,`:``,`Reformat Byte Foundry and a pool’s Flush. Purge is the Factory one.`]}),(0,Z.jsxs)(`li`,{children:[`Available at 1 Googol Bytes (8×10^100 Bits), where production freezes until you Purge.`,c&&(0,Z.jsxs)(Z.Fragment,{children:[` Getting Auto Purge’s interval down to `,1,` s or less unlocks `,(0,Z.jsx)(`strong`,{children:`Overflow mode`}),`: production keeps running past 1 Googol Bytes and Purge becomes optional.`]})]}),(0,Z.jsxs)(`li`,{children:[`Awards 1 Purge Point (PP) for every `,64,` powers of ten in your balance: 100 powers at 1 Googol Bytes is 1 PP. Each Compression upgrade halves the powers needed per PP (100 ÷ 32 = 3 PP, then 6, 12, …), and once that reaches 1, doubles the PP per power.`,c&&` Past 1 Googol Bytes the count only keeps growing in Overflow mode.`]}),(0,Z.jsxs)(`li`,{children:[`Compression costs `,10,`^(level+1) PP (10, 100, 1,000, …) on Firmware → ✦ Prestige and is permanent across Purges.`]}),(0,Z.jsx)(`li`,{children:`Spend PP on Firmware for automation and upgrades.`}),(0,Z.jsxs)(`li`,{children:[`Your first Purge Point buys the Purge speed bonus (`,1,` PP on Firmware → Prestige): production speed grows with your Purge count, forever: ×1.1 after your first Purge, ×2 at 10 Purges, ×3 at 100, ×4 at 1,000, and so on (×(1 + log₁₀ Purges)).`]}),(0,Z.jsxs)(`li`,{children:[`Cache Warm (`,20,` PP on Firmware → Prestige) starts every Purge, Scale Up and Overclock with level 1 already complete for the tier of your highest unlocked Storage pool, with or without disks.`]}),(0,Z.jsxs)(`li`,{children:[`The one-time Playtime bonus (`,100,` PP on Firmware → Prestige) adds +`,et*100,`% production speed per hour of active play; offline, hidden-tab, and background catch-up time doesn't count.`]}),(0,Z.jsxs)(`li`,{children:[`Resets resources, owned tiers and this run’s progress. Unlocked autobuyers stay, and Foundry, Storage`,a?` and Power`:``,` progress carries over.`]}),(0,Z.jsx)(`li`,{children:`Your first Purge uses a full-screen prompt; after that, use the Purge bar at the top of the Factory or tap the PP display.`})]})}),(0,Z.jsx)(mT,{...l(`sleep mode section`,`Sleep mode`),children:(0,Z.jsx)(`ul`,{children:(0,Z.jsxs)(`li`,{children:[`Time away is simulated when you come back, up to`,` `,qi(Je),i({kind:`lifetimePurges`,min:1})?(0,Z.jsxs)(Z.Fragment,{children:[` at first. Each Sleep mode upgrade (Firmware → ✦ Prestige; `,Xe.map(e=>B(e)).join(` / `),` PP) adds`,` `,qi(Ye),`, up to `,qi(qe)]}):null,`. Absences of `,qi(600),` `,`or less run at full speed; longer ones run at`,` `,Ke*100,`% speed and show a “Resumed from sleep” summary.`]})})}),(0,Z.jsx)(mT,{...l(`reboot section`,`Reboot`),children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsxs)(`li`,{children:[`An optional deeper reset once you hold`,` `,yt.toExponential(0).replace(`+`,``),` (1 Googol) unspent PP. Nothing freezes at that point.`]}),(0,Z.jsxs)(`li`,{children:[`Each Reboot awards 1 Kernel, ×`,10,` per Kernel Amplifier level. Spend Kernels on Firmware → ⏻ Kernels: hyperscalers (a Flops boost that builds up every second on every tier, until the next Purge, Scale Up or Overclock), Hyperscaler efficiency, Kernel amplifier and Auto Hyperscaler.`]}),(0,Z.jsx)(`li`,{children:`Reboot from More → Settings → Reboot (asks for confirmation). More → Milestones shows your Reboots, Kernels and eligibility.`}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Resets:`}),` Foundry upgrades and Capacity, Disks, Data Lakes, Compute entities, the Factory (resources, owned tiers, Compression level), unspent PP, Purge count, and owned Compute (Flops) units.`]}),(0,Z.jsxs)(`li`,{children:[(0,Z.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause settings, Overflow mode, the main-game unlock, the System log, the Compute screen, Flops autobuyer unlocks, Kernels and hyperscalers. Reboot `,(0,Z.jsx)(`em`,{children:`N`}),` also unlocks the `,(0,Z.jsx)(`em`,{children:`N`}),`th Compute tier’s autobuyer for free.`]})]})}),(0,Z.jsx)(mT,{...l(`achievements section`,`Achievements`),children:(0,Z.jsxs)(`ul`,{children:[(0,Z.jsx)(`li`,{children:`The Achievements screen (More → Achievements) keeps requirements short. Fine print for the ones that have some is listed here, once you can see the achievement.`}),be.filter(e=>e.details&&!e.secret&&xr(t,e)).map(e=>(0,Z.jsxs)(`li`,{children:[(0,Z.jsxs)(`strong`,{children:[e.name,`:`]}),` `,e.trigger,`. `,e.details]},e.id))]})})]})},gT=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,_T=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,vT=X(Jh)`
  gap: 0.4rem;
`,yT=X.ol`
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
`,bT=X.li`
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
`,xT=X.p`
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
`,ST=X.span`
  color: ${e=>e.$color??e.theme.color.textMuted};
  opacity: ${e=>e.$dimmed?.75:1};
`,CT=({game:e})=>{let{state:t}=e,n=gh(),{purge:r}=t,i=t.era?.count??0,a=t.eons?.balance??0,o=Vn(t),s=[{label:`The first Kilobyte`,reached:!!t.intro?.mainGameUnlocked},{label:`Go Googol`,reached:(r.count??0)>0},{label:`Open Compute`,reached:!!t.computeFlops?.pageUnlocked},{label:`DeGoogoled`,reached:Kr(t)},{label:`First Reboot`,reached:i>0}],c=s.findIndex(e=>!e.reached),l=s.filter((e,t)=>e.reached||t===c),u=i>0||o||Kr(t);return(0,Z.jsxs)(gT,{children:[(0,Z.jsx)(_T,{children:(0,Z.jsx)(`h1`,{children:`Milestones`})}),(0,Z.jsxs)(vT,{"aria-label":`milestones page`,children:[(0,Z.jsx)(yT,{"aria-label":`milestones category`,children:l.map(e=>(0,Z.jsx)(bT,{$reached:e.reached,"aria-label":`${e.label} milestone ${e.reached?`reached`:`not yet reached`}`,children:e.label},e.label))}),u&&(0,Z.jsxs)(xT,{"aria-label":`reboot status`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`⏻`}),(0,Z.jsxs)(`span`,{"aria-label":`${i} reboots`,children:[(0,Z.jsx)(`strong`,{children:i}),` Reboots`]}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),(0,Z.jsxs)(`span`,{"aria-label":`${a} kernels held`,children:[(0,Z.jsx)(`strong`,{children:a}),` Kernels`]}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),o?(0,Z.jsx)(ST,{$color:n.color.good,"aria-label":`reboot eligible now`,children:`✅ Eligible`}):(0,Z.jsx)(ST,{$color:n.color.disabled,$dimmed:!0,"aria-label":`reboot locked — requires ${1e100.toExponential(0).replace(`+`,``)} unspent Purge Points`,children:`🔒 1 Googol PP`})]})]})]})},wT=({game:e})=>{if(!Qi(e.state))return null;let t=!!e.buyMaxMode;return(0,Z.jsx)(hw,{$on:t,"aria-label":`Buy max mode`,"aria-pressed":t,onClick:()=>e.setBuyMaxMode(!t),title:t?`Buy max is on: each purchase buys as many levels as you can afford (Factory tiers buy full levels only — a partial level takes its own click). Click to turn off.`:`Buy max is off: each purchase buys one level. Click to buy as many levels as you can afford instead.`})},TT=X.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
`,ET=X(Q)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&wh`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,DT=[{id:`level`,unit:!1,icon:`📶`,label:`Bytes`,title:`Buy Bytes: each Buy fills as many units as you can afford, up to the end of the current level.`},{id:`single`,unit:!0,icon:`1️⃣`,label:`Bits`,title:`Buy Bits: each Buy — and each autobuyer attempt, at the same interval — purchases exactly one unit, so autobuying is much slower (bulk-level upgrades are suspended).`}],OT=({game:e})=>(0,Z.jsx)(TT,{role:`group`,"aria-label":`buy mode`,children:DT.map(t=>{let n=!!e.buyUnitMode===t.unit;return(0,Z.jsx)(ET,{"aria-label":`buy ${t.id} mode`,"aria-pressed":n,onClick:()=>e.setBuyUnitMode(t.unit),title:`${t.title}${n?` (selected)`:``}`,type:`button`,variant:n?`prestige`:`neutral`,$selected:n,children:`${t.icon} ${t.label}`},t.id)})}),kT=X.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
  width: 100%;
`,AT=X(Q)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${e=>e.$selected&&wh`
    background: color-mix(in srgb, ${e.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`,jT=({value:e,onChange:t})=>(0,Z.jsx)(kT,{role:`group`,"aria-label":`auto boost preference`,children:Object.keys(Ie).map(n=>{let r=Rv[n],i=e===n;return(0,Z.jsx)(AT,{"aria-label":`set auto boost preference to ${r.label.toLowerCase()}`,"aria-pressed":i,onClick:()=>t(n),title:`Auto Boost preference: ${r.label}${i?` (selected)`:``}`,type:`button`,variant:i?`prestige`:`neutral`,$selected:i,children:`${r.icon} ${r.label}`},`auto-${n}`)})}),MT=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,NT=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,PT=X.p`
  color: ${e=>e.theme.color.textMuted};
  margin: 0.2rem 0 0;
`,FT=X.div`
  display: flex;
  gap: 0.5rem;
`,IT=X(Q)`
  flex: 1;
  font-size: 1.15rem;
  position: relative;
`,LT=X.span`
  background: ${e=>e.theme.color.good};
  border-radius: 50%;
  height: 0.5rem;
  position: absolute;
  right: 0.4rem;
  top: 0.3rem;
  width: 0.5rem;
`,RT=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,zT=X(Jh)`
  gap: 0.4rem;
`,BT=X.h2`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,VT=X.div`
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
`,HT=X.div`
  align-items: start;
  display: grid;
  gap: 0.4rem;
  /* $narrow: tier/Flops cells show only the symbol (KB, MF…), so three fit a 320px phone; named
     (global) cells need a full row on a phone and go two-up on wider screens. */
  grid-template-columns: repeat(auto-fill, minmax(${e=>e.$narrow?`4.75rem`:`18.5rem`}, 1fr));
`,UT=({tier:e})=>(0,Z.jsxs)(`span`,{title:e.name,style:{flexShrink:0},children:[(0,Z.jsx)(d_,{children:e.name}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.symbol})]}),WT=X.div`
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
`,GT=X.div`
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
`,KT=X.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`,qT=X.div`
  color: ${e=>e.theme.color.textFaint};
  column-gap: 0.3rem;
  display: grid;
  font-size: 0.68rem;
  font-weight: 600;
  grid-template-columns: 1.8rem minmax(0, 1fr) minmax(0, 1fr);
  letter-spacing: 0.06em;
  padding: 0 0.25rem 0 calc(0.45rem + 3px);
  text-transform: uppercase;
`,JT=X.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`,YT=X.div`
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
`,XT=X.span`
  color: ${e=>e.$color??e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.1;
  opacity: ${e=>e.$dimmed?.55:1};
`,ZT=X.span`
  display: flex;
  gap: 4px;
`,QT=X.button`
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
`,$T=X.span`
  color: ${e=>e.theme.color.textFaint};
  font-size: 0.68rem;
  white-space: nowrap;
`,eE=X.div`
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
`,tE=X.span`
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
`,nE=X.span`
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
`,rE=X.div`
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
`,iE=X.span`
  font-weight: 600;
  min-width: 0;
`,aE=X.span.attrs({"aria-hidden":!0})`
  display: inline-block;
  margin-right: 0.45rem;
  text-align: center;
  width: 1.5em;
`,oE=X.span`
  display: inline-block;
  margin-right: 0.45rem;
  opacity: ${e=>e.$dimmed?.55:1};
  text-align: center;
  width: 1.5em;
`,sE=X.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`,cE=X.button`
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
`,lE=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  grid-column: 1 / -1;
  justify-self: stretch;
  line-height: 1.35;
  margin: 0.3rem 0 0;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,uE=X.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`,dE=X.p`
  margin: 0;
  padding: ${({theme:e})=>e.space.md} ${({theme:e})=>e.space.lg};
  margin-bottom: ${({theme:e})=>e.space.sm};
  border-radius: ${({theme:e})=>e.radius.md};
  border: 1px solid #38bdf8;
  font-size: 0.85rem;
  line-height: 1.35;
`,fE=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
  font-weight: 400;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`,pE=X(Q)`
  font-size: 0.85em;
  gap: 0.35rem;
  min-width: 5.5rem;
  padding: 0.45em 0.7em;
  white-space: nowrap;
`,mE=X.span`
  align-items: center;
  color: ${e=>e.$color};
  display: inline-flex;
  font-size: 0.92em;
  font-variant-numeric: tabular-nums;
  gap: 0.3rem;
  opacity: ${e=>e.$dimmed?.55:1};
  white-space: nowrap;
`,hE=(e,t)=>Math.min(100,Math.round(e/t*100)),gE=({icon:e,subject:t,unit:n,milestone:r,current:i,progressLabel:a,display:o})=>{let s=gh();return(0,Z.jsxs)(uE,{children:[(0,Z.jsx)(mE,{$color:s.color.disabled,$dimmed:!0,"aria-label":`${t} unlocks at ${n} ${r}`,title:`${t} — unlocks at ${n} ${r} (you're at ${n} ${i})`,children:o??(0,Z.jsxs)(Z.Fragment,{children:[e&&`${e} `,`🔒 `,r]})}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":a,"aria-valuenow":Math.min(i,r),"aria-valuemin":0,"aria-valuemax":r})]})},_E=({name:e,icon:t,title:n})=>{let r=gh();return(0,Z.jsxs)(mE,{$color:r.color.good,"aria-label":`${e} unlocked`,title:n??`${e} unlocked`,children:[t,` ✓`]})},vE=({ariaLabel:e,color:t,cost:n,points:r,disabled:i,onClick:a,title:o,icon:s,label:c,progressLabel:l})=>(0,Z.jsxs)(pE,{"aria-label":e,color:i?`darkgrey`:t,disabled:i,onClick:a,title:o,type:`button`,$progress:hE(r,n),$progressColor:t,children:[(0,Z.jsx)(c_,{children:s}),(0,Z.jsx)(l_,{children:c}),(0,Z.jsx)(d_,{role:`progressbar`,"aria-label":l,"aria-valuenow":Math.min(r,n),"aria-valuemin":0,"aria-valuemax":n})]}),yE=({ariaLabel:e,narrow:t=!1,bare:n=!1,inlineAction:r=!1,icon:i,name:a,label:o=a,owned:s,enabled:c=!0,onToggle:l,toggleLabel:u,statusTitle:d,title:f,subText:p,lockedBadge:m,lockedAction:h,ownedBadge:g,ownedAction:_})=>{let v=`${a} ${c?`active`:`paused`}`,y=s?_:h;return(0,Z.jsxs)(WT,{$bare:n,$narrow:t,"aria-label":e,title:f,children:[(0,Z.jsxs)(eE,{$narrow:t,$wrap:r,children:[(0,Z.jsxs)(iE,{children:[s&&l&&!i&&(0,Z.jsx)(d_,{role:`img`,"aria-label":v,children:c?`active `:`paused `}),i&&(s&&l?(0,Z.jsx)(oE,{$dimmed:!c,role:`img`,"aria-label":v,title:d,children:i}):(0,Z.jsx)(aE,{children:i})),o]}),s&&p&&(0,Z.jsx)(tE,{$wide:!t,children:p}),r&&(y||!t&&s&&l)&&(0,Z.jsx)(nE,{$narrow:t,children:y}),s&&l&&(0,Z.jsx)(hw,{$on:c,"aria-label":u,"aria-pressed":c,onClick:l,title:`${c?`Pause`:`Resume`} ${u}`}),s&&!l&&g,!s&&m]}),!r&&y&&(0,Z.jsx)(rE,{$narrow:t,children:y})]})},bE=[{id:`automation`,icon:`🤖`,ariaLabel:`open automation`,title:`Automation — unlock, pause/resume and speed up every automation`},{id:`prestige`,icon:`✦`,ariaLabel:`open prestige`,title:`Prestige — Speed bonus, Sleep mode, Compression, playtime bonus, Overflow mode and Buy max`}],xE=X.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-variant-numeric: tabular-nums;
  color: ${e=>e.theme.color.text};
`,SE=X.span`
  min-width: 4.5em;
  text-align: center;
  font-size: 0.9rem;
`,CE=X(Q)`
  min-width: 32px;
  min-height: 32px;
  padding: 0;
`,wE={id:`kernels`,icon:`⏻`,ariaLabel:`open kernels`,title:`Kernels — spend Kernels earned by Rebooting`},TE=e=>e>=1e3?`${Math.round(e)/1e3} s`:`${Math.round(e*10)/10} ms`,EE=e=>e>=1e3?`${Number((e/1e3).toFixed(e>=1e4?0:1))}s`:`${Math.round(e)}ms`,DE=e=>String(Number(e.toFixed(2))),OE=e=>`${Number((e/3600).toFixed(1))}h`,kE=e=>{let t=Mi(e+1);if(t>1)return`${B(Mi(e))} → ${B(t)} PP per extra digit`;let[n,r]=[ji(e),ji(e+1)];return`1 PP per ${B(n)} → ${B(r)} extra digit${r===1?``:`s`}`},AE=({ariaLabel:e,icon:t,name:n,value:r,details:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return(0,Z.jsxs)(VT,{"aria-label":e,children:[(0,Z.jsxs)(sE,{children:[(0,Z.jsx)(iE,{children:(0,Z.jsxs)(cE,{"aria-expanded":o,"aria-label":`${n} details`,onClick:()=>s(e=>!e),type:`button`,children:[(0,Z.jsx)(aE,{children:t}),n]})}),r&&(0,Z.jsx)(fE,{"aria-label":`${n} value`,children:r})]}),a,o&&(0,Z.jsx)(lE,{"aria-label":`${n} description`,children:i})]})},jE=[{key:`speedUp`,name:`Auto Accelerate`,icon:`🌐`,owned:e=>e.autoGlobalTickspeed??!1,enabled:e=>e.autoGlobalTickspeedEnabled??!0,setEnabled:`setAutoGlobalTickspeedEnabled`},{key:`scaleUp`,name:`Auto Scale Up`,icon:`⏩`,owned:e=>e.autoScaleUp??!1,enabled:e=>e.autoScaleUpEnabled??!0,setEnabled:`setAutoScaleUpEnabled`,statusTitle:e=>e?`Scale Up triggers automatically the instant it's eligible`:`Auto Scale Up is paused — it will not trigger until resumed`},{key:`restage`,name:`Auto Restage`,icon:`🧬`,owned:e=>e.autoXpTickspeed??!1,enabled:e=>e.autoXpTickspeedEnabled??!0,setEnabled:`setAutoXpTickspeedEnabled`},{key:`overclock`,name:`Auto Overclock`,icon:`🚀`,owned:e=>e.autoOverclock??!1,enabled:e=>e.autoOverclockEnabled??!0,setEnabled:`setAutoOverclockEnabled`},{key:`purge`,name:`Auto Purge`,icon:`✦`,owned:e=>(e.autoPurge??null)!==null,enabled:e=>e.autoPurgeEnabled??!0,setEnabled:`setAutoPurgeEnabled`}],ME=({game:e,focusNonce:t=0})=>{let{state:n,actions:r}=e,i=gh(),{purge:a}=n,o=a.points??0,s=a.count??0,c=n.era?.count??0,l=s===0,u=bi(n),[d,f]=(0,v.useState)(`automation`),[p,m]=(0,v.useState)(null),h=Jr(n);(0,v.useEffect)(()=>{f(`automation`)},[t]);let g=n.prestigeDoublePpLevel??0,_=Ni(g),y=!l&&o>=_,x=!n.prestigeSpeedBonusUnlocked&&o>=1,S=pn(s,!0),C=!n.playtimeBonusUnlocked&&o>=100,w=Sn(n),T=wn(w),E=OE(Cn(n)),D=OE(Cn({...n,sleepModeCapLevel:w+1})),O=OE(Ye),k=!n.cacheWarmUnlocked&&o>=20,A=yn(n),ee=gn({...n,playtimeBonusUnlocked:!0}),j=Fe.some(e=>!!n.intro?.[e.autoFlagField]),te=n.computeAutoChargeEnabled??!0,M=n.intro?.computeAutoBoostEnabled??!0,ne=n.eons?.balance??0,P=(e,t)=>{let n=e.findIndex(e=>!t(e));return n===-1?e:e.filter((e,r)=>r<=n||t(e))},re=P(jE,e=>e.owned(n)),ie=P(b,e=>(n.autobuyers?.[e.id]??null)!==null||!!n.tierTickspeedAutobuyer?.[e.id]),F=c>=1||ne>0,ae=s>=1||c>=1,oe=Qi(n),se=[...bE.filter(e=>e.id===`automation`?ae||j:ae||oe),...F?[wE]:[]],ce=se.some(e=>e.id===d)?d:se[0]?.id,le=Wn(n)||Zn(n)||Object.keys(wt).some(e=>Yn(n,e)),ue={kernels:F&&le&&`kernel upgrade available`,automation:Mg(n)&&`automation perk available`,prestige:Ng(n)&&`prestige perk available`},de=({maxed:e,cost:t,ariaLabel:n,label:r,onClick:i,progressLabel:a,title:s})=>e?null:(0,Z.jsx)(vE,{ariaLabel:n,color:`#34d399`,cost:t,disabled:u||o<t,icon:`⏫`,label:r??`${B(t)} PP`,onClick:i,points:o,progressLabel:a,title:s}),fe=e=>ui(n,e.id)?(0,Z.jsxs)(Q,{"aria-label":`Start challenge ${ay(e)} to unlock ${e.target} speed upgrades${h?` (disabled: another challenge is active)`:``}`,disabled:!!h,onClick:()=>m(e.id),title:`Complete challenge ${e.id} to unlock this automation's speed upgrades`,type:`button`,variant:`prestige`,children:[`🏁 `,e.id]}):(0,Z.jsxs)(Q,{"aria-label":`Challenge ${e.id} ${iy(e).toLowerCase()}`,disabled:!0,title:iy(e),type:`button`,variant:`prestige`,children:[`🔒 `,e.id]}),pe=(e,t)=>{let r=di(e,t);return r&&!Yr(n,r.id)?r:null},me=b.every(e=>{let t=n.autobuyerIntervalLevels?.[e.id]??0,r=n.tierTickspeedIntervalLevels?.[e.id]??0;return(n.autobuyers[e.id]??null)!==null&&!!n.tierTickspeedAutobuyer?.[e.id]&&t>=wd(e.id)&&r>=Id()&&!pe(`tierTickspeed`,e.id)&&!pe(`tierAutobuyer`,e.id)}),I=()=>{let e=Hr(n),t=(e,t,n)=>{let r=Math.max(0,e.indexOf(t));return e[Math.min(e.length-1,Math.max(0,r+n))]},i=[{key:`targetPpExponent`,icon:`✦`,name:`Purge at PP`,options:Array.from({length:101},(e,t)=>t),label:e=>e===0?`Off`:`10^${e} PP`,details:`Auto Purge waits until a Purge would award at least this many PP. Needs Overflow mode (production must keep running past 1 Googol Bytes); the manual Purge always works.`},{key:`minSeconds`,icon:`⏳`,name:`Minimum time`,options:bt,label:e=>e===0?`Off`:e>=3600?`${e/3600} h`:e>=60?`${e/60} min`:`${e} s`,details:`Auto Purge waits until this much time has passed since the last Purge, or Googol Bytes is reached, whichever is later.`},{key:`bestMultiplier`,icon:`📈`,name:`Best PP multiple`,options:xt,label:e=>e===0?`Off`:`×${e}`,details:`Auto Purge waits until a Purge would award at least this multiple of your best Purge award since the last Reboot. Needs Overflow mode.`}];return(0,Z.jsx)(Z.Fragment,{children:i.map(n=>{let i=e[n.key],a=t(n.options,i,-1),o=t(n.options,i,1);return(0,Z.jsx)(AE,{ariaLabel:`auto purge ${n.name.toLowerCase()} setting`,details:n.details,icon:n.icon,name:n.name,children:(0,Z.jsxs)(xE,{role:`group`,"aria-label":`${n.name} stepper`,children:[(0,Z.jsx)(CE,{"aria-label":`Decrease ${n.name}`,disabled:a===i,onClick:()=>r.setAutoPurgeSetting(n.key,a),type:`button`,children:`−`}),(0,Z.jsx)(SE,{"aria-label":`${n.name} value`,children:n.label(i)}),(0,Z.jsx)(CE,{"aria-label":`Increase ${n.name}`,disabled:o===i,onClick:()=>r.setAutoPurgeSetting(n.key,o),type:`button`,children:`+`})]})},n.key)})})},L=()=>(0,Z.jsxs)(RT,{"aria-label":`automation firmware page`,children:[ae&&(0,Z.jsxs)(zT,{"aria-label":`global automation category`,children:[(0,Z.jsx)(BT,{children:`Global Automation`}),(0,Z.jsx)(HT,{children:re.map(e=>{let t=e.owned(n),i=e.enabled(n),a=Pd(n,e.key),o=n.automationIntervalLevels?.[e.key]??0,c=o>=Ad(e.key),l=Md(e.key,o),u=di(`global`,e.key),d=u&&!Yr(n,u.id)?u:null;return(0,Z.jsx)(yE,{ariaLabel:`${e.name.toLowerCase()} row`,enabled:i,icon:e.icon,inlineAction:!0,label:e.name.replace(/^Auto /,``),lockedBadge:(0,Z.jsx)(gE,{current:s,milestone:Vr(e.key),progressLabel:`${e.name} unlock milestone progress`,subject:e.name,unit:`Purge`}),name:e.name,onToggle:()=>r[e.setEnabled](!i),owned:t,ownedAction:a?d?fe(d):de({maxed:c,cost:l,ariaLabel:`Upgrade ${e.name} speed to level ${o+1} for ${B(l)} Purge Points — interval ×0.9`,onClick:()=>r.buyAutomationIntervalUpgrade(e.key),progressLabel:`${e.name} speed PP progress`,title:`Spend Purge Points to shorten this automation's interval by 10% (floor 10 ms); cost doubles each level`}):null,statusTitle:e.statusTitle?.(i),subText:a&&!c?EE(jd(n,e.key)*1e3):null,title:a&&c?`${e.name}: every ${TE(jd(n,e.key)*1e3)} (max)`:void 0,toggleLabel:`${e.name} automation`},e.key)})}),n.autoPurge!=null&&I()]}),ae&&(0,Z.jsxs)(zT,{"aria-label":`tier autobuyers category`,children:[(0,Z.jsx)(BT,{children:`Tier Autobuyers`}),me?(0,Z.jsx)(JT,{"aria-label":`tier autobuyer tiles`,role:`group`,children:b.map((e,t)=>{let a=n.autobuyersEnabled?.[e.id]??!0,o=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,s=`${e.name}'s tickspeed autobuyer`,c=`${e.name}'s autobuyer`;return(0,Z.jsxs)(YT,{$on:a&&o,"aria-label":`${e.name} automation`,title:`${e.name}: tickspeed autobuyer and autobuyer fully upgraded`,children:[(0,Z.jsx)(XT,{$color:i.tierAccents[t%i.tierAccents.length],children:(0,Z.jsx)(UT,{tier:e})}),(0,Z.jsxs)(ZT,{children:[(0,Z.jsx)(d_,{role:`img`,"aria-label":`${s} ${o?`active`:`paused`}`}),(0,Z.jsx)(QT,{$on:o,"aria-label":s,"aria-pressed":o,onClick:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!o),title:`${o?`Pause`:`Resume`} ${s}`,type:`button`,children:`⚙`}),(0,Z.jsx)(d_,{role:`img`,"aria-label":`${c} ${a?`active`:`paused`}`}),(0,Z.jsx)(QT,{$on:a,"aria-label":c,"aria-pressed":a,onClick:()=>r.setAutobuyerEnabled(e.id,!a),title:`${a?`Pause`:`Resume`} ${c}`,type:`button`,children:`🤖`})]})]},e.id)})}):(0,Z.jsxs)(KT,{children:[(0,Z.jsxs)(qT,{"aria-hidden":`true`,children:[(0,Z.jsx)(`span`,{children:`Tier`}),(0,Z.jsx)(`span`,{children:`⚙ Tickspeed`}),(0,Z.jsx)(`span`,{children:`🤖 Buy`})]}),ie.map((e,t)=>{let a=(n.autobuyers[e.id]??null)!==null,o=n.autobuyersEnabled?.[e.id]??!0,c=en(e.id),l=n.autobuyerIntervalLevels?.[e.id]??0,u=l>=wd(e.id),d=l>=yd(e.id),f=a?Cd(n,e.id):1,p=Dd(l,e.id),m=n.tierTickspeedAutobuyer?.[e.id]??!1,h=n.tierTickspeedAutobuyerEnabled?.[e.id]??!0,g=n.tierTickspeedIntervalLevels?.[e.id]??0,_=g>=Id(),v=Rd(g,e.id),y=pe(`tierTickspeed`,e.id),b=pe(`tierAutobuyer`,e.id);return(0,Z.jsxs)(GT,{$accent:i.tierAccents[t%i.tierAccents.length],"aria-label":`${e.name} automation`,children:[(0,Z.jsx)(UT,{tier:e}),(0,Z.jsx)(yE,{ariaLabel:`${e.name} tickspeed autobuyer`,enabled:h,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,Z.jsx)(gE,{current:s,milestone:tn(e.id),progressLabel:`${e.name} tickspeed autobuyer milestone progress`,subject:`${e.name}'s tickspeed autobuyer`,unit:`Purge`}),name:`${e.name}'s tickspeed autobuyer`,onToggle:()=>r.setTierTickspeedAutobuyerEnabled(e.id,!h),owned:m,ownedAction:y?fe(y):de({maxed:_,cost:v,ariaLabel:`Upgrade ${e.name}'s tickspeed autobuyer speed to level ${g+1} for ${B(v)} Purge Points — interval ×0.9`,onClick:()=>r.buyTierTickspeedIntervalUpgrade(e.id),progressLabel:`${e.name} tickspeed autobuyer speed PP progress`,title:`Spend Purge Points to shorten this tier's tickspeed autobuyer interval by 10% (floor 10 ms); cost doubles each level`}),subText:m&&!_?EE(Ld(n,e.id)*1e3):null,title:m&&_?`${e.name} tickspeed autobuyer: every ${TE(Ld(n,e.id)*1e3)} (max)`:void 0,toggleLabel:`${e.name}'s tickspeed autobuyer`}),(0,Z.jsx)(yE,{ariaLabel:`${e.name} autobuyer`,enabled:o,bare:!0,inlineAction:!0,label:``,narrow:!0,lockedBadge:(0,Z.jsx)(gE,{current:s,milestone:c,progressLabel:`${e.name} autobuyer unlock milestone progress`,subject:`${e.name}'s autobuyer`,unit:`Purge`}),name:`${e.name}'s autobuyer`,onToggle:()=>r.setAutobuyerEnabled(e.id,!o),owned:a,ownedAction:b?fe(b):de({maxed:u,cost:p,ariaLabel:d?`Upgrade ${e.name}'s autobuyer to level ${l+1} for ${B(p)} Purge Points — doubles levels bought per attempt to up to ${f*2}`:`Upgrade ${e.name}'s autobuyer speed to level ${l+1} for ${B(p)} Purge Points — interval ×0.9`,label:void 0,onClick:()=>r.buyAutobuyerIntervalUpgrade(e.id),progressLabel:`${e.name} autobuyer speed PP progress`,title:d?`At the 10 ms floor, each further level doubles how many full levels one autobuyer attempt can buy (as many as are affordable, at least one); cost keeps rising`:`Spend Purge Points to shorten this autobuyer's purchase interval by 10% (floor 10 ms); past the floor, levels double how many levels it buys per attempt`}),subText:a&&!u?f>1?`×${f}`:EE(xd(n,e.id)*1e3):null,title:a&&u?`${e.name} autobuyer: every ${TE(xd(n,e.id)*1e3)} · ${f}/buy (max)`:void 0,toggleLabel:`${e.name}'s autobuyer`})]},e.id)})]})]}),j&&(0,Z.jsxs)(zT,{"aria-label":`power automation category`,children:[(0,Z.jsx)(BT,{children:`Power Automation`}),(0,Z.jsxs)(HT,{children:[j&&(0,Z.jsx)(yE,{ariaLabel:`auto-charge row`,enabled:te,icon:`🔌`,inlineAction:!0,label:`Charge`,name:`Auto-charge`,onToggle:()=>r.setComputeAutoChargeEnabled(!te),owned:!0,statusTitle:te?`Auto-charge starts timed reserve charges on its own`:`Auto-charge is paused — no new automatic charge starts until resumed (instant charge-ups still work)`,title:`Bought per tier on Power; pause or resume all of them here`,toggleLabel:`Auto-charge`}),(0,Z.jsx)(yE,{ariaLabel:`auto boost row`,enabled:M,icon:`🤖`,inlineAction:!0,label:`Boost`,name:`Auto Boost`,onToggle:()=>r.setComputeAutoBoostEnabled(!M),owned:!0,statusTitle:M?`Auto Boost spends one token on your preferred Boost preset with each automatic charge`:`Auto Boost is paused`,title:`Automatic once any tier's Auto-charge is bought on Power; pause it and choose its preset here`,toggleLabel:`Auto Boost`}),(0,Z.jsxs)(WT,{"aria-label":`compute auto boost`,style:{gridColumn:`1 / -1`},children:[(0,Z.jsx)(eE,{children:(0,Z.jsx)(iE,{children:`Boost preset`})}),(0,Z.jsx)(jT,{onChange:r.setComputeAutoBoostType,value:n.intro.computeAutoBoostType??`standard`})]})]})]}),n.computeFlops?.pageUnlocked&&(0,Z.jsxs)(zT,{"aria-label":`compute autobuyers category`,children:[(0,Z.jsx)(BT,{children:`Compute Autobuyers`}),(0,Z.jsx)(JT,{"aria-label":`compute autobuyer tiles`,role:`group`,children:gt.map(e=>{let t=(n.computeFlopsAutobuyers?.[e.id]??null)!==null,i=n.computeFlopsAutobuyersEnabled?.[e.id]??!0,a=`${e.name} (${e.outputLabel}) autobuyer`,o=tr(e.id);return(0,Z.jsxs)(YT,{$on:t&&i,"aria-label":`${e.name} · ${e.outputLabel} autobuyer`,children:[(0,Z.jsx)(XT,{$dimmed:!t,children:(0,Z.jsx)(UT,{tier:e})}),t?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(d_,{role:`img`,"aria-label":`${a} ${i?`active`:`paused`}`}),(0,Z.jsx)(QT,{$on:i,"aria-label":a,"aria-pressed":i,onClick:()=>r.setComputeFlopsAutobuyerEnabled(e.id,!i),title:`${i?`Pause`:`Resume`} ${a}`,type:`button`,children:i?`on`:`paused`})]}):(0,Z.jsx)($T,{children:(0,Z.jsx)(gE,{current:c,display:`🔒 R${o}`,milestone:o,progressLabel:`${e.name} (${e.outputLabel}) autobuyer unlock milestone progress`,subject:`${e.name} (${e.outputLabel}) autobuyer`,unit:`Reboot`})})]},e.id)})})]})]}),R=()=>(0,Z.jsxs)(RT,{"aria-label":`prestige firmware page`,children:[ae&&(0,Z.jsxs)(zT,{"aria-label":`purge points category`,children:[(0,Z.jsx)(BT,{children:`Purge Points`}),!n.prestigeSpeedBonusUnlocked&&(0,Z.jsx)(dE,{"aria-label":`purge points tutorial`,children:`Purge Points (PP) buy permanent upgrades. Start with the Speed bonus.`}),(0,Z.jsx)(AE,{ariaLabel:`speed bonus upgrade`,details:`Multiplies all production, growing with your Purge count: ×1.1 after the 1st Purge, ×2 at 10, ×3 at 100, ×4 at 1,000… (×(1 + log₁₀ Purges)). One-time purchase, permanent.`,icon:`🚀`,name:`Speed bonus`,value:n.prestigeSpeedBonusUnlocked?`Production ×${DE(S)}`:`Production ×1 → ×${DE(S)}`,children:n.prestigeSpeedBonusUnlocked?(0,Z.jsx)(_E,{icon:`🚀`,name:`Speed bonus`}):(0,Z.jsx)(vE,{ariaLabel:`Unlock speed bonus for 1 Purge Points`,color:`#38bdf8`,cost:1,disabled:!x,icon:`🔓`,label:`${B(1)} PP`,onClick:r.buyPrestigeSpeedBonus,points:o,progressLabel:`Speed bonus unlock PP progress`})}),(0,Z.jsx)(AE,{ariaLabel:`sleep mode upgrade`,details:`Longest time away simulated when you come back (at 50% speed past 10 min). Each level adds ${O}: ${Xe.map(e=>B(e)).join(` / `)} PP, up to ${OE(86400)}.`,icon:`😴`,name:`Sleep mode`,value:T===null?`Time away: up to ${E}`:`Time away: up to ${E} → ${D}`,children:T===null?(0,Z.jsx)(_E,{icon:`😴`,name:`Sleep mode`,title:`Sleep mode at its maximum`}):(0,Z.jsx)(vE,{ariaLabel:`Buy Sleep mode level ${w+1} for ${B(T)} Purge Points — +${O} of time away`,color:`#a78bfa`,cost:T,disabled:o<T,icon:`⏫`,label:`${B(T)} PP`,onClick:r.buySleepModeCapUpgrade,points:o,progressLabel:`Sleep mode upgrade PP progress`})}),(0,Z.jsx)(AE,{ariaLabel:`compression upgrade`,details:`Past 1 Googol Bytes, each extra digit of your balance earns more Purge Points. Each level halves the digits needed per PP until 1, then doubles PP per digit. Costs 10, 100, 1,000… PP.`,icon:`✦`,name:`Compression`,value:kE(g),children:(0,Z.jsx)(vE,{ariaLabel:`Buy Compression level ${g+1} for ${B(_)} Purge Points — ${g<6?`halves powers needed per PP`:`doubles PP per power`}`,color:`#fbbf24`,cost:_,disabled:!y,icon:`⏫`,label:`${B(_)} PP`,onClick:r.buyPrestigeDoublePp,points:o,progressLabel:`Compression upgrade PP progress`})}),(0,Z.jsx)(AE,{ariaLabel:`cache warm upgrade`,details:`Every Purge, Scale Up, Overclock, challenge exit and Reboot starts with level 1 already complete, free, for the tier of your highest unlocked Storage pool, disks or not (now ${A.name}). One-time purchase, permanent. Not applied inside challenges.`,icon:`🔥`,name:`Cache Warm`,value:n.cacheWarmUnlocked?`Runs start with ${A.symbol} level 1 done`:`Start runs with ${A.symbol} level 1 done`,children:n.cacheWarmUnlocked?(0,Z.jsx)(_E,{icon:`🔥`,name:`Cache Warm`}):(0,Z.jsx)(vE,{ariaLabel:`Unlock Cache Warm for 20 Purge Points`,color:`#f97316`,cost:20,disabled:!k,icon:`🔓`,label:`${B(20)} PP`,onClick:r.buyCacheWarm,points:o,progressLabel:`Cache Warm unlock PP progress`})}),(0,Z.jsx)(AE,{ariaLabel:`playtime bonus upgrade`,details:`+1% production per hour of active play. Offline, hidden-tab and background time don't count. One-time purchase, permanent.`,icon:`⏱`,name:`Playtime bonus`,value:n.playtimeBonusUnlocked?`Production ×${DE(ee)}`:`+1% production per hour played`,children:n.playtimeBonusUnlocked?(0,Z.jsx)(_E,{icon:`⏱`,name:`Playtime bonus`}):(0,Z.jsx)(vE,{ariaLabel:`Unlock playtime bonus for 100 Purge Points`,color:`#38bdf8`,cost:100,disabled:!C,icon:`🔓`,label:`${B(100)} PP`,onClick:r.buyPlaytimeBonus,points:o,progressLabel:`Playtime bonus unlock PP progress`})}),(n.autoPurge!=null||Kr(n))&&(0,Z.jsx)(AE,{ariaLabel:`overflow mode unlock`,details:`Keep earning past 1 Googol Bytes without freezing; Purge whenever you choose to claim PP. Unlocks when Auto Purge's interval reaches 1 s or less.`,icon:`♾`,name:`Overflow mode`,value:Kr(n)?null:`Keep producing past 1 Googol Bytes`,children:Kr(n)?(0,Z.jsx)(_E,{icon:`♾`,name:`Overflow mode`}):(0,Z.jsx)(mE,{$color:i.color.disabled,$dimmed:!0,"aria-label":`Overflow mode locked`,title:`Unlocks when Auto Purge's interval reaches 1 s or less`,children:`♾ 🔒`})})]}),(0,Z.jsxs)(zT,{"aria-label":`purchasing category`,children:[(0,Z.jsx)(BT,{children:`Purchasing`}),(0,Z.jsx)(AE,{ariaLabel:`buy mode toggle`,details:`Bytes (default): each Factory Buy fills as many units as you can afford, up to the end of the current level. Bits: each Buy purchases exactly one unit (it overrides Buy max for the Buy button). Autobuyers follow the mode at the same interval, so in Bits they buy one unit per attempt — a level takes several times longer. The choice is per device.`,icon:`🛒`,name:`Buy mode`,children:(0,Z.jsx)(OT,{game:e})}),(oe||ae)&&(0,Z.jsx)(AE,{ariaLabel:`buy max toggle`,details:`When on, each purchase buys as many levels as you can afford. Factory tiers buy full levels only — a partly bought level takes its own click. Unlocked by the Click fast, buy max achievement; the switch is per device.`,icon:`⏭`,name:`Buy max`,value:Qi(n)?null:`Locked: earn the Click fast, buy max achievement`,children:Qi(n)?(0,Z.jsx)(wT,{game:e}):null})]})]}),he=({ariaLabel:e,cost:t,disabled:n,onClick:r,progressLabel:i})=>(0,Z.jsx)(vE,{ariaLabel:e,color:`#a78bfa`,cost:t,disabled:n,icon:`🏷️`,label:`${B(t)} ${t===1?`Kernel`:`Kernels`}`,onClick:r,points:ne,progressLabel:i}),ge=e=>`${B(e*100)}%/s`;return(0,Z.jsxs)(MT,{children:[(0,Z.jsxs)(NT,{children:[(0,Z.jsx)(`h1`,{children:`Firmware`}),ce===`kernels`&&F?(0,Z.jsxs)(PT,{"aria-label":`kernels display`,children:[`⏻ `,B(ne),` `,ne===1?`Kernel`:`Kernels`]}):ae&&(0,Z.jsxs)(PT,{"aria-label":`purge points display`,children:[`✦ `,B(o),` PP`]})]}),(0,Z.jsx)(FT,{role:`tablist`,"aria-label":`firmware view`,children:se.map(e=>(0,Z.jsxs)(IT,{"aria-label":e.ariaLabel,"aria-selected":ce===e.id,color:ce===e.id?i.color.text:i.color.textMuted,onClick:()=>f(e.id),role:`tab`,title:e.title,type:`button`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),ue[e.id]&&(0,Z.jsx)(LT,{"aria-label":ue[e.id]})]},e.id))}),ce===`automation`&&L(),ce===`prestige`&&R(),ce===`kernels`&&F&&(()=>{let e=n.hyperscalerCount??0,t=Kn(n,`hyperscalerEfficiency`),i=Jn(n,`hyperscalerEfficiency`),a=ht,o=e=>a+e*St,s=qn(`hyperscalerEfficiency`,t),c=Kn(n,`eonAmplifier`),l=Jn(n,`eonAmplifier`),u=qn(`eonAmplifier`,c),d=!!n.eonsUpgrades?.autoHyperscalerUnlocked,f=n.eonsUpgrades?.autoHyperscalerEnabled??!0,p=Un(e);return(0,Z.jsx)(RT,{children:(0,Z.jsxs)(zT,{"aria-label":`kernels category`,children:[(0,Z.jsx)(BT,{children:`Kernels`}),(0,Z.jsx)(AE,{ariaLabel:`hyperscaler upgrade`,details:`Each hyperscaler adds ${ge(o(t))} per second to every Factory tier's Flops boost until the next Purge, Scale Up or Overclock. Hyperscalers are permanent and survive Purge and Reboot; the boost they have built resets with it.`,icon:`☁`,name:`Hyperscaler`,value:`${e} owned · +${ge(o(t))} each`,children:he({ariaLabel:`Buy hyperscaler for ${B(p)} Kernels`,cost:p,disabled:!Wn(n),onClick:r.buyHyperscaler,progressLabel:`Hyperscaler Kernel progress`})}),(0,Z.jsx)(AE,{ariaLabel:`hyperscaler efficiency upgrade`,details:`Each level adds ${ge(St)} per second to every hyperscaler. Level ${t} of ${wt.hyperscalerEfficiency.maxLevel}.`,icon:`⚙`,name:`Hyperscaler efficiency`,value:i?`Level ${t} (max)`:`+${ge(o(t))} → +${ge(o(t+1))} each`,children:i?(0,Z.jsx)(_E,{icon:`⚙`,name:`Hyperscaler efficiency`}):he({ariaLabel:`Buy hyperscaler efficiency for ${B(s)} Kernels`,cost:s,disabled:!Yn(n,`hyperscalerEfficiency`),onClick:()=>r.buyEonUpgrade(`hyperscalerEfficiency`),progressLabel:`Hyperscaler efficiency Kernel progress`})}),(0,Z.jsx)(AE,{ariaLabel:`kernel amplifier upgrade`,details:`Each level multiplies the Kernels a Reboot awards by 10. Level ${c} of ${wt.eonAmplifier.maxLevel}.`,icon:`🔆`,name:`Kernel amplifier`,value:l?`${B(Hn(n))} Kernels per Reboot (max)`:`${B(Hn(n))} → ${B(Hn({...n,eonsUpgrades:{...n.eonsUpgrades,eonAmplifierLevel:c+1}}))} Kernels per Reboot`,children:l?(0,Z.jsx)(_E,{icon:`🔆`,name:`Kernel amplifier`}):he({ariaLabel:`Buy kernel amplifier for ${B(u)} Kernels`,cost:u,disabled:!Yn(n,`eonAmplifier`),onClick:()=>r.buyEonUpgrade(`eonAmplifier`),progressLabel:`Kernel amplifier Kernel progress`})}),(0,Z.jsx)(AE,{ariaLabel:`auto hyperscaler upgrade`,details:`Buys a hyperscaler automatically whenever you can afford one. Pause it to save Kernels for other upgrades. One-time purchase, permanent.`,icon:`🤖`,name:`Auto Hyperscaler`,value:d?null:`Buys hyperscalers for you`,children:d?(0,Z.jsx)(hw,{$on:f,"aria-label":`Auto Hyperscaler`,"aria-pressed":f,onClick:()=>r.setAutoHyperscalerEnabled(!f),title:`${f?`Pause`:`Resume`} Auto Hyperscaler`}):he({ariaLabel:`Unlock Auto Hyperscaler for 100 Kernels`,cost:100,disabled:!Zn(n),onClick:r.buyAutoHyperscaler,progressLabel:`Auto Hyperscaler Kernel progress`})})]})})})(),(0,Z.jsx)(_x,{def:p?N.find(e=>e.id===p):null,onCancel:()=>m(null),onConfirm:()=>{r.enterChallenge(p),m(null)},state:n})]})},NE=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),PE=new Set([`Tens`,`Thousands`,`Millions`,`Billions`,`Trillions`,`Quadrillions`,`Pentillions`,`Hexillions`,`Septillions`,`Octillions`,`Nonillions`,`Decillions`]),FE=[`resources`,`owned`,`purchased`,`purchaseLevels`,`purchaseLevelProgress`,`autobuyers`,`autobuyersEnabled`,`tickspeedLevels`,`autobuyerAttemptBudgets`,`tierProductionAccumulators`,`smartAutobuyer`,`tierTickspeedAutobuyer`,`tierTickspeedAutobuyerEnabled`,`everUnlockedTierIds`],IE=e=>e&&NE(e)&&Object.keys(e).some(e=>PE.has(e)),LE=e=>{if(!e||!NE(e)||e.saveSchemaVersion===3)return null;if(e.resources?.Ones!==void 0)return`legacy_money_id`;let t=e.intro;if(t===void 0){if(FE.some(t=>{let n=e[t];return n&&NE(n)&&Object.keys(n).length>0}))return`missing_intro`}else{if(t.completed!==void 0&&t.mainGameUnlocked===void 0)return`legacy_intro_gate`;if(t.storageBanks!==void 0||t.storageBanksBuiltTotal!==void 0||t.storageAutoRedeemedSizes!==void 0)return`legacy_storage_fields`}return e.prestige?.pp!==void 0&&e.prestige?.xp===void 0?`legacy_prestige_xp`:e.prestige?.level!==void 0&&e.prestige?.count===void 0?`legacy_prestige_count`:e.autobuyers&&Object.values(e.autobuyers).some(e=>e===!0||e===!1)?`legacy_boolean_autobuyers`:e.autoPrestige===!0||e.autoPrestige===!1?`legacy_boolean_auto_prestige`:FE.some(t=>IE(e[t]))?`legacy_tier_ids`:null},RE=[[`reboot`,`purge`],[`prestige`,`purge`],[`autoReboot`,`autoPurge`],[`autoPrestige`,`autoPurge`],[`autoRebootEnabled`,`autoPurgeEnabled`],[`autoPrestigeEnabled`,`autoPurgeEnabled`],[`autoRebootAttemptBudget`,`autoPurgeAttemptBudget`],[`autoPrestigeAttemptBudget`,`autoPurgeAttemptBudget`]],zE=[[`latency`,`speedUp`],[`reboot`,`purge`],[`prestige`,`purge`]],BE=[[`rebootNumber`,`purgeNumber`],[`prestigeNumber`,`purgeNumber`]],VE=(e,t)=>{if(!e||typeof e!=`object`)return e;let n={...e};for(let[e,r]of t)e in n&&(r in n||(n[r]=n[e]),delete n[e]);return n},HE=e=>{let t=VE(e,RE);return t.automationIntervalLevels&&=VE(t.automationIntervalLevels,zE),t.automationAttemptBudgets&&=VE(t.automationAttemptBudgets,zE),Array.isArray(t.prestigeMuseum?.history)&&(t.prestigeMuseum={...t.prestigeMuseum,history:t.prestigeMuseum.history.map(e=>VE(e,BE))}),t},UE=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),WE=e=>{let{saveSchemaVersion:t,...n}=e;return n},GE=e=>{if(!UE(e))return{ok:!1,reason:`invalid_payload`};if(e.saveSchemaVersion===3)return{ok:!0,payload:WE(e)};if(e.saveSchemaVersion===1||e.saveSchemaVersion===2)return{ok:!0,payload:HE(WE(e))};let t=LE(e);return t?{ok:!1,reason:t}:{ok:!0,payload:HE(e)}},KE=e=>!!e&&Object.prototype.toString.call(e)===`[object Object]`&&(Object.getPrototypeOf(e)===null||Object.getPrototypeOf(e)===Object.prototype),qE=e=>JSON.parse(e,(e,t)=>{if(e!==`__proto__`&&e!==`constructor`&&e!==`prototype`)return t}),JE=()=>!0,YE=(e,t=JE())=>{if(!t)return GE(e);if(!e||typeof e!=`object`||Array.isArray(e))return{ok:!1,reason:`invalid_payload`};let{saveSchemaVersion:n,...r}=e;return{ok:!0,payload:HE(r)}},XE=`tens_game_state`,ZE=`tens_last_save_timestamp`,QE=`tens_saves_meta`,$E=`tens_dev_mode_active`,eD=`dev`,tD=`tens_dev_state`,nD=`tens_dev_timestamp`,rD=`TENS-SUPPORT`,iD=e=>e===eD?tD:e===`0`?XE:`tens_slot_${e}_state`,aD=e=>e===eD?nD:e===`0`?ZE:`tens_slot_${e}_timestamp`,oD=e=>`Save ${e+1}`,sD=()=>({activeSlotId:`0`,unlockedSlotCount:1,supporterUnlocked:!1,supporterSource:null,slots:[{id:`0`,name:oD(0)}]}),cD=e=>String(e??``).trim().toUpperCase().replace(/[\s_]+/g,`-`).replace(/-+/g,`-`),lD=()=>{try{let e=localStorage.getItem(QE);return e?qE(e):null}catch{return null}},uD=e=>{try{localStorage.setItem(QE,JSON.stringify(e))}catch{}},dD=e=>{let t=e.supporterUnlocked?3:1,n=[],r=new Map;if(e.slots)for(let t of e.slots)r.set(t.id,t);for(let e=0;e<t;e+=1){let t=String(e);n.push(r.get(t)??{id:t,name:oD(e)})}let i=n.some(t=>t.id===e.activeSlotId)?e.activeSlotId:`0`;return{...e,unlockedSlotCount:t,activeSlotId:i,slots:n,supporterUnlocked:!!e.supporterUnlocked,supporterSource:e.supporterSource??null}},fD=e=>{let t=sD();if(!KE(e))return t;let n=!!e.supporterUnlocked,r=new Map;if(Array.isArray(e.slots))for(let t of e.slots){if(!KE(t))continue;let e=String(t.id??``);if(!/^\d+$/.test(e))continue;let n=Number(e);n<0||n>=3||r.set(e,{id:e,name:typeof t.name==`string`&&t.name.trim()?t.name.trim():oD(n)})}return dD({...t,supporterUnlocked:n,supporterSource:e.supporterSource===`code`||e.supporterSource===`dummy_purchase`?e.supporterSource:n?`code`:null,activeSlotId:String(e.activeSlotId??`0`),slots:Array.from(r.values())})},pD=()=>{let e=fD(lD());return uD(e),e},mD=()=>{try{return localStorage.getItem($E)===`1`}catch{return!1}},hD=e=>{try{e?localStorage.setItem($E,`1`):localStorage.removeItem($E)}catch{}},gD=()=>mD()?eD:pD().activeSlotId,_D=(e=`code`)=>{let t=pD();if(t.supporterUnlocked)return{ok:!0,already:!0,meta:t};let n=dD({...t,supporterUnlocked:!0,supporterSource:e===`dummy_purchase`?`dummy_purchase`:`code`});return uD(n),{ok:!0,meta:n}},vD=e=>{try{return localStorage.getItem(iD(e))!=null}catch{return!1}},yD=()=>{let e=pD(),t=[],n=new Map;for(let t of e.slots)n.set(t.id,t);for(let r=0;r<3;r+=1){let i=String(r),a=r<e.unlockedSlotCount,o=n.get(i);t.push({id:i,name:o?.name??oD(r),unlocked:a,isActive:e.activeSlotId===i,isEmpty:!a||!vD(i)})}return t},bD=e=>{if(mD())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=pD(),r=Number(t);if(!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount)return{ok:!1,reason:`locked`};if(n.activeSlotId===t)return{ok:!0,already:!0,meta:n};let i={...n,activeSlotId:t};return uD(i),{ok:!0,meta:i}},xD=(e,t)=>{let n=String(e),r=pD(),i=String(t??``).trim();if(!i)return{ok:!1,reason:`empty`};let a=r.slots.findIndex(e=>e.id===n);if(a<0)return{ok:!1,reason:`missing`};let o=r.slots.map((e,t)=>t===a?{...e,name:i.slice(0,40)}:e),s={...r,slots:o};return uD(s),{ok:!0,meta:s}},SD=e=>cD(e)===`TENS-SUPPORT`?_D(`code`):{ok:!1,reason:`invalid`},CD=()=>_D(`dummy_purchase`),wD=()=>{let e=pD();return e.slots.find(t=>t.id===e.activeSlotId)?.name??oD(0)},TD=()=>{let e=pD(),t=wD(),n=[];return e.unlockedSlotCount>1&&n.push(`other save slots`),e.supporterUnlocked&&n.push(`your Supporter unlock`),`Erase "${t}" (active save) and start over from the Byte Foundry?${n.length?`\n\nKept: ${n.join(` and `)}.`:``}\n\nThis cannot be undone.`},ED=()=>`Reformat Byte Foundry on "${wD()}"?\n\nUse this if Capacity (or Storage / Compute) went too far.\n\nErased: Data Stream Buffer, Data Stream Capacity (and pool staging), Data Stream upgrade progress, all Disks/Storage, and all Compute. Multipliers restart from scratch.\n\nConvenience: Compile, Upgrade Data Stream, and Provision Disk all auto-press again up to your pre-reset highs as soon as each is affordable — you do not need to click them. Capacity remains on its doubling ladder up to the active pool ceiling.\n\nAlso kept: Byte Factory, Purge Points, Purge count and upgrades, and (if already unlocked) access to the main game this cycle.\n\nOther save slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,DD=e=>`Clear "${e?.name??`this save`}"${e?.isActive?` (currently active — you will restart at the Byte Foundry)`:``}?\n\nOther slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`,OD=()=>`Erase ALL save progress on this device?\n\n${pD().supporterUnlocked?`Your Supporter unlock and slot names stay.`:`Slot names stay.`}\n\nThis cannot be undone.`,kD=e=>{try{localStorage.removeItem(iD(e)),localStorage.removeItem(aD(e))}catch{}},AD=e=>{if(mD())return{ok:!1,reason:`dev_mode_active`};let t=String(e),n=pD(),r=Number(t);return!Number.isInteger(r)||r<0||r>=n.unlockedSlotCount?{ok:!1,reason:`locked`}:(kD(t),{ok:!0,clearedActive:n.activeSlotId===t,meta:n})},jD=()=>{if(mD())return{ok:!1,reason:`dev_mode_active`};for(let e=0;e<3;e+=1)kD(String(e));return{ok:!0,meta:pD()}},MD=e=>{try{let t=gD(),n=(e??localStorage).getItem(iD(t));return n?qE(n):null}catch{return null}},ND=()=>{let e=gD(),t=MD();if(!t)return null;let n=YE(t);return n.ok?null:(kD(e),JE()?null:n.reason)},PD=(e,t)=>({...e,...t??{}}),FD=e=>KE(e)&&!(`depositedUnits`in e)&&(`deposits`in e||`transfers`in e),ID=e=>FD(e)&&Array.isArray(e.transfers)?e.transfers.length:0,LD=e=>{let t=e.deposits??{},n=ze.reduce((e,n)=>e+(Number(t[n])||0)*n,0),r=Math.max(0,Number(e.purchased)||0)+ID(e);return{depositedUnits:n,fillBits:0,purchased:r,boostersUnlocked:n>0||r>0,autoConvertActive:!1,capacityLevel:Math.max(0,Number(e.capacityLevel)||0)}},RD=(e,t)=>{let n=jt(),r={};for(let e of Object.keys(n)){let i=t?.[e];if(FD(i)){n[e]={...n[e],...LD(i)};let t=ID(i);t>0&&(r[e]=t)}else n[e]={...n[e],...i??{}}}return{dataLakes:n,pendingComputeGrants:r}},zD=(e,t)=>{let n=Object.keys(t);if(n.length===0)return e;let r={...e};for(let e of n){let n=Number(e),i=Re[n-1];if(!i)continue;let a=t[e];r[i]=(r[i]??0)+a,n===1&&(r.computeCoresEverEarned=(r.computeCoresEverEarned??0)+a,r.computeMergePageUnlocked=(r.computeMergePageUnlocked??!1)||r.computeCoresEverEarned>=8)}return r},BD=(e,t)=>{let n={...e,...t??{}};return Ct.forEach(e=>{let t=Number(n[e.levelField]),r=Number.isFinite(t)?Math.max(0,Math.floor(t)):0;n[e.levelField]=e.maxLevel==null?r:Math.min(r,e.maxLevel)}),n},VD=e=>{let t=e,n=Mt(),{lastTierTickspeedXpUnlocked:r,lastTierLevelCreditAccumulator:i,autobuyerBulkLevels:a,autoPrestigeAutobuyer:o,autoPrestigeAutobuyerEnabled:s,speedUpCount:c,autoSpeedUp:l,autoSpeedUpEnabled:u,...d}=t,{dataLakes:f,pendingComputeGrants:p}=RD(n.intro.dataLakes,t.intro?.dataLakes),{tickSpeedSeconds:m,productionMultiplier:h,productionAccumulator:g,productionMilestoneTier:_,productionMilestoneTierClaims:v,computeFundedBandwidthClaims:y,computeBandwidthSacrificeIndex:b,computeMergeDurationUpgrades:x,...S}=t.intro??{};return pi(nn(so(nr({...n,...d,accelerateBoughtThisCycle:typeof t.accelerateBoughtThisCycle==`boolean`?t.accelerateBoughtThisCycle:t.globalTickspeedMultiplier!=null||t.overclockLastClaimCompletedLevels!=null||(t.overclockCount??0)>0||(t.scaleUpCount??0)>0,manualPurchaseThisCycle:typeof t.manualPurchaseThisCycle==`boolean`?t.manualPurchaseThisCycle:Object.values(t.purchased??{}).some(e=>e>0)||t.globalTickspeedMultiplier!=null||t.overclockLastClaimCompletedLevels!=null||(t.overclockCount??0)>0||(t.scaleUpCount??c??0)>0,scaleUpCount:t.scaleUpCount??c??n.scaleUpCount,scaleUpTierCounts:PD(n.scaleUpTierCounts,t.scaleUpTierCounts??Object.fromEntries(Object.keys(n.scaleUpTierCounts).map(e=>[e,t.scaleUpCount??c??0]))),prestigeSpeedBonusUnlocked:t.prestigeSpeedBonusUnlocked===!0,buyMaxUnlocked:t.buyMaxUnlocked===!0,autoScaleUp:t.autoScaleUp??l??n.autoScaleUp,autoScaleUpEnabled:t.autoScaleUpEnabled??u??n.autoScaleUpEnabled,resources:PD(n.resources,(({bytes:e,...t})=>t)(t.resources??{})),owned:PD(n.owned,t.owned),purchased:PD(n.purchased,t.purchased),purchaseLevels:PD(n.purchaseLevels,t.purchaseLevels),purchaseLevelProgress:PD(n.purchaseLevelProgress,t.purchaseLevelProgress),autobuyers:PD(n.autobuyers,t.autobuyers),autobuyersEnabled:PD(n.autobuyersEnabled,t.autobuyersEnabled),tickspeedLevels:PD(n.tickspeedLevels,t.tickspeedLevels),autobuyerAttemptBudgets:PD(n.autobuyerAttemptBudgets,t.autobuyerAttemptBudgets),tierProductionAccumulators:PD(n.tierProductionAccumulators,t.tierProductionAccumulators),autobuyerIntervalLevels:PD(n.autobuyerIntervalLevels,t.autobuyerIntervalLevels),automationIntervalLevels:{...n.automationIntervalLevels,...t.automationIntervalLevels??{}},tierTickspeedIntervalLevels:PD(n.tierTickspeedIntervalLevels,t.tierTickspeedIntervalLevels),automationAttemptBudgets:{...n.automationAttemptBudgets,...t.automationAttemptBudgets??{}},tierTickspeedAttemptBudgets:PD(n.tierTickspeedAttemptBudgets,t.tierTickspeedAttemptBudgets),autoOverclock:t.autoOverclock??n.autoOverclock,autoOverclockEnabled:t.autoOverclockEnabled??n.autoOverclockEnabled,computeAutoChargeEnabled:t.computeAutoChargeEnabled??n.computeAutoChargeEnabled,tierTickspeedAutobuyer:PD(n.tierTickspeedAutobuyer,t.tierTickspeedAutobuyer),tierTickspeedAutobuyerEnabled:PD(n.tierTickspeedAutobuyerEnabled,t.tierTickspeedAutobuyerEnabled),everUnlockedTierIds:PD(n.everUnlockedTierIds,t.everUnlockedTierIds),purge:{...n.purge,...t.purge??{},unboundedUnlocked:!!t.purge?.unboundedUnlocked},challenges:{...n.challenges,...t.challenges??{},completed:{...t.challenges?.completed??{}},run:{...n.challenges.run,...t.challenges?.run??{}},bestSeconds:{...t.challenges?.bestSeconds??{}}},achievements:{earned:{...t.achievements?.earned??{}},counters:{...n.achievements.counters,...t.achievements?.counters??{},...t.eons?.balance>(t.achievements?.counters?.kernelsEarned??0)?{kernelsEarned:t.eons.balance}:{}}},daily:{runs:{...t.daily?.runs??{}},results:{...t.daily?.results??{}}},era:{...n.era,...t.era??{}},eons:{...n.eons,...t.eons??{}},hyperscalerCount:t.hyperscalerCount??n.hyperscalerCount,eonsUpgrades:BD(n.eonsUpgrades,t.eonsUpgrades),autoPurgeSettings:{...n.autoPurgeSettings,...t.autoPurgeSettings??{}},computeFlopsAutobuyers:PD(n.computeFlopsAutobuyers,t.computeFlopsAutobuyers),computeFlopsAutobuyersEnabled:PD(n.computeFlopsAutobuyersEnabled,t.computeFlopsAutobuyersEnabled),computeFlopsAutobuyerAttemptBudgets:PD(n.computeFlopsAutobuyerAttemptBudgets,t.computeFlopsAutobuyerAttemptBudgets),prestigeMuseum:{history:Array.isArray(t.prestigeMuseum?.history)?t.prestigeMuseum.history:n.prestigeMuseum.history,pinnedIds:Array.isArray(t.prestigeMuseum?.pinnedIds)?t.prestigeMuseum.pinnedIds:n.prestigeMuseum.pinnedIds},intro:zD({...n.intro,...S,dataLakes:f},p),computeFlops:{pageUnlocked:!!t.computeFlops?.pageUnlocked||Math.max(0,Number(t.purge?.points)||0)>=100,owned:{...n.computeFlops.owned,...t.computeFlops?.owned??{}},cumulativeBoost:{...n.computeFlops.cumulativeBoost,...t.computeFlops?.cumulativeBoost??{}}}}))))},HD=e=>{let t=gD();try{localStorage.setItem(iD(t),JSON.stringify({saveSchemaVersion:3,...e})),localStorage.setItem(aD(t),String(Date.now()))}catch{}},UD=e=>{try{let t=MD(e);if(!t)return null;let n=YE(t);return n.ok?VD(n.payload):null}catch{return null}},WD=()=>{let e=gD();try{let t=localStorage.getItem(aD(e));if(!t)return null;let n=Number(t);return Number.isFinite(n)?n:null}catch{return null}},GD=()=>{mD()?KD():AD(gD())},KD=()=>(kD(eD),{ok:!0}),qD=(e,t)=>Object.keys(t).reduce((n,r)=>{if(r===`__proto__`||r===`constructor`||r===`prototype`)return n;let i=t[r],a=e[r];return n[r]=KE(i)&&KE(a)?qD(a,i):i,n},{...e}),JD=(e,t)=>{if(!mD())return{ok:!1,reason:`dev_mode_inactive`};let n;try{n=qE(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!KE(n))return{ok:!1,reason:`invalid_json`};let r={saveSchemaVersion:3,...KE(t)?qD(t,n):n};try{localStorage.setItem(tD,JSON.stringify(r))}catch{return{ok:!1,reason:`storage_error`}}let i=UD();return i?{ok:!0,state:i}:{ok:!1,reason:`invalid_state`}},YD=e=>JSON.stringify({saveSchemaVersion:3,...e}),XD=e=>{if(!Object.keys(e).some(e=>Object.hasOwn(Mt(),e))||e.resources!==void 0&&!KE(e.resources))return!1;let t=e.resources?.base;return t===void 0||Number.isFinite(t)},ZD=e=>{let t;try{t=qE(e)}catch{return{ok:!1,reason:`invalid_json`}}if(!KE(t))return{ok:!1,reason:`invalid_json`};let n=YE(t);if(!n.ok)return{ok:!1,reason:`incompatible_save`};if(!JE()&&!XD(n.payload))return{ok:!1,reason:`invalid_state`};let r=VD(n.payload);return HD(r),{ok:!0,state:r}},QD=`tens_buy_max_mode`,$D=()=>{try{return localStorage.getItem(QD)===`true`}catch{return!1}},eO=e=>{try{localStorage.setItem(QD,e?`true`:`false`)}catch{}},tO=`tens_buy_unit_mode`,nO=()=>{try{return localStorage.getItem(tO)===`true`}catch{return!1}},rO=e=>{try{localStorage.setItem(tO,e?`true`:`false`)}catch{}},iO=`tens_theme_preference`,aO=()=>{try{let e=localStorage.getItem(iO);return e===`dark`||e===`light`||e===`system`?e:`system`}catch{return`system`}},oO=e=>{try{(e===`dark`||e===`light`||e===`system`)&&localStorage.setItem(iO,e)}catch{}},sO;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(sO||={});var cO=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},lO=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,uO=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?lO(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new cO(`"${e}" plugin is not implemented on ${c}`,sO.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new cO(`"${e}.${t}()" is not implemented on ${c}`,sO.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t).then(e=>e),r=async()=>{let t=await n;await g({eventName:e,callbackId:t})},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=cO,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},dO=(e=>e.Capacitor=uO(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),fO=dO.registerPlugin,pO=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new dO.Exception(e,sO.Unimplemented)}unavailable(e=`not available`){return new dO.Exception(e,sO.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},mO=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),hO=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),gO=class extends pO{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=hO(n).trim(),r=hO(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=mO(e.key),n=mO(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};fO(`CapacitorCookies`,{web:()=>new gO});var _O=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),vO=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},yO=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,bO=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=vO(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},xO=class extends pO{async request(e){let t=bO(e,e.webFetchExtra),n=yO(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await _O(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};fO(`CapacitorHttp`,{web:()=>new xO});var SO;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(SO||={});var CO;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(CO||={});var wO=class extends pO{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};fO(`SystemBars`,{web:()=>new wO});var TO=`https://mohanpednekar.github.io/tens/`,EO=`${TO}privacy.html`,DO=`${TO}terms.html`,OO=X(Jh)`
  gap: 0.5rem;

  h2 {
    font-size: ${e=>e.theme.type.scale.md.size};
    margin: 0;
  }

  p {
    color: ${e=>e.theme.color.textMuted};
    margin: 0;
  }
`,kO=X.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
`,AO=X.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 100%;
`,jO=X.input`
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
`,MO=X.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.8rem;
  margin: 0;
`,NO=X.textarea`
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
`,PO={invalid_json:`That is not valid save JSON.`,incompatible_save:`That save is from an incompatible version.`,invalid_state:`That save could not be loaded.`},FO=({game:e})=>{let[t,n]=(0,v.useState)(``),[r,i]=(0,v.useState)(null),a=(0,v.useRef)(null),o=async()=>{let t=e.exportSaveJson();n(t);try{await navigator.clipboard.writeText(t),i({text:`Save copied to clipboard (also shown below).`})}catch{i({text:`Save shown below — copy it manually.`})}},s=()=>{let t=URL.createObjectURL(new Blob([e.exportSaveJson()],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`tens-save.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)},c=t=>{if(!t.trim())return i({error:!0,text:`Paste a save or choose a file first.`});if(!window.confirm(`Replace the active save slot with this save? Current progress in the slot is lost.`))return;let r=e.applyCloudSave(t);i(r.ok?{text:`Save imported.`}:{error:!0,text:PO[r.reason]??`Import failed.`}),r.ok&&n(``)};return(0,Z.jsxs)(OO,{"aria-label":`manual save section`,children:[(0,Z.jsx)(`h2`,{children:`Backup / Restore`}),(0,Z.jsx)(NO,{"aria-label":`save JSON`,onChange:e=>n(e.target.value),placeholder:`Paste save JSON here to import`,value:t}),(0,Z.jsxs)(kO,{children:[(0,Z.jsx)(Q,{onClick:o,type:`button`,children:(0,Z.jsx)($,{children:`Copy save`})}),(0,Z.jsx)(Q,{onClick:s,type:`button`,children:(0,Z.jsx)($,{children:`Download file`})}),(0,Z.jsx)(Q,{onClick:()=>a.current?.click(),type:`button`,children:(0,Z.jsx)($,{children:`Choose file…`})}),(0,Z.jsx)(Q,{onClick:()=>c(t),type:`button`,children:(0,Z.jsx)($,{children:`Import`})}),(0,Z.jsx)(`input`,{accept:`application/json,.json`,"aria-label":`save file`,hidden:!0,onChange:async e=>{let t=e.target.files?.[0];e.target.value=``,t&&n(await t.text())},ref:a,type:`file`})]}),r&&(0,Z.jsx)(MO,{$error:r.error,children:r.text})]})},IO=X.div`
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
`,LO=()=>(0,Z.jsxs)(OO,{"aria-label":`legal section`,children:[(0,Z.jsx)(`h2`,{children:`Legal`}),(0,Z.jsxs)(IO,{children:[(0,Z.jsx)(`a`,{href:EO,rel:`noopener noreferrer`,target:`_blank`,children:`Privacy Policy`}),(0,Z.jsx)(`a`,{href:DO,rel:`noopener noreferrer`,target:`_blank`,children:`Terms of Use`})]})]}),RO={removeAds:`Ads removed — rewards are now granted instantly. Thank you!`,supportTip:`Thank you for supporting Tens!`},zO=({service:e=vy()})=>{let[t,n]=(0,v.useState)({removeAds:!1}),[r,i]=(0,v.useState)(!1),[a,o]=(0,v.useState)(null);if((0,v.useEffect)(()=>{if(!e.iapAvailable)return;let t=!0;return e.getEntitlements().then(e=>{t&&n(e)}),()=>{t=!1}},[e]),!e.iapAvailable)return null;let s=async(e,t)=>{i(!0),o(null);let r=await e();i(!1),r.entitlements&&n(r.entitlements),r.ok?o({error:!1,text:t}):r.cancelled||o({error:!0,text:`The store could not complete that. Please try again.`})};return(0,Z.jsxs)(OO,{"aria-label":`store section`,children:[(0,Z.jsx)(`h2`,{children:`Store`}),(0,Z.jsx)(`p`,{children:`Optional extras. Every part of the game stays free to play.`}),(0,Z.jsxs)(kO,{children:[(0,Z.jsx)(Q,{"aria-label":`buy remove ads`,disabled:r||t.removeAds,onClick:()=>s(()=>e.purchase(`removeAds`),RO.removeAds),type:`button`,variant:`primary`,children:(0,Z.jsx)($,{children:t.removeAds?`Ads removed`:`Remove ads`})}),(0,Z.jsx)(Q,{"aria-label":`buy support tip`,disabled:r,onClick:()=>s(()=>e.purchase(`supportTip`),RO.supportTip),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Leave a tip`})}),(0,Z.jsx)(Q,{"aria-label":`restore purchases`,disabled:r,onClick:()=>s(()=>e.restore(),`Purchases restored.`),type:`button`,variant:`ghost`,children:(0,Z.jsx)($,{children:`Restore purchases`})})]}),a&&(0,Z.jsx)(MO,{$error:a.error,children:a.text})]})},BO=X.main`
  width: min(520px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,VO=X.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,HO=X(kO)`
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  padding: 0.55rem 0.65rem;
  background: ${e=>e.$active?e.theme.color.surfaceSunken:`transparent`};
`,UO=X.div`
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
`,WO=X.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
  margin: 0;
  padding: 0;
`,GO=X.li`
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
`,KO=X.svg`
  display: block;
  height: 64px;
  width: 100%;
`,qO=X.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  margin: 0;
`,JO=X.div`
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;

  & > button {
    font-size: 0.78rem;
    min-height: 1.9rem;
    padding: 0.2em 0.6em;
  }
`,YO=(e,t)=>{if(!e.length)return``;let n=e.map(e=>Math.max(0,Number(e[t])||0)),r=Math.max(...n,1),i=Math.min(...n,0),a=Math.max(r-i,1);return n.map((e,t)=>{let r=n.length===1?0:t/(n.length-1)*100,o=40-(e-i)/a*40;return`${t===0?`M`:`L`}${r.toFixed(2)} ${o.toFixed(2)}`}).join(` `)},XO=X.h2`
  color: ${e=>e.$danger?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0.9rem 0.2rem 0.35rem;
  text-transform: uppercase;
`,ZO=X.div`
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.lg};
  overflow: hidden;
`,QO=({label:e,danger:t=!1,children:n})=>(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(XO,{$danger:t,children:e}),(0,Z.jsx)(ZO,{children:n})]}),$O=X.div`
  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,ek=wh`
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
`,tk=X.button`
  ${ek}
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: -2px;
  }
`,nk=X.div`
  ${ek}
`,rk=X.span`
  align-items: center;
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: ${e=>e.theme.radius.sm};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 0.9rem;
  height: 1.65rem;
  justify-content: center;
  width: 1.65rem;
`,ik=X.span`
  flex: 1 1 auto;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,ak=X.span`
  color: ${e=>e.theme.color.textMuted};
  flex-shrink: 0;
  font-size: 0.85rem;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,ok=X.span`
  color: ${e=>e.theme.color.textFaint};
  flex-shrink: 0;
  transform: rotate(${e=>e.$open?`90deg`:`0deg`});
  transition: transform 120ms ease;
`,sk=X.div`
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
`,ck=({icon:e,label:t,value:n,danger:r=!1,inline:i,children:a})=>{let[o,s]=(0,v.useState)(!1);return i?(0,Z.jsx)($O,{children:(0,Z.jsxs)(nk,{$danger:r,children:[(0,Z.jsx)(rk,{"aria-hidden":`true`,children:e}),(0,Z.jsx)(ik,{children:t}),i]})}):(0,Z.jsxs)($O,{children:[(0,Z.jsxs)(tk,{$danger:r,"aria-expanded":o,"aria-label":`${t} settings`,onClick:()=>s(e=>!e),type:`button`,children:[(0,Z.jsx)(rk,{"aria-hidden":`true`,children:e}),(0,Z.jsx)(ik,{children:t}),n!=null&&n!==``&&(0,Z.jsx)(ak,{children:n}),(0,Z.jsx)(ok,{$open:o,"aria-hidden":`true`,children:`›`})]}),o&&(0,Z.jsx)(sk,{children:a})]})},lk=({game:e,onReset:t,onResetByteFoundry:n,themePreference:r=`system`,onThemePreferenceChange:i})=>{let a=bi(e.state),o=!!e.devModeActive,s=!!e.savesMeta?.supporterUnlocked,[c,l]=(0,v.useState)(``),[u,d]=(0,v.useState)(null),[f,p]=(0,v.useState)(!1),m=e.state.era?.count??0,h=e.state.eons?.balance??0,g=Vn(e.state),_=Hn(e.state),y=e.state.purge?.points??0,b=e=>e===1?`Kernel`:`Kernels`,x=mr(e.state,{kind:`rebootReached`}),S=mr(e.state,{kind:`googolReached`}),C=mr(e.state,{kind:`storageUnlocked`}),w=e.state.prestigeMuseum??{history:[],pinnedIds:[]},T=new Set(w.pinnedIds??[]),E=w.history??[],D=E.filter(e=>T.has(e.id)),O=s?E:E.slice(0,1),k=t=>{t.preventDefault();let n=e.redeemUnlockCode(c);n.ok?(l(``),d({error:!1,text:n.already?`Supporter pack already unlocked.`:`Supporter pack unlocked.`})):d({error:!0,text:`That code is not valid.`})},A=()=>{let t=e.purchaseSupporterDummy();d({error:!1,text:t.already?`Supporter pack already unlocked.`:`Dummy checkout complete — Supporter pack unlocked (no real charge).`})},ee=t=>{let n=window.prompt(`Rename save slot`,t.name);n!=null&&e.renameSaveSlot(t.id,n)},j=t=>{o||a&&t.isActive||window.confirm(DD(t))&&e.clearSlot(t.id)},te=()=>{a||o||window.confirm(OD())&&e.eraseAllSaveProgress()},M=()=>{Vn(e.state)&&(e.actions.eraAscend(),p(!1))},N=!!vy().iapAvailable,ne=YO(e.opsSamples??[],`money`),P=YO(e.opsSamples??[],`prestigePoints`);return(0,Z.jsxs)(BO,{children:[(0,Z.jsx)(VO,{children:(0,Z.jsx)(`h1`,{children:`Settings`})}),(0,Z.jsxs)(QO,{label:`Game`,children:[(0,Z.jsx)(ck,{icon:`💛`,label:`Supporter`,value:s?`Unlocked`:`Free`,children:(0,Z.jsxs)(OO,{"aria-label":`supporter pack section`,children:[(0,Z.jsx)(`h2`,{children:`Supporter pack`}),(0,Z.jsx)(`p`,{children:`Optional meta extras only — extra save slots, System log pins, and the Task Manager. Never changes Bits, PP, Disks, Compute, or unlock order. Real payment comes later; for now use a code or the dummy checkout.`}),s?(0,Z.jsxs)(MO,{children:[`Unlocked`,e.savesMeta?.supporterSource===`dummy_purchase`?` (dummy checkout)`:` (unlock code)`,`.`,` `,3,` save slots · System log · Task Manager.`]}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(qO,{children:[`Free: `,1,` save slot. Unlock code (placeholder): `,(0,Z.jsx)(`code`,{children:rD})]}),(0,Z.jsxs)(AO,{onSubmit:k,children:[(0,Z.jsx)(jO,{"aria-label":`supporter unlock code`,autoComplete:`off`,onChange:e=>l(e.target.value),placeholder:`Enter unlock code`,value:c}),(0,Z.jsx)(Q,{"aria-label":`redeem supporter unlock code`,type:`submit`,variant:`primary`,children:(0,Z.jsx)($,{children:`Redeem code`})})]}),(0,Z.jsx)(Q,{"aria-label":`dummy supporter checkout`,onClick:A,type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Dummy checkout (free)`})})]}),u&&(0,Z.jsx)(MO,{$error:u.error,children:u.text})]})}),(0,Z.jsx)(ck,{icon:`💾`,label:`Save slots`,value:e.saveSlots?.find(e=>e.isActive)?.name,children:(0,Z.jsxs)(OO,{"aria-label":`save slots section`,children:[(0,Z.jsx)(`h2`,{children:`Save slots`}),(0,Z.jsx)(`p`,{children:`Independent runs on this device. Switching saves the current slot first. Reset / Clear wipe progress only — your Supporter unlock is never removed here.`}),o&&(0,Z.jsx)(qO,{children:`Dev Mode is active — Play/Clear are disabled here so a dev-only session can't touch a real save. Disable Dev Mode first.`}),(e.saveSlots??[]).map(t=>(0,Z.jsxs)(HO,{$active:t.isActive,children:[(0,Z.jsxs)(UO,{children:[(0,Z.jsxs)(`strong`,{children:[t.name,t.isActive?` · active`:``]}),(0,Z.jsx)(`span`,{children:t.unlocked?t.isEmpty?`Empty (starts at Byte Foundry)`:`Has saved progress`:`Locked — unlock Supporter pack`})]}),t.unlocked&&(0,Z.jsxs)(kO,{children:[!t.isActive&&(0,Z.jsx)(Q,{"aria-label":`switch to ${t.name}`,disabled:o,onClick:()=>e.switchSaveSlot(t.id),title:o?`Disable Dev Mode first`:void 0,type:`button`,variant:`primary`,children:(0,Z.jsx)($,{children:`Play`})}),(0,Z.jsx)(Q,{"aria-label":`rename ${t.name}`,onClick:()=>ee(t),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Rename`})}),(0,Z.jsx)(Q,{"aria-label":`clear ${t.name}`,disabled:o||a&&t.isActive,onClick:()=>j(t),title:o?`Disable Dev Mode first`:a&&t.isActive?`Purge first — production is frozen at 1 Googol Bytes`:`Erase this slot only (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`Clear…`})})]})]},t.id))]})}),x&&(0,Z.jsx)(ck,{icon:`⏻`,label:`Reboot`,value:`${h} ${b(h)}`,children:(0,Z.jsxs)(OO,{"aria-label":`reboot section`,children:[(0,Z.jsx)(`h2`,{children:`Reboot`}),(0,Z.jsx)(`p`,{children:`Voluntary meta-prestige when you hold enough unspent Purge Points — no production freeze. Awards Kernels for future upgrades.`}),(0,Z.jsxs)(kO,{children:[(0,Z.jsx)(`span`,{children:`Reboots`}),(0,Z.jsx)(`strong`,{children:m})]}),(0,Z.jsxs)(kO,{children:[(0,Z.jsx)(`span`,{children:`Kernels`}),(0,Z.jsxs)(`strong`,{children:[h,` `,b(h)]})]}),(0,Z.jsx)(`p`,{children:g?`Ready — next Reboot awards ${_} ${b(_)}.`:`Requires 1 Googol PP unspent (you have ${B(y)} PP).`}),(0,Z.jsx)(Q,{"aria-label":g?`Reboot — open confirmation`:`Reboot — requires 1 Googol unspent Purge Points`,disabled:!g,onClick:()=>p(!0),type:`button`,variant:`prestige`,children:(0,Z.jsx)($,{children:`⏻ Reboot…`})})]})}),S&&(0,Z.jsx)(ck,{icon:`📜`,label:`System log`,value:s?`${E.length}`:`🔒`,children:(0,Z.jsxs)(OO,{"aria-label":`system log section`,children:[(0,Z.jsx)(`h2`,{children:`System log`}),s?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`p`,{children:[`Pin standout runs — display only, no bonuses. Cap `,10,` pins.`]}),D.length>0&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(qO,{children:`Pinned`}),(0,Z.jsx)(WO,{"aria-label":`pinned purge entries`,children:D.map(t=>(0,Z.jsxs)(GO,{children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,Z.jsx)(`div`,{children:(0,Z.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,V(t.moneyBits)]})})]}),(0,Z.jsx)(Q,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Unpin`})})]},`pin-${t.id}`))})]}),(0,Z.jsx)(qO,{children:`Recent history`}),O.length===0?(0,Z.jsx)(qO,{children:`No purges recorded yet.`}):(0,Z.jsx)(WO,{"aria-label":`system log history`,children:O.map(t=>(0,Z.jsxs)(GO,{children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,Z.jsx)(`div`,{children:(0,Z.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,Vt(t.moneyBits)]})})]}),T.has(t.id)?(0,Z.jsx)(Q,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Unpin`})}):(0,Z.jsx)(Q,{"aria-label":`pin purge ${t.purgeNumber}`,disabled:T.size>=10,onClick:()=>e.actions.pinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,Z.jsx)($,{children:`Pin`})})]},t.id))})]}):(0,Z.jsxs)(qO,{children:[`History still records in the background. Unlock Supporter to browse past purges and pin up to `,10,`.`,E.length>0&&` Latest: Purge #${E[0].purgeNumber} (+${E[0].pointsAwarded} PP).`]})]})}),C&&(0,Z.jsx)(ck,{icon:`📈`,label:`Task Manager`,value:s?null:`🔒`,children:(0,Z.jsxs)(OO,{"aria-label":`task manager section`,children:[(0,Z.jsx)(`h2`,{children:`Task Manager`}),s?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`p`,{children:[`Live session samples (not persisted). Balance: `,V(e.state.resources?.base??0),` · PP: `,e.state.purge?.points??0]}),(0,Z.jsx)(qO,{children:`Bits`}),(0,Z.jsx)(KO,{"aria-label":`bits sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,Z.jsx)(`path`,{d:ne||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})}),(0,Z.jsx)(qO,{children:`Purge Points`}),(0,Z.jsx)(KO,{"aria-label":`purge points sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,Z.jsx)(`path`,{d:P||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})})]}):(0,Z.jsx)(qO,{children:`Unlock Supporter for live Bits and Purge Point sparklines. Information only — no production change.`})]})})]}),(0,Z.jsxs)(QO,{label:`Data`,children:[!1,(0,Z.jsx)(ck,{icon:`🗄`,label:`Backup / Restore`,children:(0,Z.jsx)(FO,{game:e})}),N&&(0,Z.jsx)(ck,{icon:`🛒`,label:`Store`,children:(0,Z.jsx)(zO,{})}),(0,Z.jsx)(ck,{icon:`ℹ`,label:`About`,children:(0,Z.jsxs)(OO,{"aria-label":`about section`,children:[(0,Z.jsx)(`h2`,{children:`About`}),(0,Z.jsx)(`p`,{children:`Tens — an incremental game themed around powers of ten.`})]})}),(0,Z.jsx)(ck,{icon:`⚖`,label:`Legal`,children:(0,Z.jsx)(LO,{})})]}),(0,Z.jsx)(QO,{label:`Display`,children:(0,Z.jsx)(ck,{icon:`🎨`,inline:(0,Z.jsx)(JO,{role:`group`,"aria-label":`theme preference`,children:[{id:`system`,label:`System`},{id:`light`,label:`Light`},{id:`dark`,label:`Dark`}].map(({id:e,label:t})=>(0,Z.jsx)(Q,{"aria-label":`use ${e} theme`,"aria-pressed":r===e,onClick:()=>i?.(e),type:`button`,variant:r===e?`primary`:`neutral`,children:(0,Z.jsx)($,{children:t})},e))}),label:`Theme`})}),(0,Z.jsx)(QO,{danger:!0,label:`Danger zone`,children:(0,Z.jsx)(ck,{danger:!0,icon:`⚠`,label:`Reset, Reformat, Erase…`,children:(0,Z.jsxs)(OO,{"aria-label":`danger zone`,children:[(0,Z.jsx)(`h2`,{children:`Danger zone`}),(0,Z.jsxs)(`p`,{children:[`Erase the `,(0,Z.jsx)(`strong`,{children:`active`}),` save (“`,e.saveSlots?.find(e=>e.isActive)?.name??`Save 1`,`”) and start from the Byte Foundry. Other slots and your Supporter unlock stay.`]}),(0,Z.jsxs)(Q,{"aria-describedby":`settings-reset-description`,"aria-label":`Reset game`,disabled:a,onClick:t,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases the active save slot and starts over (asks for confirmation)`,type:`button`,variant:`danger`,children:[(0,Z.jsx)($,{children:`↺ Reset active save…`}),(0,Z.jsx)(d_,{id:`settings-reset-description`,children:`Erases the active save slot and starts over; other slots and Supporter unlock stay`})]}),(0,Z.jsx)(`p`,{children:`Restart the Byte Foundry on the active save — Data Stream Capacity, Disks, Data Lakes and Compute entities. Compile, Upgrade Capacity, Upgrade Bitrate, Provision Disk and Data Lake upgrades/Cells then replay automatically up to your pre-reset highs. Byte Factory and Purge progress stay.`}),(0,Z.jsxs)(Q,{"aria-describedby":`settings-reset-foundry-description`,"aria-label":`Reformat Byte Foundry`,disabled:a,onClick:n,title:a?`Purge first — production is frozen at 1 Googol Bytes`:`Restarts the Foundry; Compile, Data Stream upgrades, Disks and Data Lakes replay automatically up to prior highs`,type:`button`,variant:`danger`,children:[(0,Z.jsx)($,{children:`↺ Reformat Byte Foundry…`}),(0,Z.jsx)(d_,{id:`settings-reset-foundry-description`,children:`Restarts Capacity, Storage, Data Lakes and Compute from scratch, then replays upgrades, Disks and Data Lakes automatically up to pre-reset highs; Byte Factory and Purge progress stay`})]}),(0,Z.jsx)(`p`,{children:`Wipe every slot’s progress on this device. Does not remove the Supporter unlock.`}),(0,Z.jsx)(Q,{"aria-label":`Erase all save progress`,disabled:a||o,onClick:te,title:o?`Disable Dev Mode first`:a?`Purge first — production is frozen at 1 Googol Bytes`:`Erases all slots but keeps Supporter unlock (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,Z.jsx)($,{children:`Erase all save progress…`})})]})})}),(0,Z.jsxs)(Av,{cancelLabel:`Cancel`,confirmLabel:`Reboot`,confirmVariant:`prestige`,onCancel:()=>p(!1),onConfirm:M,open:f,title:`Reboot?`,children:[(0,Z.jsxs)(`p`,{children:[`Awards `,_,` `,b(_),` and resets the Byte Foundry for a deep reset — Factory itself stays permanently reachable, no gate to tap back through.`]}),(0,Z.jsxs)(`p`,{children:[(0,Z.jsx)(`strong`,{children:`Resets:`}),` Foundry generator upgrades, Data Stream Capacity, Disks, Compute entities, Byte Factory tiers and resources, unspent PP and Purge count, Compression level, and Compute owned units.`]}),(0,Z.jsxs)(`p`,{children:[(0,Z.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause flags, Overflow mode latch, System log, Compute page reveal, Flops autobuyer unlocks, Kernels (+ award), and hyperscalers.`]})]})]})},uk=e=>Number.isFinite(Number(e))?Math.max(0,Number(e)):0,dk=e=>B(Math.floor(uk(e))),fk=(e,t)=>t>0?Math.min(1,uk(e)/t):0,pk=e=>`+${B(Math.round((uk(e)-1)*1e3)/10)}%`,mk=e=>`×${B(Math.round(uk(e)*100)/100)}`,hk=e=>sr(e),gk=e=>{let t=pn(uk(e.purge?.count),!!e.prestigeSpeedBonusUnlocked),n=gn(e),r=Dr(e);return{purge:t,playtime:n,stars:r,total:t*n*r}},_k=()=>be.filter(e=>!e.platformDependent),vk=e=>({reached:b.filter(t=>uk(e.owned?.[t.id])>0||uk(e.purchased?.[t.id])>0),completedLevels:b.reduce((t,n)=>t+Math.max(0,uk(e.purchaseLevels?.[n.id]??1)-1),0)}),yk=e=>{let t=0,n=0;return Object.values(e.daily?.results??{}).forEach(e=>{Object.values(e??{}).forEach(e=>{e?.won&&(t+=1),n+=uk(e?.attempts)})}),{wins:t,attempts:n}},bk=e=>[{id:`playTime`,icon:`⏱️`,label:`Play time`,value:qi(e.activePlaySeconds)},hk(e)>0?{id:`purges`,icon:`🧹`,label:`Purges`,value:dk(hk(e))}:{id:`pings`,icon:`📡`,label:`Pings`,value:dk(e.achievements?.counters?.pings)},{id:`stars`,icon:`⭐`,label:`Stars`,value:dk(Er(e))},{id:`bonus`,icon:`🚀`,label:`Bonus`,value:mk(gk(e).total)}],xk=e=>{let t=hk(e),n=uk(e.era?.count),r=e.achievements?.counters??{},i=!!e.intro?.mainGameUnlocked,a=[];if(a.push({id:`time`,name:`Time`,icon:`⏱️`,tone:`info`,stats:[{id:`activePlay`,label:`Active play`,value:qi(e.activePlaySeconds)},...t>0?[{id:`cycle`,label:`This Purge`,value:qi(e.purge?.cycleSeconds)}]:[],{id:`sleepCap`,label:`Sleep mode cap`,value:qi(Cn(e))},...e.challenges?.active?[{id:`challengeTime`,label:`Challenge run`,value:qi(e.challenges.activeSeconds)}]:[]]}),i){let{reached:t,completedLevels:n}=vk(e),r=uk(e.resources?.[O]),i=t[t.length-1],o=zr(e),s=wi(r,si(e));a.push({id:`factory`,name:`Factory`,icon:`🏭`,tone:`accent`,stats:[{id:`balance`,label:`Balance`,value:Vt(r)},{id:`googol`,label:e.challenges?.active?`To goal`:`To Googol`,value:`${B(s)}%`,progress:s/100},{id:`tiers`,label:`Tiers reached`,value:`${t.length}/${b.length}`,progress:fk(t.length,b.length)},{id:`highestTier`,label:`Top tier`,value:i?i.name:`—`},{id:`levels`,label:`Levels completed`,value:dk(n)},...e.globalTickspeedMultiplier!==null&&e.globalTickspeedMultiplier!==void 0?[{id:`accelerate`,label:`Accelerate`,value:`Lv ${dk(e.globalTickspeedMultiplier)}`}]:[],...uk(e.scaleUpCount)>0?[{id:`scaleUps`,label:`Scale Ups`,value:dk(e.scaleUpCount)}]:[],...o===null?[]:[{id:`overclock`,label:`Overclock`,value:`Lv ${dk(o)}`}]]})}if(a.push({id:`foundry`,name:`Foundry`,icon:`🔧`,tone:`good`,stats:[{id:`pings`,label:`Pings`,value:dk(r.pings)},{id:`capacity`,label:`Capacity`,value:Wo(uk(e.intro?.capacity),Ro(uk(e.intro?.capacity),!!e.intro?.byteCreated))},{id:`pools`,label:`Pools live`,value:`${Ba(e)}/${ja()}`,progress:fk(Ba(e),ja())},{id:`flushed`,label:`Pools flushed`,value:`${ur(e)}/${ja()}`,progress:fk(ur(e),ja())},{id:`reformats`,label:`Reformats`,value:dk(r.reformats)}]}),t>0){let n=e.prestigeMuseum?.history?.[0];a.push({id:`purge`,name:`Purge`,icon:`🧹`,tone:`warn`,stats:[{id:`lifetime`,label:`Lifetime Purges`,value:dk(t)},{id:`points`,label:`Purge Points`,value:`${dk(e.purge?.points)} PP`},{id:`best`,label:`Best award`,value:`${dk(e.purge?.highestAward)} PP`},...n?[{id:`last`,label:`Last award`,value:`${dk(n.pointsAwarded)} PP`}]:[],{id:`compression`,label:`Compression`,value:`Lv ${dk(e.prestigeDoublePpLevel)}`},{id:`overflow`,label:`Overflow mode`,value:Kr(e)?`On`:`Locked`},...uk(r.handsFreePurges)>0?[{id:`handsFree`,label:`Hands-free Purges`,value:dk(r.handsFreePurges)}]:[]]})}if(e.computeFlops?.pageUnlocked){let t=gt.reduce((t,n)=>t+uk(e.computeFlops?.owned?.[n.id]),0),n=gt.filter(t=>uk(e.computeFlops?.owned?.[t.id])>0).length;a.push({id:`compute`,name:`Compute`,icon:`🖥️`,tone:`violet`,stats:[{id:`flops`,label:`Flops boost`,value:zn(In(e))},{id:`units`,label:`Units owned`,value:dk(t)},{id:`tiers`,label:`Tiers owned`,value:`${n}/${gt.length}`,progress:fk(n,gt.length)}]})}if(n>0&&a.push({id:`reboot`,name:`Reboot`,icon:`⏻`,tone:`danger`,stats:[{id:`reboots`,label:`Reboots`,value:dk(n)},{id:`kernels`,label:`Kernels`,value:dk(e.eons?.balance)},{id:`kernelsEarned`,label:`Kernels earned`,value:dk(Math.max(uk(r.kernelsEarned),uk(e.eons?.balance)))},{id:`hyperscalers`,label:`Hyperscalers`,value:dk(e.hyperscalerCount)}]}),t>0){let t=[...ce].filter(t=>e.challenges?.completed?.[t]).length,n=yk(e);a.push({id:`challenges`,name:`Challenges`,icon:`🏁`,tone:`info`,stats:[{id:`completed`,label:`Completed`,value:`${t}/${ce.size}`,progress:fk(t,ce.size)},{id:`entered`,label:`Runs started`,value:dk(e.challenges?.enteredCount)},{id:`dailyWins`,label:`Daily wins`,value:dk(n.wins)},{id:`dailyAttempts`,label:`Daily attempts`,value:dk(n.attempts)}]})}let o=_k(),s=o.filter(t=>br(e,t.id)).length,c=gk(e);return a.push({id:`bonuses`,name:`Bonuses`,icon:`🚀`,tone:`warn`,stats:[{id:`achievements`,label:`Achievements`,value:`${s}/${o.length}`,progress:fk(s,o.length)},{id:`stars`,label:`Star bonus`,value:pk(c.stars)},...e.prestigeSpeedBonusUnlocked?[{id:`purgeBonus`,label:`Purge bonus`,value:mk(c.purge)}]:[],...e.playtimeBonusUnlocked?[{id:`playtimeBonus`,label:`Playtime bonus`,value:pk(c.playtime)}]:[],{id:`total`,label:`Bonus multiplier`,value:mk(c.total),wide:!0}]}),a},Sk=X.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,Ck=X.h1`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
`,wk=X.div`
  display: grid;
  gap: 0.6rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`,Tk=X(Jh)`
  align-items: center;
  background: linear-gradient(160deg, ${e=>e.theme.color.surfaceRaised}, ${e=>e.theme.color.surface});
  gap: 0.15rem;
  padding: 0.75rem 0.5rem;
  text-align: center;
`,Ek=X.span`
  font-size: 1.4rem;
  line-height: 1;
`,Dk=X.span`
  font-family: ${e=>e.theme.font.display};
  font-size: 1.25rem;
  font-weight: 700;
  overflow-wrap: anywhere;
`,Ok=X.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.78rem;
  letter-spacing: 0.03em;
`,kk=X(Jh)`
  border-left: 3px solid ${e=>e.theme.color[e.$tone]??e.theme.color.accent};
  gap: 0.55rem;
`,Ak=X.button`
  align-items: center;
  background: none;
  border: 0;
  color: ${e=>e.theme.color.textMuted};
  cursor: pointer;
  display: flex;
  font-family: ${e=>e.theme.font.display};
  font-size: 0.85rem;
  font-weight: 600;
  gap: 0.45rem;
  letter-spacing: 0.04em;
  padding: 0;
  text-align: left;
  text-transform: uppercase;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: 2px;
  }
`,jk=X.dl`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`,Mk=X.div`
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: ${e=>e.theme.radius.sm};
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  padding: 0.5rem 0.6rem;
  ${e=>e.$wide?`grid-column: 1 / -1; align-items: center; flex-direction: row; justify-content: space-between;`:``}

  dt {
    color: ${e=>e.theme.color.textMuted};
    font-size: 0.75rem;
  }

  dd {
    color: ${e=>e.theme.color.text};
    font-family: ${e=>e.theme.font.display};
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    overflow-wrap: anywhere;
  }
`,Nk=X.div`
  background: ${e=>e.theme.color.border};
  border-radius: 999px;
  height: 4px;
  overflow: hidden;

  span {
    background: ${e=>e.theme.color[e.$tone]??e.theme.color.accent};
    display: block;
    height: 100%;
  }
`,Pk=({game:e})=>{let{state:t}=e,[n,r]=(0,v.useState)({}),i=bk(t),a=xk(t);return(0,Z.jsxs)(Sk,{"aria-label":`stats page`,children:[(0,Z.jsx)(Ck,{children:`Stats`}),(0,Z.jsx)(wk,{"aria-label":`stats overview`,children:i.map(e=>(0,Z.jsxs)(Tk,{$raised:!0,"aria-label":`${e.label} ${e.value}`,children:[(0,Z.jsx)(Ek,{"aria-hidden":`true`,children:e.icon}),(0,Z.jsx)(Dk,{children:e.value}),(0,Z.jsx)(Ok,{children:e.label})]},e.id))}),a.map(e=>{let t=!n[e.id];return(0,Z.jsx)(Fk,{open:t,section:e,onToggle:()=>r(t=>({...t,[e.id]:!t[e.id]}))},e.id)})]})},Fk=({section:e,open:t,onToggle:n})=>(0,Z.jsxs)(kk,{$tone:e.tone,"aria-label":`${e.name} stats`,children:[(0,Z.jsxs)(Ak,{"aria-expanded":t,"aria-label":`${e.name} stats toggle`,onClick:n,type:`button`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:t?`▾`:`▸`}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),e.name]}),t&&(0,Z.jsx)(jk,{children:e.stats.map(t=>(0,Z.jsxs)(Mk,{$wide:t.wide,children:[(0,Z.jsx)(`dt`,{children:t.label}),(0,Z.jsx)(`dd`,{"aria-label":`${t.label} ${t.value}`,children:t.value}),t.progress!==void 0&&(0,Z.jsx)(Nk,{$tone:e.tone,"aria-hidden":`true`,children:(0,Z.jsx)(`span`,{style:{width:`${Math.round(Math.min(1,Math.max(0,t.progress))*100)}%`}})})]},t.id))})]}),Ik=2**53-1,Lk=e=>e?zi:Ik,Rk=2,zk=(e,t,n=Ik)=>{let r=e>0?Ui(e,Cn(t)):0;return r<=0?null:{state:Wi(e,n)(t),offlineProgress:e>600?{elapsedRealSeconds:e,effectiveSeconds:r,capSeconds:Cn(t)}:null}},Bk=()=>{pD();let e=ND(),t=UD();if(!t)return{state:Mt(),offlineProgress:null,incompatibleSaveReason:e,baselineEarned:{}};let n=WD(),r=zk(n?(Date.now()-n)/1e3:0,t,Lk(nO()))??{state:t,offlineProgress:null};return{...r,state:On(r.state),incompatibleSaveReason:null,baselineEarned:t.achievements?.earned??{}}},Vk=()=>{let[e]=(0,v.useState)(Bk),[t,n]=(0,v.useState)(e.state),[r,i]=(0,v.useState)(e.offlineProgress),[a,o]=(0,v.useState)(e.incompatibleSaveReason),[s,c]=(0,v.useState)(()=>pD()),[l,u]=(0,v.useState)(()=>yD()),[d,f]=(0,v.useState)(()=>mD()),[p,m]=(0,v.useState)([]),[h,g]=(0,v.useState)(()=>({epoch:0,earned:e.baselineEarned})),_=(0,v.useCallback)(e=>{g(t=>({epoch:t.epoch+1,earned:e?.achievements?.earned??{}}))},[]),y=(0,v.useRef)(t);(0,v.useEffect)(()=>{y.current=t},[t]);let b=(0,v.useCallback)(()=>{c(pD()),u(yD())},[]);(0,v.useEffect)(()=>{let e=Date.now(),t=()=>{let t=(Date.now()-e)/1e3;if(t>Rk){let r=Cn(y.current),a=Ui(t,r);if(a>0){n(e=>Wi(t,Lk(D.current))(e)),t>600&&i({elapsedRealSeconds:t,effectiveSeconds:a,capSeconds:r}),e=Date.now();return}}let r=100/1e3;n(e=>{let t=Hi(r,Lk(D.current))(e);return document.visibilityState===`visible`?En(r)(t):t}),e=Date.now()},r=window.setInterval(t,100),a=()=>{document.visibilityState===`visible`&&t()};return document.addEventListener(`visibilitychange`,a),()=>{window.clearInterval(r),document.removeEventListener(`visibilitychange`,a)}},[]),(0,v.useEffect)(()=>{let e=window.setInterval(()=>n(e=>Sv(Date.now())(e)),1e3);return()=>window.clearInterval(e)},[]),(0,v.useEffect)(()=>{HD(t)},[t]),(0,v.useEffect)(()=>{if(!s.supporterUnlocked){m([]);return}let e=()=>{let e=y.current;m(t=>{let n=[...t,{t:Date.now(),money:e.resources?.base??0,prestigePoints:e.purge?.points??0}];return n.length>60?n.slice(n.length-60):n})};e();let t=window.setInterval(e,Ze);return()=>window.clearInterval(t)},[s.supporterUnlocked,s.activeSlotId]);let[x,S]=(0,v.useState)($D),C=(0,v.useRef)(x),w=(0,v.useCallback)(e=>{C.current=!!e,eO(!!e),S(!!e)},[]),[T,E]=(0,v.useState)(nO),D=(0,v.useRef)(T),O=(0,v.useCallback)(e=>{D.current=!!e,rO(!!e),E(!!e)},[]),k=(0,v.useRef)(Sf()),A=(e,t)=>{let r=y.current;if(t(r)===r){k.current=Sf();return}let{rush:i,hit:a}=xf(k.current,e,Date.now());k.current=i,a&&n(Cf)},ee=(0,v.useMemo)(()=>{let e=(e,t)=>n(n=>(C.current&&Qi(n)?t:e)(n));return{buyTierQuantity:t=>(A(`tier:${t}`,Zi(t,1)),D.current?n(e=>wf(Zi(t,1))(e)):e(wf(Zi(t,Ik)),wf(ia(t)))),buyTickspeedMultiplier:t=>(A(`tickspeed:${t}`,_d(t)),e(_d(t),ta(_d(t)))),buyAutobuyerIntervalUpgrade:e=>n(Od(e)),buyAutomationIntervalUpgrade:e=>n(Fd(e)),buyTierTickspeedIntervalUpgrade:e=>n(zd(e)),setAutoOverclockEnabled:e=>n(Vd(e)),startComputeCharge:e=>n(il(e)),setComputeAutoChargeEnabled:e=>n(Bd(e)),buyGlobalTickspeedMultiplier:()=>(A(`globalTickspeed`,Wd),e(Wd,ta(Wd))),buyPlaytimeBonus:()=>n(_n),buyCacheWarm:()=>n(vn),buySleepModeCapUpgrade:()=>e(Tn,ta(Tn)),buyPrestigeSpeedBonus:()=>n(hn),buyPrestigeDoublePp:()=>e(kr,ta(kr)),buyComputeFlopsTier:t=>e(Pn(t),ta(Pn(t))),buyHyperscaler:()=>n(Gn),setAutoPurgeSetting:(e,t)=>n(Wr(e,t)),buyEonUpgrade:e=>n(Xn(e)),buyAutoHyperscaler:()=>n(Qn),setAutoHyperscalerEnabled:e=>n($n(e)),eraAscend:()=>n(vf),enterChallenge:e=>n(Qd(e)),exitChallenge:()=>n($d),purge:()=>n(_f),dailyStart:e=>n(vv(e,Date.now())),dailyForfeit:e=>n(yv(e)),dailyRestart:e=>n(xv(e,Date.now())),dailyPlay:(e,t,r)=>n(Cv(e,t,r,Date.now())),scaleUp:()=>n(of),overclock:()=>n(sf),setComputeAutoBoostEnabled:e=>n(ld(e)),setComputeAutoBoostType:e=>n(ud(e)),consumeXpForLastTierTickspeed:e=>n(hf(e)),setAutoScaleUpEnabled:e=>n(ff(e)),setAutoXpTickspeedEnabled:e=>n(df(e)),setAutoGlobalTickspeedEnabled:e=>n(pf(e)),setAutoPurgeEnabled:e=>n(Ud(e)),setAutobuyerEnabled:(e,t)=>n(fd(e,t)),setTierTickspeedAutobuyerEnabled:(e,t)=>n(Hd(e,t)),setComputeFlopsAutobuyerEnabled:(e,t)=>n(rr(e,t)),tapIntroBit:()=>n(ka),tapPoolBuffer:e=>n(io(e)),combineIntroByte:()=>n(Aa),pickIntroCapacityMilestone:()=>n(wo),queueIntroSpeedUpgrade:()=>n(xo),unlockNextDiskSize:()=>n(cs),clearIntroCapacityUpgradeQueue:()=>n(Do),convertIntroBitsToKilobytes:()=>n(Qo),provisionDisk:()=>n(Cs),queueDiskBuild:()=>n(ws),clearDiskBuildQueue:()=>n(Ts),expediteDiskFill:e=>n(Ks(e)),doubleDataLakeCapacity:e=>n(Il(e)),activateComputeBoost:(e,t)=>n(bf(e,t)),stackComputeBoost:e=>n(sd(e)),reclaimComputeBoost:e=>n(rd(e)),forfeitComputeBoost:e=>n(ad(e)),mergeComputeCoresIntoNode:()=>n(Bl),mergeComputeNodesIntoCluster:()=>n(Vl),mergeComputeClustersIntoNetwork:()=>n(Hl),mergeComputeNetworksIntoGrid:()=>n(Ul),mergeComputeGridsIntoFabric:()=>n(Wl),mergeComputeFabricsIntoCloud:()=>n(Gl),mergeComputeCloudsIntoDatacenter:()=>n(Kl),mergeComputeDatacentersIntoSupercomputer:()=>n(ql),mergeComputeSupercomputersIntoMegacomputer:()=>n(Jl),enableAutoMergeCoresIntoNode:()=>n(au),enableAutoMergeNodesIntoCluster:()=>n(lu),enableAutoMergeClustersIntoNetwork:()=>n(pu),enableAutoMergeNetworksIntoGrid:()=>n(_u),enableAutoMergeGridsIntoFabric:()=>n(xu),enableAutoMergeFabricsIntoCloud:()=>n(Tu),enableAutoMergeCloudsIntoDatacenter:()=>n(ku),enableAutoMergeDatacentersIntoSupercomputer:()=>n(Nu),enableAutoMergeSupercomputersIntoMegacomputer:()=>n(Lu),startComputeCoresMerge:()=>n(su),startComputeNodesMerge:()=>n(du),startComputeClustersMerge:()=>n(hu),startComputeNetworksMerge:()=>n(yu),startComputeGridsMerge:()=>n(Cu),startComputeFabricsMerge:()=>n(Du),startComputeCloudsMerge:()=>n(ju),startComputeDatacentersMerge:()=>n(Fu),startComputeSupercomputersMerge:()=>n(zu),startDataLakeAutoConvert:e=>n(yl(e)),flushStoragePool:e=>n(vl(e)),pinMuseumEntry:e=>n(tf(e)),unpinMuseumEntry:e=>n(nf(e))}},[]),j=(0,v.useCallback)(()=>{GD(),_(null),n(Mt()),i(null),o(null),m([]),b()},[b]),te=(0,v.useCallback)(()=>{n(yf)},[]),M=(0,v.useCallback)(e=>{let t=AD(e);return t.ok&&(t.clearedActive&&(_(null),n(Mt()),i(null),o(null),m([])),b()),t},[b]),N=(0,v.useCallback)(()=>{let e=jD();return e.ok&&(_(null),n(Mt()),i(null),o(null),m([]),b()),e},[b]),ne=(0,v.useCallback)(()=>i(null),[]),P=(0,v.useRef)(new WeakSet),re=(0,v.useCallback)(e=>!e||e.rewardClaimed||P.current.has(e)?!1:(P.current.add(e),n(t=>Ki(e.elapsedRealSeconds,Lk(D.current),e.capSeconds)(t)),i(t=>t===e?{...e,effectiveSeconds:e.effectiveSeconds+Gi(e.elapsedRealSeconds,e.capSeconds),rewardClaimed:!0}:t),!0),[]),ie=(0,v.useCallback)(()=>o(null),[]),F=(0,v.useCallback)(e=>{HD(y.current);let t=bD(e);if(!t.ok)return t;if(t.already)return b(),t;let r=ND(),a=UD()??Mt(),s=WD(),c=zk(s?(Date.now()-s)/1e3:0,a,Lk(D.current));return _(a),n(c?.state??a),i(c?.offlineProgress??null),o(r),m([]),b(),t},[b]),ae=(0,v.useCallback)(()=>{HD(y.current);let e=!mD();hD(e),f(e);let t=ND(),r=UD();_(r),n(r??Mt()),i(null),o(t),m([]),b()},[b]),oe=(0,v.useCallback)(()=>{mD()&&(KD(),_(null),n(Mt()),i(null),o(null),m([]))},[]),se=(0,v.useCallback)(e=>{let t=JD(e,y.current);return t.ok&&(_(t.state),n(t.state),i(null),o(null)),t},[]),ce=(0,v.useCallback)(e=>{mD()&&n(t=>so(e(t)))},[]),le=(0,v.useCallback)(()=>YD(y.current),[]),ue=(0,v.useCallback)(e=>{let t=ZD(e);return t.ok&&(y.current=t.state,_(t.state),n(t.state),i(null),o(null)),t},[]),de=(0,v.useCallback)((e,t)=>{let n=xD(e,t);return n.ok&&b(),n},[b]),fe=(0,v.useCallback)(e=>{let t=SD(e);return t.ok&&b(),t},[b]);return{actions:ee,applyCloudSave:ue,applyDevStateJson:se,buyMaxMode:x,buyUnitMode:T,claimOfflineAdReward:re,clearSlot:M,devModeActive:d,dismissIncompatibleSaveNotice:ie,dismissOfflineProgress:ne,eraseAllSaveProgress:N,exportSaveJson:le,incompatibleSaveReason:a,offlineProgress:r,achievementBaseline:h,opsSamples:p,purchaseSupporterDummy:(0,v.useCallback)(()=>{let e=CD();return e.ok&&b(),e},[b]),redeemUnlockCode:fe,renameSaveSlot:de,resetByteFoundry:te,resetDevState:oe,resetGame:j,saveSlots:l,savesMeta:s,setBuyMaxMode:w,setBuyUnitMode:O,setDevState:ce,state:t,switchSaveSlot:F,toggleDevMode:ae}},Hk=Oh`
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
`,Uk={dark:{page:`#0c0d11`,surface:`#16181f`,surfaceRaised:`#1e212a`,surfaceSunken:`#262a34`,border:`#2a2e39`,borderStrong:`#3a3f4d`,text:`#eef1f7`,textMuted:`#98a1b2`,textFaint:`#6b7280`,accent:`#7c9bff`,good:`#57d98a`,warn:`#f0c260`,info:`#56b6f0`,violet:`#b39bff`,danger:`#f87171`,disabled:`#7d8595`},light:{page:`#e8ecf2`,surface:`#ffffff`,surfaceRaised:`#ffffff`,surfaceSunken:`#dfe4ec`,border:`#d4dae4`,borderStrong:`#bec7d4`,text:`#171a21`,textMuted:`#5c6675`,textFaint:`#808a99`,accent:`#3b5bdb`,good:`#0a6b30`,warn:`#875600`,info:`#1f7ac0`,violet:`#7048c4`,danger:`#d64545`,disabled:`#9aa0ab`}},Wk={dark:{sm:`0 1px 2px rgba(0, 0, 0, 0.45)`,md:`0 6px 18px rgba(0, 0, 0, 0.55)`},light:{sm:`0 1px 3px rgba(20, 30, 60, 0.08)`,md:`0 8px 24px rgba(20, 30, 60, 0.12)`}},Gk={dark:[`#60a5fa`,`#f472b6`,`#a78bfa`,`#fb923c`,`#22d3ee`,`#38bdf8`,`#f87171`,`#818cf8`],light:[`#2563eb`,`#db2777`,`#7c3aed`,`#ea580c`,`#0891b2`,`#0284c7`,`#dc2626`,`#4f46e5`]},Kk={xs:`0.25rem`,sm:`0.4rem`,md:`0.6rem`,lg:`0.85rem`,xl:`1.25rem`,"2xl":`2rem`},qk={sm:`6px`,md:`10px`,lg:`12px`,pill:`999px`},Jk={minHeight:500,medium:600,expanded:900,wide:1360,splitMinWidth:784,splitMinAspect:.8},Yk={duration:{fast:`0.05s`,base:`0.15s`,slow:`0.4s`},easing:{standard:`ease`,out:`ease-out`,inOut:`ease-in-out`}},Xk={display:`"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,body:`"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,mono:`ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`},Zk={scale:{xs:{size:`0.72rem`,lineHeight:`1rem`},sm:{size:`0.82rem`,lineHeight:`1.15rem`},md:{size:`0.95rem`,lineHeight:`1.35rem`},lg:{size:`1.1rem`,lineHeight:`1.5rem`},xl:{size:`1.75rem`,lineHeight:`2.1rem`},hero:{size:`2.4rem`,lineHeight:`2.7rem`}},numeric:`tabular-nums`},Qk=[`dark`,`light`],$k=`dark`,eA=e=>{let t=Qk.includes(e)?e:$k;return{mode:t,color:Uk[t],shadow:Wk[t],tierAccents:Gk[t],space:Kk,radius:qk,motion:Yk,breakpoints:Jk,font:Xk,type:Zk}},tA={dark:eA(`dark`),light:eA(`light`)},nA=({width:e,height:t})=>!(t>=Jk.minHeight)||!(e>=Jk.medium)?`compact`:e<Jk.expanded?`medium`:e<Jk.wide?`expanded`:`wide`;Jk.medium,Jk.expanded,Jk.wide;var rA={layoutClass:`compact`,width:0,height:0},iA=()=>{if(typeof window>`u`)return null;let e=window.visualViewport,t=Math.round(window.innerWidth||e?.width||0),n=Math.round(window.innerHeight||e?.height||0);return t>0&&n>0?{width:t,height:n}:null},aA=()=>{let e=iA();return e?{...e,layoutClass:nA(e)}:rA},oA=()=>{let[e,t]=(0,v.useState)(aA);return(0,v.useEffect)(()=>{if(typeof window>`u`)return;let e=null,n=window.requestAnimationFrame??(e=>setTimeout(e,16)),r=window.cancelAnimationFrame??clearTimeout,i=()=>{e=null;let n=aA();t(e=>e.width===n.width&&e.height===n.height&&e.layoutClass===n.layoutClass?e:n)},a=()=>{e===null&&(e=n(i))};window.addEventListener(`resize`,a),window.addEventListener(`orientationchange`,a);let o=window.visualViewport;return o?.addEventListener(`resize`,a),a(),()=>{window.removeEventListener(`resize`,a),window.removeEventListener(`orientationchange`,a),o?.removeEventListener(`resize`,a),e!==null&&r(e)}},[]),e},sA=(0,v.createContext)(rA),cA=({children:e})=>(0,Z.jsx)(sA.Provider,{value:oA(),children:e}),lA=()=>typeof window>`u`||typeof window.matchMedia!=`function`?$k:window.matchMedia(`(prefers-color-scheme: light)`).matches?`light`:`dark`,uA=e=>e===`light`||e===`dark`?e:lA(),dA=({mode:e=$k,children:t})=>(0,Z.jsx)(_h,{theme:tA[e]??tA.dark,children:t}),fA=()=>uA(aO()),pA=new Set([`info`,`boosters`,`compute`,`milestones`,`achievements`,`stats`,`settings`,`dev`]),mA=X.div`
  padding-bottom: ${$g};
`;function hA(){let e=Vk(),[t,n]=(0,v.useState)(aO),[r,i]=(0,v.useState)(fA),[a,o]=(0,v.useState)(`game`),[s,c]=(0,v.useState)(!1),[l,u]=(0,v.useState)(0),[d,f]=(0,v.useState)(0),[p,m]=(0,v.useState)(0),h=e.state.intro.mainGameUnlocked,g=!pA.has(a)&&(!h||a===`foundry`),_=g?`foundry`:a,y=Ll(e.state),b=Dn(e.state),x=h,S=h&&ea(e.state),C=h&&$i(e.state),w=e=>{e===`boosters`&&!y||e===`compute`&&!b||e===`game`&&!h||e===`perks`&&!S||e===`challenges`&&!C||(e===`storage`?(c(!1),m(e=>e+1),o(`foundry`)):(c(!1),e===`perks`&&u(e=>e+1),e===`challenges`&&f(e=>e+1),e===`foundry`&&m(e=>e+1),o(e)))},T=()=>{bi(e.state)||window.confirm(TD())&&(e.resetGame(),o(`game`),c(!1))},E=()=>{bi(e.state)||window.confirm(ED())&&(e.resetByteFoundry(),a===`boosters`&&o(`foundry`))};(0,v.useEffect)(()=>{if(!s)return;let e=e=>{e.key===`Escape`&&c(!1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[s]),(0,v.useEffect)(()=>{if(t!==`system`||typeof window.matchMedia!=`function`)return;let e=window.matchMedia(`(prefers-color-scheme: light)`),n=()=>i(uA(`system`));return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[t]);let D=e=>{oO(e),n(e),i(uA(e))},O;O=g?(0,Z.jsx)(TC,{focusNonce:p,game:e}):a===`info`?(0,Z.jsx)(hT,{game:e}):a===`boosters`?(0,Z.jsx)(mw,{game:e}):a===`compute`?(0,Z.jsx)(BC,{game:e}):a===`perks`&&S?(0,Z.jsx)(ME,{focusNonce:l,game:e}):a===`challenges`&&C?(0,Z.jsx)(wx,{focusNonce:d,game:e}):a===`milestones`?(0,Z.jsx)(CT,{game:e}):a===`stats`?(0,Z.jsx)(Pk,{game:e}):a===`achievements`&&le.enabled?(0,Z.jsx)(ug,{game:e}):a===`dev`?(0,Z.jsx)(iT,{game:e}):a===`settings`?(0,Z.jsx)(lk,{game:e,onReset:T,onResetByteFoundry:E,onThemePreferenceChange:D,themePreference:t}):(0,Z.jsx)(jb,{game:e});let k=Wg(e.state);return(0,Z.jsxs)(dA,{mode:r,children:[(0,Z.jsx)(Hk,{}),(0,Z.jsxs)(cA,{children:[(0,Z.jsx)(mA,{children:O}),(0,Z.jsx)(Qg,{attention:k,currentPage:_,moreOpen:s,onNavigate:w,onOpenMore:()=>c(e=>!e),showBoosters:y,showComputeFlops:b,showPerks:S,showChallenges:C,showTiers:x}),(0,Z.jsx)(qh,{onClose:()=>c(!1),onNavigate:w,open:s}),(0,Z.jsx)(Vh,{baseline:e.achievementBaseline,state:e.state}),e.incompatibleSaveReason?(0,Z.jsx)(g_,{onDismiss:e.dismissIncompatibleSaveNotice}):null]})]})}var gA=`modulepreload`,_A=function(e){return`/tens/dev/`+e},vA={},yA=function(e){return e.pathname.endsWith(`.css`)},bA=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},xA=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=_A(t,n);let r=s(t),i=yA(r);return bA(vA,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:gA,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},SA=e=>{e&&e instanceof Function&&xA(async()=>{let{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}=await import(`./web-vitals-viX3FQND.js`);return{onCLS:e,onINP:t,onFCP:n,onLCP:r,onTTFB:i}},[]).then(({onCLS:t,onINP:n,onFCP:r,onLCP:i,onTTFB:a})=>{t(e),n(e),r(e),i(e),a(e)})},CA=document.getElementById(`root`);if(!CA)throw Error(`Root element not found`);(0,y.createRoot)(CA).render((0,Z.jsx)(v.StrictMode,{children:(0,Z.jsx)(hA,{})})),SA();