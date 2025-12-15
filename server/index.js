"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var blogs_1 = require("./routes/blogs");
var case_studies_1 = require("./routes/case-studies");
var app = express();
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogs_1.default);
app.use("/api/case-studies", case_studies_1.default);
app.get("/health", function (_req, res) {
    res.json({ status: "ok" });
});
app.listen(4000, function () {
    console.log("🚀 Backend running on http://localhost:4000");
});
