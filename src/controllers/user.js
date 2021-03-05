const user = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
  user.create(req, res, next);
};

exports.login = (req, res, next) => {
  user
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
          res.json({
            userId: data[0].id,
            token,
            first_name: data[0].first_name,
            last_name: data[0].last_name,
          });
        } else {
          res.json({ err: "Password mismatch" });
        }
      }
    })
    .catch((err) => {
      next(err);
    });
};

const generateAccessToken = (email) => {
  return jwt.sign(email, "secretkey");
};
