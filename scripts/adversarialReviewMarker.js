/**
 * Pure helpers for the adversarial-review HTML comment marker that ties a
 * code-reviewer verdict to a PR head SHA (see docs/AUTOMATION.md).
 *
 * Marker format (single line, HTML comment so it stays out of rendered prose):
 *   <!-- adversarial-review sha=<40-hex> verdict=APPROVE|NEEDS_CHANGES|BLOCK -->
 */

const MARKER_RE =
  /<!--\s*adversarial-review\s+sha=([0-9a-f]{40})\s+verdict=(APPROVE|NEEDS_CHANGES|BLOCK)\s*-->/i;

export function formatAdversarialReviewMarker(sha, verdict) {
  if (typeof sha !== 'string' || !/^[0-9a-f]{40}$/i.test(sha)) {
    throw new Error(`invalid sha for adversarial-review marker: ${sha}`);
  }
  const normalized = String(verdict)
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '_');
  if (!['APPROVE', 'NEEDS_CHANGES', 'BLOCK'].includes(normalized)) {
    throw new Error(`invalid verdict for adversarial-review marker: ${verdict}`);
  }
  return `<!-- adversarial-review sha=${sha.toLowerCase()} verdict=${normalized} -->`;
}

export function parseAdversarialReviewMarker(text) {
  if (typeof text !== 'string') return null;
  const match = text.match(MARKER_RE);
  if (!match) return null;
  return {
    sha: match[1].toLowerCase(),
    verdict: match[2].toUpperCase(),
  };
}

/**
 * True when `comments` (array of body strings) contains an APPROVE marker whose
 * sha equals `headSha` exactly (case-insensitive). Callers should pass the PR's
 * full `headRefOid` and format markers with that same full OID.
 */
export function hasAdversarialApproveForHead(comments, headSha) {
  if (typeof headSha !== 'string' || !/^[0-9a-f]{40}$/i.test(headSha)) return false;
  const head = headSha.toLowerCase();
  const bodies = Array.isArray(comments) ? comments : [];
  return bodies.some((body) => {
    const parsed = parseAdversarialReviewMarker(body);
    if (!parsed || parsed.verdict !== 'APPROVE') return false;
    return parsed.sha === head;
  });
}
