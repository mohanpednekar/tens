const { execSync } = require('child_process');

async function getPrStatus(prNumber) {
  const query = `
    query {
      repository(owner: "mohanpednekar", name: "tens") {
        pullRequest(number: ${prNumber}) {
          mergeable
          reviews(first: 100) {
            nodes {
              state
            }
          }
          reviewRequests(first: 100) {
            nodes {
              requestedReviewer {
                ... on User {
                  login
                }
              }
            }
          }
        }
      }
    }
  `;

  const token = process.env.GITHUB_TOKEN;
  const curlCmd = `curl -s -H "Authorization: bearer ${token}" -X POST -d '{"query": ${JSON.stringify(query)}}' https://api.github.com/graphql`;
  const result = JSON.parse(execSync(curlCmd, { encoding: 'utf8' }));

  const pr = result.data.repository.pullRequest;
  console.log(`PR ${prNumber}:`);
  console.log(`  Mergeable: ${pr.mergeable}`);

  const approvals = pr.reviews.nodes.filter(r => r.state === 'APPROVED').length;
  const changesRequested = pr.reviews.nodes.filter(r => r.state === 'CHANGES_REQUESTED').length;
  console.log(`  Reviews: ${approvals} APPROVED, ${changesRequested} CHANGES_REQUESTED`);

  const requestedReviewers = pr.reviewRequests.nodes.map(n => n.requestedReviewer?.login).join(', ');
  console.log(`  Requested Reviewers: ${requestedReviewers || 'None'}`);
}

async function run() {
  const prs = [827, 823, 822, 821];
  for (const pr of prs) {
    await getPrStatus(pr);
  }
}

run();
