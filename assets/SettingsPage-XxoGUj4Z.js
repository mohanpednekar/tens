import{Dt as e,Et as t,G as n,J as r,M as i,X as a,_ as o,a as s,c,d as l,f as u,i as d,l as f,m as p,n as m,o as h,r as g,s as _,t as v,u as y,y as ee}from"./index-pzD4j2gg.js";var b=e(t(),1),x;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(x||={});var S=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},C=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,w=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?C(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new S(`"${e}" plugin is not implemented on ${c}`,x.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new S(`"${e}.${t}()" is not implemented on ${c}`,x.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t).then(e=>e),r=async()=>{let t=await n;await g({eventName:e,callbackId:t})},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=S,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},T=(e=>e.Capacitor=w(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),E=T.registerPlugin,D=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new T.Exception(e,x.Unimplemented)}unavailable(e=`not available`){return new T.Exception(e,x.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},O=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),k=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),A=class extends D{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=k(n).trim(),r=k(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=O(e.key),n=O(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};E(`CapacitorCookies`,{web:()=>new A});var j=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),M=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},N=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,te=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=M(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},ne=class extends D{async request(e){let t=te(e,e.webFetchExtra),n=N(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await j(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};E(`CapacitorHttp`,{web:()=>new ne});var re;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(re||={});var P;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(P||={});var F=class extends D{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};E(`SystemBars`,{web:()=>new F});var I=`https://mohanpednekar.github.io/tens/`,L=`${I}privacy.html`,R=`${I}terms.html`,z=u(h)`
  gap: 0.5rem;

  h2 {
    font-size: ${e=>e.theme.type.scale.md.size};
    margin: 0;
  }

  p {
    color: ${e=>e.theme.color.textMuted};
    margin: 0;
  }
`,B=u.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
`,ie=u.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 100%;
`,ae=u.input`
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
`,V=u.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.8rem;
  margin: 0;
`,H=y(),U=u.textarea`
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
`,W={invalid_json:`That is not valid save JSON.`,incompatible_save:`That save is from an incompatible version.`,invalid_state:`That save could not be loaded.`},oe=({game:e})=>{let[t,n]=(0,b.useState)(``),[r,i]=(0,b.useState)(null),a=(0,b.useRef)(null),o=async()=>{let t=e.exportSaveJson();n(t);try{await navigator.clipboard.writeText(t),i({text:`Save copied to clipboard (also shown below).`})}catch{i({text:`Save shown below — copy it manually.`})}},s=()=>{let t=URL.createObjectURL(new Blob([e.exportSaveJson()],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`tens-save.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)},l=t=>{if(!t.trim())return i({error:!0,text:`Paste a save or choose a file first.`});if(!window.confirm(`Replace the active save slot with this save? Current progress in the slot is lost.`))return;let r=e.applyCloudSave(t);i(r.ok?{text:`Save imported.`}:{error:!0,text:W[r.reason]??`Import failed.`}),r.ok&&n(``)};return(0,H.jsxs)(z,{"aria-label":`manual save section`,children:[(0,H.jsx)(`h2`,{children:`Backup / Restore`}),(0,H.jsx)(U,{"aria-label":`save JSON`,onChange:e=>n(e.target.value),placeholder:`Paste save JSON here to import`,value:t}),(0,H.jsxs)(B,{children:[(0,H.jsx)(_,{onClick:o,type:`button`,children:(0,H.jsx)(c,{children:`Copy save`})}),(0,H.jsx)(_,{onClick:s,type:`button`,children:(0,H.jsx)(c,{children:`Download file`})}),(0,H.jsx)(_,{onClick:()=>a.current?.click(),type:`button`,children:(0,H.jsx)(c,{children:`Choose file…`})}),(0,H.jsx)(_,{onClick:()=>l(t),type:`button`,children:(0,H.jsx)(c,{children:`Import`})}),(0,H.jsx)(`input`,{accept:`application/json,.json`,"aria-label":`save file`,hidden:!0,onChange:async e=>{let t=e.target.files?.[0];e.target.value=``,t&&n(await t.text())},ref:a,type:`file`})]}),r&&(0,H.jsx)(V,{$error:r.error,children:r.text})]})},G=u.div`
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
`,se=()=>(0,H.jsxs)(z,{"aria-label":`legal section`,children:[(0,H.jsx)(`h2`,{children:`Legal`}),(0,H.jsxs)(G,{children:[(0,H.jsx)(`a`,{href:L,rel:`noopener noreferrer`,target:`_blank`,children:`Privacy Policy`}),(0,H.jsx)(`a`,{href:R,rel:`noopener noreferrer`,target:`_blank`,children:`Terms of Use`})]})]}),K={removeAds:`Ads removed — rewards are now granted instantly. Thank you!`,supportTip:`Thank you for supporting Tens!`},ce=({service:e=d()})=>{let[t,n]=(0,b.useState)({removeAds:!1}),[r,i]=(0,b.useState)(!1),[a,o]=(0,b.useState)(null);if((0,b.useEffect)(()=>{if(!e.iapAvailable)return;let t=!0;return e.getEntitlements().then(e=>{t&&n(e)}),()=>{t=!1}},[e]),!e.iapAvailable)return null;let s=async(e,t)=>{i(!0),o(null);let r=await e();i(!1),r.entitlements&&n(r.entitlements),r.ok?o({error:!1,text:t}):r.cancelled||o({error:!0,text:`The store could not complete that. Please try again.`})};return(0,H.jsxs)(z,{"aria-label":`store section`,children:[(0,H.jsx)(`h2`,{children:`Store`}),(0,H.jsx)(`p`,{children:`Optional extras. Every part of the game stays free to play.`}),(0,H.jsxs)(B,{children:[(0,H.jsx)(_,{"aria-label":`buy remove ads`,disabled:r||t.removeAds,onClick:()=>s(()=>e.purchase(`removeAds`),K.removeAds),type:`button`,variant:`primary`,children:(0,H.jsx)(c,{children:t.removeAds?`Ads removed`:`Remove ads`})}),(0,H.jsx)(_,{"aria-label":`buy support tip`,disabled:r,onClick:()=>s(()=>e.purchase(`supportTip`),K.supportTip),type:`button`,variant:`neutral`,children:(0,H.jsx)(c,{children:`Leave a tip`})}),(0,H.jsx)(_,{"aria-label":`restore purchases`,disabled:r,onClick:()=>s(()=>e.restore(),`Purchases restored.`),type:`button`,variant:`ghost`,children:(0,H.jsx)(c,{children:`Restore purchases`})})]}),a&&(0,H.jsx)(V,{$error:a.error,children:a.text})]})},le=u.main`
  width: min(520px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,ue=u.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,de=u(B)`
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  padding: 0.55rem 0.65rem;
  background: ${e=>e.$active?e.theme.color.surfaceSunken:`transparent`};
