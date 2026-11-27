import{Zi as e,c as t,n,o as r,oa as i,t as a}from"./StatCard-DxLPJUwt.js";var o=n(),s=r.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`,c=r.header`
  color: ${e=>e.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${e=>e.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`,l=r(a)`
  gap: 0.4rem;
`,u=r.ol`
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
`,d=r.li`
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
`,f=r.p`
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
`,p=r.span`
  color: ${e=>e.$color??e.theme.color.textMuted};
  opacity: ${e=>e.$dimmed?.75:1};
`,m=({game:n})=>{let{state:r}=n,a=t(),{purge:m}=r,h=r.era?.count??0,g=r.eons?.balance??0,_=e(r),v=[{label:`The first Kilobyte`,reached:!!r.intro?.mainGameUnlocked},{label:`Go Googol`,reached:(m.count??0)>0},{label:`Open Compute`,reached:!!r.computeFlops?.pageUnlocked},{label:`DeGoogoled`,reached:i(r)},{label:`First Reboot`,reached:h>0}],y=v.findIndex(e=>!e.reached),b=v.filter((e,t)=>e.reached||t===y),x=h>0||_||i(r);return(0,o.jsxs)(s,{children:[(0,o.jsx)(c,{children:(0,o.jsx)(`h1`,{children:`Milestones`})}),(0,o.jsxs)(l,{"aria-label":`milestones page`,children:[(0,o.jsx)(u,{"aria-label":`milestones category`,children:b.map(e=>(0,o.jsx)(d,{$reached:e.reached,"aria-label":`${e.label} milestone ${e.reached?`reached`:`not yet reached`}`,children:e.label},e.label))}),x&&(0,o.jsxs)(f,{"aria-label":`reboot status`,children:[(0,o.jsx)(`span`,{"aria-hidden":`true`,children:`⏻`}),(0,o.jsxs)(`span`,{"aria-label":`${h} reboots`,children:[(0,o.jsx)(`strong`,{children:h}),` Reboots`]}),(0,o.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),(0,o.jsxs)(`span`,{"aria-label":`${g} kernels held`,children:[(0,o.jsx)(`strong`,{children:g}),` Kernels`]}),(0,o.jsx)(`span`,{"aria-hidden":`true`,children:`·`}),_?(0,o.jsx)(p,{$color:a.color.good,"aria-label":`reboot eligible now`,children:`✅ Eligible`}):(0,o.jsx)(p,{$color:a.color.disabled,$dimmed:!0,"aria-label":`reboot locked — requires ${1e100.toExponential(0).replace(`+`,``)} unspent Purge Points`,children:`🔒 1 Googol PP`})]})]})]})};export{m as default};