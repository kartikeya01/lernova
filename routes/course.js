const express = require("express");
const router = express.Router();

router.post("/purchase", (req, res) => {
  res.json({
    message: "/course/purchase",
  });
});

router.post("/courses", (req, res) => {
  res.json({
    message: "/course/courses",
  });
});

module.exports = { courseRouter: router };
