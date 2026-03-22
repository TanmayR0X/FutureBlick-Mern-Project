require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const {askAI} = require("./config/openRouter.js");
const Conversation = require("./models/Conversation.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;

connectDB();

app.post("/api/ask-ai", async (req, res) => {
  try {
    const {prompt} = req.body;
    if(!prompt?.trim()) {
      return res.status(400).json({error : "Prompt cannot be empty!"})
    }
    const answer = await askAI(prompt);
    res.json({answer});
  } catch (error) {
    console.error("Error in /api/ask-ai :", error);
    res.status(500).json({error: error.message || 'could not get AI responses'});
  }
})

app.post('/api/save', async (req, res) => {
  try {
    const { prompt, response } = req.body;
    if(!prompt || !response) {
          return res.status(400).json({ error: 'Prompt and response are required' });
    }
    const conversation = new Conversation({
      prompt,
      response
    });

    const savedDoc = await conversation.save();
    res.json({ success: true, data: savedDoc });
  } catch (error) {
     console.error('Error in /api/save:', error);
    res.status(500).json({ error: error.message || 'Could not save conversation' });
  }
});

app.get("/api/history", async (req, res) => {
  try {
    const conversations = await Conversation.find()
    .sort({createdAt:-1})
    .limit(50);
    
    res.json({data: conversations});
  } catch (error) {
      console.error('Error in /api/history:', error);
    res.status(500).json({ error: error.message || 'Could not fetch history' });
  }
})

app.get("/", (req, res) => {
  res.json({ message: 'MERN AI Flow API is running' });
})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