`,fe=u.div`
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
`,q=u.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
  margin: 0;
  padding: 0;
`,pe=u.li`
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
`,me=u.svg`
  display: block;
  height: 64px;
  width: 100%;
`,J=u.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  margin: 0;
`,he=u.div`
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;

  & > button {
    font-size: 0.78rem;
    min-height: 1.9rem;
    padding: 0.2em 0.6em;
  }
`,ge=(e,t)=>{if(!e.length)return``;let n=e.map(e=>Math.max(0,Number(e[t])||0)),r=Math.max(...n,1),i=Math.min(...n,0),a=Math.max(r-i,1);return n.map((e,t)=>{let r=n.length===1?0:t/(n.length-1)*100,o=40-(e-i)/a*40;return`${t===0?`M`:`L`}${r.toFixed(2)} ${o.toFixed(2)}`}).join(` `)},_e=u.h2`
  color: ${e=>e.$danger?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0.9rem 0.2rem 0.35rem;
  text-transform: uppercase;
`,ve=u.div`
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.lg};
  overflow: hidden;
`,Y=({label:e,danger:t=!1,children:n})=>(0,H.jsxs)(`div`,{children:[(0,H.jsx)(_e,{$danger:t,children:e}),(0,H.jsx)(ve,{children:n})]}),X=u.div`
  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,Z=l`
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
`,Q=u.button`
  ${Z}
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: -2px;
  }
`,ye=u.div`
  ${Z}
`,be=u.span`
  align-items: center;
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: ${e=>e.theme.radius.sm};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 0.9rem;
  height: 1.65rem;
  justify-content: center;
  width: 1.65rem;
`,xe=u.span`
  flex: 1 1 auto;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Se=u.span`
  color: ${e=>e.theme.color.textMuted};
  flex-shrink: 0;
  font-size: 0.85rem;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Ce=u.span`
  color: ${e=>e.theme.color.textFaint};
  flex-shrink: 0;
  transform: rotate(${e=>e.$open?`90deg`:`0deg`});
  transition: transform 120ms ease;
`,we=u.div`
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
`,$=({icon:e,label:t,value:n,danger:r=!1,inline:i,children:a})=>{let[o,s]=(0,b.useState)(!1);return i?(0,H.jsx)(X,{children:(0,H.jsxs)(ye,{$danger:r,children:[(0,H.jsx)(be,{"aria-hidden":`true`,children:e}),(0,H.jsx)(xe,{children:t}),i]})}):(0,H.jsxs)(X,{children:[(0,H.jsxs)(Q,{$danger:r,"aria-expanded":o,"aria-label":`${t} settings`,onClick:()=>s(e=>!e),type:`button`,children:[(0,H.jsx)(be,{"aria-hidden":`true`,children:e}),(0,H.jsx)(xe,{children:t}),n!=null&&n!==``&&(0,H.jsx)(Se,{children:n}),(0,H.jsx)(Ce,{$open:o,"aria-hidden":`true`,children:`›`})]}),o&&(0,H.jsx)(we,{children:a})]})},Te=({game:e,onReset:t,onResetByteFoundry:l,themePreference:u=`system`,onThemePreferenceChange:h})=>{let y=a(e.state),x=!!e.savesMeta?.supporterUnlocked,[S,C]=(0,b.useState)(``),[w,T]=(0,b.useState)(null),[E,D]=(0,b.useState)(!1),O=e.state.era?.count??0,k=e.state.eons?.balance??0,A=r(e.state),j=i(e.state),M=e.state.purge?.points??0,N=e=>e===1?`Kernel`:`Kernels`,te=n(e.state,{kind:`rebootReached`}),ne=n(e.state,{kind:`googolReached`}),re=n(e.state,{kind:`storageUnlocked`}),P=e.state.prestigeMuseum??{history:[],pinnedIds:[]},F=new Set(P.pinnedIds??[]),I=P.history??[],L=I.filter(e=>F.has(e.id)),R=x?I:I.slice(0,1),U=t=>{t.preventDefault();let n=e.redeemUnlockCode(S);n.ok?(C(``),T({error:!1,text:n.already?`Supporter pack already unlocked.`:`Supporter pack unlocked.`})):T({error:!0,text:`That code is not valid.`})},W=()=>{let t=e.purchaseSupporterDummy();T({error:!1,text:t.already?`Supporter pack already unlocked.`:`Dummy checkout complete — Supporter pack unlocked (no real charge).`})},G=t=>{let n=window.prompt(`Rename save slot`,t.name);n!=null&&e.renameSaveSlot(t.id,n)},K=t=>{y&&t.isActive||window.confirm(m(t))&&e.clearSlot(t.id)},_e=()=>{y||window.confirm(g())&&e.eraseAllSaveProgress()},ve=()=>{r(e.state)&&(e.actions.eraAscend(),D(!1))},X=!!d().iapAvailable,Z=ge(e.opsSamples??[],`money`),Q=ge(e.opsSamples??[],`prestigePoints`);return(0,H.jsxs)(le,{children:[(0,H.jsx)(ue,{children:(0,H.jsx)(`h1`,{children:`Settings`})}),(0,H.jsxs)(Y,{label:`Game`,children:[(0,H.jsx)($,{icon:`💛`,label:`Supporter`,value:x?`Unlocked`:`Free`,children:(0,H.jsxs)(z,{"aria-label":`supporter pack section`,children:[(0,H.jsx)(`h2`,{children:`Supporter pack`}),(0,H.jsx)(`p`,{children:`Optional meta extras only — extra save slots, System log pins, and the Task Manager. Never changes Bits, PP, Disks, Compute, or unlock order. Real payment comes later; for now use a code or the dummy checkout.`}),x?(0,H.jsxs)(V,{children:[`Unlocked`,e.savesMeta?.supporterSource===`dummy_purchase`?` (dummy checkout)`:` (unlock code)`,`.`,` `,3,` save slots · System log · Task Manager.`]}):(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(J,{children:[`Free: `,1,` save slot. Unlock code (placeholder): `,(0,H.jsx)(`code`,{children:v})]}),(0,H.jsxs)(ie,{onSubmit:U,children:[(0,H.jsx)(ae,{"aria-label":`supporter unlock code`,autoComplete:`off`,onChange:e=>C(e.target.value),placeholder:`Enter unlock code`,value:S}),(0,H.jsx)(_,{"aria-label":`redeem supporter unlock code`,type:`submit`,variant:`primary`,children:(0,H.jsx)(c,{children:`Redeem code`})})]}),(0,H.jsx)(_,{"aria-label":`dummy supporter checkout`,onClick:W,type:`button`,variant:`neutral`,children:(0,H.jsx)(c,{children:`Dummy checkout (free)`})})]}),w&&(0,H.jsx)(V,{$error:w.error,children:w.text})]})}),(0,H.jsx)($,{icon:`💾`,label:`Save slots`,value:e.saveSlots?.find(e=>e.isActive)?.name,children:(0,H.jsxs)(z,{"aria-label":`save slots section`,children:[(0,H.jsx)(`h2`,{children:`Save slots`}),(0,H.jsx)(`p`,{children:`Independent runs on this device. Switching saves the current slot first. Reset / Clear wipe progress only — your Supporter unlock is never removed here.`}),!1,(e.saveSlots??[]).map(t=>(0,H.jsxs)(de,{$active:t.isActive,children:[(0,H.jsxs)(fe,{children:[(0,H.jsxs)(`strong`,{children:[t.name,t.isActive?` · active`:``]}),(0,H.jsx)(`span`,{children:t.unlocked?t.isEmpty?`Empty (starts at Byte Foundry)`:`Has saved progress`:`Locked — unlock Supporter pack`})]}),t.unlocked&&(0,H.jsxs)(B,{children:[!t.isActive&&(0,H.jsx)(_,{"aria-label":`switch to ${t.name}`,disabled:!1,onClick:()=>e.switchSaveSlot(t.id),title:void 0,type:`button`,variant:`primary`,children:(0,H.jsx)(c,{children:`Play`})}),(0,H.jsx)(_,{"aria-label":`rename ${t.name}`,onClick:()=>G(t),type:`button`,variant:`neutral`,children:(0,H.jsx)(c,{children:`Rename`})}),(0,H.jsx)(_,{"aria-label":`clear ${t.name}`,disabled:y&&t.isActive,onClick:()=>K(t),title:y&&t.isActive?`Purge first — production is frozen at 1 Googol Bytes`:`Erase this slot only (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,H.jsx)(c,{children:`Clear…`})})]})]},t.id))]})}),te&&(0,H.jsx)($,{icon:`⏻`,label:`Reboot`,value:`${k} ${N(k)}`,children:(0,H.jsxs)(z,{"aria-label":`reboot section`,children:[(0,H.jsx)(`h2`,{children:`Reboot`}),(0,H.jsx)(`p`,{children:`Voluntary meta-prestige when you hold enough unspent Purge Points — no production freeze. Awards Kernels for future upgrades.`}),(0,H.jsxs)(B,{children:[(0,H.jsx)(`span`,{children:`Reboots`}),(0,H.jsx)(`strong`,{children:O})]}),(0,H.jsxs)(B,{children:[(0,H.jsx)(`span`,{children:`Kernels`}),(0,H.jsxs)(`strong`,{children:[k,` `,N(k)]})]}),(0,H.jsx)(`p`,{children:A?`Ready — next Reboot awards ${j} ${N(j)}.`:`Requires 1 Googol PP unspent (you have ${p(M)} PP).`}),(0,H.jsx)(_,{"aria-label":A?`Reboot — open confirmation`:`Reboot — requires 1 Googol unspent Purge Points`,disabled:!A,onClick:()=>D(!0),type:`button`,variant:`prestige`,children:(0,H.jsx)(c,{children:`⏻ Reboot…`})})]})}),ne&&(0,H.jsx)($,{icon:`📜`,label:`System log`,value:x?`${I.length}`:`🔒`,children:(0,H.jsxs)(z,{"aria-label":`system log section`,children:[(0,H.jsx)(`h2`,{children:`System log`}),x?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`p`,{children:[`Pin standout runs — display only, no bonuses. Cap `,10,` pins.`]}),L.length>0&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(J,{children:`Pinned`}),(0,H.jsx)(q,{"aria-label":`pinned purge entries`,children:L.map(t=>(0,H.jsxs)(pe,{children:[(0,H.jsxs)(`div`,{children:[(0,H.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,H.jsx)(`div`,{children:(0,H.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,ee(t.moneyBits)]})})]}),(0,H.jsx)(_,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,H.jsx)(c,{children:`Unpin`})})]},`pin-${t.id}`))})]}),(0,H.jsx)(J,{children:`Recent history`}),R.length===0?(0,H.jsx)(J,{children:`No purges recorded yet.`}):(0,H.jsx)(q,{"aria-label":`system log history`,children:R.map(t=>(0,H.jsxs)(pe,{children:[(0,H.jsxs)(`div`,{children:[(0,H.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,H.jsx)(`div`,{children:(0,H.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,o(t.moneyBits)]})})]}),F.has(t.id)?(0,H.jsx)(_,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,H.jsx)(c,{children:`Unpin`})}):(0,H.jsx)(_,{"aria-label":`pin purge ${t.purgeNumber}`,disabled:F.size>=10,onClick:()=>e.actions.pinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,H.jsx)(c,{children:`Pin`})})]},t.id))})]}):(0,H.jsxs)(J,{children:[`History still records in the background. Unlock Supporter to browse past purges and pin up to `,10,`.`,I.length>0&&` Latest: Purge #${I[0].purgeNumber} (+${I[0].pointsAwarded} PP).`]})]})}),re&&(0,H.jsx)($,{icon:`📈`,label:`Task Manager`,value:x?null:`🔒`,children:(0,H.jsxs)(z,{"aria-label":`task manager section`,children:[(0,H.jsx)(`h2`,{children:`Task Manager`}),x?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`p`,{children:[`Live session samples (not persisted). Balance: `,ee(e.state.resources?.base??0),` · PP: `,e.state.purge?.points??0]}),(0,H.jsx)(J,{children:`Bits`}),(0,H.jsx)(me,{"aria-label":`bits sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,H.jsx)(`path`,{d:Z||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})}),(0,H.jsx)(J,{children:`Purge Points`}),(0,H.jsx)(me,{"aria-label":`purge points sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,H.jsx)(`path`,{d:Q||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})})]}):(0,H.jsx)(J,{children:`Unlock Supporter for live Bits and Purge Point sparklines. Information only — no production change.`})]})})]}),(0,H.jsxs)(Y,{label:`Data`,children:[!1,(0,H.jsx)($,{icon:`🗄`,label:`Backup / Restore`,children:(0,H.jsx)(oe,{game:e})}),X&&(0,H.jsx)($,{icon:`🛒`,label:`Store`,children:(0,H.jsx)(ce,{})}),(0,H.jsx)($,{icon:`ℹ`,label:`About`,children:(0,H.jsxs)(z,{"aria-label":`about section`,children:[(0,H.jsx)(`h2`,{children:`About`}),(0,H.jsx)(`p`,{children:`Tens — an incremental game themed around powers of ten.`})]})}),(0,H.jsx)($,{icon:`⚖`,label:`Legal`,children:(0,H.jsx)(se,{})})]}),(0,H.jsx)(Y,{label:`Display`,children:(0,H.jsx)($,{icon:`🎨`,inline:(0,H.jsx)(he,{role:`group`,"aria-label":`theme preference`,children:[{id:`system`,label:`System`},{id:`light`,label:`Light`},{id:`dark`,label:`Dark`}].map(({id:e,label:t})=>(0,H.jsx)(_,{"aria-label":`use ${e} theme`,"aria-pressed":u===e,onClick:()=>h?.(e),type:`button`,variant:u===e?`primary`:`neutral`,children:(0,H.jsx)(c,{children:t})},e))}),label:`Theme`})}),(0,H.jsx)(Y,{danger:!0,label:`Danger zone`,children:(0,H.jsx)($,{danger:!0,icon:`⚠`,label:`Reset, Reformat, Erase…`,children:(0,H.jsxs)(z,{"aria-label":`danger zone`,children:[(0,H.jsx)(`h2`,{children:`Danger zone`}),(0,H.jsxs)(`p`,{children:[`Erase the `,(0,H.jsx)(`strong`,{children:`active`}),` save (“`,e.saveSlots?.find(e=>e.isActive)?.name??`Save 1`,`”) and start from the Byte Foundry. Other slots and your Supporter unlock stay.`]}),(0,H.jsxs)(_,{"aria-describedby":`settings-reset-description`,"aria-label":`Reset game`,disabled:y,onClick:t,title:y?`Purge first — production is frozen at 1 Googol Bytes`:`Erases the active save slot and starts over (asks for confirmation)`,type:`button`,variant:`danger`,children:[(0,H.jsx)(c,{children:`↺ Reset active save…`}),(0,H.jsx)(f,{id:`settings-reset-description`,children:`Erases the active save slot and starts over; other slots and Supporter unlock stay`})]}),(0,H.jsx)(`p`,{children:`Restart the Byte Foundry on the active save — Data Stream Capacity, Disks, Data Lakes and Compute entities. Compile, Upgrade Capacity, Upgrade Bitrate, Provision Disk and Data Lake upgrades/Cells then replay automatically up to your pre-reset highs. Byte Factory and Purge progress stay.`}),(0,H.jsxs)(_,{"aria-describedby":`settings-reset-foundry-description`,"aria-label":`Reformat Byte Foundry`,disabled:y,onClick:l,title:y?`Purge first — production is frozen at 1 Googol Bytes`:`Restarts the Foundry; Compile, Data Stream upgrades, Disks and Data Lakes replay automatically up to prior highs`,type:`button`,variant:`danger`,children:[(0,H.jsx)(c,{children:`↺ Reformat Byte Foundry…`}),(0,H.jsx)(f,{id:`settings-reset-foundry-description`,children:`Restarts Capacity, Storage, Data Lakes and Compute from scratch, then replays upgrades, Disks and Data Lakes automatically up to pre-reset highs; Byte Factory and Purge progress stay`})]}),(0,H.jsx)(`p`,{children:`Wipe every slot’s progress on this device. Does not remove the Supporter unlock.`}),(0,H.jsx)(_,{"aria-label":`Erase all save progress`,disabled:y||!1,onClick:_e,title:y?`Purge first — production is frozen at 1 Googol Bytes`:`Erases all slots but keeps Supporter unlock (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,H.jsx)(c,{children:`Erase all save progress…`})})]})})}),(0,H.jsxs)(s,{cancelLabel:`Cancel`,confirmLabel:`Reboot`,confirmVariant:`prestige`,onCancel:()=>D(!1),onConfirm:ve,open:E,title:`Reboot?`,children:[(0,H.jsxs)(`p`,{children:[`Awards `,j,` `,N(j),` and resets the Byte Foundry for a deep reset — Factory itself stays permanently reachable, no gate to tap back through.`]}),(0,H.jsxs)(`p`,{children:[(0,H.jsx)(`strong`,{children:`Resets:`}),` Foundry generator upgrades, Data Stream Capacity, Disks, Compute entities, Byte Factory tiers and resources, unspent PP and Purge count, Compression level, and Compute owned units.`]}),(0,H.jsxs)(`p`,{children:[(0,H.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause flags, Overflow mode latch, System log, Compute page reveal, Flops autobuyer unlocks, Kernels (+ award), and hyperscalers.`]})]})]})};export{Te as default};