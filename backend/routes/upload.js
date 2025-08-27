import express from "express";
import multer from "multer";
import XLSX from "xlsx";
import UploadFile from "../models/UploadFile.js";

const router = express.Router();

// Setup multer (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route: POST /api/upload
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // Parse the Excel file
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Save to MongoDB
    const uploaded = new UploadFile({
      fileName: req.file.originalname,
      size: req.file.size,
      data,
    });

    await uploaded.save();

    res.status(201).json({ msg: "File uploaded and parsed successfully", file: uploaded });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Route: GET /api/upload-history
router.get("/upload-history", async (req, res) => {
  try {
    const files = await UploadFile.find().sort({ uploadDate: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch upload history" });
  }
});

// Route: DELETE /api/upload/:id
router.delete("/:id", async (req, res) => {
  try {
    await UploadFile.findByIdAndDelete(req.params.id);
    res.json({ msg: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete file" });
  }
});

export default router;
