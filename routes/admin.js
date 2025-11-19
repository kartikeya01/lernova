const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { adminAuth } = require("../middlewares/auth");
const { adminModel } = require("../db");
const {
  adminSignupSchema,
  adminSigninSchema,
} = require("../schemas/zodSchema");
const { validate } = require("../middlewares/validate");
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;
router.use(express.json());
router.post("/signup", validate(adminSignupSchema), async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    await adminModel.create({
      email,
      password: encryptedPassword,
      firstName,
      lastName,
    });

    return res.status(200).json({ message: "Admin signed up successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Admin signup failed." });
  }
});

router.post("/signin", validate(adminSigninSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await adminModel.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Sign up as admin first." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email: email, role: "admin" }, jwt_secret);

    return res
      .status(200)
      .json({ message: "Signed in successfully!", token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Sign in failed." });
  }
});

router.use(adminAuth(jwt_secret));

router.post("/course", (req, res) => {
  res.json({
    message: "/admin/course post",
  });
});

router.put("/course", (req, res) => {
  res.json({
    message: "/admin/course put",
  });
});

router.get("/course/all", (req, res) => {
  res.json({
    message: "/admin/course/all",
  });
});

module.exports = {
  adminRouter: router,
};
