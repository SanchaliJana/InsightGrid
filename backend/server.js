import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import chartRoutes from "./routes/chartRoutes.js";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS Setup
const corsOptions = {
  origin: "http://localhost:3000", // frontend URL
  credentials: true, // allow cookies, headers
};
app.use(cors(corsOptions));

// ✅ Routes
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/upload.js"; // ✅ new upload route
import fileRoutes from "./routes/fileRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes); // ✅ mounted here
app.use("/api/charts", chartRoutes);
app.use("/api/files", fileRoutes);

// ✅ Connect to DB *before* starting server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err.message);
  });


