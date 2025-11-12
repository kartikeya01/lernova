const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  res.json({
    message: "/user/signup",
  });
});

router.post("/signin", (req, res) => {
  res.json({
    message: "/user/signin",
  });
});

router.get("/purchases", (req, res) => {
  res.json({
    message: "/user/purchases",
  });
});

module.exports = { userRouter: router };
