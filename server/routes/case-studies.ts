import { Router } from "express";
import pool from "../db";

const router = Router();

// Get all case studies
router.get("/", async (_req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM case_studies ORDER BY created_at DESC"
  );
  res.json(rows);
});

// Create case study
router.post("/", async (req, res) => {
  const { title, client, content, cover_image_url, published } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO case_studies (title, client, content, cover_image_url, published)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [title, client ?? null, content, cover_image_url ?? null, !!published]
  );

  res.status(201).json(rows[0]);
});

export default router;
