const knex = require("../db")

const bcrypt = require('bcrypt');

exports.fetchOne = (req, res, next, params) => {
  return knex.select("*")
  .from("user")
  .where(params)
  .then(rows => rows)
}

exports.create = (req, res, next) => {      
  const hash = bcrypt.hashSync(req.body.password, 10);

  knex("user").insert({
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hash,
  }).then(
      data => res.status(200).json({msg: "User Created"})
  ).catch(err => res.json({err : err.detail}))

}

