const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { adminModel } = require("../db");
const jwt_secret = process.env.JWT_SECRET;

router.use(express.json());

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token is missing." });
  }
  try {
    const decoded = jwt.verify(token, jwt_secret);
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Not authorized! You are not admin" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

router.post("/signup", (req, res) => {
  res.json({
    message: "/admin/signup",
  });
});

router.post("/signin", (req, res) => {
  res.json({
    message: "/admin/signin",
  });
});

router.use(adminMiddleware);

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
