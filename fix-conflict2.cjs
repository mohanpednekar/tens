const fs = require('fs');

const file = 'docs/DESIGN_HISTORY.md';
const content = fs.readFileSync(file, 'utf8');

const search = `<<<<<<< HEAD

### The corner needle-speedometer was replaced with a center-grow bar, and each tile's header/footer reorganized around it`;

const replace = `### A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely

A Devin Review pass on PR #603 (the fix immediately above) caught that moving the stranded check
from the write cache's SOURCE to its TARGET was itself still too narrow, one hop removed from the
same mistake: "when an intermediate target is stranded, \`canStartDiskWriteCacheMerge\` refuses to
create it. That disk can still feed the next usable size. Tier01 above level 3 therefore blocks
replenishing the 1 MB array." Concretely — 100 KB is tier01's own LAST disk-ladder step
(\`getDataLakeSubSize\` position 3 of 3); once tier01 advances past its own level 3, 100 KB is
stranded relative to tier01 — but 100 KB is also the fixed SOURCE the write cache needs to ever
build 1 MB (tier02's own first step). The immediately-preceding fix's target-stranded check saw 100
KB (as a TARGET, fed from 10 KB) already stranded under tier01 and refused to keep building it at
all, even though a further, perfectly redeemable 1 MB under tier02 depended on that exact 100 KB
disk existing. Blocking one hop up from the reported bug just relocated the same starvation to the
next tier-group boundary instead of fixing it.

**Root cause, reframed.** Every one of the last three fixes (source-stranded, then target-stranded,
now this one) shared the same false premise: that a disk which can't be redeemed by ITS OWN
corresponding tier this cycle has "nothing to gain" from being used elsewhere. That premise is
simply wrong for write-cache specifically, because \`disks\`/\`disksBuiltTotal\`/\`diskWriteCache\` are
all Prestige-permanent (see "Storage funding rebuilt push→pull" above and "A further Devin Review
finding..." for how that permanence was itself hard-won) — a container built or filled this cycle
persists into every future cycle regardless of whether the tier it corresponds to can use it RIGHT
NOW. There is also no competing use to protect against: the write-cache ladder is a strict single
chain (source N feeds exactly one target N+1, never a choice among several), so there is never a
scenario where filling a stranded-relative-to-its-own-tier disk instead of some OTHER use is a worse
choice — the alternative is always just leaving the source's already-idle full disks sitting
completely unused. The only place a genuine choice exists is between write-cache and Factory
redemption wanting the exact same physical disk on the exact same tick — \`isDiskRedeemable(source)\`
already covers that, and always did.

**Fix.** Removed every \`isDiskStrandedByAdvancedTier\` check from \`canStartDiskWriteCacheMerge\` and
\`isDiskWriteCacheCollectPaused\` (and the inline pause check inside \`tickDiskWriteCache\`'s collect
loop, which delegates to the latter). Collection now pauses ONLY while the source has an active tier
claim (\`isDiskRedeemable(source)\`) — a temporary condition that clears the moment the tier moves off
that exact level, whether into "too early" (for a size ahead of the tier) or "stranded" (for one
behind it) territory; neither stops the merge any more. \`isDiskStrandedByAdvancedTier\` itself is
unchanged and still exported — \`DiskArrayRow\` still uses it to render a size's own disks as
genuinely stranded (a fact about that size's OWN tier-redemption fate, independent of whether
write-cache is quietly still making use of it) — it simply has no remaining callers inside
\`engine.js\` itself.

**Verification.** Rewrote the two tests the immediately-preceding fix had added around target-
stranded blocking to assert the opposite (a merge starts, and continues mid-collection, even with
both source and target stranded, within tier01's own 3-step group), and added a new dedicated
regression crossing an actual tier-GROUP boundary: 100 KB (tier01's own last step, stranded under
tier01) still starts and feeds a merge into 1 MB (tier02's own first step, stranded under tier02 too)
— genuinely failing under the immediately-preceding fix's target-stranded gate (confirmed by
reverting to it and re-running). Also rewrote a \`prestigeGame\` regression test whose premise (a merge
"frozen because its source became stranded") no longer holds — repurposed it to test the one pause
reason that remains: an active tier claim on the source, which a real Prestige's purchase-level reset
genuinely does clear. \`yarn test\`: 1729/1729 green (+1 net: two tests rewritten, one new
cross-tier-boundary regression, one existing \`prestigeGame\` test repurposed). \`yarn build\` succeeds.
(A first version of the cross-tier-boundary test left the target exactly redeemable rather than
stranded, so it couldn't actually distinguish old from new behavior despite its own claim to the
contrary — caught by an adversarial review pass on this same PR and corrected; see the entry below.)

### An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim

The \`code-reviewer\` subagent, re-reviewing the write-cache fix above at commit \`4cb24a7\`, verified
its central engine change was sound but caught that the "propagates a full chain across a
tier-group boundary" test didn't actually prove what it claimed. That test set tier02 to purchase
level 1 — exactly \`megabyteSize\`'s (1 MB) own required level, so \`isDiskStrandedByAdvancedTier\`
was \`false\` for the target either way. Since the immediately-preceding fix's gate only ever
blocked on the TARGET's stranded status, a non-stranded target was never blocked under the OLD code
either — the test passed under both the buggy and fixed versions and could not have caught a
regression back to the old behavior, contrary to its own docstring and the corresponding
\`docs/DESIGN_HISTORY.md\` claim (both asserted "this would have failed under the immediately-
preceding fix's target-stranded gate"). The reviewer confirmed this empirically: reverting
\`canStartDiskWriteCacheMerge\`/\`isDiskWriteCacheCollectPaused\` to the prior target-stranded
implementation in an isolated \`git worktree\` pinned to \`4cb24a7\` and re-running the test showed it
still passed. It also confirmed the actual regression \`4cb24a7\` fixes — a target stranded relative
to its OWN tier still getting blocked — IS correctly caught by the neighboring
"ALSO starts a new merge when the TARGET is stranded too" test, which the reviewer confirmed
genuinely fails when the same revert is applied.

**Fix.** Changed the cross-tier-boundary test's fixture so tier02 sits at purchase level 2 instead
of 1, making \`megabyteSize\` (1 MB) genuinely stranded under tier02's own tier — not merely
redeemable — while \`level3Size\` (100 KB) stays stranded under tier01. Re-verified this corrected
version actually fails when the same revert is applied (confirming it now catches the regression it
claims to), then restored the fix. Corrected the matching claim in this file's entry above.

**Process note.** This is a rare case of an interactive session's own adversarial \`code-reviewer\`
subagent catching a defect the session itself introduced in its OWN prior test/doc edits (as
opposed to catching a defect in the underlying engine change) — exactly the kind of thing running
the reviewer after every final commit, not just once at the end, is meant to surface. It also
surfaced a real environmental hazard worth noting for future sessions: the reviewer's own
verification steps (reverting file contents locally to compare old vs. new behavior) executed
against the SAME shared working tree this interactive session was concurrently editing in, and at
one point ran \`git checkout --\` to restore a clean baseline — which briefly discarded this session's
own not-yet-committed edits to three files (mid-way through addressing an unrelated, earlier round
of Devin Review findings) before the session could commit them. No permanent harm resulted (the
session simply noticed via \`git status\`/content greps that its edits had vanished and redid them
before committing), but a background review agent doing file-level git operations in a working tree
another agent is actively editing is a real hazard — a future instance of this pattern should
prefer an isolated worktree from the start (as this reviewer eventually did for its authoritative
verification) rather than reverting in place, and an interactive session dispatching such a
review should commit its own in-progress edits before launching it, or expect to verify and redo
them afterward.

### The corner needle-speedometer was replaced with a center-grow bar, and each tile's header/footer reorganized around it`;

const newContent = content.replace(search, replace);

if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Resolved conflict in ${file} - block 1`);
} else {
    console.log(`Could not find search string in ${file} - block 1`);
}
