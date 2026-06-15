# NayePankh Foundation — AI Chatbot

An AI-powered chatbot built for **Nayepankh Foundation** to help visitors learn about the foundation, explore volunteering opportunities, and support the mission of empowering underprivileged children across India.


##  How I Built This

This chatbot uses a three-layer architecture:

```
User (Browser)  →  Vercel Serverless Function  →  GROQ AI
```

**1. Frontend — `public/index.html`**
A single HTML + CSS + JavaScript file that renders the chat interface, handles user input, stores conversation history in memory, and sends messages to our backend API.

**2. Backend — `api/chat.js`**
A Vercel serverless function that acts as a secure proxy. It receives messages from the browser and forwards them to Groq API. The API key lives here on the server — never exposed to the user.

**3. AI — Groq**
AI model processes each message using a custom system prompt loaded with knowledge about Nayepankh Foundation — its programs, mission, values, and personality.


## Features

- **Conversational AI** — Answers questions about Nayepankh, volunteering, donations, programs, and contact details
- **Memory** — Remembers the user's name and interests during the conversation for a personalised experience
- **Quick Action Buttons** — One-tap shortcuts for the most common questions: Volunteer, Donate, About Us, Programs, Contact
- **Multi-turn Chat** — Full conversation history maintained so follow-up questions work naturally
- **Bilingual Personality** — Uses Hindi phrases naturally (Namaste, Dhanyawad, Shukriya)
- **Secure** — API key stored only on the server, never sent to the browser
- **Responsive** — Works on mobile and desktop
- **100% Free** — Google Gemini free tier (1,500 requests/day) + Vercel free hosting

---

## Project Structure

```
nayepankh-chatbot/
├── api/
│   └── chat.js         ← Vercel serverless function (AI proxy)
├── index.html          ← Frontend chat interface     
├── package.json        ← Project info
├── .env.example        ← Environment variable template
├── .gitignore          ← Keeps secrets off GitHub
└── README.md
```

## Getting Started

### Step 1 — Get a Free Groq API Key
1. Go to https://console.groq.com/keys
2. Sign in with your Google account
3. Click **Get API Key** → **Create API Key**
4. Copy the key 

### Step 2 — Push to GitHub
```bash
git init
git add .
git commit -m "NayePankh chatbot initial commit"
git remote add origin https://github.com/your-username/nayepankh-chatbot.git
git branch -M main
git push -u origin main
```

### Step 3 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → sign in with GitHub
2. Click **Add New Project** → import `nayepankh-chatbot`
3. Click **Deploy**

### Step 4 — Add Your API Key
1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add: `GROQ_API_KEY` = your key from Step 1
4. Click **Save**
5. Go to **Deployments** → click **Redeploy**

### Step 5 — Go Live 
AI chatbot is live at:
```
https://nayepankh-chat.vercel.app
```


## Environment Variables

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | Free API key from (https://console.groq.com/keys) |

## Security

| Feature | Details |
|---|---|
| API key protection | Stored only in Vercel environment, never in browser |
| Serverless proxy | Browser never calls Gemini directly |
| History limit | Max 40 messages per session |
| Input validation | Empty and oversized requests are rejected |


## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Vercel Serverless Functions (Node.js) |
| AI Model | Groq AI |
| Hosting | Vercel  |


## About Nayepankh Foundation

Nayepankh Foundation is a registered Indian non-profit dedicated to giving "new wings" (Naye Pankh) to underprivileged children and youth. The foundation works across education, vocational training, health awareness, and women empowerment — driven by passionate volunteers across India.

- Website: [nayepankh.com](https://nayepankh.com)
- Email: nayepankh@gmail.com
- Donations eligible for **80G tax exemption** in India
