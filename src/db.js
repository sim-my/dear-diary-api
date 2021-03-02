const db = require('./knexfile.js')["development"];

module.exports = require('knex')(db);
