const knex = require("../db");

exports.fetchOne = (req, res, next) => {
  return knex
    .select("*")
    .from("post")
    .where({ id: req.params.id, userId: req.authData.userId  })
    .then((rows) => res.json({ data: rows }));
};

exports.fetchAll = (req, res, next) => {
  knex
    .select("*")
    .from("post")
    .where({ userId: req.authData.userId })
    .then((rows) => res.json({ data: rows }));
};

exports.create = (req, res, next) => {
  knex("post")
    .insert({
      title: req.body.title,
      userId: req.authData.userId,
      date: new Date(),
      story: req.body.story,
    })
    .then((data) => res.json({ msg: "Post Created" }))
    .catch((err) => res.json({ err: err.detail }));
};

exports.delete = (req, res, next) => {
  knex("post")
    .del()
    .where({
      id: req.params.id,
    })
    .then((data) => res.json({ msg: "Post Deleted" }))
    .catch((err) => res.json({ err: err.detail }));
};
