const fs = require('fs');

function applyMerge(file, searchStr, replaceStr) {
    const content = fs.readFileSync(file, 'utf8');
    const newContent = content.replace(searchStr, replaceStr);
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Resolved conflict in ${file}`);
    } else {
        console.log(`Could not find search string in ${file}`);
    }
}

// Fix CLAUDE.md
const claudeSearch = `<<<<<<< HEAD
- \`yarn test\` is green (1736 tests). The four core test files (\`engine.test.js\`, \`layers.test.js\`,
||||||| 9ad631f
- \`yarn test\` is green (1727 tests). The four core test files (\`engine.test.js\`, \`layers.test.js\`,
=======
- \`yarn test\` is green (1729 tests). The four core test files (\`engine.test.js\`, \`layers.test.js\`,
>>>>>>> origin/main`;
const claudeReplace = `- \`yarn test\` is green (1736 tests). The four core test files (\`engine.test.js\`, \`layers.test.js\`,`;
applyMerge('CLAUDE.md', claudeSearch, claudeReplace);


// Fix docs/DESIGN_HISTORY.md
const designSearch = `<<<<<<< HEAD
=======

### The corner needle-speedometer was replaced with a center-grow bar, and each tile's header/footer reorganized around it

Player feedback: "Speedometer is taking too much space. Let's use a bar that grows and shrinks from
the middle. The 200% shall be full width. Tap bonus will be shown as the middle part of the bar.
Speed/Bandwidth at bottom centre of left half. Capacity at bottom centre of right half. The current
balance is shown in a bigger font and centred. The top left shows title and top right shows current
disks status."

The half-circle needle dial (\`MultiplierGauge\`, itself already the second design for this reading —
see "Pool gauge's separate bottom-half Data Lake arc replaced with one dial that switches meaning
once the buffer is full" above) was tall relative to how little information it actually conveyed: a
single percent reading, on a tile that also needed room for a title, a rate figure, and a balance.

**Fix.** \`MultiplierGauge\` was replaced with \`MultiplierBar\` (\`ByteFoundryPage/index.jsx\`) — a thin
horizontal bar that grows and shrinks from the track's own CENTER rather than from either edge:
\`FILL_MULTIPLIER_TAP_CAP_PERCENT\` (200%) fills the full track width, 0% is a zero-width point at
dead center. In its default \`mode="multiplier"\`, an outer layer (accent color) is sized to the TOTAL
(fill + tap bonus) reading, and a narrower inner layer (warn color) — sized to just the tap-bonus
portion — is nested in the middle of it, sharing that same center point: a live tap bonus reads as a
highlighted band right in the bar's own middle, pushing the outer edges outward as it grows and
pulling them back toward center as it decays, matching "tap bonus will be shown as the middle part
of the bar" literally. \`mode="lake"\` keeps a single info-colored layer, same as before. The bar
keeps the dial's exact \`role="progressbar"\`/\`aria-label\`/\`aria-valuenow\`/min/max contract, so no
test asserting on the readout's VALUE needed to change — only ones asserting on adjacent DOM
structure (see Verification).

Every section's tile (\`FillableStatCard\`, shared by the Data Stream card and each pool's own card)
was reorganized around the new bar's own compactness: a \`TitleRow\` (title top-left, that section's
own current full-disk count top-right — \`getFullDisksCount\`, new, replacing the rate/Bandwidth
figure that used to sit there) replaces the old 3-column \`SectionHeaderRow\` (title/gauge/rate) now
that there's no middle gauge column to keep centered; the \`MultiplierBar\` renders as its own
full-width row below that; the balance renders ALONE (no more "\`<balance>\` / \`<capacity>\`" combined
string) in a bigger \`BalanceText\` (bumped from \`type.scale.lg\` to \`xl\`), centered; and a new
\`FooterRow\` (a 2-column grid) splits the old rate/Bandwidth figure into its own left half and the
Capacity figure (previously the second half of the combined balance string) into its own right half,
each centered within its half. \`formatMemoryBalance\` (which built the combined "\`<bits>\` /
\`<capacity>\`" string) was split into \`formatMemoryBalanceValue\` and \`formatMemoryCapacityValue\`,
sharing the same shared-unit-with-self-sizing-fallback logic as before — the formatting RULE didn't
change, only that the two figures now render in different DOM locations instead of one joined
string.

**Verification.** \`yarn test\`: 1727/1727 green. Several \`App.test.jsx\` tests that asserted on the
old combined "\`<balance>\` / \`<capacity>\`" string (\`toHaveTextContent('4 bits / 1 MiB')\`, etc.) were
rewritten to assert on the balance (\`section.querySelector('p')\`, which returns \`BalanceText\` — the
first \`<p>\` in document order inside the tile; \`DataLakePanel\`'s own \`StatusText\` can add a second
\`<p>\` further down once a pool is expanded, but never before \`BalanceText\`) and the Capacity figure
separately; a test pairing the pool's heading with its Bandwidth figure as DOM siblings was rewritten
to pair Bandwidth with Capacity as \`FooterRow\` siblings instead, matching the new layout.

### The balance's decimal digit count wasn't actually stable — Intl.NumberFormat's default trimming undid the fixed 3-decimal floor

Player feedback, on the just-shipped bar redesign above: "The balance should use stable number of
digits per range to ensure readability when there are fast changes. For example, if 3.578 is a
number shown, then 5.6 should be shown as 5.600 while keeping the trailing zeros. Decide the ideal
number of significant digits per range and use it as guiding principle."

\`formatMemoryAmount\` already floored every unit-scaled amount to a fixed \`MEMORY_AMOUNT_DECIMAL_PLACES\`
(3) decimal places (\`floorToDecimals\`) — but the final render step, \`formatAmount(scaled)\`, calls
through to a \`plainNumberFormatter = new Intl.NumberFormat('en-US')\` with no \`minimumFractionDigits\`
set, so \`Intl\` trims a trailing zero by default: \`5.6\` renders as \`"5.6"\`, not \`"5.600"\`, even though
the underlying value was floored to the identical precision as \`3.578\`. For a BALANCE specifically —
a reading that changes nearly every tick — that trim makes the displayed width jitter from one tick
to the next for no reason tied to the actual magnitude of change, exactly the "fast changes"
readability problem the feedback names.

**Decision: 3 decimal places, always, is this app's guiding precision for a unit-scaled amount —
apply it project-wide already (\`MEMORY_AMOUNT_DECIMAL_PLACES\`), don't reinvent a magnitude-dependent
scheme.** A magnitude-tiered alternative was considered (fewer decimals as the integer part grows,
keeping a constant total significant-digit count, e.g. 2 decimals once the integer part reaches 2
digits) — rejected because the app's existing, already-tested convention already fixes 3 decimals
regardless of the scaled value's own integer-digit count (\`"48.828 KiB"\`, \`"97.656 KiB"\`,
\`"30.031 KiB"\` are all pre-existing tested outputs with 2-digit integer parts and 3 decimals each);
switching to a variable scheme would have been a much larger, unrequested behavior change breaking
that established precision everywhere it's used (Capacity, Bandwidth, Disk/Cache sizes), not just
fixing the specific trimming bug the feedback described. "Per range" in the feedback reads as "per
unit" here — within whatever unit a value lands in, the digit count should be stable — which the
existing flat 3-decimal floor already delivers once the trim itself is fixed.

**Fix, scoped to balances only.** Rather than changing \`formatMemoryAmount\` itself (used everywhere
on \`ByteFoundryPage\` for mostly-round, slow-changing, or exact-by-design figures — "1 KB", "100 KB"
Disk sizes, Capacity, Bandwidth — where a forced ".000" would be visual noise, not a fix), added a
parallel \`formatMemoryAmountStable\`/\`formatDiskSizeStable\` pair (\`engine.js\`) that floors to the
identical \`MEMORY_AMOUNT_DECIMAL_PLACES\` precision but formats the nonzero-and-≥1 case through a
dedicated \`Intl.NumberFormat\` with \`minimumFractionDigits\`/\`maximumFractionDigits\` both pinned to
that same constant, so a trailing zero is never trimmed. A true zero is still exempted (renders bare
"0 <unit>", not "0.000 <unit>"), matching \`formatMemoryAmount\`'s own zero handling exactly. Only the
two BALANCE call sites in \`ByteFoundryPage/index.jsx\` were switched to the stable variant:
\`formatMemoryBalanceValue\` (Data Stream) and the pool card's own buffer-balance \`BalanceText\`
(now \`formatDiskSizeStable\`) — every other figure on the same tiles (Capacity, Bandwidth, disk
sizes/costs elsewhere on the page) keeps using the ordinary trimmed formatters.

**Verification.** New \`engine.test.js\` coverage for both new exports (trailing-zero preservation,
exemption for zero, sub-1-amount formatting fallback preservation, exemption for \`bits\`/integer units).
The \`App.test.jsx\` string-assertion changes above were updated to include the preserved zeroes
(\`toHaveTextContent('3.500 KiB')\`, etc.). \`yarn test\`: 1736/1736 green (+9). \`yarn build\` succeeds.
>>>>>>> origin/main`;

let designReplace = `
### The corner needle-speedometer was replaced with a center-grow bar, and each tile's header/footer reorganized around it

Player feedback: "Speedometer is taking too much space. Let's use a bar that grows and shrinks from
the middle. The 200% shall be full width. Tap bonus will be shown as the middle part of the bar.
Speed/Bandwidth at bottom centre of left half. Capacity at bottom centre of right half. The current
balance is shown in a bigger font and centred. The top left shows title and top right shows current
disks status."

The half-circle needle dial (\`MultiplierGauge\`, itself already the second design for this reading —
see "Pool gauge's separate bottom-half Data Lake arc replaced with one dial that switches meaning
once the buffer is full" above) was tall relative to how little information it actually conveyed: a
single percent reading, on a tile that also needed room for a title, a rate figure, and a balance.

**Fix.** \`MultiplierGauge\` was replaced with \`MultiplierBar\` (\`ByteFoundryPage/index.jsx\`) — a thin
horizontal bar that grows and shrinks from the track's own CENTER rather than from either edge:
\`FILL_MULTIPLIER_TAP_CAP_PERCENT\` (200%) fills the full track width, 0% is a zero-width point at
dead center. In its default \`mode="multiplier"\`, an outer layer (accent color) is sized to the TOTAL
(fill + tap bonus) reading, and a narrower inner layer (warn color) — sized to just the tap-bonus
portion — is nested in the middle of it, sharing that same center point: a live tap bonus reads as a
highlighted band right in the bar's own middle, pushing the outer edges outward as it grows and
pulling them back toward center as it decays, matching "tap bonus will be shown as the middle part
of the bar" literally. \`mode="lake"\` keeps a single info-colored layer, same as before. The bar
keeps the dial's exact \`role="progressbar"\`/\`aria-label\`/\`aria-valuenow\`/min/max contract, so no
test asserting on the readout's VALUE needed to change — only ones asserting on adjacent DOM
structure (see Verification).

Every section's tile (\`FillableStatCard\`, shared by the Data Stream card and each pool's own card)
was reorganized around the new bar's own compactness: a \`TitleRow\` (title top-left, that section's
own current full-disk count top-right — \`getFullDisksCount\`, new, replacing the rate/Bandwidth
figure that used to sit there) replaces the old 3-column \`SectionHeaderRow\` (title/gauge/rate) now
that there's no middle gauge column to keep centered; the \`MultiplierBar\` renders as its own
full-width row below that; the balance renders ALONE (no more "\`<balance>\` / \`<capacity>\`" combined
string) in a bigger \`BalanceText\` (bumped from \`type.scale.lg\` to \`xl\`), centered; and a new
\`FooterRow\` (a 2-column grid) splits the old rate/Bandwidth figure into its own left half and the
Capacity figure (previously the second half of the combined balance string) into its own right half,
each centered within its half. \`formatMemoryBalance\` (which built the combined "\`<bits>\` /
\`<capacity>\`" string) was split into \`formatMemoryBalanceValue\` and \`formatMemoryCapacityValue\`,
sharing the same shared-unit-with-self-sizing-fallback logic as before — the formatting RULE didn't
change, only that the two figures now render in different DOM locations instead of one joined
string.

**Verification.** \`yarn test\`: 1727/1727 green. Several \`App.test.jsx\` tests that asserted on the
old combined "\`<balance>\` / \`<capacity>\`" string (\`toHaveTextContent('4 bits / 1 MiB')\`, etc.) were
rewritten to assert on the balance (\`section.querySelector('p')\`, which returns \`BalanceText\` — the
first \`<p>\` in document order inside the tile; \`DataLakePanel\`'s own \`StatusText\` can add a second
\`<p>\` further down once a pool is expanded, but never before \`BalanceText\`) and the Capacity figure
separately; a test pairing the pool's heading with its Bandwidth figure as DOM siblings was rewritten
to pair Bandwidth with Capacity as \`FooterRow\` siblings instead, matching the new layout.

### The balance's decimal digit count wasn't actually stable — Intl.NumberFormat's default trimming undid the fixed 3-decimal floor

Player feedback, on the just-shipped bar redesign above: "The balance should use stable number of
digits per range to ensure readability when there are fast changes. For example, if 3.578 is a
number shown, then 5.6 should be shown as 5.600 while keeping the trailing zeros. Decide the ideal
number of significant digits per range and use it as guiding principle."

\`formatMemoryAmount\` already floored every unit-scaled amount to a fixed \`MEMORY_AMOUNT_DECIMAL_PLACES\`
(3) decimal places (\`floorToDecimals\`) — but the final render step, \`formatAmount(scaled)\`, calls
through to a \`plainNumberFormatter = new Intl.NumberFormat('en-US')\` with no \`minimumFractionDigits\`
set, so \`Intl\` trims a trailing zero by default: \`5.6\` renders as \`"5.6"\`, not \`"5.600"\`, even though
the underlying value was floored to the identical precision as \`3.578\`. For a BALANCE specifically —
a reading that changes nearly every tick — that trim makes the displayed width jitter from one tick
to the next for no reason tied to the actual magnitude of change, exactly the "fast changes"
readability problem the feedback names.

**Decision: 3 decimal places, always, is this app's guiding precision for a unit-scaled amount —
apply it project-wide already (\`MEMORY_AMOUNT_DECIMAL_PLACES\`), don't reinvent a magnitude-dependent
scheme.** A magnitude-tiered alternative was considered (fewer decimals as the integer part grows,
keeping a constant total significant-digit count, e.g. 2 decimals once the integer part reaches 2
digits) — rejected because the app's existing, already-tested convention already fixes 3 decimals
regardless of the scaled value's own integer-digit count (\`"48.828 KiB"\`, \`"97.656 KiB"\`,
\`"30.031 KiB"\` are all pre-existing tested outputs with 2-digit integer parts and 3 decimals each);
switching to a variable scheme would have been a much larger, unrequested behavior change breaking
that established precision everywhere it's used (Capacity, Bandwidth, Disk/Cache sizes), not just
fixing the specific trimming bug the feedback described. "Per range" in the feedback reads as "per
unit" here — within whatever unit a value lands in, the digit count should be stable — which the
existing flat 3-decimal floor already delivers once the trim itself is fixed.

**Fix, scoped to balances only.** Rather than changing \`formatMemoryAmount\` itself (used everywhere
on \`ByteFoundryPage\` for mostly-round, slow-changing, or exact-by-design figures — "1 KB", "100 KB"
Disk sizes, Capacity, Bandwidth — where a forced ".000" would be visual noise, not a fix), added a
parallel \`formatMemoryAmountStable\`/\`formatDiskSizeStable\` pair (\`engine.js\`) that floors to the
identical \`MEMORY_AMOUNT_DECIMAL_PLACES\` precision but formats the nonzero-and-≥1 case through a
dedicated \`Intl.NumberFormat\` with \`minimumFractionDigits\`/\`maximumFractionDigits\` both pinned to
that same constant, so a trailing zero is never trimmed. A true zero is still exempted (renders bare
"0 <unit>", not "0.000 <unit>"), matching \`formatMemoryAmount\`'s own zero handling exactly. Only the
two BALANCE call sites in \`ByteFoundryPage/index.jsx\` were switched to the stable variant:
\`formatMemoryBalanceValue\` (Data Stream) and the pool card's own buffer-balance \`BalanceText\`
(now \`formatDiskSizeStable\`) — every other figure on the same tiles (Capacity, Bandwidth, disk
sizes/costs elsewhere on the page) keeps using the ordinary trimmed formatters.

**Verification.** New \`engine.test.js\` coverage for both new exports (trailing-zero preservation,
exemption for zero, sub-1-amount formatting fallback preservation, exemption for \`bits\`/integer units).
The \`App.test.jsx\` string-assertion changes above were updated to include the preserved zeroes
(\`toHaveTextContent('3.500 KiB')\`, etc.). \`yarn test\`: 1736/1736 green (+9). \`yarn build\` succeeds.`;
applyMerge('docs/DESIGN_HISTORY.md', designSearch, designReplace);
