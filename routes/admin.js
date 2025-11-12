const express = require("express");
const router = express.router();

function adminMiddleware(req, res, next) {}
router.use(adminMiddleware);

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
