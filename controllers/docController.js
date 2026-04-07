import Document from "../models/Document.js";

export const getDocs = async (req, res, next) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: docs.length,
      documents: docs
    });

  } catch (error) {
    next(error);
  }
};