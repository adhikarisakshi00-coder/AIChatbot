const express    = require('express');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json({ limit: '20kb' }));   // block oversized payloads
app.use(express.static('public'));           // serve index.html from /public

// Max 30 requests per IP per 15 minutes
const limiter = rateLimit({
  windowMs : 15 * 60 * 1000,
  max      : 30,
  standardHeaders: true,
  legacyHeaders  : false,
  message  : { error: 'Too many requests. Please wait a few minutes and try again.' }
});
app.use('/api/chat', limiter);

// System prompt 
const SYSTEM_PROMPT = `You are a warm, helpful AI assistant for Nayepankh Foundation,
a registered Indian non-profit that works to improve the lives of underprivileged
children and youth through education, skill development, and community support.

About Nayepankh Foundation:
- Founded to give "new wings" (Naye Pankh) to underprivileged children
- Focus areas: education support, vocational training, health awareness, women empowerment
- Run primarily by passionate volunteers across India
- Accepts donations and volunteers — remote and on-ground
- Website: nayepankh.com | Email: nayepankh@gmail.com
- Key programs: "Padho Aur Badhao" (Read & Grow), health camps, livelihood skill sessions
- Donations are eligible for 80G tax exemption in India

Your personality:
- Warm, empathetic, and encouraging
- Use occasional Hindi phrases naturally (Namaste, Dhanyawad, Shukriya)
- Keep responses concise (3–5 sentences)
- End with a gentle follow-up question or call to action
- If you learn the user's name, use it going forward
- Gently encourage volunteering or donating when appropriate

A [Memory] note at the start of a user message gives you context from earlier in the
conversation. Use it naturally without mentioning it explicitly.`;

// Chat endpoint 
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  // Basic validation
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' });
  }
  if (messages.length > 60) {
    return res.status(400).json({ error: 'Conversation too long. Please start a new chat.' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set!');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method : 'POST',
      headers: {
        'Content-Type'      : 'application/json',
        'x-api-key'         : process.env.ANTHROPIC_API_KEY,
        'anthropic-version' : '2023-06-01'
      },
      body: JSON.stringify({
        model      : 'claude-sonnet-4-6',
        max_tokens : 1000,
        system     : SYSTEM_PROMPT,
        messages
      })
    });

    if (!upstream.ok) {
      const errData = await upstream.json().catch(() => ({}));
      console.error('Anthropic API error:', errData);
      return res.status(upstream.status).json({
        error: errData?.error?.message || 'Upstream API error.'
      });
    }

    const data  = await upstream.json();
    const reply = data.content?.map(b => b.text || '').join('') || '';
    res.json({ reply });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
});
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'NayePankh Chatbot API' });
});

// Start 
app.listen(PORT, () => {
  console.log(`✅  NayePankh server running → http://localhost:${PORT}`);
  console.log(`    API key set: ${process.env.ANTHROPIC_API_KEY ? 'YES' : 'NO ⚠️'}`);
});
