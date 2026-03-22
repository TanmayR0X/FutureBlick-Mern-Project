const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const askAI = async (prompt) => {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-lite",
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'OpenRouter API request failed');
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No response generated';
};

module.exports = { askAI };