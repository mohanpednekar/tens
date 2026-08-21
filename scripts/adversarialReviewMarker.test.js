import {
  formatAdversarialReviewMarker,
  parseAdversarialReviewMarker,
  hasAdversarialApproveForHead,
} from './adversarialReviewMarker.js';

describe('adversarialReviewMarker', () => {
  const sha = 'abcdef0123456789abcdef0123456789abcdef01';

  it('formats and parses a round-trip APPROVE marker', () => {
    const marker = formatAdversarialReviewMarker(sha, 'APPROVE');
    expect(marker).toBe(
      `<!-- adversarial-review sha=${sha} verdict=APPROVE -->`,
    );
    expect(parseAdversarialReviewMarker(`Review done.\n\n${marker}\n`)).toEqual({
      sha,
      verdict: 'APPROVE',
    });
  });

  it('normalizes NEEDS CHANGES spacing to NEEDS_CHANGES', () => {
    expect(formatAdversarialReviewMarker(sha, 'NEEDS CHANGES')).toContain(
      'verdict=NEEDS_CHANGES',
    );
  });

  it('hasAdversarialApproveForHead requires APPROVE on the current head', () => {
    const approve = formatAdversarialReviewMarker(sha, 'APPROVE');
    const block = formatAdversarialReviewMarker(sha, 'BLOCK');
    const other = formatAdversarialReviewMarker('1111111111111111111111111111111111111111', 'APPROVE');

    expect(hasAdversarialApproveForHead([approve], sha)).toBe(true);
    expect(hasAdversarialApproveForHead([block], sha)).toBe(false);
    expect(hasAdversarialApproveForHead([other], sha)).toBe(false);
    expect(
      hasAdversarialApproveForHead(
        [approve],
        'ffffffffffffffffffffffffffffffffffffffff',
      ),
    ).toBe(false);
  });
});
