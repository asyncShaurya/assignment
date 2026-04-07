# 🚀 Smart Q&A API (RAG Backend)

A Node.js + Express backend that implements a **Retrieval-Augmented Generation (RAG)** pipeline using MongoDB and an LLM (OpenAI) to answer user queries based strictly on stored documents.

---

## 📌 Features

- 🔍 Retrieve relevant documents from MongoDB
- 🤖 LLM-powered answers using contextual grounding
- 🧠 RAG pipeline (Retrieval + Generation)
- 🔐 JWT Authentication (Register/Login)
- ⏱ Rate limiting (10 requests/min per user)
- 📊 Structured JSON responses
- 🪵 Request logging (latency + user tracking)
- ❌ Safe error handling (no stack leaks)

---

## 🧱 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT + bcrypt  
- **AI Integration:** OpenAI API  
- **Validation:** Basic validation (can be extended with Zod/Joi)  
- **Rate Limiting:** express-rate-limit  
---

## 📂 Project Structure
```
assignment/
│   
│   ├── controllers/           # 🎯 Route logic
│   │   ├── auth.controller.js
│   │   ├── doc.controller.js
│   │   └── ask.controller.js
│   │
│   ├── models/                # 🗃 Database schemas
│   │   ├── User.js
│   │   └── Document.js
│   │
│   ├── routes/                # 🌐 API routes
│   │   ├── auth.routes.js
│   │   ├── doc.routes.js
│   │   └── ask.routes.js
│   │
│   ├── services/              # 🧠 Business logic
│   │   ├── rag.service.js
│   │   └── llm.service.js
│   │
│   ├── middleware/            # 🔐 Middlewares
│   │   ├── auth.middleware.js
│   │   ├── rateLimiter.js
│   │   └── error.middleware.js
│   │
│   │
│   ├── seed/                  # 🌱 Seed scripts
│   │   └── seed.js
│   │
│   │
│   ├── app.js                 # 🚀 Express app
│   └── server.js              # 🌐 Server entry
│
├── .env.example               # 🔐 Env template
├── .gitignore
├── package.json
├── README.md
```

---
## ⚙️ Setup Instructions
```bash
-git clone <your-repo-link>
-cd assignment
-npm install
-create .env file
-run seed script (node seed/seed.js)
-start server (npm run dev)
