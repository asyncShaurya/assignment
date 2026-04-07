import OpenAI from "openai";

export const generateAnswer = async (question, docs) => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const context = docs.map((doc, index) => {
      return `Doc ${index + 1}:
Title: ${doc.title}
Content: ${doc.content}`;
    }).join("\n\n");

    const prompt = `
You are a strict AI assistant.

Context:
${context}

Question:
${question}

Return ONLY valid JSON:
{
  "answer": "string"
}
`;

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2
    });

    const content = response.choices[0].message.content;

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      parsed = {
        answer: "Not found in knowledge base"
      };
    }

    return parsed;

  } catch (error) {
    console.error("LLM Error:", error.message);

    return {
      answer: `Error: ${error.message}`
    };
  }
};