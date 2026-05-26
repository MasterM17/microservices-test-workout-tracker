const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  excerciseName: {
    type: String,
    required: [true, "it must have a name"],
    trim: true,
    minlength: [1, "Title is too short"],
    maxlength: [50, "title is too long"],
  },
  weight: {
    type: Number,
    required: [true, "it must have weight"],
    min: 1,
    max: 999,
  },
  reps: {
    type: Number,
    required: [true, "it must have repetitions"],
    min: 1,
    max: 999,
  },
  muscleGroup: {
    type: String,
    required: [true, "it must have muscle group"],
    enum: ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"],
  },
  notes: {
    type: String,
    maxlength: 200,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: "default-workout.jpg",
  },
  images: {
    type: [String],
  },
});

const Workout =
  mongoose.models.Workout || mongoose.model("Workout", workoutSchema);
module.exports = Workout;
