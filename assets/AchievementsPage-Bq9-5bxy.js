import{$ as e,A as t,C as n,D as r,Dt as i,E as a,Et as o,G as s,K as c,Q as l,S as u,T as d,Z as f,f as p,o as m,p as h,q as g,u as _,w as v,x as y}from"./index-DTxREUak.js";var b=i(o(),1),x=_(),S=p.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,C=p.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
  }
`,w=p.div`
  color: ${e=>e.theme.color.text};
  font-size: 1.1rem;
  margin-top: 0.25rem;
`,T=p.div`
  color: ${e=>e.theme.color.textMuted??e.theme.color.text};
  font-size: 0.9rem;
  margin-top: 0.15rem;
`,E=p.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,D=p(m)`
  gap: 0.4rem;
`,O=p.h2`
  align-items: center;
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.85rem;
  gap: 0.5rem;
  justify-content: space-between;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,k=p.button`
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
`,A=p.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,j=p.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  opacity: ${e=>e.$earned?1:.8};
`,M=p.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
`,N=p.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`,P=p.span`
  color: ${e=>e.$color};
  font-size: 0.82em;
  white-space: nowrap;
`,F=(e,t,r)=>{let i=n(e,t.condition);return i?`${r?i.target:Math.min(Math.floor(i.current),i.target)}/${i.target}`:null},I=t=>{let n=[],r={};return t.forEach(t=>{let i=e[t.id];i?(r[i.id]||(r[i.id]={key:i.id,name:i.name,levels:[]},n.push(r[i.id])),r[i.id].levels.push(t)):n.push({key:t.id,def:t})}),n},L=({game:e})=>{let{state:n}=e,[i,o]=(0,b.useState)({}),[p,m]=(0,b.useState)({}),_=(e,t)=>e(e=>({...e,[t]:!e[t]})),L=h(),R=new Set(t(n)),z=l.map(e=>({...e,members:f.filter(t=>t.group===e.id&&!t.platformDependent)})).filter(e=>e.members.length>0).filter(e=>!e.reveal||s(n,e.reveal)||e.members.some(e=>g(n,e))),B=r(n),V=z.reduce((e,t)=>e+y(n,t.id).bonus,0),H=z.reduce((e,t)=>e+y(n,t.id).total,0);return(0,x.jsxs)(S,{children:[(0,x.jsxs)(C,{children:[(0,x.jsx)(`h1`,{children:`Achievements`}),(0,x.jsxs)(w,{"aria-label":`total stars ${B} of ${H}`,children:[`⭐ `,B,`/`,H,V>0?` (incl. ${V} bonus)`:``]}),(0,x.jsxs)(T,{"aria-label":`star production bonus`,children:[`+`,Math.round((u(n)-1)*100),`% production`]})]}),(0,x.jsx)(E,{"aria-label":`achievements page`,children:z.map(e=>{let t=e.members.filter(e=>c(n,e.id)).length,r=R.has(e.id),s=y(n,e.id);return(0,x.jsxs)(D,{"aria-label":`${e.name} achievement group`,children:[(0,x.jsxs)(O,{children:[(0,x.jsxs)(k,{"aria-expanded":!!i[e.id],"aria-label":`${e.name} group toggle`,onClick:()=>_(o,e.id),type:`button`,children:[i[e.id]?`▾`:`▸`,` `,e.name]}),(0,x.jsxs)(P,{$color:r?L.color.good:L.color.textMuted,"aria-label":`${e.name} ${t} of ${e.members.length} earned${r?`, group complete`:``}`,children:[r?`✅ `:``,t,`/`,e.members.length,r&&s.bonus>0?` · ⭐ +${s.bonus}`:``]})]}),i[e.id]&&I(e.members).map(e=>{if(e.levels){let t=e.levels.filter(e=>c(n,e.id)).length,r=e.levels.length,i=t===r,o=e.levels.find(e=>!c(n,e.id)),s=g(n,o),l=e.levels.filter(e=>g(n,e)),u=l.length>0&&e.levels.every(t=>t.bonus===e.levels[0].bonus)?e.levels[0].bonus:null,f=e.levels.length>4,h=[...new Map(l.filter(e=>e.shortBonus&&e.bonus).map(e=>[e.shortBonus,e.bonus]))];return(0,x.jsxs)(A,{"aria-label":`${e.name} achievement level ${t} of ${r}`,style:{alignItems:`flex-start`},children:[(0,x.jsxs)(j,{$earned:t>0,children:[(0,x.jsx)(k,{"aria-expanded":!!p[e.key],"aria-label":`${e.name} details`,onClick:()=>_(m,e.key),type:`button`,children:(0,x.jsx)(`strong`,{children:e.name})}),!p[e.key]&&o&&!s&&(0,x.jsxs)(M,{children:[`Next: `,o.name]}),!p[e.key]&&o&&s&&(0,x.jsxs)(M,{children:[`Next: `,d(o),F(n,o,!1)?` (${F(n,o,!1)})`:``]}),!p[e.key]&&o&&s&&a(o)&&(0,x.jsxs)(M,{"aria-label":`${e.name} next reward`,children:[`Reward: `,a(o)]}),p[e.key]&&u&&(0,x.jsxs)(M,{children:[`Reward each level: `,u]}),p[e.key]&&f&&!u&&h.map(([e,t])=>(0,x.jsxs)(M,{children:[e,`: `,t]},e)),p[e.key]&&e.levels.map((t,r)=>{let i=c(n,t.id);if(!g(n,t))return(0,x.jsxs)(M,{"aria-label":`${e.name} level ${r+1} not yet revealed`,children:[`🔒 `,r+1,`. `,t.name]},t.id);let o=F(n,t,i);if(f){let n=u?null:a(t);return(0,x.jsxs)(M,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,d(t),o&&!i?` (${o})`:``,n?` · ${n}`:``]},t.id)}return(0,x.jsxs)(N,{children:[(0,x.jsxs)(M,{"aria-label":`${e.name} level ${r+1} ${i?`earned`:`not yet earned`}`,children:[i?`✅`:`🔒`,` `,r+1,`. `,d(t),o&&!i?` (${o})`:``]}),!u&&v(t)&&(0,x.jsxs)(M,{"aria-label":`${e.name} level ${r+1} reward ${i?`earned`:`pending`}`,children:[i?`Reward earned`:`Reward`,`: `,v(t)]})]},t.id)})]}),(0,x.jsxs)(P,{$color:i?L.color.good:L.color.textMuted,children:[i?`✅ `:t===0?`🔒 `:``,`Lv `,t,`/`,r]})]},e.key)}let{def:t}=e,r=c(n,t.id),i=t.secret&&!r,o=!i&&!g(n,t),s=i||o?null:F(n,t,r),l=i?`???`:t.name;return(0,x.jsxs)(A,{"aria-label":`${l} achievement ${r?`earned`:`not yet earned`}`,children:[(0,x.jsxs)(j,{$earned:r,children:[i||o?(0,x.jsx)(`strong`,{children:l}):(0,x.jsx)(k,{"aria-expanded":!!p[t.id],"aria-label":`${t.name} details`,onClick:()=>_(m,t.id),type:`button`,children:(0,x.jsx)(`strong`,{children:l})}),!i&&!o&&!p[t.id]&&(r?a(t):!t.selfExplanatory)&&(0,x.jsx)(M,{"aria-label":`${t.name} summary`,children:r?`Reward earned: ${a(t)}`:`${d(t)}${t.progressLabel&&s?` · ${t.progressLabel}: ${s}`:``}`}),!i&&!o&&p[t.id]&&(0,x.jsxs)(M,{children:[t.trigger,t.progressLabel&&s&&!r?` · ${t.progressLabel}: ${s}`:``]}),!i&&!o&&p[t.id]&&v(t)&&(0,x.jsxs)(M,{"aria-label":`${t.name} reward ${r?`earned`:`pending`}`,children:[r?`Reward earned`:`Reward`,`: `,v(t)]})]}),(0,x.jsxs)(P,{$color:r?L.color.good:L.color.textMuted,children:[s&&!r&&!t.progressLabel?`${s} `:``,r?`✅`:`🔒`]})]},t.id)})]},e.id)})})]})};export{L as default};