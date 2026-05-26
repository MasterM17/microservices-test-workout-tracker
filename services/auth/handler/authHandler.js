const jwt = require("jsonwebtoken");
const User = require("../../../pkg/user/userSchema");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const dotenv = require("dotenv");
const { createSendToken } = require("../../token/creatSendTokenHandler");
const { sendEmail } = require("../../email/emailHandler");
const crypto = require("crypto");

const signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await sendEmail({
      email: newUser.email,
      subject: `Welcome to the Team ${newUser.name}`,
      message: `Hi ${newUser.name}, Welcome to Workout tracker!
You’ve just taken the first step toward a stronger, more disciplined version of yourself.
Your dashboard is ready. Whether you're hitting a new PR on the bench or tracking your consistency, we’re here to help you stay on top of your game.
What’s next?

Log your first workout.

Upload a progress photo.

Set your weekly goals.

Stop scrolling and start lifting.

Best, Workout tracker team`,
    });
    createSendToken(newUser, 201, res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body); //! for testing remove

    if (!email || !password) {
      return res.status(400).send("Please provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        data: {
          status: "fail",
          message: "Invalid email or password",
        },
      });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(401).json({
        data: {
          status: "fail",
          message: "Invalid email or password",
        },
      });
    }

    createSendToken(user, 200, res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "No user with that email",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/resetPassword/${token}`;
    const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetUrl} .\nIf you didn't forget your password, please ignore this email!`;

    await sendEmail({
      email: user.email,
      subject: `Your password reset token (valid for 10 min)`,
      message: message,
    });

    res.status(200).json({
      status: "sucess",
      message: "Token sent to email",
    });
  } catch (err) {
    console.log("ERROR IN FORGOT PASSWORD: ", err);
    res.status(500).send(err.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, passwordConfirm } = req.body;

    if (!password || !passwordConfirm) {
      return res
        .status(400)
        .send("Password and password confirmation are required");
    }

    if (password !== passwordConfirm) {
      return res.status(400).send("Passwords do not match");
    }

    const token = req.params.token;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(500).send("token is invalid or expired");
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const protect = async (req, res, next) => {
  try {
    console.log(req.headers);

    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in ! Please log in first ! ",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    const userAuth = await User.findById(decoded.id);
    if (!userAuth) {
      return res.status(401).json({
        status: "fail",
        message: "User dosent exsist",
      });
    }
    req.user = userAuth;
    next();
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        status: "fail",
        message: "you dont have acess",
      });
    }
    next();
  };
};

module.exports = {
  signup,
  login,
  protect,
  restrict,
  forgotPassword,
  resetPassword,
};
