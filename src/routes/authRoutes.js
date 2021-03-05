const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", userController.create);

router.post("/login", (req, res, next) => {
  userController
    .fetchOne(req, res, next, { email: req.body.email })
    .then((data) => {
      if (data.length === 0) {
        res.json({ err: "No such user" });
      }
      if (data.length > 0) {
        if (bcrypt.compareSync(req.body.password, data[0].password)) {
          const token = generateAccessToken({
            userId: data[0].id,
            email: data[0].email,            
          });
          res.json({ userId: data[0].id, token, first_name: data[0].first_name, last_name: data[0].last_name });
        } else {
          res.json({ err: "Password mismatch" });
        }
      }
    })
    .catch((err) => {
      next(err);
    });
});

function generateAccessToken(email) {
  return jwt.sign(email, "secretkey");
}

module.exports = router;
