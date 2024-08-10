import mongoose from "mongoose";
import dotenv from "dotenv";
import Quiz from "./models/Quiz.js"; // Adjust the path as needed
import moment from "moment";

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    // Connect to the database
    const uri = `${process.env.MongoDB_URI}/${process.env.DB_NAME}`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Current time for relative dates
    const now = moment();

    // Define test quizzes
    const quizzes = [
      // Active quizzes (should be active on today's date)
      {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        rightAnswer: 0,
        startDate: now.toDate(),
        endDate: moment().add(10, "days").toDate(),
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Earth", "Jupiter", "Saturn"],
        rightAnswer: 0,
        startDate: now.toDate(),
        endDate: moment().add(10, "days").toDate(),
      },
      // Inactive quizzes (before today's date)
      {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: [
          "Harper Lee",
          "Jane Austen",
          "Mark Twain",
          "Ernest Hemingway",
        ],
        rightAnswer: 0,
        startDate: moment().subtract(20, "days").toDate(),
        endDate: moment().subtract(10, "days").toDate(),
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pb", "Fe"],
        rightAnswer: 0,
        startDate: moment().subtract(20, "days").toDate(),
        endDate: moment().subtract(10, "days").toDate(),
      },
      // Finished quizzes (ended more than 5 minutes ago)
      {
        question: "What is the largest ocean on Earth?",
        options: [
          "Pacific Ocean",
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
        ],
        rightAnswer: 0,
        startDate: moment().subtract(30, "days").toDate(),
        endDate: moment().subtract(20, "days").toDate(),
      },
      {
        question: "What is the hardest natural substance on Earth?",
        options: ["Diamond", "Gold", "Iron", "Platinum"],
        rightAnswer: 0,
        startDate: moment().subtract(30, "days").toDate(),
        endDate: moment().subtract(20, "days").toDate(),
      },
      // Mix of active, inactive, and finished quizzes
      {
        question: "Which gas do plants use for photosynthesis?",
        options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
        rightAnswer: 0,
        startDate: now.toDate(),
        endDate: moment().add(5, "days").toDate(),
      },
      {
        question: "Who painted the Mona Lisa?",
        options: [
          "Leonardo da Vinci",
          "Vincent van Gogh",
          "Pablo Picasso",
          "Claude Monet",
        ],
        rightAnswer: 0,
        startDate: moment().subtract(10, "days").toDate(),
        endDate: moment().subtract(5, "days").toDate(),
      },
      {
        question: "What is the smallest unit of life?",
        options: ["Cell", "Atom", "Molecule", "Organ"],
        rightAnswer: 0,
        startDate: moment().subtract(20, "days").toDate(),
        endDate: moment().subtract(10, "days").toDate(),
      },
      {
        question: "What is the capital of Japan?",
        options: ["Tokyo", "Seoul", "Beijing", "Bangkok"],
        rightAnswer: 0,
        startDate: now.toDate(),
        endDate: moment().add(1, "day").toDate(),
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Jupiter", "Saturn", "Earth", "Neptune"],
        rightAnswer: 0,
        startDate: moment().subtract(5, "days").toDate(),
        endDate: moment().subtract(2, "days").toDate(),
      },
    ];

    // Remove existing quizzes and insert new ones
    await Quiz.deleteMany({});
    await Quiz.insertMany(quizzes);

    console.log("Test data seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seedData();
