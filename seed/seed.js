import mongoose, { mongo } from "mongoose";
import Document from "../models/Document.js";

await mongoose.connect(process.env.MONGO_URI);

await Document.insertMany([
  {
    title: "Refund Policy",
    content: "Refunds are processed within 5-7 business days.",
    tags: ["refund"]
  },
  {
    title: "Shipping Policy",
    content: "Shipping takes 3-5 days.",
    tags: ["shipping"]
  }
]);

console.log("Seeded!");
process.exit();