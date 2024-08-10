import Quiz from "../models/Quiz.js";
import moment from "moment";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

const updateQuizStatus = (quiz) => {
  const currentTime = moment();
  if (currentTime.isBefore(quiz.startDate)) {
    return "inactive";
  } else if (currentTime.isBetween(quiz.startDate, quiz.endDate)) {
    return "active";
  } else if (currentTime.isAfter(quiz.endDate)) {
    return "finished";
  }
};

// Create a new quiz
export const createQuiz = asyncHandler(async (req, res, next) => {
  const { question, options, rightAnswer, startDate, endDate } = req.body;
  if (!question || !options || !rightAnswer || !startDate || !endDate) {
    throw new ApiError(400, "All fields are required");
  }
  const quiz = new Quiz({
    question,
    options,
    rightAnswer,
    startDate,
    endDate,
  });
  await quiz.save();
  res.status(201).json(new ApiResponse(201, quiz, "Quiz created successfully"));
});

// Get active quiz
export const getActiveQuiz = asyncHandler(async (req, res, next) => {
  const now = moment();
  const quizzes = await Quiz.find({
    startDate: { $lte: now.toDate() },
    endDate: { $gte: now.toDate() },
    status: "active",
  });

  if (quizzes.length === 0) {
    throw new ApiError(404, "No active quizzes found");
  }

  res.status(200).json(new ApiResponse(200, quizzes));
});

// Get quiz result after end time + 5 minutes
export const getQuizResult = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }

  const now = moment();
  if (now.isBefore(moment(quiz.endDate).add(5, "minutes"))) {
    throw new ApiError(400, "Quiz result not available yet");
  }

  res.status(200).json(new ApiResponse(200, { rightAnswer: quiz.rightAnswer }));
});

// Get all quizzes
export const getAllQuizzes = asyncHandler(async (req, res, next) => {
  const quizzes = await Quiz.find();
  res.status(200).json(new ApiResponse(200, quizzes));
});
