# MERN AI Flow

A full-stack web application that visualizes AI conversations as an interactive flowchart. Type a prompt into the input node, click "Run Flow" to get an AI response, and save conversations to MongoDB.

[![Live Demo](https://img.shields.io/badge/-%F0%9F%94%B5%20LIVE%20DEMO-blue?style=for-the-badge&labelColor=blue)](https://future-blick-mern-project.vercel.app/)

## Preview

| Desktop | Mobile |
|---------|--------|
| ![Desktop Preview](assets/desktop.png) | ![Mobile Preview](assets/mobile.png) |

## Video Tutorial

[![▶ Watch Tutorial](https://img.shields.io/badge/▶%20Watch%20Tutorial-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=NDUNaCGepvg)


## Tech Stack

- **Frontend** — React 18, Vite, React Flow, Axios
- **Backend** — Node.js, Express.js, Mongoose
- **Database** — MongoDB Atlas
- **AI** — OpenRouter API 

## Prerequisites

- Node.js v16+
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free)
- [OpenRouter.ai](https://openrouter.ai) account (free)

## Setup

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd mern-ai-flow
```

### 2. Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-flow
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

```bash
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Open `http://localhost:5173`

## Usage

1. Type your prompt in the **Input Node**
2. Click **Run Flow** or press `Ctrl+Enter`
3. AI response appears in the **Result Node**
4. Click **Save** to store in MongoDB
5. View history at the bottom panel

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ask-ai` | Send prompt, get AI response |
| POST | `/api/save` | Save conversation to MongoDB |
| GET | `/api/history` | Fetch saved conversations |

## Project Structure

```
mern-ai-flow/
├── backend/
│   ├── server.js
│   ├── config/
│   │   ├── db.js
│   │   └── openRouter.js
│   └── models/
│       └── Conversation.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── nodes/
│   │       ├── InputNode.jsx
│   │       └── ResultNode.jsx
│   └── .env
└── README.md
```

## Troubleshooting

- **MongoDB error** — Whitelist your IP in Atlas network settings
- **CORS error** — Make sure backend is running on port 5000
- **OpenRouter error** — Check API key starts with `sk-or-v1-`

## Acknowledgments

[React Flow](https://reactflow.dev) · [OpenRouter](https://openrouter.ai) · [MongoDB Atlas](https://www.mongodb.com/atlas)
