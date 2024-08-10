import cron from "node-cron";
import Quiz from "./models/Quiz.js";
import { ApiError } from "./Utils/ApiError.js";
import { ApiResponse } from "./Utils/ApiResponse.js";

// Function to update quiz statuses
const updateQuizStatuses = async () => {
  try {
    const quizzes = await Quiz.find();
    const currentTime = new Date();

    for (const quiz of quizzes) {
      let newStatus;

      if (currentTime < new Date(quiz.startDate)) {
        newStatus = "inactive";
      } else if (
        currentTime >= new Date(quiz.startDate) &&
        currentTime <= new Date(quiz.endDate)
      ) {
        newStatus = "active";
      } else if (currentTime > new Date(quiz.endDate)) {
        newStatus = "finished";
      }

      if (quiz.status !== newStatus) {
        quiz.status = newStatus;
        await quiz.save();
      }
    }

    // Log successful status update
    const successResponse = new ApiResponse(200, {
      message: "Quiz statuses updated successfully",
    });
    console.log(successResponse);
  } catch (error) {
    const apiError = new ApiError(
      500,
      "Error updating quiz statuses",
      [error.message],
      error.stack
    );
    console.error(apiError);
  }
};

// Schedule the job to run every minute
cron.schedule("* * * * *", updateQuizStatuses);
