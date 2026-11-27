import{At as e,Do as t,Dt as n,Eo as r,Et as i,Ot as a,Qt as o,To as s,Tt as c,bs as l,c as u,ci as d,kt as f,li as p,n as m,o as h,si as g,t as _,vs as v,wt as y}from"./StatCard-DxLPJUwt.js";var b=l(v(),1),x=m(),S=h.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,C=h.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
  }
`,w=h.div`
  color: ${e=>e.theme.color.text};
  font-size: 1.1rem;
  margin-top: 0.25rem;
`,T=h.div`
  color: ${e=>e.theme.color.textMuted??e.theme.color.text};
  font-size: 0.9rem;
  margin-top: 0.15rem;
`,E=h.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,D=h(_)`
  gap: 0.4rem;
`,O=h.h2`
  align-items: center;
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.85rem;
  gap: 0.5rem;
  justify-content: space-between;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,k=h.button`
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
`,A=h.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,j=h.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  opacity: ${e=>e.$earned?1:.8};
`,M=h.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
`,N=h.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`,P=h.span`
  color: ${e=>e.$color};
  font-size: 0.82em;
  white-space: nowrap;
`,F=(e,t,n)=>{let r=i(e,t.condition);return r?`${n?r.target:Math.min(Math.floor(r.current),r.target)}/${r.target}`:null},I=e=>{let n=[],r={};return e.forEach(e=>{let i=t[e.id];i?(r[i.id]||(r[i.id]={key:i.id,name:i.name,levels:[]},n.push(r[i.id])),r[i.id].levels.push(e)):n.push({key:e.id,def:e})}),n},L=({game:t})=>{let{state:i}=t,[l,m]=(0,b.useState)({}),[h,_]=(0,b.useState)({}),v=(e,t)=>e(e=>({...e,[t]:!e[t]})),L=u(),R=new Set(o(i)),z=r.map(e=>({...e,members:s.filter(t=>t.group===e.id&&!t.platformDependent)})).filter(e=>e.members.length>0).filter(e=>!e.reveal||g(i,e.reveal)||e.members.some(e=>p(i,e))),B=e(i),V=z.reduce((e,t)=>e+y(i,t.id).bonus,0),H=z.reduce((e,t)=>e+y(i,t.id).total,0);return(0,x.jsxs)(S,{children:[(0,x.jsxs)(C,{children:[(0,x.jsx)(`h1`,{children:`Achievements`}),(0,x.jsxs)(w,{"aria-label":`total stars ${B} of ${H}`,children:[`⭐ `,B,`/`,H,V>0?` (incl. ${V} bonus)`:``]}),(0,x.jsxs)(T,{"aria-label":`star production bonus`,children:[`+`,Math.round((c(i)-1)*100),`% production`]})]}),(0,x.jsx)(E,{"aria-label":`achievements page`,children:z.map(e=>{let t=e.members.filter(e=>d(i,e.id)).length,r=R.has(e.id),o=y(i,e.id);return(0,x.jsxs)(D,{"aria-label":`${e.name} achievement group`,children:[(0,x.jsxs)(O,{children:[(0,x.jsxs)(k,{"aria-expanded":!!l[e.id],"aria-label":`${e.name} group toggle`,onClick:()=>v(m,e.id),type:`button`,children:[l[e.id]?`▾`:`▸`,` `,e.name]}),(0,x.jsxs)(P,{$color:r?L.color.good:L.color.textMuted,"aria-label":`${e.name} ${t} of ${e.members.length} earned${r?`, group complete`:``}`,children:[r?`✅ `:``,t,`/`,e.members.length,r&&o.bonus>0?` · ⭐ +${o.bonus}`:``]})]}),l[e.id]&&I(e.members).map(e=>{if(e.levels){let t=e.levels.filter(e=>d(i,e.id)).length,r=e.levels.length,o=t===r,s=e.levels.find(e=>!d(i,e.id)),c=p(i,s),l=e.levels.filter(e=>p(i,e)),u=l.length>0&&e.levels.every(t=>t.bonus===e.levels[0].bonus)?e.levels[0].bonus:null,m=e.levels.length>4,g=[...new Map(l.filter(e=>e.shortBonus&&e.bonus).map(e=>[e.shortBonus,e.bonus]))];return(0,x.jsxs)(A,{"aria-label":`${e.name} achievement level ${t} of ${r}`,style:{alignItems:`flex-start`},children:[(0,x.jsxs)(j,{$earned:t>0,children:[(0,x.jsx)(k,{"aria-expanded":!!h[e.key],"aria-label":`${e.name} details`,onClick:()=>v(_,e.key),type:`button`,children:(0,x.jsx)(`strong`,{children:e.name})}),!h[e.key]&&s&&!c&&(0,x.jsxs)(M,{children:[`Next: `,s.name]}),!h[e.key]&&s&&c&&(0,x.jsxs)(M,{children:[`Next: `,a(s),F(i,s,!1)?` (${F(i,s,!1)})`:``]}),!h[e.key]&&s&&c&&f(s)&&(0,x.jsxs)(M,{"aria-label":`${e.name} next reward`,children:[`Reward: `,f(s)]}),h[e.key]&&u&&(0,x.jsxs)(M,{children:[`Reward each level: `,u]}),h[e.key]&&m&&!u&&g.map(([e,t])=>(0,x.jsxs)(M,{children:[e,`: `,t]},e)),h[e.key]&&e.levels.map((t,r)=>{let o=d(i,t.id);if(!p(i,t))return(0,x.jsxs)(M,{"aria-label":`${e.name} level ${r+1} not yet revealed`,children:[`🔒 `,r+1,`. `,t.name]},t.id);let s=F(i,t,o);if(m){let n=u?null:f(t);return(0,x.jsxs)(M,{"aria-label":`${e.name} level ${r+1} ${o?`earned`:`not yet earned`}`,children:[o?`✅`:`🔒`,` `,r+1,`. `,a(t),s&&!o?` (${s})`:``,n?` · ${n}`:``]},t.id)}return(0,x.jsxs)(N,{children:[(0,x.jsxs)(M,{"aria-label":`${e.name} level ${r+1} ${o?`earned`:`not yet earned`}`,children:[o?`✅`:`🔒`,` `,r+1,`. `,a(t),s&&!o?` (${s})`:``]}),!u&&n(t)&&(0,x.jsxs)(M,{"aria-label":`${e.name} level ${r+1} reward ${o?`earned`:`pending`}`,children:[o?`Reward earned`:`Reward`,`: `,n(t)]})]},t.id)})]}),(0,x.jsxs)(P,{$color:o?L.color.good:L.color.textMuted,children:[o?`✅ `:t===0?`🔒 `:``,`Lv `,t,`/`,r]})]},e.key)}let{def:t}=e,r=d(i,t.id),o=t.secret&&!r,s=!o&&!p(i,t),c=o||s?null:F(i,t,r),l=o?`???`:t.name;return(0,x.jsxs)(A,{"aria-label":`${l} achievement ${r?`earned`:`not yet earned`}`,children:[(0,x.jsxs)(j,{$earned:r,children:[o||s?(0,x.jsx)(`strong`,{children:l}):(0,x.jsx)(k,{"aria-expanded":!!h[t.id],"aria-label":`${t.name} details`,onClick:()=>v(_,t.id),type:`button`,children:(0,x.jsx)(`strong`,{children:l})}),!o&&!s&&!h[t.id]&&(r?f(t):!t.selfExplanatory)&&(0,x.jsx)(M,{"aria-label":`${t.name} summary`,children:r?`Reward earned: ${f(t)}`:`${a(t)}${t.progressLabel&&c?` · ${t.progressLabel}: ${c}`:``}`}),!o&&!s&&h[t.id]&&(0,x.jsxs)(M,{children:[t.trigger,t.progressLabel&&c&&!r?` · ${t.progressLabel}: ${c}`:``]}),!o&&!s&&h[t.id]&&n(t)&&(0,x.jsxs)(M,{"aria-label":`${t.name} reward ${r?`earned`:`pending`}`,children:[r?`Reward earned`:`Reward`,`: `,n(t)]})]}),(0,x.jsxs)(P,{$color:r?L.color.good:L.color.textMuted,children:[c&&!r&&!t.progressLabel?`${c} `:``,r?`✅`:`🔒`]})]},t.id)})]},e.id)})})]})};export{L as default};