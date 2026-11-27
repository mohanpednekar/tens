import{At as e,Fr as t,Gr as n,Ir as r,Ro as i,To as a,Tt as o,Zt as s,bs as c,ci as l,ct as u,ft as d,gr as f,gt as p,is as m,jr as h,ln as g,lr as _,mr as v,ms as y,n as b,ns as x,o as S,oa as C,oi as w,or as T,pt as E,t as D,ur as O,vs as k,yt as A}from"./StatCard-DxLPJUwt.js";var j=c(k(),1),M=e=>Number.isFinite(Number(e))?Math.max(0,Number(e)):0,N=e=>u(Math.floor(M(e))),P=(e,t)=>t>0?Math.min(1,M(e)/t):0,F=e=>`+${u(Math.round((M(e)-1)*1e3)/10)}%`,I=e=>`×${u(Math.round(M(e)*100)/100)}`,L=e=>T(e),R=e=>{let t=h(M(e.purge?.count),!!e.prestigeSpeedBonusUnlocked),n=f(e),r=o(e);return{purge:t,playtime:n,stars:r,total:t*n*r}},z=()=>a.filter(e=>!e.platformDependent),B=e=>({reached:y.filter(t=>M(e.owned?.[t.id])>0||M(e.purchased?.[t.id])>0),completedLevels:y.reduce((t,n)=>t+Math.max(0,M(e.purchaseLevels?.[n.id]??1)-1),0)}),V=e=>{let t=0,n=0;return Object.values(e.daily?.results??{}).forEach(e=>{Object.values(e??{}).forEach(e=>{e?.won&&(t+=1),n+=M(e?.attempts)})}),{wins:t,attempts:n}},H=t=>[{id:`playTime`,icon:`⏱️`,label:`Play time`,value:A(t.activePlaySeconds)},L(t)>0?{id:`purges`,icon:`🧹`,label:`Purges`,value:N(L(t))}:{id:`pings`,icon:`📡`,label:`Pings`,value:N(t.achievements?.counters?.pings)},{id:`stars`,icon:`⭐`,label:`Stars`,value:N(e(t))},{id:`bonus`,icon:`🚀`,label:`Bonus`,value:I(R(t).total)}],U=e=>{let a=L(e),o=M(e.era?.count),c=e.achievements?.counters??{},f=!!e.intro?.mainGameUnlocked,h=[];if(h.push({id:`time`,name:`Time`,icon:`⏱️`,tone:`info`,stats:[{id:`activePlay`,label:`Active play`,value:A(e.activePlaySeconds)},...a>0?[{id:`cycle`,label:`This Purge`,value:A(e.purge?.cycleSeconds)}]:[],{id:`sleepCap`,label:`Sleep mode cap`,value:A(_(e))},...e.challenges?.active?[{id:`challengeTime`,label:`Challenge run`,value:A(e.challenges.activeSeconds)}]:[]]}),f){let{reached:n,completedLevels:i}=B(e),a=M(e.resources?.[m]),o=n[n.length-1],s=v(e),c=r(a,t(e));h.push({id:`factory`,name:`Factory`,icon:`🏭`,tone:`accent`,stats:[{id:`balance`,label:`Balance`,value:E(a)},{id:`googol`,label:e.challenges?.active?`To goal`:`To Googol`,value:`${u(c)}%`,progress:c/100},{id:`tiers`,label:`Tiers reached`,value:`${n.length}/${y.length}`,progress:P(n.length,y.length)},{id:`highestTier`,label:`Top tier`,value:o?o.name:`—`},{id:`levels`,label:`Levels completed`,value:N(i)},...e.globalTickspeedMultiplier!==null&&e.globalTickspeedMultiplier!==void 0?[{id:`accelerate`,label:`Accelerate`,value:`Lv ${N(e.globalTickspeedMultiplier)}`}]:[],...M(e.scaleUpCount)>0?[{id:`scaleUps`,label:`Scale Ups`,value:N(e.scaleUpCount)}]:[],...s===null?[]:[{id:`overclock`,label:`Overclock`,value:`Lv ${N(s)}`}]]})}if(h.push({id:`foundry`,name:`Foundry`,icon:`🔧`,tone:`good`,stats:[{id:`pings`,label:`Pings`,value:N(c.pings)},{id:`capacity`,label:`Capacity`,value:p(M(e.intro?.capacity),O(M(e.intro?.capacity),!!e.intro?.byteCreated))},{id:`pools`,label:`Pools live`,value:`${w(e)}/${n()}`,progress:P(w(e),n())},{id:`flushed`,label:`Pools flushed`,value:`${s(e)}/${n()}`,progress:P(s(e),n())},{id:`reformats`,label:`Reformats`,value:N(c.reformats)}]}),a>0){let t=e.prestigeMuseum?.history?.[0];h.push({id:`purge`,name:`Purge`,icon:`🧹`,tone:`warn`,stats:[{id:`lifetime`,label:`Lifetime Purges`,value:N(a)},{id:`points`,label:`Purge Points`,value:`${N(e.purge?.points)} PP`},{id:`best`,label:`Best award`,value:`${N(e.purge?.highestAward)} PP`},...t?[{id:`last`,label:`Last award`,value:`${N(t.pointsAwarded)} PP`}]:[],{id:`compression`,label:`Compression`,value:`Lv ${N(e.prestigeDoublePpLevel)}`},{id:`overflow`,label:`Overflow mode`,value:C(e)?`On`:`Locked`},...M(c.handsFreePurges)>0?[{id:`handsFree`,label:`Hands-free Purges`,value:N(c.handsFreePurges)}]:[]]})}if(e.computeFlops?.pageUnlocked){let t=i.reduce((t,n)=>t+M(e.computeFlops?.owned?.[n.id]),0),n=i.filter(t=>M(e.computeFlops?.owned?.[t.id])>0).length;h.push({id:`compute`,name:`Compute`,icon:`🖥️`,tone:`violet`,stats:[{id:`flops`,label:`Flops boost`,value:d(g(e))},{id:`units`,label:`Units owned`,value:N(t)},{id:`tiers`,label:`Tiers owned`,value:`${n}/${i.length}`,progress:P(n,i.length)}]})}if(o>0&&h.push({id:`reboot`,name:`Reboot`,icon:`⏻`,tone:`danger`,stats:[{id:`reboots`,label:`Reboots`,value:N(o)},{id:`kernels`,label:`Kernels`,value:N(e.eons?.balance)},{id:`kernelsEarned`,label:`Kernels earned`,value:N(Math.max(M(c.kernelsEarned),M(e.eons?.balance)))},{id:`hyperscalers`,label:`Hyperscalers`,value:N(e.hyperscalerCount)}]}),a>0){let t=[...x].filter(t=>e.challenges?.completed?.[t]).length,n=V(e);h.push({id:`challenges`,name:`Challenges`,icon:`🏁`,tone:`info`,stats:[{id:`completed`,label:`Completed`,value:`${t}/${x.size}`,progress:P(t,x.size)},{id:`entered`,label:`Runs started`,value:N(e.challenges?.enteredCount)},{id:`dailyWins`,label:`Daily wins`,value:N(n.wins)},{id:`dailyAttempts`,label:`Daily attempts`,value:N(n.attempts)}]})}let b=z(),S=b.filter(t=>l(e,t.id)).length,T=R(e);return h.push({id:`bonuses`,name:`Bonuses`,icon:`🚀`,tone:`warn`,stats:[{id:`achievements`,label:`Achievements`,value:`${S}/${b.length}`,progress:P(S,b.length)},{id:`stars`,label:`Star bonus`,value:F(T.stars)},...e.prestigeSpeedBonusUnlocked?[{id:`purgeBonus`,label:`Purge bonus`,value:I(T.purge)}]:[],...e.playtimeBonusUnlocked?[{id:`playtimeBonus`,label:`Playtime bonus`,value:F(T.playtime)}]:[],{id:`total`,label:`Bonus multiplier`,value:I(T.total),wide:!0}]}),h},W=b(),G=S.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,K=S.h1`
  color: ${e=>e.theme.color.text};
  font-family: ${e=>e.theme.font.display};
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
`,q=S.div`
  display: grid;
  gap: 0.6rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`,J=S(D)`
  align-items: center;
  background: linear-gradient(160deg, ${e=>e.theme.color.surfaceRaised}, ${e=>e.theme.color.surface});
  gap: 0.15rem;
  padding: 0.75rem 0.5rem;
  text-align: center;
`,Y=S.span`
  font-size: 1.4rem;
  line-height: 1;
`,X=S.span`
  font-family: ${e=>e.theme.font.display};
  font-size: 1.25rem;
  font-weight: 700;
  overflow-wrap: anywhere;
`,Z=S.span`
  color: ${e=>e.theme.color.textMuted};
  font-size: 0.78rem;
  letter-spacing: 0.03em;
`,Q=S(D)`
  border-left: 3px solid ${e=>e.theme.color[e.$tone]??e.theme.color.accent};
  gap: 0.55rem;
`,$=S.button`
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
`,ee=S.dl`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`,te=S.div`
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
`,ne=S.div`
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