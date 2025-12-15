import express from "express";
import cors from "cors";
import path from "path";

// ROUTES (CommonJS compatible)
const blogsRouter = require("./routes/blogs");
const caseStudiesRouter = require("./routes/case-studies");

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(cors());
app.use(express.json());

/* ======================
   API ROUTES
====================== */
app.use("/api/blogs", blogsRouter);
app.use("/api/case-studies", caseStudiesRouter);

/* ======================
   HEALTH CHECK (IMPORTANT)
====================== */
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ======================
   START SERVER (RENDER SAFE)
====================== */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

