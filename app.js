import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import askRoutes from "./routes/askRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import docRoutes from "./routes/docRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    console.log({
      userId: req.user?.id || "guest",
      method: req.method,
      path: req.originalUrl,
      latencyMs: Date.now() - start
    });
  });

  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/docs", docRoutes);
app.use("/api", askRoutes);


app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.status || 500).json({
    message: "Internal Server Error"
  });
});

export default app;