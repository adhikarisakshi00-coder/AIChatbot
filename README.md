#  NayePankh Foundation — AI Chatbot
An AI-powered chatbot built for **Nayepankh Foundation** to help visitors learn about the foundation, explore volunteering opportunities, and support the mission of empowering underprivileged children across India.


##  How I Built This

This chatbot was built using a simple but powerful three-layer architecture:

User (Browser)  →  Our Backend Server (Node.js)  →  Google Gemini AI


**1. Frontend (public/index.html)**
A single HTML file with vanilla JavaScript and CSS — no frameworks needed. It renders the chat UI, handles user input, maintains conversation history in memory, and sends messages to our backend.

**2. Backend (server.js)**
A Node.js + Express server that acts as a secure proxy. It receives messages from the browser and forwards them to Google Gemini's API. The API key lives here on the server — never exposed to the user.

**3. AI (Google Gemini 1.5 Flash)**
Google's free AI model processes each message and returns a response. We pass it a custom system prompt that gives it full knowledge about Nayepankh Foundation, its programs, and a warm personality.


##  Features

-  **Conversational AI** — Answers questions about Nayepankh, volunteering, donations, programs, and contact details using Google Gemini
-  **Memory** — Remembers the user's name and interests during the conversation for a personalised experience
-  **Quick Action Buttons** — One-tap shortcuts for the most common questions: Volunteer, Donate, About Us, Programs, Contact
-  **Multi-turn Chat** — Full conversation history is maintained so follow-up questions work naturally
-  **Bilingual Personality** — Uses Hindi phrases naturally (Namaste, Dhanyawad) to feel culturally relevant
-  **Secure** — API key is stored only on the server, never sent to the browser
-  **Rate Limited** — 30 requests per 15 minutes per user to prevent abuse
-  **Responsive** — Works on mobile and desktop browsers
-  **100% Free** — Powered by Google Gemini's free tier (1,500 requests/day)


##  Project Structure

```
nayepankh-chatbot/
├── public/
│   └── index.html      ← Frontend UI (chat interface)
├── server.js           ← Backend server (API proxy)
├── package.json        ← Project dependencies
├── .env.example        ← Environment variable template
├── .gitignore          ← Keeps secrets off GitHub
└── README.md
```

---

##  Getting Started

### 1. Get a Free API Key
- Go to [aistudio.google.com](https://aistudio.google.com)
- Sign in with Google → click **Get API Key** → **Create API Key**
- Copy the key (it's free, no credit card needed)

### 2. Install & Run Locally
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Open .env and paste your Gemini API key

# Start the server
npm start

# Open in browser
http://localhost:3000
```
### 3. Deploy to Railway 
1. Push this project to a GitHub repository
2. Go to [railway.app](https://railway.app) → sign in with GitHub
3. Click **New Project** → **Deploy from GitHub repo** → select this repo
4. Go to **Variables** tab → add `GEMINI_API_KEY` = your key
5. Go to **Settings** → **Networking** → **Generate Domain**
6. Your chatbot is live! 🎉


##  Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key (get free at aistudio.google.com) |
| `ALLOWED_ORIGIN` | Your website URL for CORS (e.g. https://nayepankh.com) |
| `PORT` | Server port (default: 3000) |


##  Security

| Feature | Details |
|---|---|
| API key protection | Stored only on server, never sent to browser |
| CORS | Locked to your domain in production |
| Rate limiting | 30 requests / 15 minutes per IP |
| Payload limit | Max 20kb per request |
| History limit | Max 40 messages stored per session |


##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js, Express |
| AI Model | Google Gemini 1.5 Flash |
| Hosting | Railway (free tier) |
| Security | express-rate-limit, cors, dotenv |


##  About Nayepankh Foundation

Nayepankh Foundation is a registered Indian non-profit dedicated to giving "new wings" (Naye Pankh) to underprivileged children and youth. The foundation works across education, vocational training, health awareness, and women empowerment — driven by passionate volunteers across India.

- Website: [nayepankh.com](https://nayepankh.com)
- Email: nayepankh@gmail.com
- Donations are eligible for **80G tax exemption** in India
