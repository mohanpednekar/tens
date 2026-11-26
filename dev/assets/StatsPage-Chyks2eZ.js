import{B as e,Ct as t,D as n,Dt as r,Et as i,F as a,H as o,I as s,K as c,N as l,P as u,R as d,S as f,V as p,W as m,Y as h,Z as g,_,_t as v,at as y,b,f as x,g as S,ht as C,j as w,k as T,m as E,o as D,u as O,v as k,z as A}from"./index-DzlDasfX.js";var j=r(i(),1),M=e=>Number.isFinite(Number(e))?Math.max(0,Number(e)):0,N=e=>E(Math.floor(M(e))),P=(e,t)=>t>0?Math.min(1,M(e)/t):0,F=e=>`+${E(Math.round((M(e)-1)*1e3)/10)}%`,I=e=>`×${E(Math.round(M(e)*100)/100)}`,L=e=>l(e),R=e=>{let t=A(M(e.purge?.count),!!e.prestigeSpeedBonusUnlocked),n=d(e),r=f(e);return{purge:t,playtime:n,stars:r,total:t*n*r}},z=()=>g.filter(e=>!e.platformDependent),B=e=>({reached:t.filter(t=>M(e.owned?.[t.id])>0||M(e.purchased?.[t.id])>0),completedLevels:t.reduce((t,n)=>t+Math.max(0,M(e.purchaseLevels?.[n.id]??1)-1),0)}),V=e=>{let t=0,n=0;return Object.values(e.daily?.results??{}).forEach(e=>{Object.values(e??{}).forEach(e=>{e?.won&&(t+=1),n+=M(e?.attempts)})}),{wins:t,attempts:n}},H=e=>[{id:`playTime`,icon:`⏱️`,label:`Play time`,value:b(e.activePlaySeconds)},L(e)>0?{id:`purges`,icon:`🧹`,label:`Purges`,value:N(L(e))}:{id:`pings`,icon:`📡`,label:`Pings`,value:N(e.achievements?.counters?.pings)},{id:`stars`,icon:`⭐`,label:`Stars`,value:N(n(e))},{id:`bonus`,icon:`🚀`,label:`Bonus`,value:I(R(e).total)}],U=n=>{let r=L(n),i=M(n.era?.count),l=n.achievements?.counters??{},d=!!n.intro?.mainGameUnlocked,f=[];if(f.push({id:`time`,name:`Time`,icon:`⏱️`,tone:`info`,stats:[{id:`activePlay`,label:`Active play`,value:b(n.activePlaySeconds)},...r>0?[{id:`cycle`,label:`This Purge`,value:b(n.purge?.cycleSeconds)}]:[],{id:`sleepCap`,label:`Sleep mode cap`,value:b(u(n))},...n.challenges?.active?[{id:`challengeTime`,label:`Challenge run`,value:b(n.challenges.activeSeconds)}]:[]]}),d){let{reached:r,completedLevels:i}=B(n),a=M(n.resources?.[v]),o=r[r.length-1],c=s(n),l=p(a,e(n));f.push({id:`factory`,name:`Factory`,icon:`🏭`,tone:`accent`,stats:[{id:`balance`,label:`Balance`,value:_(a)},{id:`googol`,label:n.challenges?.active?`To goal`:`To Googol`,value:`${E(l)}%`,progress:l/100},{id:`tiers`,label:`Tiers reached`,value:`${r.length}/${t.length}`,progress:P(r.length,t.length)},{id:`highestTier`,label:`Top tier`,value:o?o.name:`—`},{id:`levels`,label:`Levels completed`,value:N(i)},...n.globalTickspeedMultiplier!==null&&n.globalTickspeedMultiplier!==void 0?[{id:`accelerate`,label:`Accelerate`,value:`Lv ${N(n.globalTickspeedMultiplier)}`}]:[],...M(n.scaleUpCount)>0?[{id:`scaleUps`,label:`Scale Ups`,value:N(n.scaleUpCount)}]:[],...c===null?[]:[{id:`overclock`,label:`Overclock`,value:`Lv ${N(c)}`}]]})}if(f.push({id:`foundry`,name:`Foundry`,icon:`🔧`,tone:`good`,stats:[{id:`pings`,label:`Pings`,value:N(l.pings)},{id:`capacity`,label:`Capacity`,value:k(M(n.intro?.capacity),a(M(n.intro?.capacity),!!n.intro?.byteCreated))},{id:`pools`,label:`Pools live`,value:`${m(n)}/${o()}`,progress:P(m(n),o())},{id:`flushed`,label:`Pools flushed`,value:`${T(n)}/${o()}`,progress:P(T(n),o())},{id:`reformats`,label:`Reformats`,value:N(l.reformats)}]}),r>0){let e=n.prestigeMuseum?.history?.[0];f.push({id:`purge`,name:`Purge`,icon:`🧹`,tone:`warn`,stats:[{id:`lifetime`,label:`Lifetime Purges`,value:N(r)},{id:`points`,label:`Purge Points`,value:`${N(n.purge?.points)} PP`},{id:`best`,label:`Best award`,value:`${N(n.purge?.highestAward)} PP`},...e?[{id:`last`,label:`Last award`,value:`${N(e.pointsAwarded)} PP`}]:[],{id:`compression`,label:`Compression`,value:`Lv ${N(n.prestigeDoublePpLevel)}`},{id:`overflow`,label:`Overflow mode`,value:h(n)?`On`:`Locked`},...M(l.handsFreePurges)>0?[{id:`handsFree`,label:`Hands-free Purges`,value:N(l.handsFreePurges)}]:[]]})}if(n.computeFlops?.pageUnlocked){let e=y.reduce((e,t)=>e+M(n.computeFlops?.owned?.[t.id]),0),t=y.filter(e=>M(n.computeFlops?.owned?.[e.id])>0).length;f.push({id:`compute`,name:`Compute`,icon:`🖥️`,tone:`violet`,stats:[{id:`flops`,label:`Flops boost`,value:S(w(n))},{id:`units`,label:`Units owned`,value:N(e)},{id:`tiers`,label:`Tiers owned`,value:`${t}/${y.length}`,progress:P(t,y.length)}]})}if(i>0&&f.push({id:`reboot`,name:`Reboot`,icon:`⏻`,tone:`danger`,stats:[{id:`reboots`,label:`Reboots`,value:N(i)},{id:`kernels`,label:`Kernels`,value:N(n.eons?.balance)},{id:`kernelsEarned`,label:`Kernels earned`,value:N(Math.max(M(l.kernelsEarned),M(n.eons?.balance)))},{id:`hyperscalers`,label:`Hyperscalers`,value:N(n.hyperscalerCount)}]}),r>0){let e=[...C].filter(e=>n.challenges?.completed?.[e]).length,t=V(n);f.push({id:`challenges`,name:`Challenges`,icon:`🏁`,tone:`info`,stats:[{id:`completed`,label:`Completed`,value:`${e}/${C.size}`,progress:P(e,C.size)},{id:`entered`,label:`Runs started`,value:N(n.challenges?.enteredCount)},{id:`dailyWins`,label:`Daily wins`,value:N(t.wins)},{id:`dailyAttempts`,label:`Daily attempts`,value:N(t.attempts)}]})}let g=z(),x=g.filter(e=>c(n,e.id)).length,D=R(n);return f.push({id:`bonuses`,name:`Bonuses`,icon:`🚀`,tone:`warn`,stats:[{id:`achievements`,label:`Achievements`,value:`${x}/${g.length}`,progress:P(x,g.length)},{id:`stars`,label:`Star bonus`,value:F(D.stars)},...n.prestigeSpeedBonusUnlocked?[{id:`purgeBonus`,label:`Purge bonus`,value:I(D.purge)}]:[],...n.playtimeBonusUnlocked?[{id:`playtimeBonus`,label:`Playtime bonus`,value:F(D.playtime)}]:[],{id:`total`,label:`Bonus multiplier`,value:I(D.total),wide:!0}]}),f},W=O(),G=x.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,K=x.h1`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
`,q=x.div`
  display: grid;
  gap: 0.6rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`,J=x(D)`
  align-items: center;
  background: linear-gradient(160deg, ${e=>e.theme.color.surfaceRaised}, ${e=>e.theme.color.surface});
  gap: 0.15rem;
  padding: 0.75rem 0.5rem;
  text-align: center;
`,Y=x.span`
  font-size: 1.4rem;
  line-height: 1;
`,X=x.span`
  font-family: ${e=>e.theme.font.display};
  font-size: 1.25rem;
  font-weight: 700;
  overflow-wrap: anywhere;
`,Z=x.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.78rem;
  letter-spacing: 0.03em;
