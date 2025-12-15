import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /api/blogs
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    res.status(200).json([]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

/**
 * GET /api/blogs/:id
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    res.status(200).json({
      id,
      title: "Sample Blog",
      content: "Placeholder content",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch blog" });
  }
});

/**
 * POST /api/blogs
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, content, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    res.status(201).json({
      id: Date.now(),
      title,
      content,
      image,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create blog" });
  }
});

export = router;

