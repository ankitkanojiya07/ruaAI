import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("AIzaSyCHMW2qCuN8ApmxBTyXTqizCCU8H6KWzIk"); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const result = await model.generateContent(prompt);
    
    // If the response is in plain text, wrap it as Markdown
    const markdownResponse = `### AI Response:\n\n${result.response.text()}`;

    res.json({ response: markdownResponse });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
