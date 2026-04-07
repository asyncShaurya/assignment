import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import Document from "../models/Document.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const documents = [
  {
    title: "Refund Policy",
    content: "Refunds are processed within 5-7 business days after approval.",
    tags: ["refund"]
  },
  {
    title: "Shipping Policy",
    content: "Shipping takes 3-5 days.",
    tags: ["shipping"]
  }
];

for (const doc of documents) {
  await Document.updateOne(
    { title: doc.title },
    { $set: doc },
    { upsert: true }
  );
}

console.log("Seeded!");
process.exit();