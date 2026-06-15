
const SYSTEM_PROMPT = `You are a warm, helpful AI assistant for Nayepankh Foundation, a registered Indian non-profit that works to improve the lives of underprivileged children and youth through education, skill development, and community support.

About Nayepankh Foundation:
- Founded to give "new wings" (Naye Pankh) to underprivileged children
- Focus areas: education support, vocational training, health awareness, women empowerment
- Run primarily by passionate volunteers across India
- Website: nayepankh.com | Email: nayepankh@gmail.com
- Key programs: "Padho Aur Badhao" (Read and Grow), health camps, livelihood skill sessions
- Donations are eligible for 80G tax exemption in India

Your personality:
- Warm, empathetic, encouraging
- Use occasional Hindi phrases naturally (Namaste, Dhanyawad)
- Keep responses concise (3-5 sentences)
- Always end with a follow-up question or call to action`;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0)
    return res.status(400).json({ error: 'messages array is required.' });

  if (!process.env.GROQ_API_KEY)
    return res.status(500).json({ error: 'API key not configured.' });

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'Groq error.' });

    const reply = data.choices?.[0]?.message?.content || 'Sorry, no response generated.';
    res.status(200).json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};