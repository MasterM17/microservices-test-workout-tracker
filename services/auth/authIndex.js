const express = require("express");
const db = require("./../../pkg/DB/index");
const auth = require("./handler/authHandler");
const cors = require("cors"); // check before deploy

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.initDB();

app.post("/api/v1/signup", auth.signup);
app.post("/api/v1/login", auth.login);
app.post("/api/v1/forgotPassword", auth.forgotPassword);
app.patch("/api/v1/resetPassword/:token", auth.resetPassword);
app.post("/api/v1/auth/logout", auth.logout);

const port = process.env.PORTAUTH;

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Sucesfull started server on ${port}`);
});
