import express from "express";

const router = express.Router();

// test route so it doesn't crash
router.get("/", (req, res) => {
  res.json({ message: "Orders route is working" });
});

export default router;