const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { adminAuth } = require("../middlewares/auth");
const { adminModel } = require("../db");

require("dotenv").config();

router.post("/signup", (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  res.json({
    message: "/admin/signup",
  });
});

router.post("/signin", (req, res) => {
  res.json({
    message: "/admin/signin",
  });
});

router.use(adminAuth);

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
