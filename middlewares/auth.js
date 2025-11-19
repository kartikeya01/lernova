const jwt = require("jsonwebtoken");

const adminAuth = (jwt_secret) => (req, res, next) => {
  console.log(req.headers);
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
};

const userAuth = (jwt_secret) => (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Token is missing." });
  }
  try {
    console.log(jwt_secret);
    const decoded = jwt.verify(token, jwt_secret);
    console.log(decoded);
    if (decoded.role !== "user") {
      return res
        .status(403)
        .json({ error: "Not authorized! You are not user" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { adminAuth, userAuth };
