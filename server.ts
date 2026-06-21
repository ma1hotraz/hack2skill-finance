import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent set for telemetry as required
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Server-side health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Server-side Gemini chat proxy
app.post('/api/chat', async (req, res) => {
  try {
    const { message, expenses, history } = req.body;

    if (!message) {
      res.status(400).json({ message: 'Message is required' });
      return;
    }

    // Construct detailed context about the user's current expenses
    const formattedExpenses = Array.isArray(expenses)
      ? expenses.map((exp: any) => ({
          description: exp.description,
          amount: exp.amount,
          category: exp.category,
          date: exp.date ? new Date(exp.date).toLocaleDateString() : 'N/A'
        }))
      : [];

    const systemInstruction = `You are a helpful and professional Smart Personal Finance Assistant.
You can help the user log details of expenses, analyze their spending visual category allocations (Food & Drink, Transport, Shopping, Entertainment, Bills & Utilities, Health, etc.), and provide customized, actionable saving tips or budget planning advice.

Here is the user's current expense database state:
${JSON.stringify(formattedExpenses, null, 2)}

Provide insightful, actionable explanations back to the user based on their questions, keeping it light, encouraging, clear, and concise. Formulate your answers with clean spacing. Let's make sure to use clean bullet points or bold key words for readability.`;

    // Map message history to compliant gemini contents role representation
    const contents = [
      ...(Array.isArray(history) ? history : [])
        .map((h: any) => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content || '' }]
        }))
        // Ensure roles strictly alternate: (e.g. eliminate duplicated user or model inputs in sequence)
        .filter((val, i, arr) => i === 0 || val.role !== arr[i - 1].role),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    // Query Google GenAI's recommended model gemini-3.5-flash for text tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const reply = response.text || "I'm sorry, I couldn't formulate a reply. Please try again.";
    res.json({ reply });
  } catch (err: any) {
    console.error('Gemini error:', err);
    res.status(500).json({ 
      message: err?.message || 'An error occurred while retrieving a response from the Smart Assistant.' 
    });
  }
});

async function startServer() {
  // Vite dev middleware / static files routing
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
