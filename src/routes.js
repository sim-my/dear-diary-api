const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");



function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "secretkey", (err, data) => {
    if (err) return res.sendStatus(403);
    req.authData = data;
    next();
  });
}

function authorize(req, res, next) {
  if (parseInt(req.params.userId) === req.authData.userId) {
    next();
  } else {
    res.json({ msg: "Unauthorized" });
  }
}

router.use("/auth", authRoutes);

router.use("/posts/:userId", authenticateToken, authorize, postRoutes);

router.use((err, req, res, next) => {
  res.json({
    msg: err.message,
  });
  next();
});

module.exports = router;