`,Q=x(D)`
  border-left: 3px solid ${e=>e.theme.color[e.$tone]??e.theme.color.accent};
  gap: 0.55rem;
`,$=x.button`
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
`,ee=x.dl`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`,te=x.div`
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
`,ne=x.div`
  background: ${e=>e.theme.color.border};
  border-radius: 999px;
  height: 4px;
  overflow: hidden;

  span {
    background: ${e=>e.theme.color[e.$tone]??e.theme.color.accent};
    display: block;
    height: 100%;
  }
`,re=({game:e})=>{let{state:t}=e,[n,r]=(0,j.useState)({}),i=H(t),a=U(t);return(0,W.jsxs)(G,{"aria-label":`stats page`,children:[(0,W.jsx)(K,{children:`Stats`}),(0,W.jsx)(q,{"aria-label":`stats overview`,children:i.map(e=>(0,W.jsxs)(J,{$raised:!0,"aria-label":`${e.label} ${e.value}`,children:[(0,W.jsx)(Y,{"aria-hidden":`true`,children:e.icon}),(0,W.jsx)(X,{children:e.value}),(0,W.jsx)(Z,{children:e.label})]},e.id))}),a.map(e=>{let t=!n[e.id];return(0,W.jsx)(ie,{open:t,section:e,onToggle:()=>r(t=>({...t,[e.id]:!t[e.id]}))},e.id)})]})},ie=({section:e,open:t,onToggle:n})=>(0,W.jsxs)(Q,{$tone:e.tone,"aria-label":`${e.name} stats`,children:[(0,W.jsxs)($,{"aria-expanded":t,"aria-label":`${e.name} stats toggle`,onClick:n,type:`button`,children:[(0,W.jsx)(`span`,{"aria-hidden":`true`,children:t?`▾`:`▸`}),(0,W.jsx)(`span`,{"aria-hidden":`true`,children:e.icon}),e.name]}),t&&(0,W.jsx)(ee,{children:e.stats.map(t=>(0,W.jsxs)(te,{$wide:t.wide,children:[(0,W.jsx)(`dt`,{children:t.label}),(0,W.jsx)(`dd`,{"aria-label":`${t.label} ${t.value}`,children:t.value}),t.progress!==void 0&&(0,W.jsx)(ne,{$tone:e.tone,"aria-hidden":`true`,children:(0,W.jsx)(`span`,{style:{width:`${Math.round(Math.min(1,Math.max(0,t.progress))*100)}%`}})})]},t.id))})]});export{re as default};