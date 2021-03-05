const post = require("../models/post");
const knex = require("../db");

exports.fetchOne = (req, res, next) => {
  post.fetchOne(req, res, next);
};

exports.fetchAll = (req, res, next) => {
  post.fetchAll(req, res, next);
};

exports.create = (req, res, next) => {
  post.create(req, res, next);
};

exports.delete = (req, res, next) => {
  post.delete(req, res, next);
};

exports.update = (req, res, next) => {
  post.update(req, res, next);
};
