
import mongoose from "mongoose";

const UploadFileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
  data: { type: Array, required: true }, // Parsed Excel rows
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
});

const UploadFile = mongoose.model("UploadedFile", UploadFileSchema);
export default UploadFile;
