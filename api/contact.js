// Serverless contact endpoint using Nodemailer (SMTP)
// Supports Vercel (default export) and Netlify (named export `handler`) in ESM mode.
// Configure these environment variables in your deployment:
// - SMTP_USER: SMTP username (login)
// - SMTP_PASS: SMTP password (app password or SMTP credential)
// - MY_EMAIL: destination email where messages will be delivered
// Optional:
// - SMTP_HOST (default: smtp.gmail.com)
// - SMTP_PORT (default: 587)
// - SMTP_SECURE (set to 'true' for TLS on port 465)

import nodemailer from 'nodemailer';

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

function validateEmail(email) {
  // Simple RFC-like email validation
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = (process.env.SMTP_SECURE || 'false') === 'true';

  if (!user || !pass || !process.env.MY_EMAIL) {
    throw new Error('SMTP_USER, SMTP_PASS and MY_EMAIL must be set in environment');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });
}

async function handlePost(body) {
  const { name, email, message } = body || {};
  if (!name || !email || !message) {
    return { status: 400, body: { ok: false, error: 'Missing name, email or message' } };
  }
  if (!validateEmail(email)) {
    return { status: 400, body: { ok: false, error: 'Invalid email address' } };
  }

  const transporter = getTransporter();

  const mailOptions = {
    from: `${name} <${process.env.SMTP_FROM || email}>`,
    to: process.env.MY_EMAIL,
    subject: `Portfolio contact form: ${name}`,
    text: `You received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<p>You received a new message from your portfolio contact form:</p>
           <p><strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
  };

  // Send mail
  const info = await transporter.sendMail(mailOptions);
  return { status: 200, body: { ok: true, messageId: info.messageId } };
}

// Vercel / generic Node (ESM default export)
export default async function (req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.writeHead(204, jsonHeaders).end();
  }

  if (req.method !== 'POST') {
    res.writeHead(405, jsonHeaders);
    return res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
  }

  try {
    const body = req.body && Object.keys(req.body).length ? req.body : await new Promise((resolve) => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => {
        try { resolve(JSON.parse(data || '{}')); } catch (e) { resolve({}); }
      });
    });

    const result = await handlePost(body);
    res.writeHead(result.status, jsonHeaders);
    res.end(JSON.stringify(result.body));
  } catch (err) {
    console.error('contact function error:', err && err.message ? err.message : err);
    res.writeHead(500, jsonHeaders);
    res.end(JSON.stringify({ ok: false, error: 'Internal Server Error' }));
  }
}

// Netlify-style ESM handler
export const handler = async function (event, context) {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: jsonHeaders,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: jsonHeaders, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const result = await handlePost(body);
    return { statusCode: result.status, headers: jsonHeaders, body: JSON.stringify(result.body) };
  } catch (err) {
    console.error('contact function error:', err && err.message ? err.message : err);
    return { statusCode: 500, headers: jsonHeaders, body: JSON.stringify({ ok: false, error: 'Internal Server Error' }) };
  }
};

/*
Frontend example (call this from your client-side Contact form):

fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Your Name', email: 'you@example.com', message: 'Hello!' })
})
  .then(r => r.json())
  .then(data => {
    if (data.ok) console.log('Message sent');
    else console.error('Send failed', data.error);
  })
  .catch(err => console.error('Network error', err));

Notes:
- Install nodemailer in your project: `npm install nodemailer`.
- For Gmail SMTP, you may need an App Password and to enable access for less secure apps is no longer available; use App Passwords when 2FA is enabled.
*/
