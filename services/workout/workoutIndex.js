const express = require("express");
const db = require("./../../pkg/DB/index");
const workoutHandler = require("./handler/workOutHandler");
const auth = require("./../auth/handler/authHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // check before deploy

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

db.initDB();

//Routes
app.get(
  "/api/v1/workouts",
  auth.protect,
  auth.restrict("admin", "user"),
  workoutHandler.getWorkouts,
);
app.get(
  "/api/v1/workouts/:id",
  auth.protect,
  auth.restrict("admin", "user"),
  workoutHandler.getWorkout,
);
app.post(
  "/api/v1/workouts",
  auth.protect,
  auth.restrict("admin", "user"),
  workoutHandler.uploadWorkoutPhoto,

  workoutHandler.createWorkout,
);
app.patch(
  "/api/v1/workouts/:id",
  auth.protect,
  auth.restrict("admin", "user"),
  workoutHandler.updWorkout,
);
app.delete(
  "/api/v1/workouts/:id",
  auth.protect,
  auth.restrict("admin"),
  workoutHandler.deletWorkout,
);

const port = process.env.PORTWORK;

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Sucesfull started server on ${port}`);
});
