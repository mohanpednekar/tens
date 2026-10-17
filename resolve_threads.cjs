const { execSync } = require('child_process');

async function resolveThreads(prNumber) {
  const query = `
    query {
      repository(owner: "mohanpednekar", name: "tens") {
        pullRequest(number: ${prNumber}) {
          id
          reviewThreads(first: 100) {
            nodes {
              id
              isResolved
            }
          }
        }
      }
    }
  `;

  const token = process.env.GITHUB_TOKEN;
  const curlCmd = `curl -s -H "Authorization: bearer ${token}" -X POST -d '{"query": ${JSON.stringify(query)}}' https://api.github.com/graphql`;
  const result = JSON.parse(execSync(curlCmd, { encoding: 'utf8' }));

  const threads = result.data.repository.pullRequest.reviewThreads.nodes;
  const unresolvedThreads = threads.filter(t => !t.isResolved);

  for (const thread of unresolvedThreads) {
    const mutation = `
      mutation {
        resolveReviewThread(input: {threadId: "${thread.id}"}) {
          thread {
            isResolved
          }
        }
      }
    `;
    const mutCmd = `curl -s -H "Authorization: bearer ${token}" -X POST -d '{"query": ${JSON.stringify(mutation)}}' https://api.github.com/graphql`;
    execSync(mutCmd);
    console.log(`Resolved thread ${thread.id} in PR ${prNumber}`);
  }
}

async function run() {
  const prs = [827, 823, 822, 821];
  for (const pr of prs) {
    await resolveThreads(pr);
  }
}

run();
