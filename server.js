import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import quizRoutes from "./routes/index.js";
import "./cronJob.js";
import connectToDB from "./db.js";
import { ApiError } from "./utils/ApiErrors.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", quizRoutes);

// Global error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
});

connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
