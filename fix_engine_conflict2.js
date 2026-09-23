import fs from 'fs';
let content = fs.readFileSync('src/game/engine.js', 'utf8');

const headBlock = `<<<<<<< HEAD
    // We tolerate TICK_ACCUMULATION_EPSILON for reaching 1, so the max affordable budget
    // is Math.floor(budget + TICK_ACCUMULATION_EPSILON)
    const maxAttempts = Math.floor(budget + TICK_ACCUMULATION_EPSILON)

    if (maxAttempts >= 1) {
      const { affordable, totalCost } = getComputeFlopsAffordableAndCost(result, flopTier.id, maxAttempts)
      if (affordable > 0) {
        result = buyComputeFlopsTierQuantity(flopTier.id, affordable, totalCost)(result)
        budget -= affordable
=======
    if (budget >= 1 - TICK_ACCUMULATION_EPSILON) {
      const attempts = Math.floor(budget + TICK_ACCUMULATION_EPSILON)
      const spendable = clampNonNegative(result.prestige?.points ?? 0)
      const owned = clampNonNegative(result.computeFlops?.owned?.[flopTier.id] ?? 0)
      
      const { affordable } = getComputeFlopsAffordableQuantity(flopTier, owned, spendable, attempts)
      
      if (affordable > 0) {
        result = buyComputeFlopsTier(flopTier.id, affordable)(result)
        budget -= affordable
      } else {
        // Break out logic similar to original - if can't afford, we bank the remaining budget (it just stays in budget)
        // Original loop breaks and leaves budget as is.
>>>>>>> main`;

const newBlock = `    // We tolerate TICK_ACCUMULATION_EPSILON for reaching 1, so the max affordable budget
    // is Math.floor(budget + TICK_ACCUMULATION_EPSILON)
    const maxAttempts = Math.floor(budget + TICK_ACCUMULATION_EPSILON)

    if (maxAttempts >= 1) {
      const { affordable, totalCost } = getComputeFlopsAffordableAndCost(result, flopTier.id, maxAttempts)
      if (affordable > 0) {
        result = buyComputeFlopsTierQuantity(flopTier.id, affordable, totalCost)(result)
        budget -= affordable`;

content = content.replace(headBlock, newBlock);

// getComputeFlopsAffordableQuantity from main also needs to be removed since it's duplicating functionality of getComputeFlopsAffordableAndCost, or we keep HEAD's getComputeFlopsAffordableAndCost

fs.writeFileSync('src/game/engine.js', content);

let mdContent = fs.readFileSync('.jules/bolt.md', 'utf8');
mdContent = mdContent.replace(/<<<<<<< HEAD\n([\s\S]*?)=======\n([\s\S]*?)>>>>>>> main\n/g, '$1');
fs.writeFileSync('.jules/bolt.md', mdContent);
