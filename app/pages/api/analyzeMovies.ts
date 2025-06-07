import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { movieQuery } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
        messages: [
          {
            role: "system",
            content: "You are a movie expert AI. Provide a detailed description and categorize by genre, mood, and audience."
          },
          {
            role: "user",
            content: `Analyze this movie or plot: ${movieQuery}`
          }
        ]
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "No response.";
    res.status(200).json({ analysis: content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from OpenRouter.' });
  }
}