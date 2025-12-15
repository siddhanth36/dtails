import express = require("express");
import cors = require("cors");

import blogsRouter from "./routes/blogs";
import caseStudiesRouter from "./routes/case-studies";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MOUNT API ROUTES FIRST (IMPORTANT)
app.use("/api/blogs", blogsRouter);
app.use("/api/case-studies", caseStudiesRouter);

// ✅ Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ❌ NO wildcard routes here
// ❌ NO static serving here
// ❌ NO app.get("*") here

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

