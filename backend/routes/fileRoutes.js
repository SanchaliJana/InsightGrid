import express from "express";
import UploadFile from "../models/UploadFile.js";

const router = express.Router();

// GET all uploaded files
router.get("/", async (req, res) => {
  try {
    const files = await UploadFile.find().sort({ uploadDate: -1 });
    res.json(files);
  } catch (error) {
    console.error("Error fetching files:", error.message);
    res.status(500).json({ message: "Failed to fetch files" });
  }
});

export default router;
