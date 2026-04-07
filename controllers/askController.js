import { retrieveDocs } from "../services/ragService.js";
import { generateAnswer } from "../services/llmService.js";

export const askQuestion = async (req, res, next) => {
  const startTime = Date.now();

  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({
        message: "Question is required"
      });
    }
    const docs = await retrieveDocs(question);
    console.log(`Retrieved ${docs.length} docs for question: ${question}`);

    const llmResponse = await generateAnswer(question, docs);

    let confidence = "low";
    if (docs.length >= 3) confidence = "high";
    else if (docs.length === 2) confidence = "medium";

    const sources = docs.map(doc => doc._id.toString());

    const latencyMs = Date.now() - startTime;

    const response = {
      answer: llmResponse.answer || "Not found in knowledge base",
      sources,
      confidence
    };
    console.log({
      userId: req.user?.id,
      question: question.substring(0, 50),
      latencyMs,
      confidence
    });

    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};