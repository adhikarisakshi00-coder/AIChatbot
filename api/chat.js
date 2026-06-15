
const SYSTEM_PROMPT = `You are a warm, helpful AI assistant for Nayepankh Foundation, a registered Indian non-profit that works to improve the lives of underprivileged children and youth through education, skill development, and community support.

About Nayepankh Foundation:
- Founded to give "new wings" (Naye Pankh) to underprivileged children
- Focus areas: education support, vocational training, health awareness, women empowerment
- Run primarily by passionate volunteers across India
- Accepts donations and volunteers — remote and on-ground
- Website: nayepankh.com | Email: nayepankh@gmail.com
- Key programs: "Padho Aur Badhao" (Read and Grow), health camps, livelihood skill sessions
- Donations are eligible for 80G tax exemption in India

Your personality:
- Warm, empathetic, and encouraging
- Use occasional Hindi phrases naturally (Namaste, Dhanyawad, Shukriya)
- Keep responses concise (3-5 sentences)
- Always end with a gentle follow-up question or call to action
- If you learn the user's name, use it naturally going forward
- Gently encourage volunteering or donating when appropriate`;

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  // Validate
  if (!Array.isArray(messages) || messages.length === 0)
    return res.status(400).json({ error: 'messages array is required.' });

  if (messages.length > 40)
    return res.status(400).json({ error: 'Too many messages in history.' });

  if (!process.env.GEMINI_API_KEY)
    return res.status(500).json({ error: 'Server configuration error.' });

  try {
    const geminiContents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: geminiContents,
        generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'Gemini API error.' });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
    res.status(200).json({ reply });

  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
