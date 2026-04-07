import Document from "../models/Document.js";

export const retrieveDocs = async (question) => {
  try {
    const keywords = question
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .split(" ")
      .filter(word => word.length > 2);

    if (keywords.length === 0) {
      return [];
    }

    const searchConditions = keywords.map(keyword => ({
      $or: [
        { content: { $regex: keyword, $options: "i" } },
        { title: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } }
      ]
    }));

    const docs = await Document.find({
      $or: searchConditions
    }).limit(5);

    const scoredDocs = docs.map(doc => {
      let score = 0;

      keywords.forEach(keyword => {
        if (doc.content.toLowerCase().includes(keyword)) score += 2;
        if (doc.title.toLowerCase().includes(keyword)) score += 3;
        if (doc.tags.includes(keyword)) score += 4;
      });

      return { doc, score };
    });

    scoredDocs.sort((a, b) => b.score - a.score);

    const topDocs = scoredDocs.slice(0, 3).map(item => item.doc);

    return topDocs;

  } catch (error) {
    console.error("RAG Retrieval Error:", error.message);
    return [];
  }
};