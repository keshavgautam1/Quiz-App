import express from "express";
import {
  createQuiz,
  getActiveQuiz,
  getQuizResult,
  getAllQuizzes,
} from "../controllers/quizController.js";

const router = express.Router();

router.post("/quizzes", createQuiz);
router.get("/quizzes/active", getActiveQuiz);
router.get("/quizzes/:id/result", getQuizResult);
router.get("/quizzes/all", getAllQuizzes);

export default router;
