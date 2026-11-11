const https = require('https');

const token = process.env.GITHUB_TOKEN;
const owner = 'mohanpednekar';
const repo = 'tens';
const prNumber = 1031;

const query = `
  query {
    repository(owner: "${owner}", name: "${repo}") {
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

const options = {
  hostname: 'api.github.com',
  path: '/graphql',
  method: 'POST',
  headers: {
    'Authorization': `bearer ${token}`,
    'User-Agent': 'Node.js',
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const result = JSON.parse(data);
    const threads = result.data.repository.pullRequest.reviewThreads.nodes;
    threads.filter(t => !t.isResolved).forEach(t => {
      const resolveMutation = `
        mutation {
          resolveReviewThread(input: {threadId: "${t.id}"}) {
            clientMutationId
          }
        }
      `;
      const req2 = https.request(options, () => {
         console.log(`Resolved thread ${t.id}`);
      });
      req2.write(JSON.stringify({ query: resolveMutation }));
      req2.end();
    });
  });
});
req.write(JSON.stringify({ query }));
req.end();
