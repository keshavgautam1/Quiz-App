import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  rightAnswer: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["inactive", "active", "finished"],
    default: "inactive",
  },
});

export default mongoose.model("Quiz", QuizSchema);
