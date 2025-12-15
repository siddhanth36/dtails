import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import blogsRouter from "./routes/blogs";
import caseStudiesRouter from "./routes/case-studies";

// Required for ES modules (__dirname replacement)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
   SERVE FRONTEND (OPTIONAL)
   Only if you later build frontend
   into server/dist/client
====================== */
const clientBuildPath = path.join(__dirname, "client");

app.use(express.static(clientBuildPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

/* ======================
   START SERVER (RENDER SAFE)
====================== */
const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

