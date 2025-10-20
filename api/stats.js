// Serverless function to fetch GitHub user stats using a server-side PAT.
// This keeps the PAT off the client bundle. Set GITHUB_PAT and optionally GITHUB_USER
// as environment variables in your deployment or local environment.

const GITHUB_API = 'https://api.github.com/graphql';

async function fetchGithubUser(login) {
  // Use a server-side environment variable (do NOT prefix with VITE_).
  // VITE_ variables are embedded into the client bundle by Vite and must not be used for secrets.
  const token = process.env.GITHUB_PAT || process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_PAT (or GITHUB_TOKEN) not configured in environment');

  const query = `query userInfo($login: String!) {\n  user(login: $login) {\n    name\n    login\n    avatarUrl\n    url\n    followers { totalCount }\n    following { totalCount }\n    repositories(privacy: PUBLIC) { totalCount }\n    contributionsCollection {\n      contributionCalendar {\n        totalContributions\n        weeks {\n          contributionDays {\n            date\n            contributionCount\n          }\n        }\n      }\n    }\n  }\n}`;

  const resp = await fetch(GITHUB_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ query, variables: { login } }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`GitHub API error: ${resp.status} ${text}`);
  }

  const payload = await resp.json();
  if (payload.errors) throw new Error(payload.errors.map((e) => e.message).join('; '));
  return payload.data.user;
}

async function handleRequest(login) {
  const user = await fetchGithubUser(login);
  return { user };
}

// Vercel / standard Node handler
export default async function handler(req, res) {
  const login = (req.query && req.query.login) || process.env.GITHUB_USER || 'bhagirathauti';
  try {
    const result = await handleRequest(login);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Netlify-compatible handler
exports.handler = async function (event, context) {
  const login = (event.queryStringParameters && event.queryStringParameters.login) || process.env.GITHUB_USER || 'bhagirathauti';
  try {
    const result = await handleRequest(login);
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
