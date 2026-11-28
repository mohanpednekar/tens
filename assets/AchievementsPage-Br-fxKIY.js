import{Bo as e,Fs as t,Ft as n,Ho as r,It as i,Lt as a,Mt as o,Ns as s,Nt as c,Pt as l,Vo as u,an as d,bi as f,c as p,jt as m,n as h,o as g,t as _,vi as v,yi as y}from"./StatCard-DWnc7sxF.js";var b=t(s(),1),x=h(),S=g.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,C=g.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
  }
`,w=g.div`
  color: ${e=>e.theme.color.text};
  font-size: 1.1rem;
  margin-top: 0.25rem;
`,T=g.div`
  color: ${e=>e.theme.color.textMuted??e.theme.color.text};
  font-size: 0.9rem;
  margin-top: 0.15rem;
`,E=g.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`,D=g(_)`
  gap: 0.4rem;
`,O=g.h2`
  align-items: center;
  color: ${e=>e.theme.color.textMuted};
  display: flex;
  font-size: 0.85rem;
  gap: 0.5rem;
  justify-content: space-between;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`,k=g.button`
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
`,A=g.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${e=>e.theme.color.border};
  }
`,j=g.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  opacity: ${e=>e.$earned?1:.8};
`,M=g.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.82em;
`,N=g.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`,P=g.span`
  color: ${e=>e.$color};
  font-size: 0.82em;
  white-space: nowrap;
`,F=(e,t,n)=>{let r=c(e,t.condition);return r?`${n?r.target:Math.min(Math.floor(r.current),r.target)}/${r.target}`:null},I=e=>{let t=[],n={};return e.forEach(e=>{let i=r[e.id];i?(n[i.id]||(n[i.id]={key:i.id,name:i.name,levels:[]},t.push(n[i.id])),n[i.id].levels.push(e)):t.push({key:e.id,def:e})}),t},L=({game:t})=>{let{state:r}=t,[s,c]=(0,b.useState)({}),[h,g]=(0,b.useState)({}),_=(e,t)=>e(e=>({...e,[t]:!e[t]})),L=p(),R=new Set(d(r)),z=u.map(t=>({...t,members:e.filter(e=>e.group===t.id&&!e.platformDependent)})).filter(e=>e.members.length>0).filter(e=>!e.reveal||v(r,e.reveal)||e.members.some(e=>f(r,e))),B=a(r),V=z.reduce((e,t)=>e+m(r,t.id).bonus,0),H=z.reduce((e,t)=>e+m(r,t.id).total,0);return(0,x.jsxs)(S,{children:[(0,x.jsxs)(C,{children:[(0,x.jsx)(`h1`,{children:`Achievements`}),(0,x.jsxs)(w,{"aria-label":`total stars ${B} of ${H}`,children:[`⭐ `,B,`/`,H,V>0?` (incl. ${V} bonus)`:``]}),(0,x.jsxs)(T,{"aria-label":`star production bonus`,children:[`+`,Math.round((o(r)-1)*100),`% production`]})]}),(0,x.jsx)(E,{"aria-label":`achievements page`,children:z.map(e=>{let t=e.members.filter(e=>y(r,e.id)).length,a=R.has(e.id),o=m(r,e.id);return(0,x.jsxs)(D,{"aria-label":`${e.name} achievement group`,children:[(0,x.jsxs)(O,{children:[(0,x.jsxs)(k,{"aria-expanded":!!s[e.id],"aria-label":`${e.name} group toggle`,onClick:()=>_(c,e.id),type:`button`,children:[s[e.id]?`▾`:`▸`,` `,e.name]}),(0,x.jsxs)(P,{$color:a?L.color.good:L.color.textMuted,"aria-label":`${e.name} ${t} of ${e.members.length} earned${a?`, group complete`:``}`,children:[a?`✅ `:``,t,`/`,e.members.length,a&&o.bonus>0?` · ⭐ +${o.bonus}`:``]})]}),s[e.id]&&I(e.members).map(e=>{if(e.levels){let t=e.levels.filter(e=>y(r,e.id)).length,a=e.levels.length,o=t===a,s=e.levels.find(e=>!y(r,e.id)),c=f(r,s),u=e.levels.filter(e=>f(r,e)),d=u.length>0&&e.levels.every(t=>t.bonus===e.levels[0].bonus)?e.levels[0].bonus:null,p=e.levels.length>4,m=[...new Map(u.filter(e=>e.shortBonus&&e.bonus).map(e=>[e.shortBonus,e.bonus]))];return(0,x.jsxs)(A,{"aria-label":`${e.name} achievement level ${t} of ${a}`,style:{alignItems:`flex-start`},children:[(0,x.jsxs)(j,{$earned:t>0,children:[(0,x.jsx)(k,{"aria-expanded":!!h[e.key],"aria-label":`${e.name} details`,onClick:()=>_(g,e.key),type:`button`,children:(0,x.jsx)(`strong`,{children:e.name})}),!h[e.key]&&s&&!c&&(0,x.jsxs)(M,{children:[`Next: `,s.name]}),!h[e.key]&&s&&c&&(0,x.jsxs)(M,{children:[`Next: `,n(s),F(r,s,!1)?` (${F(r,s,!1)})`:``]}),!h[e.key]&&s&&c&&i(s)&&(0,x.jsxs)(M,{"aria-label":`${e.name} next reward`,children:[`Reward: `,i(s)]}),h[e.key]&&d&&(0,x.jsxs)(M,{children:[`Reward each level: `,d]}),h[e.key]&&p&&!d&&m.map(([e,t])=>(0,x.jsxs)(M,{children:[e,`: `,t]},e)),h[e.key]&&e.levels.map((t,a)=>{let o=y(r,t.id);if(!f(r,t))return(0,x.jsxs)(M,{"aria-label":`${e.name} level ${a+1} not yet revealed`,children:[`🔒 `,a+1,`. `,t.name]},t.id);let s=F(r,t,o);if(p){let r=d?null:i(t);return(0,x.jsxs)(M,{"aria-label":`${e.name} level ${a+1} ${o?`earned`:`not yet earned`}`,children:[o?`✅`:`🔒`,` `,a+1,`. `,n(t),s&&!o?` (${s})`:``,r?` · ${r}`:``]},t.id)}return(0,x.jsxs)(N,{children:[(0,x.jsxs)(M,{"aria-label":`${e.name} level ${a+1} ${o?`earned`:`not yet earned`}`,children:[o?`✅`:`🔒`,` `,a+1,`. `,n(t),s&&!o?` (${s})`:``]}),!d&&l(t)&&(0,x.jsxs)(M,{"aria-label":`${e.name} level ${a+1} reward ${o?`earned`:`pending`}`,children:[o?`Reward earned`:`Reward`,`: `,l(t)]})]},t.id)})]}),(0,x.jsxs)(P,{$color:o?L.color.good:L.color.textMuted,children:[o?`✅ `:t===0?`🔒 `:``,`Lv `,t,`/`,a]})]},e.key)}let{def:t}=e,a=y(r,t.id),o=t.secret&&!a,s=!o&&!f(r,t),c=o||s?null:F(r,t,a),u=o?`???`:t.name;return(0,x.jsxs)(A,{"aria-label":`${u} achievement ${a?`earned`:`not yet earned`}`,children:[(0,x.jsxs)(j,{$earned:a,children:[o||s?(0,x.jsx)(`strong`,{children:u}):(0,x.jsx)(k,{"aria-expanded":!!h[t.id],"aria-label":`${t.name} details`,onClick:()=>_(g,t.id),type:`button`,children:(0,x.jsx)(`strong`,{children:u})}),!o&&!s&&!h[t.id]&&(a?i(t):!t.selfExplanatory)&&(0,x.jsx)(M,{"aria-label":`${t.name} summary`,children:a?`Reward earned: ${i(t)}`:`${n(t)}${t.progressLabel&&c?` · ${t.progressLabel}: ${c}`:``}`}),!o&&!s&&h[t.id]&&(0,x.jsxs)(M,{children:[t.trigger,t.progressLabel&&c&&!a?` · ${t.progressLabel}: ${c}`:``]}),!o&&!s&&h[t.id]&&l(t)&&(0,x.jsxs)(M,{"aria-label":`${t.name} reward ${a?`earned`:`pending`}`,children:[a?`Reward earned`:`Reward`,`: `,l(t)]})]}),(0,x.jsxs)(P,{$color:a?L.color.good:L.color.textMuted,children:[c&&!a&&!t.progressLabel?`${c} `:``,a?`✅`:`🔒`]})]},t.id)})]},e.id)})})]})};export{L as default};