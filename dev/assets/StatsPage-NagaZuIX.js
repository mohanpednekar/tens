import{$o as e,Bo as t,Ct as n,Dr as r,Et as i,Fs as a,Hr as o,Kr as s,Lt as c,Mt as l,Ns as u,Os as d,Tr as f,_a as p,_i as m,_r as h,br as g,bt as _,gn as v,gs as y,ht as b,in as x,n as S,ni as C,o as w,qr as T,t as E,vs as D,xr as O,yi as k,yt as A}from"./StatCard-DWnc7sxF.js";var j=a(u(),1),M=e=>Number.isFinite(Number(e))?Math.max(0,Number(e)):0,N=e=>b(Math.floor(M(e))),P=(e,t)=>t>0?Math.min(1,M(e)/t):0,F=e=>`+${b(Math.round((M(e)-1)*1e3)/10)}%`,I=e=>`×${b(Math.round(M(e)*100)/100)}`,L=e=>h(e),R=e=>{let t=o(M(e.purge?.count),!!e.prestigeSpeedBonusUnlocked),n=r(e),i=l(e);return{purge:t,playtime:n,stars:i,total:t*n*i}},z=()=>t.filter(e=>!e.platformDependent),B=e=>({reached:d.filter(t=>M(e.owned?.[t.id])>0||M(e.purchased?.[t.id])>0),completedLevels:d.reduce((t,n)=>t+Math.max(0,M(e.purchaseLevels?.[n.id]??1)-1),0)}),V=e=>{let t=0,n=0;return Object.values(e.daily?.results??{}).forEach(e=>{Object.values(e??{}).forEach(e=>{e?.won&&(t+=1),n+=M(e?.attempts)})}),{wins:t,attempts:n}},H=e=>[{id:`playTime`,icon:`⏱️`,label:`Play time`,value:i(e.activePlaySeconds)},L(e)>0?{id:`purges`,icon:`🧹`,label:`Purges`,value:N(L(e))}:{id:`pings`,icon:`📡`,label:`Pings`,value:N(e.achievements?.counters?.pings)},{id:`stars`,icon:`⭐`,label:`Stars`,value:N(c(e))},{id:`bonus`,icon:`🚀`,label:`Bonus`,value:I(R(e).total)}],U=t=>{let r=L(t),a=M(t.era?.count),o=t.achievements?.counters??{},c=!!t.intro?.mainGameUnlocked,l=[];if(l.push({id:`time`,name:`Time`,icon:`⏱️`,tone:`info`,stats:[{id:`activePlay`,label:`Active play`,value:i(t.activePlaySeconds)},...r>0?[{id:`cycle`,label:`This Purge`,value:i(t.purge?.cycleSeconds)}]:[],{id:`sleepCap`,label:`Sleep mode cap`,value:i(g(t))},...t.challenges?.active?[{id:`challengeTime`,label:`Challenge run`,value:i(t.challenges.activeSeconds)}]:[]]}),c){let{reached:e,completedLevels:n}=B(t),r=M(t.resources?.[D]),i=e[e.length-1],a=f(t),o=T(r,s(t));l.push({id:`factory`,name:`Factory`,icon:`🏭`,tone:`accent`,stats:[{id:`balance`,label:`Balance`,value:_(r)},{id:`googol`,label:t.challenges?.active?`To goal`:`To Googol`,value:`${b(o)}%`,progress:o/100},{id:`tiers`,label:`Tiers reached`,value:`${e.length}/${d.length}`,progress:P(e.length,d.length)},{id:`highestTier`,label:`Top tier`,value:i?i.name:`—`},{id:`levels`,label:`Levels completed`,value:N(n)},...t.globalTickspeedMultiplier!==null&&t.globalTickspeedMultiplier!==void 0?[{id:`accelerate`,label:`Accelerate`,value:`Lv ${N(t.globalTickspeedMultiplier)}`}]:[],...M(t.scaleUpCount)>0?[{id:`scaleUps`,label:`Scale Ups`,value:N(t.scaleUpCount)}]:[],...a===null?[]:[{id:`overclock`,label:`Overclock`,value:`Lv ${N(a)}`}]]})}if(l.push({id:`foundry`,name:`Foundry`,icon:`🔧`,tone:`good`,stats:[{id:`pings`,label:`Pings`,value:N(o.pings)},{id:`capacity`,label:`Capacity`,value:n(M(t.intro?.capacity),O(M(t.intro?.capacity),!!t.intro?.byteCreated))},{id:`pools`,label:`Pools live`,value:`${m(t)}/${C()}`,progress:P(m(t),C())},{id:`flushed`,label:`Pools flushed`,value:`${x(t)}/${C()}`,progress:P(x(t),C())},{id:`reformats`,label:`Reformats`,value:N(o.reformats)}]}),r>0){let e=t.prestigeMuseum?.history?.[0];l.push({id:`purge`,name:`Purge`,icon:`🧹`,tone:`warn`,stats:[{id:`lifetime`,label:`Lifetime Purges`,value:N(r)},{id:`points`,label:`Purge Points`,value:`${N(t.purge?.points)} PP`},{id:`best`,label:`Best award`,value:`${N(t.purge?.highestAward)} PP`},...e?[{id:`last`,label:`Last award`,value:`${N(e.pointsAwarded)} PP`}]:[],{id:`compression`,label:`Compression`,value:`Lv ${N(t.prestigeDoublePpLevel)}`},{id:`overflow`,label:`Overflow mode`,value:p(t)?`On`:`Locked`},...M(o.handsFreePurges)>0?[{id:`handsFree`,label:`Hands-free Purges`,value:N(o.handsFreePurges)}]:[]]})}if(t.computeFlops?.pageUnlocked){let n=e.reduce((e,n)=>e+M(t.computeFlops?.owned?.[n.id]),0),r=e.filter(e=>M(t.computeFlops?.owned?.[e.id])>0).length;l.push({id:`compute`,name:`Compute`,icon:`🖥️`,tone:`violet`,stats:[{id:`flops`,label:`Flops boost`,value:A(v(t))},{id:`units`,label:`Units owned`,value:N(n)},{id:`tiers`,label:`Tiers owned`,value:`${r}/${e.length}`,progress:P(r,e.length)}]})}if(a>0&&l.push({id:`reboot`,name:`Reboot`,icon:`⏻`,tone:`danger`,stats:[{id:`reboots`,label:`Reboots`,value:N(a)},{id:`kernels`,label:`Kernels`,value:N(t.eons?.balance)},{id:`kernelsEarned`,label:`Kernels earned`,value:N(Math.max(M(o.kernelsEarned),M(t.eons?.balance)))},{id:`hyperscalers`,label:`Hyperscalers`,value:N(t.hyperscalerCount)}]}),r>0){let e=[...y].filter(e=>t.challenges?.completed?.[e]).length,n=V(t);l.push({id:`challenges`,name:`Challenges`,icon:`🏁`,tone:`info`,stats:[{id:`completed`,label:`Completed`,value:`${e}/${y.size}`,progress:P(e,y.size)},{id:`entered`,label:`Runs started`,value:N(t.challenges?.enteredCount)},{id:`dailyWins`,label:`Daily wins`,value:N(n.wins)},{id:`dailyAttempts`,label:`Daily attempts`,value:N(n.attempts)}]})}let u=z(),h=u.filter(e=>k(t,e.id)).length,S=R(t);return l.push({id:`bonuses`,name:`Bonuses`,icon:`🚀`,tone:`warn`,stats:[{id:`achievements`,label:`Achievements`,value:`${h}/${u.length}`,progress:P(h,u.length)},{id:`stars`,label:`Star bonus`,value:F(S.stars)},...t.prestigeSpeedBonusUnlocked?[{id:`purgeBonus`,label:`Purge bonus`,value:I(S.purge)}]:[],...t.playtimeBonusUnlocked?[{id:`playtimeBonus`,label:`Playtime bonus`,value:F(S.playtime)}]:[],{id:`total`,label:`Bonus multiplier`,value:I(S.total),wide:!0}]}),l},W=S(),G=w.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,K=w.h1`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
`,q=w.div`
  display: grid;
  gap: 0.6rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`,J=w(E)`
  align-items: center;
  background: linear-gradient(160deg, ${e=>e.theme.color.surfaceRaised}, ${e=>e.theme.color.surface});
  gap: 0.15rem;
  padding: 0.75rem 0.5rem;
  text-align: center;
`,Y=w.span`
  font-size: 1.4rem;
  line-height: 1;
`,X=w.span`
  font-family: ${e=>e.theme.font.display};
  font-size: 1.25rem;
  font-weight: 700;
  overflow-wrap: anywhere;
`,Z=w.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.78rem;
  letter-spacing: 0.03em;
`,Q=w(E)`
  border-left: 3px solid ${e=>e.theme.color[e.$tone]??e.theme.color.accent};
  gap: 0.55rem;
`,$=w.button`
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
`,ee=w.dl`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`,te=w.div`
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
`,ne=w.div`
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