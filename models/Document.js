import mongoose from "mongoose";
const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },

    content: {
      type: String,
      required: [true, "Content is required"]
    },

    tags: {
      type: [String],
      default: []
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false 
  }
);
export default mongoose.model("Document", documentSchema);