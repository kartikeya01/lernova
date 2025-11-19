const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const { userSignupSchema, userSigninSchema } = require("../schemas/zodSchema");
const { validate } = require("../middlewares/validate");
const { userAuth } = require("../middlewares/auth");
const jwt_secret = process.env.JWT_SECRET;

router.use(express.json());
router.post("/signup", validate(userSignupSchema), async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      email: email,
      password: encryptedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    res.status(200).json({
      message: "User signed up successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "User sign up failed.",
    });
  }
});

router.post("/signin", validate(userSigninSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Sign up first." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    //generate jwt and send in response
    const token = jwt.sign(
      {
        email: user.email,
        role: "user",
      },
      jwt_secret
    );
    return res
      .status(200)
      .json({ message: "Signed in successfully!", token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Sign in failed!" });
  }
});

router.get("/purchases", userAuth(jwt_secret), (req, res) => {
  res.json({
    message: "/user/purchases",
  });
});

module.exports = { userRouter: router };
