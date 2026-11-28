import{Fs as e,Ns as t,Tt as n,a as r,ba as i,bt as a,ca as o,er as s,ht as c,n as l,o as u,t as d,vi as f}from"./StatCard-DWnc7sxF.js";import{a as ee,c as p,i as m,n as h,o as g,r as _,s as v}from"./index-XdPn6-p1.js";var y=e(t(),1),b=`https://mohanpednekar.github.io/tens/`,x=`${b}privacy.html`,S=`${b}terms.html`,C;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(C||={});var w=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},T=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,E=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?T(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),ee=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new w(`"${e}" plugin is not implemented on ${c}`,C.Unimplemented)},p=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=ee(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new w(`"${e}.${t}()" is not implemented on ${c}`,C.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},m=p(`addListener`),h=p(`removeListener`),g=(e,t)=>{let n=m({eventName:e},t).then(e=>e),r=async()=>{let t=await n;await h({eventName:e,callbackId:t})},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},_=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?g:m;case`removeListener`:return h;default:return p(t)}}});return r[e]=_,l.set(e,{name:e,proxy:_,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),_},n.Exception=w,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},D=(e=>e.Capacitor=E(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),O=D.registerPlugin,k=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new D.Exception(e,C.Unimplemented)}unavailable(e=`not available`){return new D.Exception(e,C.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},A=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),j=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),M=class extends k{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=j(n).trim(),r=j(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=A(e.key),n=A(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};O(`CapacitorCookies`,{web:()=>new M});var N=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),P=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},te=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,F=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=P(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},ne=class extends k{async request(e){let t=F(e,e.webFetchExtra),n=te(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await N(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};O(`CapacitorHttp`,{web:()=>new ne});var re;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(re||={});var ie;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(ie||={});var I=class extends k{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};O(`SystemBars`,{web:()=>new I});var L=u(d)`
  gap: 0.5rem;

  h2 {
    font-size: ${e=>e.theme.type.scale.md.size};
    margin: 0;
  }

  p {
    color: ${e=>e.theme.color.textMuted};
    margin: 0;
  }
`,R=u.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
`,ae=u.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 100%;
`,oe=u.input`
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
`,z=u.p`
  color: ${e=>e.$error?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.8rem;
  margin: 0;
`,B=l(),V=u.textarea`
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
`,H={invalid_json:`That is not valid save JSON.`,incompatible_save:`That save is from an incompatible version.`,invalid_state:`That save could not be loaded.`},se=({game:e})=>{let[t,n]=(0,y.useState)(``),[r,i]=(0,y.useState)(null),a=(0,y.useRef)(null),o=async()=>{let t=e.exportSaveJson();n(t);try{await navigator.clipboard.writeText(t),i({text:`Save copied to clipboard (also shown below).`})}catch{i({text:`Save shown below — copy it manually.`})}},s=()=>{let t=URL.createObjectURL(new Blob([e.exportSaveJson()],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`tens-save.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)},c=t=>{if(!t.trim())return i({error:!0,text:`Paste a save or choose a file first.`});if(!window.confirm(`Replace the active save slot with this save? Current progress in the slot is lost.`))return;let r=e.applyCloudSave(t);i(r.ok?{text:`Save imported.`}:{error:!0,text:H[r.reason]??`Import failed.`}),r.ok&&n(``)};return(0,B.jsxs)(L,{"aria-label":`manual save section`,children:[(0,B.jsx)(`h2`,{children:`Backup / Restore`}),(0,B.jsx)(V,{"aria-label":`save JSON`,onChange:e=>n(e.target.value),placeholder:`Paste save JSON here to import`,value:t}),(0,B.jsxs)(R,{children:[(0,B.jsx)(g,{onClick:o,type:`button`,children:(0,B.jsx)(v,{children:`Copy save`})}),(0,B.jsx)(g,{onClick:s,type:`button`,children:(0,B.jsx)(v,{children:`Download file`})}),(0,B.jsx)(g,{onClick:()=>a.current?.click(),type:`button`,children:(0,B.jsx)(v,{children:`Choose file…`})}),(0,B.jsx)(g,{onClick:()=>c(t),type:`button`,children:(0,B.jsx)(v,{children:`Import`})}),(0,B.jsx)(`input`,{accept:`application/json,.json`,"aria-label":`save file`,hidden:!0,onChange:async e=>{let t=e.target.files?.[0];e.target.value=``,t&&n(await t.text())},ref:a,type:`file`})]}),r&&(0,B.jsx)(z,{$error:r.error,children:r.text})]})},U=u.div`
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
`,ce=()=>(0,B.jsxs)(L,{"aria-label":`legal section`,children:[(0,B.jsx)(`h2`,{children:`Legal`}),(0,B.jsxs)(U,{children:[(0,B.jsx)(`a`,{href:x,rel:`noopener noreferrer`,target:`_blank`,children:`Privacy Policy`}),(0,B.jsx)(`a`,{href:S,rel:`noopener noreferrer`,target:`_blank`,children:`Terms of Use`})]})]}),W={removeAds:`Ads removed — rewards are now granted instantly. Thank you!`,supportTip:`Thank you for supporting Tens!`},le=({service:e=m()})=>{let[t,n]=(0,y.useState)({removeAds:!1}),[r,i]=(0,y.useState)(!1),[a,o]=(0,y.useState)(null);if((0,y.useEffect)(()=>{if(!e.iapAvailable)return;let t=!0;return e.getEntitlements().then(e=>{t&&n(e)}),()=>{t=!1}},[e]),!e.iapAvailable)return null;let s=async(e,t)=>{i(!0),o(null);let r=await e();i(!1),r.entitlements&&n(r.entitlements),r.ok?o({error:!1,text:t}):r.cancelled||o({error:!0,text:`The store could not complete that. Please try again.`})};return(0,B.jsxs)(L,{"aria-label":`store section`,children:[(0,B.jsx)(`h2`,{children:`Store`}),(0,B.jsx)(`p`,{children:`Optional extras. Every part of the game stays free to play.`}),(0,B.jsxs)(R,{children:[(0,B.jsx)(g,{"aria-label":`buy remove ads`,disabled:r||t.removeAds,onClick:()=>s(()=>e.purchase(`removeAds`),W.removeAds),type:`button`,variant:`primary`,children:(0,B.jsx)(v,{children:t.removeAds?`Ads removed`:`Remove ads`})}),(0,B.jsx)(g,{"aria-label":`buy support tip`,disabled:r,onClick:()=>s(()=>e.purchase(`supportTip`),W.supportTip),type:`button`,variant:`neutral`,children:(0,B.jsx)(v,{children:`Leave a tip`})}),(0,B.jsx)(g,{"aria-label":`restore purchases`,disabled:r,onClick:()=>s(()=>e.restore(),`Purchases restored.`),type:`button`,variant:`ghost`,children:(0,B.jsx)(v,{children:`Restore purchases`})})]}),a&&(0,B.jsx)(z,{$error:a.error,children:a.text})]})},ue=u.main`
  width: min(520px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`,de=u.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,fe=u(R)`
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.sm};
  padding: 0.55rem 0.65rem;
  background: ${e=>e.$active?e.theme.color.surfaceSunken:`transparent`};
`,pe=u.div`
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
`,G=u.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
  margin: 0;
  padding: 0;
`,me=u.li`
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
`,he=u.svg`
  display: block;
  height: 64px;
  width: 100%;
`,K=u.p`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.85rem;
  margin: 0;
`,ge=u.div`
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;

  & > button {
    font-size: 0.78rem;
    min-height: 1.9rem;
    padding: 0.2em 0.6em;
  }
`,_e=(e,t)=>{if(!e.length)return``;let n=e.map(e=>Math.max(0,Number(e[t])||0)),r=Math.max(...n,1),i=Math.min(...n,0),a=Math.max(r-i,1);return n.map((e,t)=>{let r=n.length===1?0:t/(n.length-1)*100,o=40-(e-i)/a*40;return`${t===0?`M`:`L`}${r.toFixed(2)} ${o.toFixed(2)}`}).join(` `)},ve=u.h2`
  color: ${e=>e.$danger?e.theme.color.danger:e.theme.color.textMuted};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0.9rem 0.2rem 0.35rem;
  text-transform: uppercase;
`,ye=u.div`
  background: ${e=>e.theme.color.surface};
  border: 1px solid ${e=>e.theme.color.border};
  border-radius: ${e=>e.theme.radius.lg};
  overflow: hidden;
`,q=({label:e,danger:t=!1,children:n})=>(0,B.jsxs)(`div`,{children:[(0,B.jsx)(ve,{$danger:t,children:e}),(0,B.jsx)(ye,{children:n})]}),J=u.div`
  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,Y=r`
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
`,X=u.button`
  ${Y}
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${e=>e.theme.color.accent};
    outline-offset: -2px;
  }
`,be=u.div`
  ${Y}
`,Z=u.span`
  align-items: center;
  background: ${e=>e.theme.color.surfaceSunken};
  border-radius: ${e=>e.theme.radius.sm};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 0.9rem;
  height: 1.65rem;
  justify-content: center;
  width: 1.65rem;
`,Q=u.span`
  flex: 1 1 auto;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,xe=u.span`
  color: ${e=>e.theme.color.textMuted};
  flex-shrink: 0;
  font-size: 0.85rem;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Se=u.span`
  color: ${e=>e.theme.color.textFaint};
  flex-shrink: 0;
  transform: rotate(${e=>e.$open?`90deg`:`0deg`});
  transition: transform 120ms ease;
`,Ce=u.div`
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
`,$=({icon:e,label:t,value:n,danger:r=!1,inline:i,children:a})=>{let[o,s]=(0,y.useState)(!1);return i?(0,B.jsx)(J,{children:(0,B.jsxs)(be,{$danger:r,children:[(0,B.jsx)(Z,{"aria-hidden":`true`,children:e}),(0,B.jsx)(Q,{children:t}),i]})}):(0,B.jsxs)(J,{children:[(0,B.jsxs)(X,{$danger:r,"aria-expanded":o,"aria-label":`${t} settings`,onClick:()=>s(e=>!e),type:`button`,children:[(0,B.jsx)(Z,{"aria-hidden":`true`,children:e}),(0,B.jsx)(Q,{children:t}),n!=null&&n!==``&&(0,B.jsx)(xe,{children:n}),(0,B.jsx)(Se,{$open:o,"aria-hidden":`true`,children:`›`})]}),o&&(0,B.jsx)(Ce,{children:a})]})},we=({game:e,onReset:t,onResetByteFoundry:r,themePreference:l=`system`,onThemePreferenceChange:u})=>{let d=i(e.state),b=!!e.devModeActive,x=e.supporterUnlocked,S=!b,[C,w]=(0,y.useState)(``),[T,E]=(0,y.useState)(null),[D,O]=(0,y.useState)(!1),[k,A]=(0,y.useState)(!1),j=e.state.era?.count??0,M=e.state.eons?.balance??0,N=o(e.state),P=s(e.state),te=e.state.purge?.points??0,F=e=>e===1?`Kernel`:`Kernels`,ne=f(e.state,{kind:`rebootReached`}),re=f(e.state,{kind:`googolReached`}),ie=f(e.state,{kind:`storageUnlocked`}),I=e.state.prestigeMuseum??{history:[],pinnedIds:[]},V=new Set(I.pinnedIds??[]),H=I.history??[],U=H.filter(e=>V.has(e.id)),W=x?H:H.slice(0,1),ve=t=>{t.preventDefault();let n=e.redeemUnlockCode(C);n.ok?(w(``),E({error:!1,text:n.already?`Supporter pack already unlocked.`:`Supporter pack unlocked.`})):E({error:!0,text:`That code is not valid.`})},ye=t=>{let n=window.prompt(`Rename save slot`,t.name);n!=null&&e.renameSaveSlot(t.id,n)},J=t=>{b||d&&t.isActive||window.confirm(h(t))&&e.clearSlot(t.id)},Y=()=>{d||b||window.confirm(_())&&e.eraseAllSaveProgress()},X=()=>{o(e.state)&&(e.actions.eraAscend(),A(!1))},be=!!m().iapAvailable,Z=_e(e.opsSamples??[],`money`),Q=_e(e.opsSamples??[],`prestigePoints`);return(0,B.jsxs)(ue,{children:[(0,B.jsx)(de,{children:(0,B.jsx)(`h1`,{children:`Settings`})}),(0,B.jsxs)(q,{label:`Game`,children:[b&&(0,B.jsx)($,{icon:`💛`,label:`Test Supporter`,value:x?`Unlocked`:null,children:(0,B.jsxs)(L,{"aria-label":`test supporter section`,children:[(0,B.jsx)(`h2`,{children:`Test Supporter`}),x?(0,B.jsx)(z,{children:`Unlocked for the Dev Mode save.`}):(0,B.jsx)(g,{"aria-label":`dummy supporter checkout`,onClick:()=>O(!e.purchaseSupporterDummy().ok),type:`button`,variant:`neutral`,children:(0,B.jsx)(v,{children:`Dummy checkout (free)`})}),D&&(0,B.jsx)(z,{$error:!0,role:`alert`,children:`Couldn’t save the test unlock. Try again.`})]})}),S&&(0,B.jsx)($,{icon:`💛`,label:`Supporter`,value:x?`Unlocked`:`Free`,children:(0,B.jsxs)(L,{"aria-label":`supporter pack section`,children:[(0,B.jsx)(`h2`,{children:`Supporter pack`}),(0,B.jsx)(`p`,{children:`Optional extras for save slots, the System log, and Task Manager.`}),x?(0,B.jsxs)(z,{children:[`Unlocked. `,3,` save slots · System log · Task Manager.`]}):(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(K,{children:[`Free: `,1,` save slot. Unlock code (placeholder): `,(0,B.jsx)(`code`,{children:`TENS-SUPPORT`})]}),(0,B.jsxs)(ae,{onSubmit:ve,children:[(0,B.jsx)(oe,{"aria-label":`supporter unlock code`,autoComplete:`off`,onChange:e=>w(e.target.value),placeholder:`Enter unlock code`,value:C}),(0,B.jsx)(g,{"aria-label":`redeem supporter unlock code`,type:`submit`,variant:`primary`,children:(0,B.jsx)(v,{children:`Redeem code`})})]})]}),T&&(0,B.jsx)(z,{$error:T.error,children:T.text})]})}),(0,B.jsx)($,{icon:`💾`,label:`Save slots`,value:e.saveSlots?.find(e=>e.isActive)?.name,children:(0,B.jsxs)(L,{"aria-label":`save slots section`,children:[(0,B.jsx)(`h2`,{children:`Save slots`}),(0,B.jsx)(`p`,{children:`Independent runs on this device. Switching saves the current slot first. Reset / Clear wipe progress only — your Supporter unlock is never removed here.`}),b&&(0,B.jsx)(K,{children:`Dev Mode is active — Play/Clear are disabled here so a dev-only session can't touch a real save. Disable Dev Mode first.`}),(e.saveSlots??[]).map(t=>(0,B.jsxs)(fe,{$active:t.isActive,children:[(0,B.jsxs)(pe,{children:[(0,B.jsxs)(`strong`,{children:[t.name,t.isActive?` · active`:``]}),(0,B.jsx)(`span`,{children:t.unlocked?t.isEmpty?`Empty (starts at Byte Foundry)`:`Has saved progress`:S?`Locked — unlock Supporter pack`:`Locked`})]}),t.unlocked&&(0,B.jsxs)(R,{children:[!t.isActive&&(0,B.jsx)(g,{"aria-label":`switch to ${t.name}`,disabled:b,onClick:()=>e.switchSaveSlot(t.id),title:b?`Disable Dev Mode first`:void 0,type:`button`,variant:`primary`,children:(0,B.jsx)(v,{children:`Play`})}),(0,B.jsx)(g,{"aria-label":`rename ${t.name}`,onClick:()=>ye(t),type:`button`,variant:`neutral`,children:(0,B.jsx)(v,{children:`Rename`})}),(0,B.jsx)(g,{"aria-label":`clear ${t.name}`,disabled:b||d&&t.isActive,onClick:()=>J(t),title:b?`Disable Dev Mode first`:d&&t.isActive?`Purge first — production is frozen at 1 Googol Bytes`:`Erase this slot only (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,B.jsx)(v,{children:`Clear…`})})]})]},t.id))]})}),ne&&(0,B.jsx)($,{icon:`⏻`,label:`Reboot`,value:`${M} ${F(M)}`,children:(0,B.jsxs)(L,{"aria-label":`reboot section`,children:[(0,B.jsx)(`h2`,{children:`Reboot`}),(0,B.jsx)(`p`,{children:`Voluntary meta-prestige when you hold enough unspent Purge Points — no production freeze. Awards Kernels for future upgrades.`}),(0,B.jsxs)(R,{children:[(0,B.jsx)(`span`,{children:`Reboots`}),(0,B.jsx)(`strong`,{children:j})]}),(0,B.jsxs)(R,{children:[(0,B.jsx)(`span`,{children:`Kernels`}),(0,B.jsxs)(`strong`,{children:[M,` `,F(M)]})]}),(0,B.jsx)(`p`,{children:N?`Ready — next Reboot awards ${P} ${F(P)}.`:`Requires 1 Googol PP unspent (you have ${c(te)} PP).`}),(0,B.jsx)(g,{"aria-label":N?`Reboot — open confirmation`:`Reboot — requires 1 Googol unspent Purge Points`,disabled:!N,onClick:()=>A(!0),type:`button`,variant:`prestige`,children:(0,B.jsx)(v,{children:`⏻ Reboot…`})})]})}),re&&(0,B.jsx)($,{icon:`📜`,label:`System log`,value:x?`${H.length}`:`🔒`,children:(0,B.jsxs)(L,{"aria-label":`system log section`,children:[(0,B.jsx)(`h2`,{children:`System log`}),x?(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(`p`,{children:[`Pin standout runs — display only, no bonuses. Cap `,10,` pins.`]}),U.length>0&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(K,{children:`Pinned`}),(0,B.jsx)(G,{"aria-label":`pinned purge entries`,children:U.map(t=>(0,B.jsxs)(me,{children:[(0,B.jsxs)(`div`,{children:[(0,B.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,B.jsx)(`div`,{children:(0,B.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,n(t.moneyBits)]})})]}),(0,B.jsx)(g,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,B.jsx)(v,{children:`Unpin`})})]},`pin-${t.id}`))})]}),(0,B.jsx)(K,{children:`Recent history`}),W.length===0?(0,B.jsx)(K,{children:`No purges recorded yet.`}):(0,B.jsx)(G,{"aria-label":`system log history`,children:W.map(t=>(0,B.jsxs)(me,{children:[(0,B.jsxs)(`div`,{children:[(0,B.jsxs)(`strong`,{children:[`Purge #`,t.purgeNumber]}),(0,B.jsx)(`div`,{children:(0,B.jsxs)(`span`,{children:[`+`,t.pointsAwarded,` PP · `,a(t.moneyBits)]})})]}),V.has(t.id)?(0,B.jsx)(g,{"aria-label":`unpin purge ${t.purgeNumber}`,onClick:()=>e.actions.unpinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,B.jsx)(v,{children:`Unpin`})}):(0,B.jsx)(g,{"aria-label":`pin purge ${t.purgeNumber}`,disabled:V.size>=10,onClick:()=>e.actions.pinMuseumEntry(t.id),type:`button`,variant:`neutral`,children:(0,B.jsx)(v,{children:`Pin`})})]},t.id))})]}):(0,B.jsxs)(K,{children:[`History still records in the background.`,S&&` Unlock Supporter to browse past purges and pin up to 10.`,H.length>0&&` Latest: Purge #${H[0].purgeNumber} (+${H[0].pointsAwarded} PP).`]})]})}),ie&&(0,B.jsx)($,{icon:`📈`,label:`Task Manager`,value:x?null:`🔒`,children:(0,B.jsxs)(L,{"aria-label":`task manager section`,children:[(0,B.jsx)(`h2`,{children:`Task Manager`}),x?(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(`p`,{children:[`Live session samples (not persisted). Balance: `,n(e.state.resources?.base??0),` · PP: `,e.state.purge?.points??0]}),(0,B.jsx)(K,{children:`Bits`}),(0,B.jsx)(he,{"aria-label":`bits sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,B.jsx)(`path`,{d:Z||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})}),(0,B.jsx)(K,{children:`Purge Points`}),(0,B.jsx)(he,{"aria-label":`purge points sparkline`,role:`img`,viewBox:`0 0 100 40`,children:(0,B.jsx)(`path`,{d:Q||`M0 40`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})})]}):(0,B.jsx)(K,{children:S?`Unlock Supporter for live Bits and Purge Point sparklines.`:`Live Bits and Purge Point sparklines are locked.`})]})})]}),(0,B.jsxs)(q,{label:`Data`,children:[!1,(0,B.jsx)($,{icon:`🗄`,label:`Backup / Restore`,children:(0,B.jsx)(se,{game:e})}),be&&(0,B.jsx)($,{icon:`🛒`,label:`Store`,children:(0,B.jsx)(le,{})}),(0,B.jsx)($,{icon:`ℹ`,label:`About`,children:(0,B.jsxs)(L,{"aria-label":`about section`,children:[(0,B.jsx)(`h2`,{children:`About`}),(0,B.jsx)(`p`,{children:`Tens — an incremental game themed around powers of ten.`})]})}),(0,B.jsx)($,{icon:`⚖`,label:`Legal`,children:(0,B.jsx)(ce,{})})]}),(0,B.jsx)(q,{label:`Display`,children:(0,B.jsx)($,{icon:`🎨`,inline:(0,B.jsx)(ge,{role:`group`,"aria-label":`theme preference`,children:[{id:`system`,label:`System`},{id:`light`,label:`Light`},{id:`dark`,label:`Dark`}].map(({id:e,label:t})=>(0,B.jsx)(g,{"aria-label":`use ${e} theme`,"aria-pressed":l===e,onClick:()=>u?.(e),type:`button`,variant:l===e?`primary`:`neutral`,children:(0,B.jsx)(v,{children:t})},e))}),label:`Theme`})}),(0,B.jsx)(q,{danger:!0,label:`Danger zone`,children:(0,B.jsx)($,{danger:!0,icon:`⚠`,label:`Reset, Reformat, Erase…`,children:(0,B.jsxs)(L,{"aria-label":`danger zone`,children:[(0,B.jsx)(`h2`,{children:`Danger zone`}),(0,B.jsxs)(`p`,{children:[`Erase the `,(0,B.jsx)(`strong`,{children:`active`}),` save (“`,e.saveSlots?.find(e=>e.isActive)?.name??`Save 1`,`”) and start from the Byte Foundry. Other slots and your Supporter unlock stay.`]}),(0,B.jsxs)(g,{"aria-describedby":`settings-reset-description`,"aria-label":`Reset game`,disabled:d,onClick:t,title:d?`Purge first — production is frozen at 1 Googol Bytes`:`Erases the active save slot and starts over (asks for confirmation)`,type:`button`,variant:`danger`,children:[(0,B.jsx)(v,{children:`↺ Reset active save…`}),(0,B.jsx)(p,{id:`settings-reset-description`,children:`Erases the active save slot and starts over; other slots and Supporter unlock stay`})]}),(0,B.jsx)(`p`,{children:`Restart the Byte Foundry on the active save — Data Stream Capacity, Disks, Data Lakes and Compute entities. Compile, Upgrade Capacity, Upgrade Bitrate, Provision Disk and Data Lake upgrades/Cells then replay automatically up to your pre-reset highs. Byte Factory and Purge progress stay.`}),(0,B.jsxs)(g,{"aria-describedby":`settings-reset-foundry-description`,"aria-label":`Reformat Byte Foundry`,disabled:d,onClick:r,title:d?`Purge first — production is frozen at 1 Googol Bytes`:`Restarts the Foundry; Compile, Data Stream upgrades, Disks and Data Lakes replay automatically up to prior highs`,type:`button`,variant:`danger`,children:[(0,B.jsx)(v,{children:`↺ Reformat Byte Foundry…`}),(0,B.jsx)(p,{id:`settings-reset-foundry-description`,children:`Restarts Capacity, Storage, Data Lakes and Compute from scratch, then replays upgrades, Disks and Data Lakes automatically up to pre-reset highs; Byte Factory and Purge progress stay`})]}),(0,B.jsx)(`p`,{children:`Wipe every slot’s progress on this device. Does not remove the Supporter unlock.`}),(0,B.jsx)(g,{"aria-label":`Erase all save progress`,disabled:d||b,onClick:Y,title:b?`Disable Dev Mode first`:d?`Purge first — production is frozen at 1 Googol Bytes`:`Erases all slots but keeps Supporter unlock (asks for confirmation)`,type:`button`,variant:`danger`,children:(0,B.jsx)(v,{children:`Erase all save progress…`})})]})})}),(0,B.jsxs)(ee,{cancelLabel:`Cancel`,confirmLabel:`Reboot`,confirmVariant:`prestige`,onCancel:()=>A(!1),onConfirm:X,open:k,title:`Reboot?`,children:[(0,B.jsxs)(`p`,{children:[`Awards `,P,` `,F(P),` and resets the Byte Foundry for a deep reset — Factory itself stays permanently reachable, no gate to tap back through.`]}),(0,B.jsxs)(`p`,{children:[(0,B.jsx)(`strong`,{children:`Resets:`}),` Foundry generator upgrades, Data Stream Capacity, Disks, Compute entities, Byte Factory tiers and resources, unspent PP and Purge count, Compression level, and Compute owned units.`]}),(0,B.jsxs)(`p`,{children:[(0,B.jsx)(`strong`,{children:`Keeps:`}),` automation unlocks and pause flags, Overflow mode latch, System log, Compute page reveal, Flops autobuyer unlocks, Kernels (+ award), and hyperscalers.`]})]})]})};export{we as default};